/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import { toast, Zoom } from 'react-toastify';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
  createAcution,
  getCart,
  getSingleAuction,
  removeFromCart,
  updateCartOption
} from '../../../Action/appAction';

function LivePreviewExample({
  getCart,
  cart,
  removeFromCart,
  updateCartOption,
  isAuth,
  createAcution,
  getSingleAuction,
  auction
}) {
  const params = useParams();
  const [blocking, setblocking] = useState(false);

  useEffect(() => {
    const runAction = async () => {
      setblocking(true);
      await getSingleAuction(params.id);
      setblocking(false);
    };
    runAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const history = useHistory();
  let location = useLocation();
  let localAuction = localStorage.getItem('newAuction');
  console.log(JSON.parse(localAuction));
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: new URLSearchParams(location.search).get('fillAuto')
      ? JSON.parse(localAuction)
      : {
          // missing "test.lastName" input will be registered
          startDate: moment().format('YYYY-MM-DDTkk:mm'),
          endDate: moment().add(3, 'days').format('YYYY-MM-DDTkk:mm')
        }
    // defaultValues: auction && {
    //   name: auction.name,
    //   totalprice: auction.intial_price,
    //   reserveprice: auction.reserve_price,
    //   startDate: auction.start_date,
    //   endDate: auction.end_date,
    // shippingaddress    : data.description,

    // }
  });
  console.log('Getting value');
  console.log(getValues());
  const onSubmit = async (data) => {
    if (isAuth) {
      var x = moment(data.startDate);
      var y = moment(data.endDate);
      var duration = moment.duration(y.diff(x));
      let product = [];
      cart.forEach((c) => {
        let productDetail = {
          id: uuidv4(),
          product_id: {
            id: c.id,
            name: c.name
          },
          name: `${c.name} for ${data.name}`,
          product_qty: c.quantity,
          price_unit: c.list_price,
          taxes_id: [],
          price_subtotal: Number(c.quantity) * Number(c.list_price)
        };
        product.push(productDetail);
      });
      let obj = {
        name: data.name,
        description: data.shippingaddress,
        state: 'pending',
        intial_price: data.totalprice,
        reserve_price: data.reserveprice,
        total_duration: JSON.stringify(duration),
        start_date: data.startDate,
        end_date: data.endDate,
        reverse_auction_line_ids: JSON.stringify(product)
      };
      setblocking(true);
      await createAcution(obj);
      setblocking(false);
      localStorage.removeItem('newAuction');
      localStorage.removeItem('cart');
      history.push('/homepage');
    } else {
      const stringifyData = JSON.stringify(data);
      localStorage.setItem('newAuction', stringifyData);
      toast.error('Please Login to Create an Auction', {
        containerId: 'B',
        transition: Zoom
      });

      history.push('/PageLoginIllustration/?pendingAuction=true');
    }
  };
  // console.log(getValues('endDate').toString());
  return (
    <>
      <BlockUi
        className="mb-5"
        tag="Card"
        blocking={blocking}
        loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
        {/* <Card className="mb-5"> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <div className="text-uppercase font-weight-bold text-primary pt-4 font-size-sm">
              Auction Details
            </div>
            <div className="py-4">
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Name
                    </Label>
                    <Input
                      type="text"
                      {...register('name', {
                        required: 'You must specify a Name',
                        maxLength: 80
                      })}
                      value={watch('name')}
                      invalid={errors.name && true}
                      placeholder="Name..."
                    />
                  </FormGroup>

                  <Row>
                    <Col>
                      <Label className="font-weight-bold" for="">
                        Total Price
                      </Label>
                      <FormGroup>
                        <Input
                          type="number"
                          {...register('totalprice', {
                            required: 'Please Enter Total Price',
                            min: 0
                          })}
                          value={watch('totalprice')}
                          invalid={errors.totalprice && true}
                          placeholder="Price..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label className="font-weight-bold" for="">
                        Reserve Price
                      </Label>
                      <FormGroup>
                        <Input
                          type="number"
                          {...register('reserveprice', {
                            required: 'Please Enter Reserve price',
                            min: 0
                          })}
                          value={watch('reserveprice')}
                          invalid={errors.reserveprice}
                          placeholder="Price..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label className="font-weight-bold" for="">
                        Minimum Distance
                      </Label>
                      <FormGroup>
                        <Input
                          type="number"
                          {...register('minimumdistance', {
                            required: 'Please Enter Minimum Distance',
                            min: 0
                          })}
                          value={watch('minimumdistance')}
                          invalid={errors.minimumdistance}
                          placeholder="Distance in Kms..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Special requirements or Comments
                    </Label>
                    <Input
                      type="text"
                      name="comments"
                      {...register('comments', {
                        required: 'Please Enter Comments',
                        maxLength: 80
                      })}
                      value={watch('comments')}
                      invalid={errors.comments}
                      placeholder="Type here ..."
                    />
                  </FormGroup>
                  <Label className="font-weight-bold" for="">
                    Auction Start Date and Time
                  </Label>
                  <FormGroup>
                    <Input
                      type="datetime-local"
                      {...register('startDate', {
                        required: 'Please Enter Start Date of Auction',
                        maxLength: 80
                      })}
                      onChange={(e) => {
                        console.log(e.target.value);
                        const vvl = getValues();
                        let start = moment(e.target.value).format(
                          'YYYY-MM-DDTkk:mm'
                        );
                        const obj = {
                          ...vvl,
                          startDate: moment(e.target.value).format(
                            'YYYY-MM-DDTkk:mm'
                          ),
                          endDate: moment(start)
                            .add(3, 'days')
                            .format('YYYY-MM-DDTkk:mm')
                        };
                        reset(obj);
                      }}
                      value={watch('startDate')}
                      invalid={errors.startDate}
                      placeholder="Auction Start Date..."
                    />
                  </FormGroup>
                  <Label className="font-weight-bold" for="">
                    Plainned Delivery Date and Time
                  </Label>
                  <FormGroup>
                    <Input
                      type="datetime-local"
                      {...register('plannedDate', {
                        required: 'Please Enter Start Date of Auction'
                      })}
                      value={watch('plannedDate')}
                      invalid={errors.plannedDate}
                      placeholder="Plainned Delivery Date..."
                    />
                  </FormGroup>
                  <Label className="font-weight-bold" for="">
                    Auction End Date and Time
                  </Label>
                  <FormGroup>
                    <Input
                      type="datetime-local"
                      // defaultValue={moment().format('DD-MM-YYYY')}
                      value={watch('endDate')}
                      {...register('endDate', {
                        required: 'Please Enter Start Date of Auction'
                      })}
                      invalid={errors.endDate}
                      placeholder="Auction End Date..."
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="divider mb-4" />
          <Container>
            <FormGroup>
              <Label className="font-weight-bold" for="">
                Shipping Address
              </Label>
              <Input
                type="textarea"
                {...register('shippingaddress', {
                  required: 'Please Enter Shipping Address of Auction'
                })}
                value={watch('shippingaddress')}
                invalid={errors.shippingaddress}
              />
            </FormGroup>
          </Container>
          <div className="divider mt-5 mb-4" />

          <Container className="py-3">
            <div className="text-uppercase font-weight-bold text-primary pt-4 font-size-sm">
              Product Details
            </div>
            <div className="p-4">
              <div className="table-responsive-md">
                <Table className="table-alternate-spaced mb-0">
                  <thead>
                    <tr>
                      <th
                        className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                        scope="col">
                        Product
                      </th>
                      <Label className="font-weight-bold" for="">
                        Quantity
                      </Label>

                      <th
                        className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                        scope="col">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#/" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="hover-scale-lg rounded-sm"
                              src={auction && auction.product.main_image_link}
                              style={{ width: 90 }}
                            />
                          </a>
                          <div className="pl-3">
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="...">
                              {auction && auction.product.name}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-black-50">
                        <FormGroup>
                          <Input
                            type="number"
                            name=""
                            id=""
                            disabled={true}
                            value={
                              auction &&
                              JSON.parse(auction.reverse_auction_line_ids)[0]
                                .product_qty
                            }
                            placeholder="Quantity"
                          />
                        </FormGroup>
                      </td>
                      <td className="font-size-lg font-weight-bold">
                        <small>$</small>
                        <span>
                          {auction &&
                            JSON.parse(auction.reverse_auction_line_ids)[0]
                              .price_subtotal}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Container>

          <div className="divider mt-5 mb-4" />
          {/* <Container className="py-3">
          <div className="text-uppercase font-weight-bold text-primary pt-4 font-size-sm">
            All Bids
          </div>
          <div className="p-4">
            <div className="table-responsive-md">
              <Table className="table-alternate-spaced mb-0">
                <thead>
                  <tr>
                    <th
                      className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                      scope="col">
                      Bidder Name
                    </th>
                    <Label className="font-weight-bold" for="">
                      Billing Amount
                    </Label>

                    <th
                      cslassName="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                      scope="col">
                      Date And Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name="bidername"
                          id=""
                          value={bidername}
                          onChange={changeHandler}
                          placeholder="Bider Name"
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="number"
                          name="billingamount"
                          id=""
                          value={billingamount}
                          onChange={changeHandler}
                          placeholder="Total Price"
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <Input
                          type="Date"
                          name="biderDate"
                          id=""
                          value={biderDate}
                          onChange={changeHandler}
                          placeholder="Quantity"
                        />
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Container> */}
          <div className="divider mt-5 mb-4" />

          <Container className="d-flex align-items-center justify-content-end">
            <div className="py-4 mr-2">
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                color="success"
                size="lg"
                className="font-weight-bold">
                Create Auction
              </Button>
            </div>
            <div className="py-4">
              <Button
                type="submit"
                color="success"
                size="lg"
                className="font-weight-bold">
                Invite Biders
              </Button>
            </div>
          </Container>
        </Form>
        {/* </Card> */}
      </BlockUi>
    </>
  );
}
const mapStateToProps = (state) => ({
  cart: state.appReducer.cart,
  isAuth: state.appReducer.isAuth,
  auction: state.appReducer.singleAuction
});
export default connect(mapStateToProps, {
  getCart,
  removeFromCart,
  updateCartOption,
  createAcution,
  getSingleAuction
})(LivePreviewExample);

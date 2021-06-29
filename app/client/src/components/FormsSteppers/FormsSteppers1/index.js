/* eslint-disable no-  */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { toast, Zoom } from 'react-toastify';

import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  Collapse,
  Container,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  CustomInput,
  Row,
  Table
} from 'reactstrap';
import {
  getCart,
  removeFromCart,
  updateCartOption,
  createAcution,
  getSingleAuction
} from '../../../Action/appAction';

import stock1 from '../../../assets/images/Banner1 (1).jpg';
import stock2 from '../../../assets/images/Banner2 (1).jpg';
import stock3 from '../../../assets/images/Banner3.jpg';

import stock1sb from '../../../assets/images/Banner1sb.jpg';
import stock2sb from '../../../assets/images/Banner2sb.jpg';
import stock3sb from '../../../assets/images/Banner3sb.jpg';

function SliderArrowNext(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} />
    </div>
  );
}
function SliderArrowPrev(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-left']} />
    </div>
  );
}
function LivePreviewExample({
  getCart,
  removeFromCart,
  updateCartOption,
  createAcution,
  cart,
  isAuth,
  user
}) {
  const history = useHistory();
  const params = useParams();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const runAction = async () => {
      await getCart();
       ;
      if (cart && cart.length > 0) {
        setform({
          ...form,
          auction_products: cart,
          reserve_price:
            (Number(
              cart.reduce(function (accumulator, currentValue) {
                return (
                  accumulator +
                  Number(currentValue.quantity * currentValue.list_price)
                );
              }, 0)
            ) *
              30) /
            100
        });
      }
    };
    runAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (cart && cart.length > 0) {
       ;
      setform({
        ...form,
        reserve_price:
          (Number(
            cart.reduce(function (accumulator, currentValue) {
              return (
                accumulator +
                Number(currentValue.quantity * currentValue.list_price)
              );
            }, 0)
          ) *
            30) /
          100
      });
    }
  }, [cart]);
  const [check, setcheck] = useState(false);
  const [form, setform] = useState({
    auction_start_date: moment().format('YYYY-MM-DDTkk:mm'),
    auction_end_date: moment().add(3, 'days').format('YYYY-MM-DDTkk:mm'),
    planned_date: moment().add(4, 'days').format('YYYY-MM-DDTkk:mm'),
    auction_product_type: 'stockable',
    auction_type: 'free_auction',
    street: '',
    street2: '',
    city: '',
    zip: '',
    state: 'draft',
    buyer_msg: '',
    name: '',
    max_distance: 0,
    reserve_price: cart
      ? cart.length
        ? (Number(
          cart.reduce(function (accumulator, currentValue) {
            return (
              accumulator +
              Number(currentValue.quantity * currentValue.list_price)
            );
          }, 0)
        ) *
          30) /
        100
        : 0
      : 0,
    auction_products: cart
  });
  useEffect(() => {
    if (cart && cart.length > 0) {
      setform({
        ...form,
        auction_products: cart
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  const widgetsCarousels1A = {
    dots: true,
    speed: 500,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />
  };
  const [accordion, setaccordion] = useState([
    true,
    false,
    false,
    false,
    false
  ]);
  const changeHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const toggleAccordion = (tab) => {
    const prevState = [...accordion];
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    if (state.includes(true)) {
      setaccordion(state);
    } else {
      setaccordion(prevState);
    }
  };
  const getValue = () => {
    const c =
      cart &&
      cart.length &&
      cart.reduce(function (accumulator, currentValue) {
        return (
          accumulator + Number(currentValue.quantity * currentValue.list_price)
        );
      }, 0);
    return c ? c : 'N/A';
  };
  const getValueReserve = () => {
    const c =
      cart &&
      cart.length &&
      cart.reduce(function (accumulator, currentValue) {
        return (
          accumulator + Number(currentValue.quantity * currentValue.list_price)
        );
      }, 0);
    return c ? (c * 30) / 100 : 'N/A';
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (cart && cart.length > 0) {
       ;
      setform({
        ...form,
        reserve_price:
          (Number(
            cart.reduce(function (accumulator, currentValue) {
              return (
                accumulator +
                Number(currentValue.quantity * currentValue.list_price)
              );
            }, 0)
          ) *
            30) /
          100
      });
    }
    if (form.name === '') {
      return toast.error(t('newauction.Please_Enter_Auction_Name'), {
        containerId: 'B',
        transition: Zoom
      });
    } else if (form.reserve_price <= 0) {
      return toast.error(t('newauction.Please_Enter_Reserve_Price'), {
        containerId: 'B',
        transition: Zoom
      });
    } else if (form.max_distance <= 0) {
      return toast.error(t('newauction.Please_Enter_Max_Distance'), {
        containerId: 'B',
        transition: Zoom
      });
    } else if (form.buyer_msg === '') {
      return toast.error(t('newauction.Please_Enter_Your_Comment'), {
        containerId: 'B',
        transition: Zoom
      });
    } else if (!check) {
      return toast.error(t('newauction.Please Accept Terms and Conditions'), {
        containerId: 'B',
        transition: Zoom
      });
    } else if (!cart || cart.length <= 0 || form.auction_products <= 0) {
      return toast.error(t('newauction.Please_Select_Product_for_Auction'), {
        containerId: 'B',
        transition: Zoom
      });
    } else {
      await createAcution(form, history);
    }
  };
  return (
    <>
      <Row className="no-gutters px-5">
        <Col xl="5">
          <Slider
            // className="hero-wrapper bg-composed-wrapper bg-skim-blue h-100 rounded br-xl-right-0"
            {...widgetsCarousels1A}>
            <div>
              <Card className="shadow-none rounded-0 overflow-hidden">
                <div className="card-img-wrapper rounded">
                  <a
                    href="#/"
                    style={{ height: '50rem' }}
                    onClick={(e) => e.preventDefault()}
                    className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                    <div className="overlay-btn-wrapper card-body text-white text-center">
                      <h5 className="px-2 font-weight-bold display-4 mb-4"></h5>
                      <p className="font-size-lg text-white-50 mb-0">
                        {/* This admin template is a complete frontend solution for
                        easy-building applications or presentation websites.
                        It&#39;s fully responsive and designed by professional
                        UI&#x2F;UX designers and developers. */}
                      </p>
                      <div className="mt-4">
                        {/* <div className="avatar-icon-wrapper mx-auto mb-2"> */}
                        {/* <div className="avatar-icon shadow-sm-dark"> */}
                        {/* <img alt="..." src={avatar6} /> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* <div>Dalia Finney</div> */}
                      </div>
                    </div>
                    <div className="card-badges card-badges-top">
                      <Badge pill color="danger">
                        {t('newauction.Development')}
                      </Badge>
                    </div>
                  </a>
                  <img
                    src={i18n.language == 'sb' ? stock1sb : stock1}
                    className="card-overlay-image img-fit-container rounded"
                    alt="..."
                  />
                </div>
              </Card>
            </div>
            <div>
              <Card className="shadow-none rounded-0 overflow-hidden">
                <div className="card-img-wrapper rounded">
                  <a
                    href="#/"
                    style={{ height: '50rem' }}
                    onClick={(e) => e.preventDefault()}
                    className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                    <div className="overlay-btn-wrapper card-body text-white text-center">
                      <h5 className="px-2 font-weight-bold display-4 mb-4">
                        {/* Bamburgh React Admin Dashboard with Reactstrap PRO */}
                      </h5>
                      <p className="font-size-lg text-white-50 mb-0">
                        {/* This admin template is a complete frontend solution for
                        easy-building applications or presentation websites.
                        It&#39;s fully responsive and designed by professional
                        UI&#x2F;UX designers and developers. */}
                      </p>
                      <div className="mt-4">
                        {/* <div className="avatar-icon-wrapper mx-auto mb-2">
                          <div className="avatar-icon shadow-sm-dark">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div> */}
                        {/* <div>Miranda Lawson</div> */}
                      </div>
                    </div>
                    <div className="card-badges">
                      <Badge
                        pill
                        color="neutral-success"
                        className="text-success">
                        {t('newauction.Marketing')}
                      </Badge>
                    </div>
                  </a>
                  <img
                    src={i18n.language == 'sb' ? stock2sb : stock2}
                    className="card-overlay-image img-fit-container rounded"
                    alt="..."
                  />
                </div>
              </Card>
            </div>
            <div>
              <Card className="shadow-none rounded-0 overflow-hidden">
                <div className="card-img-wrapper rounded">
                  <a
                    href="#/"
                    style={{ height: '50rem' }}
                    onClick={(e) => e.preventDefault()}
                    className="img-wrapper-overlay p-4 p-xl-5 img-wrapper-overlay--visible rounded">
                    <div className="overlay-btn-wrapper card-body text-white text-center">
                      <h5 className="px-2 font-weight-bold display-4 mb-4">
                        {/* Bamburgh React Admin Dashboard with Reactstrap PRO */}
                      </h5>
                      <p className="font-size-lg text-white-50 mb-0"></p>
                      <div className="mt-4">
                        {/* <div className="avatar-icon-wrapper mx-auto mb-2">
                          <div className="avatar-icon shadow-sm-dark">
                            <img alt="..." src={avatar7} />
                          </div>
                        </div> */}
                        {/* <div>Miranda Lawson</div> */}
                      </div>
                    </div>
                    <div className="card-badges">
                      <Badge
                        pill
                        color="neutral-success"
                        className="text-success">
                        {t('newauction.Marketing')}
                      </Badge>
                    </div>
                  </a>
                  <img
                    src={i18n.language == 'sb' ? stock3sb : stock3}
                    className="card-overlay-image img-fit-container rounded"
                    alt="..."
                  />
                </div>
              </Card>
            </div>
          </Slider>
        </Col>
        <Col xl="6" className="ml-2">
          <div className="bg-white p-1 rounded h-100 rounded br-xl-right-0">
            <Container className="py-3">
              <div className="text-uppercase font-weight-bold text-primary pt-4 font-size-sm">
                {t('newauction.Product_Details')}
              </div>
            </Container>

            <div className="p-4">
              <div className="table-responsive-md">
                <Table className="table-alternate-spaced mb-0">
                  <div
                    style={{
                      height: cart && cart.length > 0 ? '300px' : '0px'
                    }}
                    className="scroll-area shadow-overflow">
                    <PerfectScrollbar options={{ wheelPropagation: false }}>
                      <div className="d-flex p-4 align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div>
                            <tbody>
                              {cart &&
                                cart.length > 0 &&
                                cart.map((c) => (
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <a
                                          href="#/"
                                          onClick={(e) => e.preventDefault()}>
                                          <img
                                            alt="..."
                                            className="hover-scale-lg rounded-sm"
                                            src={c.main_image_link}
                                            style={{ width: 90 }}
                                          />
                                        </a>
                                        <div className="pl-3">
                                          <a
                                            href="#/"
                                            onClick={(e) => e.preventDefault()}
                                            className="font-weight-bold text-black"
                                            title="...">
                                            {c.name}
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center text-black-50">
                                      <FormGroup>
                                        <Input
                                          style={{ width: 100 }}
                                          type="number"
                                          name=""
                                          id=""
                                          value={c.quantity}
                                          onChange={(e) => {
                                            let settingCart = cart.map((ct) => {
                                              if (ct._id === c._id) {
                                                ct.quantity = e.target.value;
                                              }
                                              return ct;
                                            });
                                            updateCartOption(settingCart);
                                          }}
                                          placeholder="Quantity"
                                        />
                                      </FormGroup>
                                    </td>
                                    <td className="font-size-lg font-weight-bold">
                                      <small>₹</small>
                                      <span>
                                        {c.quantity * c.list_price
                                          ? c.quantity * c.list_price
                                          : 'N/A'}
                                      </span>
                                    </td>
                                    <td className="text-right">
                                      <Button
                                        color="danger"
                                        onClick={() => {
                                          removeFromCart(c);
                                        }}
                                        className="mx-1 rounded-sm shadow-none hover-scale-sm d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon
                                          icon={['fas', 'times']}
                                          className="font-size-sm"
                                        />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </div>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                </Table>
              </div>
            </div>
            <div className="accordion">
              <Card
                className={clsx('card-box', {
                  'panel-open': true
                })}>
                <Card>
                  <CardHeader>
                    <div className="panel-title">
                      <div className="accordion-toggle">
                        <Button
                          color="link"
                          size="lg"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: '#132a4f',
                            borderColor: '#fe9901',
                            color: 'white'
                          }}
                          className="d-flex align-items-center justify-content-between"
                          aria-expanded={true}>
                          <span>
                            <b>{t('newauction.Auction Type')}</b>
                          </span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="font-size-xl accordion-icon"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={true}>
                    <ListGroup flush>
                      <ListGroupItem className="py-4">
                        <Container>
                          <Row>
                            <Col md="4">
                              <CustomInput
                                type="checkbox"
                                id="cb-1"
                                onChange={(e) => {
                                  setform({
                                    ...form,
                                    auction_type: 'free_auction'
                                  });
                                }}
                                checked={
                                  form.auction_type === 'free_auction'
                                    ? true
                                    : false
                                }
                                label="Standard Auction"
                                className="m-2 align-self-center"
                              />
                            </Col>
                            <Col md="4">
                              <CustomInput
                                type="checkbox"
                                id="cb-2"
                                checked={
                                  form.auction_type === 'prime_auction'
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  setform({
                                    ...form,
                                    auction_type: 'prime_auction'
                                  });
                                }}
                                label="Prime Auction"
                                className="m-2 align-self-center"
                              />
                            </Col>
                            <Col md="4">
                              <CustomInput
                                type="checkbox"
                                checked={
                                  form.auction_type === 'group_auction'
                                    ? true
                                    : false
                                }
                                id="cb-3"
                                onChange={(e) => {
                                  setform({
                                    ...form,
                                    auction_type: 'group_auction'
                                  });
                                }}
                                label="Group Auction"
                                className="m-2 align-self-center"
                              />
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </ListGroup>
                  </Collapse>
                </Card>
              </Card>
              <Card
                className={clsx('card-box', {
                  'panel-open': accordion[0]
                })}>
                <Card>
                  <CardHeader>
                    <div className="panel-title">
                      <div className="accordion-toggle">
                        <Button
                          color="link"
                          size="lg"
                          style={{
                            borderRadius: '12px',

                            backgroundColor: '#132a4f',
                            borderColor: '#fe9901',
                            color: 'white'
                          }}
                          className="d-flex align-items-center justify-content-between"
                          onClick={() => toggleAccordion(0)}
                          aria-expanded={accordion[0]}>
                          <span>
                            <b>{t('newauction.Auction_Info')}</b>
                          </span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="font-size-xl accordion-icon"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={accordion[0]}>
                    <ListGroup flush>
                      <ListGroupItem className="py-4">
                        <Container>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Name')}
                                </Label>
                                <Input
                                  name="name"
                                  type="text"
                                  value={form.name}
                                  onChange={changeHandler}
                                  placeholder={t('newauction.Name') + '...'}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Type')}
                                </Label>
                                <Input
                                  name="auction_product_type"
                                  value={form.auction_product_type}
                                  type="text"
                                  onChange={changeHandler}
                                  placeholder={t('newauction.Type') + '...'}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Total_Price')}
                                </Label>
                                <Input
                                  value={getValue()}
                                  disabled={true}
                                  type="text"
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Reserve_Price')}
                                </Label>
                                <Input
                                  type="text"
                                  name="reserve_price"
                                  disabled={true}
                                  value={getValueReserve()}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </ListGroup>
                  </Collapse>
                </Card>
              </Card>
              <Card
                className={clsx('card-box', {
                  'panel-open': accordion[1]
                })}>
                <Card>
                  <CardHeader>
                    <div className="panel-title">
                      <div className="accordion-toggle">
                        <Button
                          color="link"
                          size="lg"
                          style={{
                            borderRadius: '12px',

                            backgroundColor: '#132a4f',
                            borderColor: '#fe9901',
                            color: 'white'
                          }}
                          className="d-flex align-items-center justify-content-between"
                          onClick={() => toggleAccordion(1)}
                          aria-expanded={accordion[1]}>
                          <span>
                            <b>{t('newauction.Proximity_Delivery')}</b>{' '}
                          </span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="font-size-xl accordion-icon"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={accordion[1]}>
                    <ListGroup flush>
                      <ListGroupItem className="py-4">
                        <Container>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Auction_Start_Date_Time')}
                                </Label>
                                <Input
                                  type="datetime-local"
                                  name="auction_start_date"
                                  value={form.auction_start_date}
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Auction_End_Date_Time')}
                                </Label>
                                <Input
                                  type="datetime-local"
                                  name="auction_end_date"
                                  value={form.auction_end_date}
                                  onChange={changeHandler}
                                  placeholder="Auc. End Date..."
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Planned_Delivery_Date_Time')}
                                </Label>
                                <Input
                                  type="datetime-local"
                                  name="planned_date"
                                  value={form.planned_date}
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Maximum_Distance')}
                                </Label>
                                <Input
                                  type="Number"
                                  name="max_distance"
                                  value={form.max_distance}
                                  onChange={changeHandler}
                                  placeholder={
                                    t('newauction.Maximum_Distance') + '...'
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </ListGroup>
                  </Collapse>
                </Card>
              </Card>
              <Card
                className={clsx('card-box', {
                  'panel-open': accordion[2]
                })}>
                <Card>
                  <CardHeader>
                    <div className="panel-title">
                      <div className="accordion-toggle">
                        <Button
                          color="link"
                          size="lg"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: '#132a4f',
                            borderColor: '#fe9901',
                            color: 'white'
                          }}
                          className="d-flex align-items-center justify-content-between"
                          onClick={() => toggleAccordion(2)}
                          aria-expanded={accordion[2]}>
                          <span>
                            <b>
                              {t('newauction.Special_Requirements_or_Comments')}
                            </b>
                          </span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="font-size-xl accordion-icon"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={accordion[2]}>
                    <ListGroup flush>
                      <ListGroupItem className="py-4">
                        <Container>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <Input
                                  style={{ width: '100%' }}
                                  type="textarea"
                                  name="buyer_msg"
                                  value={form.buyer_msg}
                                  onChange={changeHandler}
                                  row={3}
                                  id="exampleText"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </ListGroup>
                  </Collapse>
                </Card>
              </Card>
              <Card
                className={clsx('card-box', {
                  'panel-open': accordion[3]
                })}>
                <Card>
                  <CardHeader>
                    <div className="panel-title">
                      <div className="accordion-toggle">
                        <Button
                          color="link"
                          size="lg"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: '#132a4f',
                            borderColor: '#fe9901',
                            color: 'white'
                          }}
                          className="d-flex align-items-center justify-content-between"
                          onClick={() => toggleAccordion(3)}
                          aria-expanded={accordion[3]}>
                          <span>
                            <b>{t('newauction.Shipping_Address')}</b>
                          </span>
                          <FontAwesomeIcon
                            icon={['fas', 'angle-up']}
                            className="font-size-xl accordion-icon"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={accordion[3]}>
                    <ListGroup flush>
                      <ListGroupItem className="py-4">
                        <Container>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <FormGroup>
                                  <Label className="font-weight-bold" for="">
                                    {t('newauction.Address1')}
                                  </Label>
                                  <Input
                                    type="text"
                                    name="street"
                                    placeholder={
                                      t('newauction.Address1') + '...'
                                    }
                                    onChange={changeHandler}
                                  />
                                </FormGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Address2')}
                                </Label>

                                <Input
                                  type="text"
                                  name="street2"
                                  placeholder={t('newauction.Address2') + '...'}
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Address3')}{' '}
                                </Label>

                                <Input
                                  type="text"
                                  placeholder={t('newauction.Address3') + '...'}
                                // onChange={changeHandler}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.City')}
                                </Label>
                                <Input
                                  name="city"
                                  type="text"
                                  placeholder={t('newauction.City') + '...'}
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.State')}
                                </Label>
                                <Input
                                  type="text"
                                  placeholder={t('newauction.State') + '...'}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Country')}
                                </Label>
                                <Input
                                  type="text"
                                  placeholder={t('newauction.Country') + '...'}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label className="font-weight-bold" for="">
                                  {t('newauction.Pin_Code')}
                                </Label>
                                <Input
                                  name="zip"
                                  type="Number"
                                  placeholder={t('newauction.Pin_Code') + '...'}
                                  onChange={changeHandler}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </ListGroup>
                  </Collapse>
                </Card>
              </Card>

              <div className="divider mt-5 mb-4" />
              <Container>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        <b>1.</b> {t('newauction.note1')}
                      </Label>
                      <br />
                      <Label>
                        <b>2.</b> {t('newauction.note2')}
                      </Label>
                      <br />
                      <Label>
                        <b>3.</b> {t('newauction.note3')}
                      </Label>
                      <br />
                      <Label>
                        <b>4.</b> {t('newauction.note4')}
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <CustomInput
                      type="checkbox"
                      className="text-red"
                      id="cb-4"
                      onChange={(e) => {
                         ;
                        if (!check) {
                          setcheck(!check);
                        }
                      }}
                      label={t('newauction.I_accept_the_Terms_Conditions')}
                      checked={check}
                      inline
                    />
                  </Col>
                </Row>
              </Container>
              <div className="text-right">
                <Button
                  onClick={onSubmit}
                  className=" text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm ml-3 btn btn-primary"
                  style={{
                    borderRadius: 50,
                    backgroundColor: '#fe9901',
                    color: '#3b3e66'
                  }}
                  color="dark">
                  {t('newauction.Create_Auction')}
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="no-gutters px-5">
        <Col
          className="mt-2"
          md={{
            offset: 10
          }}></Col>
      </Row>
    </>
  );
}
const mapStateToProps = (state) => ({
  cart: state.appReducer.cart,
  isAuth: state.appReducer.isAuth,
  user: state.appReducer.user
});
export default connect(mapStateToProps, {
  getCart,
  removeFromCart,
  updateCartOption,
  createAcution
})(LivePreviewExample);

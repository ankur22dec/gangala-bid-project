/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import { getSingleAuction, uploadProfile } from '../../../Action/appAction';

function DetailAuction() {
  const dispatch = useDispatch();
  const params = useParams();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.appReducer.user);
  const isAuth = useSelector((state) => state.appReducer.isAuth);
  const singleAuction = useSelector((state) => state.appReducer.singleAuction);
  const auction = useSelector((state) => state.appReducer.auction);
  const [blocking, setblocking] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState(user && user.name);
  const toggleEditModal = () => setEditModal(!editModal);
  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      let form = new FormData();
      setblocking(true);
      form.append('image', acceptedFiles[0]);
      for (var pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      await dispatch(uploadProfile(form));
      setblocking(false);
    }
  });
  useEffect(() => {
    const runAction = async () => {
      setblocking(true);
      await dispatch(await getSingleAuction(params.id));
      setblocking(false);
    };
    runAction();
  }, [dispatch, params.id]);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <BlockUi
      style={{ flexDirection: 'column' }}
      className="app-inner-content-layout"
      tag="div"
      blocking={blocking}
      loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
      <Row className="bg-white p-5">
        <Col md="12">
          <h4 className="app-page-title--heading">Auction Details</h4>

          <Container>
            <Row className="bg-white p-4">
              <Col md="6">
                <label>{t('userprofile.Created By')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.partner_id.name}
                </p>
                <hr />
                <label>{t('userprofile.Auction Type')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.auction_type}
                </p>
                <hr />

                <label>{t('userprofile.Auction Start Date')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.auction_start_date}
                </p>

                {/* <p style={{ fontWeight: 'bold' }}>{user.email}</p> */}
                <hr />

                <label>{t('userprofile.Reserved Price')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.reserve_price}
                </p>

                {/* <p style={{ fontWeight: 'bold' }}>{user.email}</p> */}
                <hr />

                <label>{t('userprofile.Product Type')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.auction_product_type}
                </p>

                {/* <p style={{ fontWeight: 'bold' }}>{user.email}</p> */}
              </Col>
              <Col md="6">
                <label>{t('userprofile.Planned Delivery')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.planned_date}
                </p>
                {/* <p style={{ fontWeight: 'bold' }}>{user.name}</p> */}
                <hr />
                <label>{t('userprofile.Auction End Date')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.auction_end_date}
                </p>
                {/* <p style={{ fontWeight: 'bold' }}>{user.email}</p> */}
                <hr />
                <label>{t('userprofile.Total Price')}</label>
                <p style={{ fontWeight: 'bold' }}>
                  {singleAuction && singleAuction.auction_end_date}
                </p>
                <hr />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="bg-white p-5">
        <Col md="12">
          <h4 className="app-page-title--heading">Other Details</h4>

          <Container>
            <Row className="bg-white p-4">
              <Col md="6">
                <label>{t('userprofile.Hide Sellers Bid')}</label>
                {/* <p style={{ fontWeight: 'bold' }}>{user.name}</p> */}
                <hr />
                <label>{t('userprofile.Jumbo Auction')}</label>
                {/* <p style={{ fontWeight: 'bold' }}>{user.email}</p> */}
              </Col>
              <Col md="6">
                <label>{t('userprofile.Unlock Bids')}</label>
                {/* <p style={{ fontWeight: 'bold' }}>{user.name}</p> */}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md="12">
          <Container>
            <div className="nav-tabs-primary mb-4 tabs-animated tabs-animated-shadow">
              <Nav tabs>
                <NavItem>
                  <Button
                    style={{
                      zIndex: 1000000000000000000000000000000,
                      backgroundColor: activeTab === '1' && '#fe9901',
                      color: '#3b3e66'
                    }}
                    className={clsx({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}>
                    <span className="font-weight-bold text-uppercase font-size-sm">
                      {t('userprofile.Products')}
                    </span>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    style={{
                      zIndex: 1000000000000000000000000000000,
                      backgroundColor: activeTab === '2' && '#fe9901',
                      color: '#3b3e66'
                    }}
                    className={clsx({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}>
                    <span className="font-weight-bold text-uppercase font-size-sm">
                      {t('userprofile.Bidders')}
                    </span>
                  </Button>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Card className="shadow-xxl">
                  <div className="p-4">
                    <div className="table-responsive-md">
                      <Table className="table-alternate-spaced mb-0">
                        <thead>
                          <tr>
                            <th
                              style={{ width: '300px' }}
                              className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                              scope="col">
                              {t('userprofile.Product')}
                            </th>
                            <th
                              className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                              scope="col">
                              {t('userprofile.Price')}
                            </th>
                            <th
                              className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                              scope="col">
                              {t('userprofile.Quantity')}
                            </th>
                            <th
                              className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                              scope="col">
                              {t('userprofile.Subtotal')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleAuction &&
                            singleAuction.auction_products.map((a) => (
                              <>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <span className="text-black-50 d-block">
                                          {a.product_id.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span>{a.lst_price}</span>
                                  </td>
                                  <td>
                                    <span>{a.product_quantity}</span>
                                  </td>
                                  <td>
                                    <span>
                                      <span>{a.sub_total}</span>
                                    </span>
                                  </td>
                                </tr>
                                <tr className="divider"></tr>
                              </>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Card>
              </TabPane>
            </TabContent>
          </Container>
        </Col>
      </Row>
    </BlockUi>
  );
}

export default DetailAuction;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { DotLoader } from 'react-spinners';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  Row,
  TabContent,
  Table,
  TabPane
} from 'reactstrap';
import {
  getAuction,
  updateUser,
  updateUserAddressId,
  uploadProfile,
  adduserAddress,
  getuserAddress,
  editUserAddress
} from '../../Action/appAction';

function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [addressState, setAddressState] = useState('new');
  const user = useSelector((state) => state.appReducer.user);
  const address = useSelector((state) => state.appReducer.address);
  const isAuth = useSelector((state) => state.appReducer.isAuth);
  const auction = useSelector((state) => state.appReducer.auction);
  const [blocking, setblocking] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [name, setName] = useState(user && user.name);
  const [address1, setAddress1] = useState(user && user.address1);
  const [address2, setAddress2] = useState(user && user.address2);
  const [address3, setAddress3] = useState(user && user.address3);
  const [city, setCity] = useState(user && user.city);
  const [state, setState] = useState(user && user.state);
  const [country, setCountry] = useState(user && user.country);
  const [pincode, setPincode] = useState(user && user.pincode);
  const toggleEditModal = () => setEditModal(!editModal);
  const toggleEditAddress = () => setEditAddress(!editAddress);
  const [addressId, setAddressId] = useState("");
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
      await dispatch(await getAuction());
      setblocking(false);
    };
    if (user && user._id) {
      setName(user.name);
    }
    runAction();
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(getuserAddress());
  }, [false]);

  const updateAddressIdInDb = (id) => {
    dispatch(updateUserAddressId(id));
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const updateUserWithRedux = async () => {
    dispatch(updateUser(name, user._id));
    setEditModal(false);
  };
  // const addAddressWithRedux = async () => {
  //   dispatch(addAddress(name, user._id));
  //   setEditModal(false);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (address1 == "") {
      alert("Please enter address 1")
    } else if (address2 == "") {
      alert("Please enter address 2")
    } else if (address3 == "") {
      alert("Please enter address 3")
    } else if (city == "") {
      alert("Please enter city");
    } else if (state == "") {
      alert("Please enter state");
    } else if (country == "") {
      alert("Please enter country");
    } else if (pincode == "") {
      alert("Please enter pincode");
    } else {
      let obj = {
        address1: address1,
        address2: address2,
        address3: address3,
        city: city,
        state: state,
        country: country,
        pincode: pincode
      };
      if (addressState == "new") {
        dispatch(adduserAddress(obj));
        toggleEditAddress()
      } else {
        obj.addressId = addressId;
        dispatch(editUserAddress(obj));
        toggleEditAddress()
      }
    }
  }
  if (user && user._id) {
    return (
      <BlockUi
        style={{ flexDirection: 'column' }}
        className="app-inner-content-layout"
        tag="div"
        blocking={blocking}
        loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
        <Row>
          <Col md="12">
            <Container>
              <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Profile</ModalHeader>
                <ModalBody>
                  <div>
                    <label>{t('userprofile.Name')}</label>
                    <input
                      type="text"
                      placeholder={t('userprofile.Enter_Name_Here')}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="form-control"
                    />
                    <label>{t('userprofile.Email')}</label>
                    <input
                      type="email"
                      placeholder={t('Enter_Email_Here')}
                      value={user.email}
                      className="form-control"
                      disabled
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => updateUserWithRedux()}>
                    {t('userprofile.Update')}
                  </Button>{' '}
                  <Button color="secondary" onClick={toggleEditModal}>
                    {t('userprofile.Cancel')}
                  </Button>
                </ModalFooter>
              </Modal>
              <Modal isOpen={editAddress} toggle={toggleEditAddress}>
                <ModalHeader toggle={toggleEditAddress}>
                  Edit Profile
                </ModalHeader>
                <ModalBody>
                  <div>
                    <label>{t('userprofile.ENTER_ADDRESS1')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter ADDRESS1')}
                      onChange={(e) => setAddress1(e.target.value)}
                      value={address1}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_ADDRESS2')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter ADDRESS2')}
                      onChange={(e) => setAddress2(e.target.value)}
                      value={address2}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_ADDRESS3')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter ADDRESS3')}
                      onChange={(e) => setAddress3(e.target.value)}
                      value={address3}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_CITY')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter CITY')}
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_STATE')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter STATE')}
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_COUNTRY')}</label>
                    <input
                      type="text"
                      placeholder={t('Enter COUNTRY')}
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      className="form-control"
                    />
                    <label>{t('userprofile.ENTER_PINCODE')}</label>
                    <input
                      type="number"
                      placeholder={t('Enter PINCODE')}
                      onChange={(e) => setPincode(e.target.value)}
                      value={pincode}
                      className="form-control"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={(e) => onSubmit(e)}>
                    {addressState == "new" ? t('Add Address') : t('Update Address')}

                  </Button>{' '}
                  <Button color="secondary" onClick={toggleEditAddress}>
                    {t('userprofile.Cancel')}
                  </Button>
                </ModalFooter>
              </Modal>
              <Row>
                <Col md="4">
                  <div
                    {...getRootProps({
                      className: 'dropzone-upload-wrapper'
                    })}>
                    <input {...getInputProps()} />
                    <div
                      style={{ width: 200, height: 200, position: 'relative' }}>
                      <img
                        src={
                          user.profile
                            ? user.profile
                            : 'https://www.dranneede.nl/assets/images/trainers/geenfoto.png'
                        }
                        className="rounded img-thumbnail"
                        style={{ width: 200, height: 200 }}
                      />
                      <Button
                        color="link"
                        onClick={open}
                        style={{ position: 'absolute', bottom: 20 }}
                        className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                        <Upload className="d-20" />
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col md="8" className="bg-white p-4">
                  <label>{t('userprofile.Name')}</label>
                  <p style={{ fontWeight: 'bold' }}>{user.name}</p>
                  <hr />
                  <label>{t('userprofile.Email')}</label>
                  <p style={{ fontWeight: 'bold' }}>{user.email}</p>
                </Col>
              </Row>

              <Row>
                <Col md="12" className="text-right mt-3">
                  <Button
                    color="success"
                    onClick={() => toggleEditModal()}
                    className="text-uppercase font-weight-bold font-size-xs text-right">
                    {t('userprofile.Edit_Profile')}
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    color="success"
                    onClick={() => {
                      toggleEditAddress();
                      setAddressState('new');
                      setAddress1("")
                      setAddress2("")
                      setAddress3("")
                      setCity("")
                      setState("")
                      setCountry("")
                      setPincode("")
                    }}
                    className="text-uppercase font-weight-bold font-size-xs text-right">
                    {t('userprofile.Add_address')}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row>
          <Container>
            <Row>
              <Col md="12">
                <h5>User Address</h5>
              </Col>
            </Row>
            <Row>
              {address.map((a, key) => {
                return (
                  <Col md="3" key={key}>
                    <div
                      className="p-3"
                      style={{
                        backgroundColor:
                          user.primaryAddressId == a._id ? '#fe9901' : 'white'
                      }}>
                      <div className="text-right">
                        {user.primaryAddressId != a._id ? (
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                              updateAddressIdInDb(a._id);
                            }}
                            className="text-warning"
                            style={{ fontSize: 10 }}>
                            Make Default
                          </a>
                        ) : (
                          <span className="text-light" style={{ fontSize: 10 }}>
                            Default Address
                          </span>
                        )}
                      </div>
                      {a.address1}, &nbsp;
                      {a.address2}, &nbsp;
                      {a.address3}, &nbsp;
                      {a.city}, &nbsp;
                      {a.state}, &nbsp;
                      {a.country}, &nbsp;
                      {a.pincode}
                      <div className="text-right">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleEditAddress();
                            setAddressState('edit');
                            setAddress1(a.address1)
                            setAddress2(a.address2)
                            setAddress3(a.address3)
                            setCity(a.city)
                            setState(a.state)
                            setCountry(a.country)
                            setPincode(a.pincode)
                            setAddressId(a._id)
                          }}
                          className="text-danger"
                          style={{ fontSize: 12 }}>
                          Edit
                        </a>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Row>
        <Row>
          <Col md="12">
            <Container>
              <div className="nav-tabs-primary mb-4 tabs-animated tabs-animated-shadow">
                <Nav tabs>
                  <NavItem>
                    <Button
                      style={{
                        zIndex: 1000000000000000000000000000000,
                        backgroundColor: '#fe9901',
                        color: '#3b3e66'
                      }}
                      className={clsx({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}>
                      <span className="font-weight-bold text-uppercase font-size-sm">
                        {t('userprofile.User_Auctions')}
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
                                {t('userprofile.Auction')}
                              </th>
                              <th
                                className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                                scope="col">
                                {t('userprofile.Delivery_Planned_Date')}
                              </th>
                              <th
                                className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                                scope="col">
                                {t('userprofile.State')}
                              </th>
                              <th
                                className="font-size-lg font-weight-normal pb-4 text-capitalize text-dark"
                                scope="col">
                                {t('userprofile.View_Details')}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {auction.map((a) => (
                              <>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div
                                        onClick={() => {
                                          history.push(
                                            `/AuctionDetail/${a.id}`
                                          );
                                        }}>
                                        <span className="text-black-50 d-block">
                                          {a.name}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span>
                                      {moment(a.planned_date).format(
                                        'YYYY-MM-DD'
                                      )}
                                    </span>
                                  </td>
                                  <td>
                                    <span>{a.state}</span>
                                  </td>
                                  <td>
                                    <span>
                                      <a
                                        className=" text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm ml-3 btn btn-primary"
                                        style={{
                                          borderRadius: 50,
                                          backgroundColor: '#fe9901',
                                          color: '#3b3e66'
                                        }}
                                        href={a.wk_reverse_auction_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="dark">
                                        View Details
                                      </a>
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
  } else {
    return <div>{t('userprofile.You_are_not_authorised')}</div>;
  }
}

export default UserProfile;

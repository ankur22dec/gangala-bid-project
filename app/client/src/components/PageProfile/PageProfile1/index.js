/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlockUi from 'react-block-ui';
import { Row, Col, Card, Container, Nav, NavItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink as NavLinkStrap } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import { DotLoader } from 'react-spinners';
import hero1 from '../../../assets/images/hero-bg/hero-8.jpg';
import { Upload, Check, X, User } from 'react-feather';
import { uploadProfile, getSellerProduct } from '../../../Action/appAction';
import parse from 'html-react-parser';

import CreateProdeuct from './components/CreateProductModel';
// import people3 from '../../../assets/images/stock-photos/people-3.jpg';
// import people2 from '../../../assets/images/stock-photos/people-2.jpg';

// import avatar1 from '../../../assets/images/avatars/avatar1.jpg';
// import avatar2 from '../../../assets/images/avatars/avatar2.jpg';
// import avatar3 from '../../../assets/images/avatars/avatar3.jpg';
// import avatar4 from '../../../assets/images/avatars/avatar4.jpg';
// import avatar5 from '../../../assets/images/avatars/avatar5.jpg';
// import avatar6 from '../../../assets/images/avatars/avatar6.jpg';
// import avatar7 from '../../../assets/images/avatars/avatar7.jpg';

function LivePreviewExample({
  user,
  uploadProfile,
  getSellerProduct,
  sellerProduct
}) {
  useEffect(() => {
    const runAction = async () => {
      setblocking(true);
      await getSellerProduct();
      setblocking(false);
    };
    runAction();
  }, []);
  const [inputBg, setInputBg] = useState(false);
  const toggleInputBg = () => setInputBg(!inputBg);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [blocking, setblocking] = useState(false);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab2, setActiveTab2] = useState('1');

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    getRootProps,
    getInputProps
  } = useDropzone({
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
      await uploadProfile(form);
      setblocking(false);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file, i) => (
    <div
      key={i}
      className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
      <img
        className="img-fluid img-fit-container rounded-sm"
        src={file.preview}
        alt="..."
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <BlockUi
      className="app-inner-content-layout"
      tag="div"
      blocking={blocking}
      loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
      <div className="app-inner-content-layout--main bg-white p-0">
        <div className="hero-wrapper mx-5 rounded-bottom shadow-xxl bg-composed-wrapper bg-second">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-3"
              style={{ backgroundImage: 'url(' + hero1 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-deep-sky opacity-4" />
            <div className="bg-composed-wrapper--content px-3 pt-5">
              <Container className="pt-4">
                <div className="d-block d-md-flex align-items-start">
                  <div className="dropzone rounded-circle shadow-sm-dark mr-md-3">
                    <div
                      {...getRootProps({
                        className: 'dropzone-upload-wrapper'
                      })}>
                      <input {...getInputProps()} />
                      <div className="dropzone-inner-wrapper d-140 rounded-circle dropzone-avatar">
                        <div className="avatar-icon-wrapper d-140 rounded-circle m-2">
                          <Button
                            color="link"
                            onClick={open}
                            className="avatar-button badge shadow-sm-dark btn-icon badge-position badge-position--bottom-right border-2 text-indent-0 d-40 badge-circle badge-first text-white">
                            <Upload className="d-20" />
                          </Button>

                          <div>
                            {isDragAccept && (
                              <div className="rounded-circle overflow-hidden d-140 bg-success text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                <Check className="d-40" />
                              </div>
                            )}
                            {isDragReject && (
                              <div className="rounded-circle overflow-hidden d-140 bg-danger text-center font-weight-bold text-white d-flex justify-content-center align-items-center">
                                <X className="d-60" />
                              </div>
                            )}
                            {!isDragActive && (
                              <div className="rounded-circle overflow-hidden d-140 bg-second text-center font-weight-bold text-white-50 d-flex justify-content-center align-items-center">
                                <User className="d-50" />
                              </div>
                            )}
                          </div>
                          {user && user.profile ? (
                            <div className="rounded-circle avatar-image overflow-hidden d-140 bg-neutral-success text-center font-weight-bold text-success d-flex justify-content-center align-items-center">
                              <img
                                className="img-fluid img-fit-container rounded-sm"
                                src={user.profile}
                                alt="..."
                              />
                            </div>
                          ) : (
                            thumbs.length > 0 && <div>{thumbs}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text-white flex-column pl-md-2">
                    <div className="d-block d-md-flex align-items-center">
                      <div className="my-3 my-md-0">
                        <div className="d-flex align-items-end">
                          <div className="font-size-xxl font-weight-bold">
                            {`@${user && user.email}`}
                          </div>
                        </div>
                        <div className="font-weight-bold mt-1 font-size-lg text-white-50">
                          {user && user.name}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Button
                          size="sm"
                          color="first"
                          className="mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                          <FontAwesomeIcon
                            size="2x"
                            icon={['fab', 'whatsapp']}
                          />
                        </Button>
                        <Button
                          size="sm"
                          color="first"
                          className="mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                          <FontAwesomeIcon
                            size="2x"
                            icon={['fab', 'facebook']}
                          />
                        </Button>
                        <Button
                          onClick={toggleModal}
                          className="px-5 font-size-sm shadow-sm-dark py-3 btn-pill mx-2"
                          color="success">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </span>
                          <span className="btn-wrapper--label">
                            Create Product
                          </span>
                        </Button>
                        <CreateProdeuct
                          modal={modal}
                          setblocking={setblocking}
                          setModal={setModal}
                          toggleModal={toggleModal}
                          value={value}
                          setValue={setValue}
                        />
                      </div>
                    </div>
                    <div className="d-flex font-size-xl py-4 align-items-center">
                      <div className="mr-2">
                        {sellerProduct && sellerProduct.length}
                        <span className="font-size-sm text-white-50">
                          Assets
                        </span>
                      </div>
                    </div>
                    <div className="font-size-lg">
                      This admin template is a complete frontend solution for
                      easy-building applications or presentation websites.
                      It&#39;s fully responsive and designed by professional
                      UI&#x2F;UX designers and developers.
                    </div>
                  </div>
                </div>
                <div className="my-5 nav-tabs-success tabs-animated tabs-animated-shadow">
                  <Nav tabs className="justify-content-center">
                    <NavItem className="px-3">
                      <NavLinkStrap
                        className={clsx('bg-white-10 m-3 m-lg-0 rounded-lg', {
                          active: activeTab2 === '1'
                        })}
                        onClick={() => {
                          toggle2('1');
                        }}>
                        <span className="font-size-lg text-white px-2 py-1">
                          HomePage
                        </span>
                        <div className="divider" />
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </div>
              </Container>
            </div>
          </div>
        </div>
        <Container className="z-over py-5">
          <Row className="pb-5">
            {sellerProduct &&
              sellerProduct.map((p) => (
                <Col lg="4">
                  <Card className="card-box text-center mb-5">
                    <Card className="card-transparent mx-auto hover-scale-sm mt-3">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper card-box-hover rounded">
                        <img
                          alt="..."
                          className="card-img-top rounded-sm"
                          src={p.image_1920.length > 0 && p.image_1920[0]}
                          style={{ width: 100 }}
                        />
                      </a>
                    </Card>
                    <div className="card-header-alt d-flex flex-column justify-content-center p-3">
                      <h6 className="font-weight-bold font-size-lg mb-2 text-black">
                        {p.name}
                      </h6>
                      <p className="text-black-50 font-size-sm mb-0">
                        {parse(p.description_picking)}
                      </p>
                    </div>

                    <div className="pb-3">
                      <div className="badge badge-neutral-primary text-primary badge-pill font-weight-normal font-size-sm font-weight-bold h-auto py-2 px-3">
                        {`$${p.list_price}`}
                      </div>
                    </div>

                    <div className="divider w-50 mx-auto" />

                    <div className="divider w-50 mx-auto" />

                    <div className="py-3">
                      <Button
                        color="success"
                        className="text-uppercase font-weight-bold font-size-xs">
                        Edit
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </BlockUi>
  );
}
const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  sellerProduct: state.appReducer.sellerProduct
});
export default connect(mapStateToProps, { uploadProfile, getSellerProduct })(
  LivePreviewExample
);

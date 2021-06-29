import clsx from 'clsx';
import React, { useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import { connect, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Modal,
  NavItem,
  NavLink as NavLinkStrap,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  logoutUser,
  registerModal,
  registerUser
} from '../../../Action/appAction';
import { setSidebarToggleMobile } from '../../../reducers/ThemeOptions';

import projectLogo from '../../../assets/images/Logo Gangala mediano.png';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

function LivePreviewExample({
  registerUser,
  auth,
  logoutUser,
  country,
  registerModalState,
  registerModal,
  sidebarToggleMobile,
  headerShadow,
  headerBgTransparent
}) {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // const [loginModal, setLoginModal] = useState(registerModalState);
  const toggleLogin = () => registerModal(false);

  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);
  const toggleButton = () => setOpen(!dropdownOpen);
  const [form, setform] = useState({
    name: '',
    username: '',
    password: ''
  });
  const onChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    setform({
      name: '',
      username: '',
      password: ''
    });
    registerModal(false);
    history.push('/homepage');
  };
  const toggleSidebarMobile = () => {
    dispatch(setSidebarToggleMobile(!sidebarToggleMobile));
  };
  return (
    <>
      <div className="bg-white shadow-xxl flex-column header-nav-wrapper navbar-light">
        <Container className="header-top-section pt-2 d-none">
          <div className="d-flex header-nav-menu justify-content-between align-items-center navbar-dark">
            <ul className="d-flex">
              <li className="ml-0">
                {/* <Button
                  color="link"
                  className="rounded-sm d-30 p-0 btn-icon btn-transition-none"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['fas', 'user']}
                      className="font-size-sm"
                    />
                  </span>
                </Button> */}
              </li>
              <li>
                {/* <Button
                  color="link"
                  className="rounded-sm d-30 p-0 btn-icon btn-transition-none"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon
                      icon={['far', 'bell']}
                      className="font-size-sm"
                    />
                  </span>
                </Button> */}
              </li>
            </ul>
            <ul className="d-flex">
              {/* <li style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={['fas', 'shopping-cart']}>
                  <Badge color="secondary">4</Badge>
                </FontAwesomeIcon>
              </li> */}
              <li>
                {country && (
                  <NavItem>
                    {/* <ButtonDropdown isOpen={dropdownOpen} toggle={toggleButton}>
                      <DropdownToggle caret>
                        {i18n.language.toUpperCase()}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => i18n.changeLanguage("en")}
                        >English</DropdownItem>
                        <DropdownItem
                          onClick={() => i18n.changeLanguage("sb")}
                        >Spanish</DropdownItem>
                        <DropdownItem
                          onClick={() => i18n.changeLanguage("pt")}
                        >Portuguese</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown> */}
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-3 d-flex align-items-center">
                      <span className="mr-3">
                        <FlagIcon code={country.country_code} size={28} />
                      </span>
                      {country.country_name}
                    </NavLinkStrap>
                  </NavItem>
                )}
              </li>
              {!auth && (
                <li className="mr-0">
                  <NavLink
                    className="rounded-sm py-1 px-3 font-size-xs text-uppercase"
                    to="/PageLoginIllustration">
                    {t('header.Login')}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="divider mt-2" />
        </Container>
        <Container className="py-4">
          <div
            className={clsx('app-header', {
              // 'app-header--shadow': headerShadow,
              'app-header--opacity-bg': headerBgTransparent
            })}>
            <div className="app-header--pane">
              <button
                className={clsx(
                  'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
                  { 'is-active': sidebarToggleMobile }
                )}
                onClick={toggleSidebarMobile}>
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
          <div className="app-nav-logo flex-grow-0">
            <NavLink
              to="/Homepage"
              title="Gangala"
              className="app-nav-logo app-nav-logo--dark">
              <div className="">
                <img
                  alt="Gangala"
                  src={projectLogo}
                  style={{ width: '250px' }}
                />
              </div>
            </NavLink>
          </div>
          <div className="header-nav-menu flex-grow-0 ml-auto d-none d-lg-block">
            <ul className="d-flex justify-content-center">
              <li>
                <NavLink
                  to="/Homepage"
                  className="font-weight-bold rounded py-2 text-primary font-size-md px-3">
                  {t('header.Home')}
                </NavLink>
              </li>
              <li>
                <a
                  href="https://portal.gangala.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-weight-bold rounded py-2 text-primary font-size-md px-3">
                  {t('header.Portal')}
                </a>
              </li>
              <li>
                <NavLink
                  to="/Shop/1"
                  className="font-weight-bold rounded py-2 text-primary font-size-md px-3">
                  {t('header.Products')}
                </NavLink>
              </li>
              {/* <li>
                <a
                  href="https://www.bot.gangala.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-weight-bold rounded py-2 text-primary font-size-md px-3">
                  Service
                </a>
              </li> */}
            </ul>
          </div>
          <div className="header-nav-actions ml-auto ml-lg-3 ml-lg-4 flex-grow-0">
            <span className="d-none d-lg-flex">
              {/* <Button
                tag={NavLink}
                to="/Dashboard"
                className="rounded-sm text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm"
                color="primary">
                Dashboard
              </Button> */}

              {!auth ? (
                <>
                  {/* https://gangala.in/ */}
                  <a
                    href="https://portal.gangala.in/value"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm ml-3 btn btn-primary"
                    style={{ borderRadius: 50, color: '#fe9901' }}>
                    {t('header.Become_Seller')}
                  </a>
                  {/* <Button
                    tag={NavLink}
                    to="/seller-registration"
                    className="rounded-sm text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm ml-3"
                    color="primary">
                    Become Seller
                  </Button> */}
                  <Button
                    onClick={() => registerModal(true)}
                    className=" text-nowrap font-size-xs font-weight-bold text-uppercase shadow-second-sm ml-3 btn btn-primary"
                    style={{
                      borderRadius: 50,
                      backgroundColor: '#fe9901',
                      color: '#3b3e66'
                    }}
                    color="dark">
                    {t('header.Register')}
                  </Button>
                </>
              ) : null}
            </span>
          </div>
          <div className="header-nav-menu flex-grow-0 ml-auto d-none d-lg-block">
            <ul className="d-flex justify-content-center">
              {auth && (
                <li>
                  <a
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      logoutUser();
                    }}
                    style={{
                      color: '#fe9901',
                      borderRadius: 15,
                      fontWeight: 'bold'
                    }}>
                    {t('header.Logout')}
                  </a>
                </li>
              )}
              <li>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggleButton}>
                  <DropdownToggle caret>
                    {i18n.language.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => i18n.changeLanguage('en')}>
                      English
                    </DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('sb')}>
                      Spanish
                    </DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('pt')}>
                      Portuguese
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                {country && (
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-2 d-flex align-items-center">
                      <span className="mr-3">
                        <FlagIcon code={country.country_code} size={28} />
                      </span>
                    </NavLinkStrap>
                  </NavItem>
                )}
              </li>
              {!auth && (
                <li className="mr-0">
                  <NavLink
                    className="rounded-sm py-1 px-3 font-size-xs text-uppercase"
                    to="/PageLoginIllustration">
                    {t('header.Login')}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </Container>
      </div>
      <div
        className={clsx('collapse-page-trigger', { 'is-active': collapse })}
        onClick={toggle}
      />
      <Modal
        zIndex={2000}
        centered
        size="xl"
        isOpen={registerModalState}
        toggle={() => toggleLogin()}
        contentClassName="modal-example-1 border-0 shadow-sm-dark bg-white p-3 p-xl-0">
        <Row className="no-gutters">
          <Col xl="5">
            <div className="hero-wrapper bg-composed-wrapper bg-skim-blue h-100 rounded br-xl-right-0">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div
                  className="bg-composed-wrapper--image rounded br-xl-right-0 opacity-7"
                  style={{ backgroundImage: 'url(' + people2 + ')' }}
                />
                <div className="bg-composed-wrapper--bg bg-second opacity-1 rounded br-xl-right-0" />
                <div className="bg-composed-wrapper--bg bg-slick-carbon opacity-5 rounded br-xl-right-0" />
                <div className="bg-composed-wrapper--content justify-content-center text-center text-xl-left p-5">
                  <div className="text-white text-center">
                    <h1 className="display-3 my-3 font-weight-bold">
                      {t('header.Register')}
                    </h1>
                    <p className="font-size-lg mb-0 px-4 text-white-50"></p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xl="7">
            <Col lg="8" xl="10" className="mx-auto">
              <div className="bg-white p-4 rounded">
                <div className="text-center my-4">
                  <h1 className="display-4 mb-1 font-weight-bold">
                    {t('header.Create_your_account')}
                  </h1>
                  <p className="font-size-lg mb-0 text-black-50"></p>
                </div>
                <FormGroup>
                  <label className="font-weight-bold">
                    {t('header.Email_addresss')}
                  </label>
                  <Input
                    required="true"
                    placeholder={t('header.Enter_your_email_address')}
                    name="username"
                    type="email"
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between mg-b-5">
                    <label className="font-weight-bold">
                      {t('header.Password')}
                    </label>
                  </div>
                  <Input
                    required="true"
                    name="password"
                    placeholder={t('header.Enter_your_password')}
                    type="password"
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="font-weight-bold">
                    {t('header.Full_Name')}
                  </label>
                  <Input
                    required="true"
                    placeholder={t('header.Enter_your_name')}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                </FormGroup>
                <div className="form-group mb-3">
                  {t('header.AgreeText1')}{' '}
                  <strong>{t('header.AgreeText2')}</strong>{' '}
                  {t('header.AgreeText3')}
                </div>
                <div className="text-center mb-4">
                  <Button
                    color="primary"
                    onClick={onSubmit}
                    type="submit"
                    className="text-uppercase font-weight-bold font-size-sm my-3">
                    {t('header.Create_account')}
                  </Button>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.appReducer.isAuth,
  country: state.appReducer.country,
  registerModalState: state.appReducer.registerModalState,
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});
export default connect(mapStateToProps, {
  registerUser,
  logoutUser,
  registerModal
})(LivePreviewExample);

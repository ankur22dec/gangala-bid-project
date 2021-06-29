import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Container, Nav, NavItem } from 'reactstrap';
import { NavLink as NavLinkStrap } from 'reactstrap';
import projectLogo from '../../../assets/images/react.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-sunrise-purple font-size-sm py-5">
        <div className="py-3">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            title="Gangala"
            className="d-70 d-block mx-auto bg-white rounded-circle">
            <img
              alt="Gangala"
              className="img-fluid p-2"
              src={projectLogo}
            />
          </a>
        </div>
        <Container className="pt-5">
          <Row className="pb-3">
            <Col md="6" xl="3">
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Services
                </h6>
                <Nav className="nav-transparent flex-column">
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Products
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Services
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      About us
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col md="6" xl="3">
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Support
                </h6>
                <Nav className="nav-transparent flex-column">
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Support center
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Affiliates
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Contact us
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col md="6" xl="3">
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Applications
                </h6>
                <Nav className="nav-transparent flex-column">
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Exchange
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Generic
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-0 py-1 text-white-50">
                      Helpdesk
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>
            </Col>
            <Col md="6" xl="3">
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Social Connections
                </h6>
                <p className="text-white-50">
                  Stay up to date with our latest updates and releases!
                </p>
                <Nav className="nav-transparent justify-content-start">
                  <NavItem>
                    <NavLinkStrap
                      className="px-0 mr-3 text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'facebook']}
                        className="font-size-lg"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      className="px-0 mr-3 text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'twitter']}
                        className="font-size-lg"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      className="px-0 mr-3 text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'google']}
                        className="font-size-lg"
                      />
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      className="px-0 mr-3 text-white-50"
                      href="#/"
                      onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </div>
            </Col>
          </Row>
          <div className="divider mt-4 bg-white opacity-2" />
          <div className="divider mb-4 bg-white opacity-2" />
          <div className="py-3 d-block d-lg-flex align-items-center justify-content-between">
            <div className="text-center d-block mb-3 mb-md-0 text-white">
              Copyright &copy; 2020 - UiFort.com
            </div>
            <Nav className="nav-transparent justify-content-center">
              <NavItem>
                <NavLinkStrap
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </NavLinkStrap>
              </NavItem>
              <NavItem>
                <NavLinkStrap
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Terms of Service
                </NavLinkStrap>
              </NavItem>
            </Nav>
            <Nav className="nav-transparent justify-content-center">
              <NavItem>
                <NavLinkStrap
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  My Account
                </NavLinkStrap>
              </NavItem>
            </Nav>
          </div>
        </Container>
      </div>
    </>
  );
}

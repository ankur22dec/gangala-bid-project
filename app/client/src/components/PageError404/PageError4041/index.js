import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, UncontrolledTooltip, Button } from 'reactstrap';

import illustration1 from '../../../assets/images/illustrations/pack4/404.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="app-wrapper bg-white">
        <div className="app-main">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <Col
                        lg="6"
                        md="9"
                        className="px-4 px-lg-0 mx-auto text-center text-black">
                        <img
                          src={illustration1}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        />

                        <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-3 text-black-50">
                          The page you were looking for doesn't exist.
                        </h3>
                        <p>
                          It's on us, we probably moved the content to a
                          different page. The search below should help!
                        </p>
                        <Row className="no-gutters">
                          <Col sm="12" md="8" className="mt-4 mt-lg-3 px-2">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Search terms here..."
                            />
                          </Col>
                          <Col sm="12" md="4" className="mt-4 mt-lg-3 px-2">
                            <Button
                              className="d-block w-100"
                              color="first"
                              size="lg">
                              <span className="btn-wrapper--label">Search</span>
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </div>
                    <div className="hero-footer py-4">
                      <Button
                        color="link"
                        className="font-size-lg rounded-sm d-40 btn-icon text-facebook btn-animated-icon"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        id="FacebookNavTooltip1">
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon icon={['fab', 'facebook']} />
                        </span>
                      </Button>
                      <UncontrolledTooltip target="FacebookNavTooltip1">
                        Facebook
                      </UncontrolledTooltip>
                      <Button
                        color="link"
                        className="font-size-lg rounded-sm d-40 btn-icon text-twitter btn-animated-icon"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        id="btnTwitterTooltip">
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </span>
                      </Button>
                      <UncontrolledTooltip target="btnTwitterTooltip">
                        Twitter
                      </UncontrolledTooltip>
                      <UncontrolledTooltip target="btnTwitterTooltip">
                        Twitter
                      </UncontrolledTooltip>
                      <Button
                        color="link"
                        className="font-size-lg rounded-sm d-40 btn-icon text-google btn-animated-icon"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        id="btnGoogleTooltip">
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon icon={['fab', 'google']} />
                        </span>
                      </Button>
                      <UncontrolledTooltip target="btnGoogleTooltip">
                        Google
                      </UncontrolledTooltip>
                      <Button
                        color="link"
                        className="font-size-lg rounded-sm d-40 btn-icon text-instagram btn-animated-icon"
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        id="btnInstagramTooltip">
                        <span className="btn-wrapper--icon d-flex">
                          <FontAwesomeIcon icon={['fab', 'instagram']} />
                        </span>
                      </Button>
                      <UncontrolledTooltip target="btnInstagramTooltip">
                        Instagram
                      </UncontrolledTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import clsx from 'clsx';
import { Col, Button, Modal, Row } from 'reactstrap';
import Loki from 'react-loki';
import { toast, Slide } from 'react-toastify';
import people2 from '../../../assets/images/stock-photos/people-2.jpg';

const Step1 = () => {
  return (
    <>
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <div className="text-center">
            <h5 className="font-size-xl font-weight-bold">
              Auction Information
            </h5>
            <p className="text-black-50 mb-4">
              Small section summary description can be added here!
            </p>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              type="text"
            />
          </div>
        </div>
      </div>
    </>
  );
};
const Step2 = () => {
  return (
    <>
      <div className="wizard-steps horizontal text-center">
        <div className="p-4">
          <div className="text-center">
            <h5 className="font-size-xl font-weight-bold">
              Billing information
            </h5>
            <p className="text-black-50 mb-4">Wonderful transition effects.</p>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              type="text"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input className="form-control" id="inputCity" type="text" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState">State</label>
              <select className="form-control" id="inputState">
                <option selected="">Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input className="form-control" id="inputZip" type="text" />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                id="gridCheck"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Step3 = () => {
  return (
    <>
      <div className="wizard-steps horizontal text-center">
        <div className="p-4">
          <div className="text-center">
            <h5 className="font-size-xl font-weight-bold">Payment details</h5>
            <p className="text-black-50 mb-4">
              The next and previous buttons help you to navigate through your
              content.
            </p>
          </div>
          <div className="row">
            <Col className="form-group col-12">
              <input
                className="form-control"
                placeholder="Credit card number"
                type="text"
              />
            </Col>
            <Col className="col-sm-6">
              <input
                className="form-control mb-3 mb-md-0"
                placeholder="Name on card"
                type="text"
              />
            </Col>
            <Col className="col-7 col-sm-3 mg-t-20 mg-sm-t-0 d-flex align-items-end">
              <input
                className="form-control"
                placeholder="Exp. date"
                type="text"
              />
            </Col>
            <div className="col-5 col-sm-3 mg-t-20 mg-sm-t-0 d-flex align-items-end">
              <input
                className="form-control"
                placeholder="CVC/CVV"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const customSteps = [
  {
    label: 'Auction Information',
    number: '1',
    component: <Step1 />
  },
  {
    label: 'Products',
    number: '2',
    component: <Step2 />
  },
  {
    label: 'Additional Details',
    number: '3',
    component: <Step3 />
  }
];

export default function LivePreviewExample() {
  const _customRenderer = ({ currentStep }) => {
    const steps = customSteps.map((step, index) => {
      const isActive = currentStep === index + 1;
      return (
        <li key={index} className={clsx('card-box', { current: isActive })}>
          <a href="#/" onClick={(e) => e.preventDefault()}>
            <div className="label">{step.label}</div>
            <div className="step-indicator">
              <div className="text-center font-size-lg d-50 rounded-sm mx-auto bg-neutral-first ng-star-inserted">
                <span className="font-weight-bold font-size-xl">
                  {step.number}
                </span>
              </div>
            </div>
          </a>
        </li>
      );
    });

    return (
      <div className="horizontal">
        <ul className="steps-indicator">{steps}</ul>
      </div>
    );
  };

  const _customActions = ({
    isComplete,
    cantBack,
    isInFinalStep,
    backHandler,
    nextHandler
  }) => {
    return (
      <div className="bg-secondary rounded-sm d-flex justify-content-between p-4">
        <Button
          className="btn-pill"
          outline
          color="primary"
          onClick={backHandler}
          disabled={cantBack || isComplete}>
          Previous
        </Button>
        <Button className="btn-pill" color="success" onClick={toggleLogin}>
          Open Modal View
        </Button>
        <Button
          className="btn-pill"
          color="success"
          onClick={nextHandler}
          disabled={isComplete}>
          {isInFinalStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    );
  };

  const _onFinish = () => {
    toast.error("Yes, you've successfully reached the last wizard step !", {
      containerId: 'A',
      transition: Slide
    });
  };
  const [loginModal, setLoginModal] = useState(false);
  const toggleLogin = () => setLoginModal(!loginModal);
  return (
    <>
      <div className="wizard-alternate horizontal">
        <Loki
          steps={customSteps}
          renderSteps={_customRenderer}
          renderActions={_customActions}
          onFinish={_onFinish}
        />
        <Modal
          zIndex={2000}
          centered
          size="xl"
          isOpen={loginModal}
          toggle={toggleLogin}
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
                        Create Auction
                      </h1>
                      <p className="font-size-lg mb-0 px-4 text-white-50">
                        All components from the General dashboard template can
                        be used in the individual applications pages, without
                        modifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl="7">
              <div className="wizard-alternate horizontal">
                <Loki
                  steps={customSteps}
                  renderSteps={_customRenderer}
                  renderActions={_customActions}
                  onFinish={_onFinish}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
}

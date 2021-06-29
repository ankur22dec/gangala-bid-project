import React from 'react';

import clsx from 'clsx';

import { Col, Button } from 'reactstrap';

import Loki from 'react-loki';
import { toast, Zoom } from 'react-toastify';
const Step1 = () => {
  return (
    <>
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">
            Personal information
          </h5>
          <p className="text-black-50 mb-4">
            Small section summary description can be added here!
          </p>
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
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">Billing information</h5>
          <p className="text-black-50 mb-4">Wonderful transition effects.</p>
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
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">Payment details</h5>
          <p className="text-black-50 mb-4">
            The next and previous buttons help you to navigate through your
            content.
          </p>
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
const Step4 = () => {
  return (
    <>
      <div className="wizard-steps horizontal">
        <div className="p-4">
          <h5 className="font-size-xl font-weight-bold">
            Personal information
          </h5>
          <p className="text-black-50 mb-4">
            Small section summary description can be added here!
          </p>
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

const customSteps = [
  {
    label: 'Reports',
    number: '1',
    description: 'Try the keyboard navigation',
    component: <Step1 />
  },
  {
    label: 'Accounts',
    number: '2',
    description: 'Cicero text generator',
    component: <Step2 />
  },
  {
    label: 'Payments',
    number: '3',
    description: 'Wonderful transition effects',
    component: <Step3 />
  },
  {
    label: 'Deliveries',
    number: '4',
    description: 'The next and previous buttons',
    component: <Step4 />
  }
];

export default function LivePreviewExample() {
  const _customRenderer = ({ currentStep }) => {
    const steps = customSteps.map((step, index) => {
      const isActive = currentStep === index + 1;
      return (
        <li key={index} className={clsx('card-box', { current: isActive })}>
          <a href="#/" onClick={(e) => e.preventDefault()}>
            <div className="step-indicator">
              <div className="d-flex">
                <div className="font-size-lg d-44 rounded-sm mr-2 stepper-wrapper text-center">
                  <span className="font-weight-bold">{step.number}</span>
                </div>
                <div>
                  <div className="font-weight-bold">{step.label}</div>
                  <small className="text-black-50">{step.description}</small>
                </div>
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
      <div className="actions p-4">
        <Button
          outline
          color="primary"
          onClick={backHandler}
          disabled={cantBack || isComplete}>
          Previous
        </Button>
        <Button color="primary" onClick={nextHandler} disabled={isComplete}>
          {isInFinalStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    );
  };

  const _onFinish = () => {
    toast.success("Yes, you've successfully reached the last wizard step !", {
      containerId: 'B',
      transition: Zoom
    });
  };

  return (
    <>
      <div className="wizard-alternate-2 horizontal">
        <Loki
          steps={customSteps}
          renderSteps={_customRenderer}
          renderActions={_customActions}
          onFinish={_onFinish}
        />
      </div>
    </>
  );
}

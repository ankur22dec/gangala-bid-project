import React from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, UncontrolledTooltip, Button } from 'reactstrap';

import Loki from 'react-loki';
import { toast, Zoom } from 'react-toastify';
const Step1 = () => {
  return (
    <>
      <div className="wizard-steps vertical">
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
      <div className="wizard-steps vertical">
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
      <div className="wizard-steps vertical">
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

const customSteps = [
  {
    label: 'Personal information',
    number: '1',
    component: <Step1 />
  },
  {
    label: 'Billing information',
    number: '2',
    component: <Step2 />
  },
  {
    label: 'Payment details',
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
            <div className="step-indicator">{step.number}</div>
          </a>
        </li>
      );
    });

    return (
      <div className="vertical">
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
      <div className="card card-box">
        <div className="card-header">
          <div className="card-header--title">
            <small>Wizards</small>
            <b>Vertical example</b>
          </div>
          <div className="card-header--actions">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              id="SendMessageTooltip2347">
              <FontAwesomeIcon
                icon={['fas', 'plus']}
                className="font-size-sm"
              />
            </a>
            <UncontrolledTooltip target="SendMessageTooltip2347">
              Send new message
            </UncontrolledTooltip>
          </div>
        </div>
        <div className="wizard vertical">
          <Loki
            steps={customSteps}
            renderSteps={_customRenderer}
            renderActions={_customActions}
            onFinish={_onFinish}
          />
        </div>
      </div>
    </>
  );
}

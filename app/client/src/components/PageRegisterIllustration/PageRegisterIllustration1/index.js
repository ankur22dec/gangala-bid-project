import React, { useState } from 'react';
import {
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  Button,
  Form
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import { DotLoader } from 'react-spinners';
import { useHistory } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { connect, useSelector, useDispatch } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import TextareaAutosize from 'react-autosize-textarea';
import { useForm } from 'react-hook-form';
import { registerSeller } from '../../../Action/appAction';

import illustration1 from '../../../assets/images/illustrations/pack1/handshake.svg';
import './SellerRegister.css';
function LivePreviewExample(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setform] = useState({
    name: '',
    username: '',
    password: ''
  });
  const [step, setstep] = useState(0);
  const [blocking, setblocking] = useState(false);
  const onChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    if (step !== 3) {
      setstep(step + 1);
    } else {
      setblocking(true);
      await dispatch(registerSeller(data));
      setblocking(false);
      history.push('/');
    }
  };

  return (
    <>
      <BlockUi
        className="app-wrapper bg-white min-vh-100"
        tag="div"
        blocking={blocking}
        loader={<DotLoader color={'var(--first)'} loading={blocking} />}>
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Container>
                    <Row>
                      <Col lg="6" className="d-flex align-items-center"></Col>
                    </Row>
                    <Row>
                      <Col lg="6" className="d-flex align-items-center">
                        <div className="divider-v d-none d-lg-block divider-v-md" />
                        <div className="w-100 pr-0 pr-lg-5">
                          <div className="text-center mb-4">
                            <h1 className="display-4 mb-1 font-weight-bold">
                              Create Seller account
                            </h1>
                            <p className="font-size-lg mb-0 text-black-50">
                              Start benefiting from our tools right away
                            </p>
                          </div>
                          <div className="text-center mb-4">
                            <Stepper
                              completeBorderColor="#132a4f"
                              completeColor="#132a4f"
                              activeColor="#7a7b97"
                              steps={[
                                { title: 'Information' },
                                { title: 'Address' },
                                { title: 'Social Details' },
                                { title: 'Finish' }
                              ]}
                              activeStep={step}
                            />
                          </div>
                          <SwitchTransition>
                            <CSSTransition
                              key={step}
                              addEndListener={(node, done) =>
                                node.addEventListener(
                                  'transitionend',
                                  done,
                                  false
                                )
                              }
                              classNames="fade">
                              <Form onSubmit={handleSubmit(onSubmit)}>
                                {step === 0 && (
                                  <>
                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Full Name
                                      </label>
                                      <Input
                                        placeholder="Enter your name"
                                        {...register('name', {
                                          required:
                                            'You must specify a Full Name',
                                          maxLength: 80
                                        })}
                                        // valid={!errors.name && true}
                                        invalid={errors.name && true}
                                        type="text"
                                        onChange={onChange}
                                      />
                                    </FormGroup>

                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Email addresss
                                      </label>
                                      <Input
                                        placeholder="Enter your email address"
                                        {...register('email', {
                                          required: true,
                                          maxLength: 80
                                        })}
                                        type="email"
                                        onChange={onChange}
                                        invalid={errors.email && true}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <div className="d-flex justify-content-between mg-b-5">
                                        <label className="font-weight-bold">
                                          Password
                                        </label>
                                      </div>
                                      <Input
                                        placeholder="Enter your password"
                                        {...register('password', {
                                          required: true,
                                          maxLength: 80
                                        })}
                                        type="password"
                                        onChange={onChange}
                                        invalid={errors.password && true}
                                      />
                                    </FormGroup>

                                    {/* <div className="form-group mb-3">
                                      By clicking the{' '}
                                      <strong>Create account</strong> button
                                      below you agree to our terms of service
                                      and privacy statement.
                                    </div> */}
                                  </>
                                )}
                                {step === 1 && (
                                  <>
                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Addresss 1
                                      </label>
                                      <TextareaAutosize
                                        className="form-control"
                                        rows={3}
                                        {...register('address1', {
                                          required: true,
                                          maxLength: 100
                                        })}
                                        style={{
                                          maxHeight: 150,
                                          boxSizing: 'border-box'
                                        }}
                                        invalid={errors.address1 && true}
                                      />
                                    </FormGroup>
                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Addresss 2
                                      </label>
                                      <TextareaAutosize
                                        className="form-control"
                                        rows={3}
                                        {...register('address2', {
                                          maxLength: 80
                                        })}
                                        style={{
                                          maxHeight: 150,
                                          boxSizing: 'border-box'
                                        }}
                                      />
                                    </FormGroup>
                                  </>
                                )}
                                {step === 2 && (
                                  <>
                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Whatsapp Number
                                      </label>
                                      <Input
                                        placeholder="Enter your name"
                                        {...register('waNumber', {
                                          required: true,
                                          maxLength: 16
                                        })}
                                        type="number"
                                        onChange={onChange}
                                      />
                                    </FormGroup>
                                    <div className="form-group mb-3">
                                      Enter Whatsapp Number
                                      <strong>with country code </strong> Start
                                      with <strong>00</strong>.
                                    </div>
                                    <FormGroup>
                                      <label className="font-weight-bold">
                                        Facebook Username
                                      </label>
                                      <Input
                                        placeholder="Enter your name"
                                        {...register('fbUsername')}
                                        type="text"
                                        onChange={onChange}
                                      />
                                    </FormGroup>
                                  </>
                                )}
                                {step === 3 && (
                                  <>
                                    <div className="form-group mb-3">
                                      By clicking the{' '}
                                      <strong>Create account</strong> button
                                      below you agree to our terms of service
                                      and privacy statement.
                                    </div>
                                  </>
                                )}
                                <div className="d-flex justify-content-between">
                                  <Button
                                    color="dark"
                                    type="submit"
                                    className="text-uppercase font-weight-bold font-size-sm my-3">
                                    Back
                                  </Button>
                                  <Button
                                    color="primary"
                                    type="submit"
                                    className="text-uppercase text-right font-weight-bold font-size-sm my-3">
                                    {step === 3 ? 'Submit' : 'Next'}
                                  </Button>
                                </div>
                              </Form>
                            </CSSTransition>
                          </SwitchTransition>
                        </div>
                      </Col>
                      <Col
                        lg="6"
                        className="d-none d-lg-flex align-items-center">
                        <img
                          alt="..."
                          className="w-100 mx-auto d-block img-fluid"
                          src={illustration1}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlockUi>
    </>
  );
}

export default LivePreviewExample;

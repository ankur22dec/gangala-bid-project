import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { Row, Col, Container, FormGroup, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import illustration1 from '../../assets/images/illustrations/pack1/security.svg';
import { resetPassword } from '../../Action/appAction';

export default function LivePreviewExample() {
  const params = useParams();
  const dispatch = useDispatch();
  const [form, setform] = useState({
    password: '',
    confrimPassword: ''
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      await resetPassword({ token: params.token, password: form.password })
    );
  };
  const onChangeHandler = async (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-content--inner d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Container>
                    <Row>
                      <Col lg="6" className="d-flex align-items-center">
                        <div className="divider-v d-none d-lg-block divider-v-md" />
                        <div className="w-100 pr-0 pr-lg-5">
                          <div className="text-center mb-5">
                            <h1 className="display-4 mb-1 font-weight-bold">
                              Enter New Password
                            </h1>
                            <p className="font-size-lg mb-0 text-black-50">
                              Forgot your password? No worries, we're here to
                              help!
                            </p>
                          </div>
                          <FormGroup>
                            <label className="font-weight-bold">Password</label>
                            <Input
                              name="password"
                              bsSize="lg"
                              onChange={(e) => onChangeHandler(e)}
                              type="password"
                              placeholder="New Password..."
                            />
                          </FormGroup>
                          <FormGroup>
                            <label className="font-weight-bold">
                              Confrim Password
                            </label>
                            <Input
                              name="confrimPassword"
                              onChange={(e) => onChangeHandler(e)}
                              type="password"
                              bsSize="lg"
                              placeholder="Confrim Password...."
                            />
                          </FormGroup>
                          <div className="text-center mb-5">
                            <Button
                              type="submit"
                              onClick={onSubmit}
                              className="btn-block text-uppercase font-weight-bold font-size-sm mt-4"
                              color="primary">
                              Confrim Password
                            </Button>
                          </div>
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
      </div>
    </>
  );
}

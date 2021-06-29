import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Col, Container, FormGroup, Input, Row } from 'reactstrap';
import { loginUser, registerModal, getMe } from '../../../Action/appAction';
import illustration1 from '../../../assets/images/illustrations/pack1/authentication.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Google from './Google';
import Facebook from './Facebook';

function LivePreviewExample({ loginUser, registerModal, getMe }) {
  const history = useHistory();
  let location = useLocation();
  const isAuth = useSelector((state) => state.appReducer.isAuth);
  useEffect(() => {
    if (isAuth) {
      if (pendingAuction && res) {
        history.push('/NewAcution/?fillAuto=true');
      } else {
        if (history.length <= 0) {
          history.push('/Homepage');
        } else {
          history.goBack();
        }
      }
    }
  }, [isAuth])
  const { t, i18n } = useTranslation();
  const [form, setform] = useState({
    username: '',
    password: ''
  });
  let pendingAuction = Boolean(
    new URLSearchParams(location.search).get('pendingAuction')
  );
  const onChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateRegisterState = () => {
    registerModal(true);
    history.goBack();
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(form);
    setform({
      name: '',
      username: '',
      password: ''
    });
    if (pendingAuction && res) {
      history.push('/NewAcution/?fillAuto=true');
    } else {
      if (history.length <= 0) {
        history.push('/Homepage');
      } else {
        history.goBack();
      }
    }
  };


  const LoginWithGoogle = (data) => {
    if (data.success) {
      localStorage.setItem("token", data.token)
      getMe()
      if (pendingAuction && data.success) {
        history.push('/NewAcution/?fillAuto=true');
      } else {
        history.goBack();
      }
      console.log("dataa=>", data)
    }

  }
  const LoginWithFacebook = (data) => {
    console.log("dataaya=>", data)
    if (data.success) {
      localStorage.setItem("token1", data.token)
      getMe()
      if (pendingAuction && data.success) {
        history.push('/NewAcution/?fillAuto=true');
      } else {
        history.goBack();
      }
      console.log("dataa=>", data)
    }

  }

  return (
    <>
      <div className="app-wrapper bg-white min-vh-100">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className=" d-flex align-items-center">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content py-5">
                  <Container>
                    <Google informParent={(data) => LoginWithGoogle(data)} /> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Facebook informParent={(data) => LoginWithFacebook(data)} />
                    <Row>
                      <Col lg="6" className="d-flex align-items-center">
                        <div className="divider-v d-none d-lg-block divider-v-md" />
                        <div className="w-100 pr-0 pr-lg-5">
                          <div className="text-black mt-3">
                            <span className="text-center">
                              <h1 className="display-4 mb-1 font-weight-bold">
                                {t("login.Login_to_your_account")}
                              </h1>
                            </span>
                            <div className="my-4" />
                            <div>
                              <FormGroup>
                                <label className="font-weight-bold">
                                  {t("login.Email_address")}
                                </label>
                                <Input
                                  name="username"
                                  onChange={onChange}
                                  placeholder={t("login.yourname@yourmail.com")}
                                  type="email"
                                />
                              </FormGroup>
                              <div className="form-group mb-4">
                                <div className="d-flex justify-content-between">
                                  <label className="font-weight-bold">
                                    {t("login.Password")}
                                  </label>
                                  <a
                                    href="#/"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      history.push('/PageRecoverIllustration');
                                    }}>
                                    {t("login.Forgot_password")}
                                  </a>
                                </div>
                                <Input
                                  name="password"
                                  onChange={onChange}
                                  placeholder={t("Enter_your_password")}
                                  type="password"
                                />
                              </div>

                              <Button
                                size="lg"
                                type="submit"
                                onClick={onSubmit}
                                className="btn-block text-uppercase font-weight-bold font-size-sm"
                                style={{
                                  backgroundColor: 'rgb(254, 153, 1)',
                                  color: 'rgb(59, 62, 102)',
                                  borderRadius: 50
                                }}>
                                {t("login.Sign_in")}
                              </Button>
                            </div>

                            <div className="text-center pt-4 text-black-50">
                              {t("login.Dont_have_an_account")}{' '}
                              <a
                                href="#/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateRegisterState();
                                }}>
                                {t("login.Create_an_Account")}
                              </a>
                            </div>
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
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { loginUser, registerModal, getMe })(
  LivePreviewExample
);

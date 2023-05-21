import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import MetaTags from "react-meta-tags";
import { useHistory } from 'react-router-dom';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation } from "../../services/userAuthApi";



//Import Image
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from '../../features/authSlice';


const SignIn = () => {

  const [server_error, setServerError] = useState({})
  const navigate = useHistory();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      alert('Error')
    }
    if (res.data) {
      // console.log(typeof (res.data))
      // console.log(res.data)
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate.push('/')
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])


  return (
    <React.Fragment>
    <div>            
    <div className="main-content">
    <div className="page-content">
    <MetaTags>
      <title>Sign In | Jobcy - Job Listing Template | Themesdesign</title>
    </MetaTags>  
      <section className="bg-auth">
        <Container>
          <Row className="justify-content-center">
            <Col xl={10} lg={12}>
              <Card className="auth-box">
                <Row className="g-0">
                  <Col lg={6} className="text-center">
                    <CardBody className="p-4">
                      <Link to="/">
                        <img src={lightLogo} alt="" className="logo-light" />
                        <img src={darkLogo} alt="" className="logo-dark" />
                      </Link>
                      <div className="mt-5">
                        <img src={signInImage} alt="" className="img-fluid" />
                      </div>
                    </CardBody>
                  </Col>
                  <Col lg={6}>
                    <CardBody className="auth-content p-5 h-100 text-white">
                      <div className="w-100">
                        <div className="text-center mb-4">
                          <h5>Welcome Back !</h5>
                          <p className="text-white-70">
                            Sign in to continue to Jobcy.
                          </p>
                        </div>
                        <Form action="/" className="auth-form" onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="usernameInput" className="form-label">
                              Email
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="usernameInput"
                              name="email"
                              placeholder="Enter your username"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">
                              Password
                            </label>
                            <Input
                              type="password"
                              className="form-control"
                              id="passwordInput"
                              name="password"
                              placeholder="Enter your password"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                              />
                              <Link
                                to="/resetpassword"
                                className="float-end text-white"
                              >
                                Forgot Password?
                              </Link>
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-white btn-hover w-100"
                            >
                              Sign In
                            </button>
                          </div>
                        </Form>
                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <Link
                              to="/signup"
                              className="fw-medium text-white text-decoration-underline"
                            >
                              {" "}
                              Sign Up{" "}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      </div>
    </div>
    </div>
    </React.Fragment>
  );
};

export default SignIn;

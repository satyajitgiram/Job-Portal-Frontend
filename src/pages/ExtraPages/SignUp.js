import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, Card, Col, Input, Row,CardBody } from 'reactstrap';
import MetaTags from "react-meta-tags";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signUpImage from "../../assets/images/auth/sign-up.png";
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';

const SignUp = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useHistory();
    const [registerUser, { isLoading }] = useRegisterUserMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data, "DATA")
        const actualData = {
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
          password2: data.get('password'),
          tc: data.get('termandconditions'),
        }
        const res = await registerUser(actualData)
        if (res.error) {
          // console.log(typeof (res.error.data.errors))
          // console.log(res.error.data.errors)
          setServerError(res.error.data.errors)
        }
        if (res.data) {
          console.log(typeof (res.data))
          console.log(res.data)
          storeToken(res.data.token)
          navigate.push('/')
        }
      }


    return (
        <React.Fragment>
            <div>            
                <div className="main-content">
                <div className="page-content">     
                <MetaTags>
                <title>Sign Up | Jobcy - Job Listing Template | Themesdesign</title>
                </MetaTags>   
                    <section className="bg-auth">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10} lg={12}>
                                    <Card className="auth-box">
                                        <Row className="align-items-center">
                                            <Col lg={6} className="text-center">
                                                <CardBody className="p-4">
                                                    <Link to="/">
                                                        <img src={lightLogo} alt="" className="logo-light" />
                                                        <img src={darkLogo} alt="" className="logo-dark"/>
                                                    </Link>
                                                    <div className="mt-5">
                                                        <img src={signUpImage} alt="" className="img-fluid" />
                                                    </div>
                                                </CardBody>
                                            </Col>
                                            <Col lg={6} >
                                                <CardBody className="auth-content p-5 text-white">
                                                    <div className="w-100">
                                                        <div className="text-center">
                                                            <h5>Let's Get Started</h5>
                                                            <p className="text-white-70">Sign Up and get access to all the features of Jobcy</p>
                                                        </div>
                                                        <Form action="/" className="auth-form" onSubmit={handleSubmit}>
                                                            <div className="mb-3">
                                                                <label htmlFor="nameInput" className="form-label">Name</label>
                                                                <Input type="text" name='name' className="form-control" required id="nameInput" placeholder="Enter your Full Name" />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="emailInput" className="form-label">Email</label>
                                                                <Input type="email" name="email" className="form-control" required id="emailInput" placeholder="Enter your email" />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                                                <Input type="password" name="password" className="form-control" id="passwordInput" placeholder="Enter your password" />
                                                            </div>
                                                            
                                                            <div className="mb-4">
                                                                <div className="form-check"><Input className="form-check-input" name="termandconditions" type="checkbox" id="flexCheckDefault" />
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault">I agree to the <Link to="#" className="text-white text-decoration-underline">Terms and conditions</Link></label>
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="submit" className="btn btn-white btn-hover w-100">Sign Up</button>
                                                            </div>
                                                        </Form>
                                                        <div className="mt-3 text-center">
                                                            <p className="mb-0">Already a member ? <Link to="/signin" className="fw-medium text-white text-decoration-underline"> Sign In </Link></p>
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
    )
}

export default SignUp

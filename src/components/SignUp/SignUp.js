import React, { Component } from "react";
import { Redirect } from "react-router";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink
} from "react-router-dom";
import {
    Form,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Checkbox,
    Button,
    Label,
    Row,
    Grid
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./SignUp.scss";
// import 'normalize.css'

export class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    updateEmail = e => {
        this.setState({
            email: e.target.value
        });
    };

    updatePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    render() {
        return (
            <div className="signUpBackground">
                <Header navHeader="LoggIn" />
                <div className="signUpMain">
                    <div className="container-fluid">
                        <Grid>
                            <Row>
                                <Col lg={4} md={4} />
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form
                                        horizontal
                                        onSubmit={this.handleSubmit}
                                    >
                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col lg={6} md={6} sm={6} xs={12}>
                                                <ControlLabel>
                                                    Email
                                                </ControlLabel>

                                                <FormControl
                                                    type="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.updateEmail}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPasswordSignUp">
                                            <Col lg={6} md={6} sm={6} xs={12}>
                                                <ControlLabel>
                                                    Password
                                                </ControlLabel>

                                                <FormControl
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={
                                                        this.updatePassword
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPasswordSignUpRepeat">
                                            <Col lg={6} md={6} sm={6} xs={12}>
                                                <ControlLabel>
                                                    Password
                                                </ControlLabel>

                                                <FormControl
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={
                                                        this.updatePassword
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={10}>
                                                <Button
                                                    type="submit"
                                                    className="btn btn-success"
                                                >
                                                    Sign up
                                                </Button>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalBackToLogIn">
                                            <Col lg={6} md={6} sm={6} xs={12}>
                                                <div className="text-center">
                                                    Already have an account?
                                                    <NavLink
                                                        exact
                                                        to="/#/LogIn"
                                                    >
                                                        {" "}
                                                        Log in
                                                    </NavLink>
                                                </div>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

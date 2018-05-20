import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import {
    Form,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Checkbox,
    Button,
    Row,
    Grid
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ListAlbums } from "../../components/ListAlbums/ListAlbums";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoIdentityCredentials,
    WebIdentityCredentials,
    AmazonCognitoIdentity,
    AuthenticationDetails
} from "amazon-cognito-identity-js";
// import 'normalize.css'
import "./LogIn.scss";

export class LogIn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: "",
            password: "",
            logIn: null,
            logInErrorMessage: "",
            display: "none"
        };
    }

    componentDidMount() {
        var poolData = {
            UserPoolId: "eu-west-1_GGR1owL6e", // Your user pool id here
            ClientId: "1ca22kf6l9kgljbnjh5043mj8r" // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    this.setState({
                        logIn: false,
                        logInErrorMessage: err.message
                    });
                    return;
                } else {
                    console.log("Session:");
                    console.log(session.getAccessToken().getJwtToken());
                    const loginsObj = {
                        "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_GGR1owL6e": session
                            .getIdToken()
                            .getJwtToken()
                    };
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
                        {
                            IdentityPoolId:
                                "eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36",
                            Logins: loginsObj
                        }
                    );
                    this.setState({
                        logIn: true
                    });
                }
            });
        }
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

    handleSubmit = e => {
        e.preventDefault();

        console.log(this.state.email);
        console.log(this.state.password);

        var authenticationData = {
            Username: this.state.email,
            Password: this.state.password
        };
        // var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        var poolData = {
            UserPoolId: "eu-west-1_GGR1owL6e", // Your user pool id here
            ClientId: "1ca22kf6l9kgljbnjh5043mj8r" // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);

        var userData = {
            Username: this.state.email,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                console.log(
                    "access token + " + result.getAccessToken().getJwtToken()
                ); //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                // this.props.setJwtToken(result.getAccessToken().getJwtToken())
                AWS.config.region = "eu-west-1";

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId:
                        "eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36", // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_GGR1owL6e": result
                            .getIdToken()
                            .getJwtToken()
                    }
                });

                AWS.config.credentials.refresh(error => {
                    if (error) {
                        console.log("Error !");
                        console.error(error);
                    }
                });

                this.setState({
                    logIn: true
                });
            },
            onFailure: err => {
                //  console.log(new Error().stack);
                console.log(err.message);
                this.setState({
                    logIn: false,
                    display: "inline-block",
                    logInErrorMessage: err.message
                });

                console.log(this.state.logIn);
            }
        });
    };

    render() {
        if (this.state.logIn) {
            // if already logged in -> go to album
            console.log("logIn state (true):" + this.state.logIn);

            return <Redirect to="/ListAlbums" push={true} />;
        } else {
            // new connection -> display clear form
            // loggin error -> show login form with alert
            console.log("logIn state (false):" + this.state.logIn);
            return (
                <div className="logInBackground">
                    <Header navHeader="LoggIn" />
                    <div className="logInMain">
                        <div className="container-fluid">
                            <Grid>
                                <Row>
                                    <Col lg={5} md={5} />
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <Form
                                            horizontal
                                            onSubmit={this.handleSubmit}
                                        >
                                            <FormGroup controlId="formHorizontalAlert">
                                                <Col
                                                    lg={6}
                                                    md={6}
                                                    sm={6}
                                                    xs={12}
                                                >
                                                    <div
                                                        className="alert alert-danger"
                                                        role="alert"
                                                        style={{
                                                            display: this.state
                                                                .display
                                                        }}
                                                    >
                                                        {
                                                            this.state
                                                                .logInErrorMessage
                                                        }
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalEmail">
                                                <Col
                                                    lg={6}
                                                    md={6}
                                                    sm={6}
                                                    xs={12}
                                                >
                                                    <ControlLabel>
                                                        Email
                                                    </ControlLabel>
                                                    <FormControl
                                                        type="email"
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={
                                                            this.updateEmail
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup controlId="formHorizontalPassword">
                                                <Col
                                                    lg={6}
                                                    md={6}
                                                    sm={6}
                                                    xs={12}
                                                >
                                                    <ControlLabel>
                                                        Password
                                                    </ControlLabel>
                                                    <FormControl
                                                        type="password"
                                                        placeholder="Password"
                                                        value={
                                                            this.state.password
                                                        }
                                                        onChange={
                                                            this.updatePassword
                                                        }
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col smOffset={2} sm={10}>
                                                    <Button type="submit">
                                                        Log in
                                                    </Button>
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
}

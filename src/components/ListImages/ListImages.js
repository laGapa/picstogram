import React, { Component, Fragment } from "react";
import { Image, Grid, Col, Thumbnail, Row } from "react-bootstrap";

import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoIdentityCredentials,
    WebIdentityCredentials,
    AmazonCognitoIdentity,
    AuthenticationDetails
} from "amazon-cognito-identity-js";

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

import Coverflow from "react-coverflow";
// import Radium from 'radium';
import { StyleRoot } from "radium";
import "normalize.css";
import "./ListImages.scss";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Masonry from "react-masonry-component";

const masonryOptions = {
    transitionDuration: 0,
    fitWidth: true
};

export class ListImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            s3Data: [],
            httpPrefix: "https://s3-eu-west-1.amazonaws.com/picstogram/"
        };
    }

    componentDidMount() {
        // console.log("PROPS")
        // console.log(this.props.match)

        var albumBucketName = "picstogram";
        var bucketRegion = "eu-west-1";
        // var IdentityPoolId = 'eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36';
        //
        // AWS.config.region = 'eu-west-1'; // Region
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: 'eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36'
        // });

        //         var jwtToken = this.props.jwtToken
        //         console.log(jwtToken)
        //
        //         var poolData = {
        //              UserPoolId: 'eu-west-1_GGR1owL6e', // Your user pool id here
        //              ClientId: '1ca22kf6l9kgljbnjh5043mj8r' // Your client id here
        //         };
        //         var userPool = new CognitoUserPool(poolData);
        //         console.log("current user:" + userPool.getCurrentUser())

        //         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //                 IdentityPoolId : 'eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36', // your identity pool id here
        //                 Logins : {
        //                     // Change the key below according to the specific region your user pool is in.
        //                     'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_GGR1owL6e' : jwtToken
        //                 }
        //         });
        //
        //         AWS.config.credentials.refresh((error) => {
        //             if (error) {
        //                 console.log("Error while refres!");
        //                 console.error(error);
        //             }
        //         })

        var poolData = {
            UserPoolId: "eu-west-1_GGR1owL6e", // Your user pool id here
            ClientId: "1ca22kf6l9kgljbnjh5043mj8r" // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    rej(err);
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
                }
            });
        }

        var albumPrefix = "albums/" + this.props.match.params.albumName;

        AWS.config.update({
            region: bucketRegion
            // credentials: new AWS.CognitoIdentityCredentials({
            //   IdentityPoolId: IdentityPoolId
            // })
        });

        var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: {
                Bucket: albumBucketName,
                Prefix: albumPrefix
            }
        });

        var listObjectPromise = s3.listObjectsV2().promise();
        listObjectPromise
            .then(data => {
                data.Contents.shift(); // remove empty album path
                this.setState({
                    s3Data: data.Contents
                });
            })
            .catch(function(err) {
                console.log(err, err.stack); // an error occurred
                return null;
            });
    }

    // handleClickMosaicImage = (event) => {
    //     console.log(event.target);
    // }
    render() {
        // console.log('MATCH')
        // console.log(this.props.match)
        var viewMode = this.props.match.params.viewMode;

        if (viewMode == "slider") {
            var fn = function() {
                console.log(this);
            };
            return (
                <div>
                    <Header
                        navHeader="listImages"
                        albumName={this.props.match.params.albumName}
                    />
                    <div className="listImagesMain">
                        <div className="container-fluid">
                            <StyleRoot>
                                <Coverflow
                                    displayQuantityOfSide={2}
                                    navigation={true}
                                    enableHeading={false}
                                    active={0}
                                    infiniteScroll={true}
                                    clickable={true}
                                    media={{
                                        "@media (max-width: 900px)": {
                                            width: "100%",
                                            height: "90vh"
                                        },
                                        "@media (min-width: 900px)": {
                                            width: "100%",
                                            height: "90vh"
                                        }
                                    }}
                                >
                                    {this.state.s3Data.map((element, index) => {
                                        return (
                                            <img
                                                src={
                                                    this.state.httpPrefix +
                                                    encodeURIComponent(
                                                        element.Key
                                                    )
                                                }
                                                key={index}
                                                data-action={
                                                    this.state.httpPrefix +
                                                    encodeURIComponent(
                                                        element.Key
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </Coverflow>
                            </StyleRoot>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else if (viewMode == "slideShow") {
            return (
                <div>
                    <Header
                        navHeader="listImages"
                        albumName={this.props.match.params.albumName}
                    />
                    <div className="listImagesMain">
                        <div className="container-fluid">
                            <Carousel autoPlay>
                                {this.state.s3Data.map((element, index) => {
                                    return (
                                        <div>
                                            <img
                                                src={
                                                    this.state.httpPrefix +
                                                    encodeURIComponent(
                                                        element.Key
                                                    )
                                                }
                                                key={index}
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            const childElements = this.state.s3Data.map(element => {
                return (
                    <li className="image-element-class">
                        <img
                            className="image-image"
                            src={
                                this.state.httpPrefix +
                                encodeURIComponent(element.Key)
                            }
                        />
                    </li>
                );
            });
            console.log(childElements);

            return (
                <div>
                    <Header
                        navHeader="listImages"
                        albumName={this.props.match.params.albumName}
                    />
                    <div className="listImagesMain">
                        <div className="container-fluid">
                            <Grid>
                                <Masonry
                                    className={"grid"}
                                    elementType={"ul"}
                                    // style={{backgroundColor: 'red'}}
                                    options={masonryOptions}
                                    disableImagesLoaded={false}
                                    updateOnEachImageLoad={false}
                                    onClick={this.handleClickMosaicImage}
                                >
                                    {childElements}
                                </Masonry>
                            </Grid>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

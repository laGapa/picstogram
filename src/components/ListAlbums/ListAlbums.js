import React, { Component, Fragment } from 'react';
import { Image, Grid, Col, Thumbnail, Row } from 'react-bootstrap'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, CognitoIdentityCredentials, WebIdentityCredentials, AmazonCognitoIdentity, AuthenticationDetails } from 'amazon-cognito-identity-js';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from 'react-router-dom';


import {Header} from '../../components/Header/Header'
import {Footer} from '../../components/Footer/Footer'
import {ListImages} from '../../components/ListImages/ListImages'
import {LogIn} from '../../components/LogIn/LogIn'
// import 'normalize.css'
import './ListAlbums.scss'


export class ListAlbums extends Component {
    constructor(props){
        super(props);
        this.state = {
            s3Data: [],
            albumCovers: {},
            httpPrefix: "https://s3-eu-west-1.amazonaws.com/picstogram/",
            logInAlbums: true
        }
    }
    componentDidMount(){
        var albumBucketName = 'picstogram';
        var bucketRegion = 'eu-west-1';
        var poolData = {
            UserPoolId: 'eu-west-1_GGR1owL6e', // Your user pool id here
            ClientId: '1ca22kf6l9kgljbnjh5043mj8r' // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    this.setState({
                        logInAlbums: false
                    })
                   rej(err)
                   return
                }
                else {
                    console.log("Session:")
                    console.log(session.getAccessToken().getJwtToken())
                    const loginsObj = {
                        "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_GGR1owL6e" : session.getIdToken().getJwtToken()
                    }
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : 'eu-west-1:56bfb4d0-0fb5-429c-98cb-47fa46b43f36',
                        Logins : loginsObj
                    })
                }
            })
        } else {
            this.setState({
                logInAlbums: false
            })
        }

        AWS.config.update({
          region: bucketRegion,
          // credentials: new AWS.CognitoIdentityCredentials({
          //   IdentityPoolId: IdentityPoolId
          // })
        });

        var s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {
              Bucket: albumBucketName,
              Prefix: "albums/",
              Delimiter: "/"
          }
        });

        var listObjectPromise = s3.listObjectsV2().promise();
        listObjectPromise.then((data) => {
            data.Contents.shift() // remove empty album path
            this.setState({
                    s3Data: data.CommonPrefixes

            })
            return data

        }).then((data) => {
            console.log(data)
            data.CommonPrefixes.map((element, index) => {
                var params = {
                    Prefix: element.Prefix,
                    Delimiter: ""
                };
                var getCoverPromise = s3.listObjectsV2(params).promise();
                getCoverPromise.then((data) => {
                    // console.log("Inner promise:")
                    var album=element.Prefix.split("/")[1]
                    var cover=data.Contents[1].Key
                    // console.log(album+":"+cover)
                    var currentState = this.state.albumCovers
                    currentState[album] = cover
                    this.setState({
                        albumCover: currentState
                    })
                    console.log(this.state.albumCover)
                })
            })

        })
        .catch((err) => {
            console.log(err, err.stack); // an error occurred
            return null
        });


        // var listObjectPromise = s3.listObjectsV2().promise();
        // listObjectPromise.then((data) => {
        //     data.Contents.shift() // remove empty album path
        //     this.setState({
        //             s3Data: data.CommonPrefixes
        //
        //     })
        // }).catch(function(err){
        //     console.log(err, err.stack); // an error occurred
        //     return null
        // });


    }

    // handleClickAlbum = (event) => {
    //     console.log(event.target)
    //     let x = event.target.innerHTML
    //     console.log(x)
    //     return x
    //
    // }
    render(){
        console.log(this.state.s3Data)
        if(this.state.logInAlbums) {
            return(
                <div>
                <Header navHeader='listAlbums'/>
                <div className="listAlbumsMain">
                <div className="container-fluid">
                <Grid>
                    <Row className="show-grid">

                {
                    this.state.s3Data.map((element, index) => {
                        var albumName = element.Prefix.split("/")[1]
                        return(

                            <Col xl={4} lg={4} md={6} sm={12} xs={12} key={index}>

                            <Link to={`/ListImages/${albumName}/mosaic`}>
                            <Thumbnail src={this.state.httpPrefix + encodeURIComponent(this.state.albumCovers[albumName])}/>
                            </Link>

                            </Col>
                        )
                    })

                }
                </Row>
                </Grid>
                </div>
                </div>
                <Footer />
                </div>
            )
        } else {
            return(
                <LogIn />
            )
        }

    }
}

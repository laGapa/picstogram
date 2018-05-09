import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, CognitoIdentityCredentials, WebIdentityCredentials, AmazonCognitoIdentity, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import 'normalize.css'



export class LogOut extends Component {
    constructor(){
        super()
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
          cognitoUser.signOut();
        }

    }
    render(){
        return <Redirect to ="/LogIn" push={true}/>
    }
}

import React, { Component, Fragment } from "react";
import { Image, Grid, Col, Thumbnail, Row } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { LogIn } from "../../components/LogIn/LogIn";
import { ListImages } from "../../components/ListImages/ListImages";
import { ListAlbums } from "../../components/ListAlbums/ListAlbums";
import { SignUp } from "../../components/SignUp/SignUp";
import { LogOut } from "../../components/LogOut/LogOut";
import "normalize.css";
import "./App.scss";

import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    NavLink
} from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            s3Data: [],
            httpPrefix: "https://s3-eu-west-1.amazonaws.com/picstogram/"
            // jwtToken: 'trelemorele'
        };
    }

    // setJwtToken = (token) => {
    //     console.log('odpalam się')
    //     this.setState({
    //         jwtToken: token
    //     })
    // }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <LogIn />} />

                <Route exact path="/LogIn" render={() => <LogIn />} />

                <Route exact path="/SignUp" render={() => <SignUp />} />

                <Route exact path="/ListAlbums" render={() => <ListAlbums />} />

                <Route
                    path="/ListImages/:albumName/:viewMode"
                    component={ListImages}
                />

                <Route path="/LogOut" component={LogOut} />
            </Switch>
        );
    }
}

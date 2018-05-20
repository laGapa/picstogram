import React, { Component } from "react";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Button
} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import "normalize.css";
import "./Header.scss";

export class Header extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        if (this.props.navHeader == "LoggIn") {
            return (
                <Navbar inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <FontAwesome
                                name="logo"
                                className="fas fa-camera-retro"
                                style={{ fontSize: "25px", color: "white" }}
                            />
                            <a
                                href="#brand"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    wordSpacing: "0.2em",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                {" "}
                                Picstogram
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem
                                eventKey={1}
                                href="/#/LogIn"
                                disabled={true}
                            >
                                Log in
                            </NavItem>
                            <NavItem eventKey={2} href="/#/SignUp">
                                Sign up
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else if (this.props.navHeader == "listImages") {
            console.log(this.props.albumName);
            // console.log(this.props.viewMode)
            return (
                <Navbar inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <FontAwesome
                                name="logo"
                                className="fas fa-camera-retro"
                                style={{ fontSize: "25px", color: "white" }}
                            />
                            <a
                                href="#brand"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    wordSpacing: "0.2em",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                {" "}
                                Picstogram
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown
                                eventKey={3}
                                title="Image"
                                id="basic-nav-dropdown"
                            >
                                <MenuItem href="/#/" eventKey={3.1}>
                                    Add picture
                                </MenuItem>
                                <MenuItem eventKey={3.2}>
                                    Delete picture
                                </MenuItem>
                            </NavDropdown>
                            <NavDropdown
                                eventKey={3}
                                title="View"
                                id="basic-nav-dropdown"
                            >
                                <MenuItem
                                    href={`/#/ListImages/${
                                        this.props.albumName
                                    }/mosaic`}
                                    eventKey={3.1}
                                >
                                    Mosaic
                                </MenuItem>
                                <MenuItem
                                    href={`/#/ListImages/${
                                        this.props.albumName
                                    }/slider`}
                                    eventKey={3.2}
                                >
                                    Slider
                                </MenuItem>
                                <MenuItem
                                    href={`/#/ListImages/${
                                        this.props.albumName
                                    }/slideShow`}
                                    eventKey={3.3}
                                >
                                    Slide show
                                </MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={1} href="/#/ListAlbums">
                                <FontAwesome
                                    name="undo"
                                    className="fas fa-undo"
                                />{" "}
                                Albums
                            </NavItem>
                            <NavItem eventKey={1} href="/#/LogOut">
                                Log out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (
                <Navbar inverse collapseOnSelect fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <FontAwesome
                                name="logo"
                                className="fas fa-camera-retro"
                                style={{ fontSize: "25px", color: "white" }}
                            />
                            <a
                                href="#brand"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    wordSpacing: "0.2em",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                {" "}
                                Picstogram
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                Create new album
                            </NavItem>
                            <NavItem eventKey={1} href="#">
                                Delete album
                            </NavItem>
                            <NavItem eventKey={2} href="/#/LogOut">
                                Log out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}

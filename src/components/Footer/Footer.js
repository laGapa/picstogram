import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import { Navbar } from 'react-bootstrap'
// import 'normalize.css'
import './Footer.scss'

export class Footer extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    render(){

            return(
                <footer className="footer">
                    <div>
                        <p>
                            <span>
                                <FontAwesome name="copyright" className="far fa-copyright" />
                            </span>
                                2018 Copyright by
                            <a href="#" > laGapa</a>
                        </p>

                    </div>
                </footer>
            )

        }

    }

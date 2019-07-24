import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import fire from '../../config/Fire'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }
    render() {
        const { branding } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark  gradientNav mb-3">
                <div className="container" style={{color:'white'}}>
                    <a href="/" className="navbar-brand">{branding}</a>
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li >
                            <Link to="/quizzes" className="navbar-brand">
                                   Quizzes
                               </Link>
                        
                            </li>

                            <li className="navbar-item">
                            <Link to="/contactus" className="navbar-brand">
                                   Contact Us
                            </Link>
                        
                            </li>

                            <li >
                            <Link to="/addquiz" className="navbar-brand">
                                   Add Quiz
                               </Link>
                        
                            </li>
                            <li >
                            <Link to="/faq" className="navbar-brand">
                                   FAQ's
                               </Link>
                        
                            </li>
                            <li >
                             <button className="btn btn-secondary" onClick={this.logout}>Log Out</button>
                        
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

Header.propTypes = {
    branding:PropTypes.string.isRequired
};
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
export default class Header extends Component {
    render() {
        const { branding } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3">
                <div className="container">
                    <a href="/" className="navbar-brand">{branding}</a>
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/" block color='success' className='btn btn-md btn-success my-1'>
                                   Contacts
                               </Link>
                        
                            </li>

                            <li className="navbar-item">
                            <Link to="/contactus" block color='success' className='btn btn-md btn-success my-1'>
                                   Contact Us
                            </Link>
                        
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
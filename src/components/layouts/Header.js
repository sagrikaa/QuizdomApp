import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import fire from '../../config/Fire'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
    }

    state={
        toggle:false
    }

    logout() {
        fire.auth().signOut();
    }

toggleMenu=()=>{
    
    this.setState({toggle:!this.state.toggle})
    console.log(this.state.toggle);
  }

    render() {
        const { branding } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark sticky-top gradientNav mb-3">
                <div className="container" style={{color:'white'}}>
                    <a href="/" className="navbar-brand">{branding}</a>
{/*                  
                  <form class="form-inline">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <button class="btn" type="submit">Search</button>
                    </form> */}
                  

                   {/* <div  className={this.state.toggle?'topnav responsive':'topnav'} id="myTopnav"> */}
                   <div  className={this.state.toggle?'topnav responsive':'topnav'} id="myTopnav">
                        <ul className="mr-auto">
                            <li >
                               <Link to="/quizzes" className="navbar-brand" >
                                   Quizzes
                               </Link>
                              
                            </li>

                            <li>
                            
                            <Link to="/addquiz" className="navbar-brand ">
                                   Create
                               </Link>
                            </li>

                            <li >
                            <Link to="/contactus" className="navbar-brand">
                                   Contact Us
                            </Link>
                           </li>
                            <li >
                            <Link to="/faq" className="navbar-brand">
                                   FAQ's
                               </Link>
                        
                            </li>
                            <li >
                             <button className="btn navbar-brand" onClick={this.logout}>Log Out</button>
                            </li>

                            <li className='icon' >
                            <button  className='btn' onClick={this.toggleMenu}>
                                <i className="fa fa-bars"></i>
                            </button>
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
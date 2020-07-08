import React,{useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {UserContext} from '../UserContext'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header=(props)=> {
	const value = useContext(UserContext);

	const handleLogout=()=> {
		value.logout();
		alert('You have successfully Logged out!!');
		// return <Redirect to="/login" />
	}

		return (
			<>
			<style type="text/css">
				{	`.navbar-brand 
					{
							font-size:2rem;
							font-weight:300;
    			}`
				}
				</style>

			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				
				<Navbar.Brand href="#home">Quizdom</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link>
							<Link to="/quizzes" className="navbar-brand">
								Quiz
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/addquiz" className="navbar-brand">
								Create
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/contactus" className="navbar-brand">
								Contact Us
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/faq" className="navbar-brand">
								FAQ
							</Link>
						</Nav.Link>
						<Nav.Link>
							{value.user ? (
								<button className="btn navbar-brand" onClick={handleLogout}>
									Log Out
								</button>
							) : (
									<Link to="/login" className="navbar-brand">
										Login
									</Link>
							)}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar></>
		);
	}


export default Header;
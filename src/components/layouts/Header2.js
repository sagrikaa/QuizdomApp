import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	state = {
		toggle: false
	};

	logout() {
		this.context.logout();
		this.setState({ redirected: true });
		alert('You have successfully Logged out!!');
	}

	toggleMenu = () => {
		this.setState({ toggle: !this.state.toggle });
		console.log(this.state.toggle);
	};

	render() {
		return (
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
							{this.context.user ? (
								<button className="btn navbar-brand" onClick={this.logout}>
									Log Out
								</button>
							) : (
								<span>
									<Link to="/login" className="navbar-brand">
										Login
									</Link>
									<Redirect to="/login" />
								</span>
							)}
						</Nav.Link>
						{/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
					{/* <Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
					</Nav> */}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
Header.contextType = UserContext;
Header.propTypes = {
	branding: PropTypes.string.isRequired
};

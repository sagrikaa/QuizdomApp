import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
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
		const { branding } = this.props;
		return (
			<nav className="navbar navbar-expand-sm navbar-dark sticky-top gradientNav mb-3">
				<div className="container" style={{ color: 'white' }}>
					<a href="/" className="navbar-brand">
						{branding}
					</a>

					<div className={this.state.toggle ? 'topnav responsive' : 'topnav'} id="myTopnav">
						<ul className="mr-auto">
							<li>
								<Link to="/quizzes" className="navbar-brand">
									Quiz
								</Link>
							</li>

							<li>
								<Link to="/addquiz" className="navbar-brand">
									Create
								</Link>
							</li>

							<li>
								<Link to="/contactus" className="navbar-brand">
									Contact Us
								</Link>
							</li>
							<li>
								<Link to="/faq" className="navbar-brand">
									FAQ
								</Link>
							</li>
							<li>
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
							</li>

							<li className="icon">
								<button className="btn" onClick={this.toggleMenu}>
									<i className="fa fa-bars" />
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
Header.contextType = UserContext;
Header.propTypes = {
	branding: PropTypes.string.isRequired
};

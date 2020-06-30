/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.state = {
			name: '',
			email: 'sagrika@gmail.com',
			password: '123456',
			redirect: false
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	login(e) {
		e.preventDefault();
		this.context.login(this.state.email, this.state.password);
	}

	signup(e) {
		e.preventDefault();
		this.context.signup(this.state.email, this.state.email, this.state.password);
		if (this.context.user) this.setState({ redirect: true });
	}

	render() {
		const { from } = this.props.location || { from: { pathname: '/' } };

		if (this.context.user) return <Redirect to={from} />;

		return (
			<form className="form form-login">
				<div className="form_group">
					<input
						type="email"
						className="form_input"
						placeholder="Email"
						id="email"
						required
						value={this.state.email}
						onChange={this.handleChange}
						name="email"
						aria-describedby="emailHelp"
					/>
					<label htmlFor="email" className="form_label">
						Email
					</label>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form_group">
					<input
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
						name="password"
						id="password"
						className="form_input"
						placeholder="Password"
						required
					/>
					<label htmlFor="password" className="form_label">
						Password
					</label>
				</div>
				<button type="submit" onClick={this.login} className="btn btn-primary">
					Login
				</button>
				<button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">
					Signup
				</button>
			</form>
		);
	}
}

Login.contextType = UserContext;
export default Login;

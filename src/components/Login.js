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
			email: '',
			password: '',
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
		if (this.context.user) {
			return <Redirect to={from} />;
		}
		return (
			<React.Fragment>
				<div className=" card col-sm-4 offset-sm-4 mt-5 mb-5">
					<form>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input
								value={this.state.email}
								onChange={this.handleChange}
								type="email"
								name="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
								required
							/>
							<small id="emailHelp" className="form-text text-muted">
								We'll never share your email with anyone else.
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								value={this.state.password}
								onChange={this.handleChange}
								type="password"
								name="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								required
							/>
						</div>
						<button type="submit" onClick={this.login} className="btn btn-primary">
							Login
						</button>
						<button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">
							Signup
						</button>
						<br />
						<br />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

Login.contextType = UserContext;
export default Login;

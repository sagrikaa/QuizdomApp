import React, { Component } from 'react';
import fire from '../config/Fire';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	login(e) {
		e.preventDefault();
		fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {}).catch((error) => {
			console.log(error);
			alert('Login Failed');
		});

		axios
			.post('https://quizdom-backend.herokuapp.com/api/auth', {
				email: this.state.email,
				password: this.state.password
			})
			.then((res) => {
				sessionStorage.setItem('credToken', res.data.token);
				alert(`Login Successful with token ${res.data.token}`);
			})
			.catch((error) => {
				console.log(error);
				alert('Login Failed');
			});
	}

	signup(e) {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((u) => {})
			.then((u) => {
				console.log(u);
				alert('Sign Up Successful!');
			})
			.catch((error) => {
				console.log(error);
				alert('Sign Up Failed. Please Provide Email and Passwords');
			});
	}
	render() {
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
export default Login;

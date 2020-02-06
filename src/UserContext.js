import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [ user, setUser ] = useState();

	const signup = (name, email, password) => {
		axios
			.post('https://quizdom-backend.herokuapp.com/api/user', {
				name,
				email,
				password
			})
			.then((res) => {
				//Setting token for the whole session
				sessionStorage.setItem('auth-token', res.data.token);
				setGlobalUser(res.data.token);
				alert(`Sign Up Successful with token`);
			})
			.catch((error) => {
				console.log(error);
				alert('Sign Up Failed');
			});
	};
	//working properly
	const login = (email, password) => {
		axios
			.post('https://quizdom-backend.herokuapp.com/api/auth', {
				email,
				password
			})
			.then((res) => {
				//Setting token for the whole session
				sessionStorage.setItem('auth-token', res.data.token);
				setGlobalUser(res.data.token);
				alert(`Login Successful with token`);
			})
			.catch((error) => {
				console.log(error);
				alert('Login Failed with token');
			});
	};

	const logout = () => {
		sessionStorage.removeItem('auth-token');
		setUser(null);
	};

	async function setGlobalUser(token) {
		const headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'x-auth-token': token
		};
		await axios
			.get('https://quizdom-backend.herokuapp.com/api/auth', { headers })
			.then((res) => {
				setUser(res.data);
			})
			.catch((error) => {
				console.log(error);
				alert('Login Failed');
			});
	}

	return (
		<UserContext.Provider value={{ user, setUser, logout, login, signup }}>{props.children}</UserContext.Provider>
	);
};

export const UserConsumer = UserContext.Consumer;

/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [ user, setUser ] = useState();
	const [ token, setToken ] = useState(sessionStorage.getItem('auth-token') || '');

	useEffect(
		() => {
			if (token) sessionStorage.setItem('auth-token', token);
			else sessionStorage.removeItem('auth-token');

			setGlobalUser(token);
		},
		[ token ]
	);

	const signup = (name, email, password) => {
		axios
			.post('https://quizdom-backend.herokuapp.com/api/user', {
				name,
				email,
				password
			})
			.then((res) => {
				//Setting token for the whole session
				setToken(res.data.token);
				alert(`Sign Up Successful!`);
			})
			.catch((error) => {
				console.log(error);
				alert('Sign Up Failed');
			});
	};

	//Stores token in session storage
	const login = (email, password) => {
		// If login id and password is correct, request a token

		axios
			.post('https://quizdom-backend.herokuapp.com/api/auth', {
				email,
				password
			})
			.then((res) => {
				//Setting token for the whole session
				const auth_token = res.data.token;
				setToken(auth_token);
				alert.show(`Successfully logged in!`);
			})
			.catch((error) => {
				console.log(error);
				alert('Wrong UserName or Password!');
			});
	};

	const logout = () => {
		setToken(null);
		// setUser(null);
	};

	function setGlobalUser(token) {
		if (token) {
			const headers = {
				'Content-Type': 'application/json; charset=utf-8',
				'x-auth-token': token
			};
			axios
				.get('https://quizdom-backend.herokuapp.com/api/auth', { headers })
				.then((res) => {
					setUser(res.data);
				})
				.catch((error) => {
					console.log(error);
					alert('Login Failed');
				});
		} else setUser(null);
	}

	return <UserContext.Provider value={{ user, logout, login, signup }}>{props.children}</UserContext.Provider>;
};

export const UserConsumer = UserContext.Consumer;

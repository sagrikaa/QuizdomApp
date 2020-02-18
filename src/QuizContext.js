/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuizContext = createContext();

export const QuizProvider = (props) => {
	const [ categories, setCategory ] = useState([]);
	const [ quiz, setQuiz ] = useState({});

	const createQuiz = (name, category, diff, description) => {
		console.log('hey');
		// setQuiz({ name, category, diff, description });
		// console.log(quiz);
	};
	useEffect(() => {
		axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => setCategory(res.data));
	}, []);

	return <QuizContext.Provider value={{ categories, createQuiz }}>{props.children}</QuizContext.Provider>;
};

export const QuizConsumer = QuizContext.Consumer;

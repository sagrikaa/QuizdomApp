/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Redirect } from 'react-router-dom';

export const QuizContext = createContext();

export const QuizProvider = (props) => {
	const [ categories, setCategory ] = useState([]);
	const [ quiz, setQuiz ] = useState({});
	const value = useContext(UserContext);

	const postQuiz = (published) => {
		console.log(value);
		let quiz_temp = quiz;
		quiz_temp.creatorId = value.user._id;
		quiz_temp.published = published;
		axios.post('https://quizdom-backend.herokuapp.com/api/quiz', quiz_temp).then((res) => {
			console.log(res.data);
			alert('Success!!');
		});
	};
	const createQuiz = (name, category, difficult, description, questionset) => {
		setQuiz({ name, category, difficult, description, questionset });
	};
	const addQuestion = (set) => {
		if (quiz.questionset) {
			let quiz_temp = quiz;
			quiz_temp.questionset.push(set);
			setQuiz(quiz_temp);
		} else {
			alert('No Quiz selected! Please go back to create quiz!');
		}
	};
	useEffect(
		() => {
			axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => setCategory(res.data));
			console.log(quiz);
		},
		[ quiz ]
	);

	return (
		<QuizContext.Provider value={{ quiz, categories, createQuiz, addQuestion, postQuiz }}>
			{props.children}
		</QuizContext.Provider>
	);
};

export const QuizConsumer = QuizContext.Consumer;

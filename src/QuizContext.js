/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
// import { Redirect } from 'react-router-dom';

export const QuizContext = createContext();

export const QuizProvider = (props) => {
	//General App data
	const [ quizzes, setQuizzes ] = useState({});
	const [ categories, setCategories ] = useState([]);
	const [ faq, setFaq ] = useState({});

	//New quiz related data
	const [ quiz, setQuiz ] = useState({});
	const [ category, setCategory ] = useState([]);

	const value = useContext(UserContext);

	useEffect(() => {
		axios.get('https://quizdom-backend.herokuapp.com/api/quiz').then((res) => {
			setQuizzes(res.data);
		});

		axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => {
			setCategories(res.data);
		});

		axios.get('https://quizdom-backend.herokuapp.com/api/faq').then((res) => {
			setFaq(res.data);
		});
	}, []);

	const postQuiz = (published) => {
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
		<QuizContext.Provider value={{ quizzes, faq, categories, quiz, category, createQuiz, addQuestion, postQuiz }}>
			{props.children}
		</QuizContext.Provider>
	);
};

export const QuizConsumer = QuizContext.Consumer;

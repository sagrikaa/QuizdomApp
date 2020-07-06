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
	const [ quizzes, setQuizzes ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ faqs, setFaqs ] = useState([]);

	//New quiz related data
	const [ quiz, setQuiz ] = useState({});
	const [ category, setCategory ] = useState([]);

	const value = useContext(UserContext);

	//Publish Quiz
	const postQuiz = (published) => {
		let quiz_temp = quiz;
		quiz_temp.creatorId = value.user._id;
		quiz_temp.published = published;
		axios.post('https://quizdom-backend.herokuapp.com/api/quiz', quiz_temp).then((res) => {
			console.log(res.data);
			alert('Success!!');
		});
	};

	//Create a quiz
	const createQuiz = (name, category, difficult, description, questionset) => {
		setQuiz({ name, category, difficult, description, questionset });
	};

	//Add question to a quiz
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
			//Get existing catgories from the api
			axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => setCategory(res.data));

			//get all quizzes from the api
			axios.get('https://quizdom-backend.herokuapp.com/api/quiz').then((res) => {
				setQuizzes(res.data);
			});

			axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => {
				setCategories(res.data);
			});

			//get all the faq from the api
			axios.get('https://quizdom-backend.herokuapp.com/api/faq').then((res) => {
				setFaqs(res.data);
			});
		},
		[ quiz ]
	);

	// useEffect(() => {}, [ quiz ]);
	return (
		<QuizContext.Provider value={{ quizzes, faqs, categories, quiz, category, createQuiz, addQuestion, postQuiz }}>
			{props.children}
		</QuizContext.Provider>
	);
};

export const QuizConsumer = QuizContext.Consumer;

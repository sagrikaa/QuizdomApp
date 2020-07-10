/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useAlert } from 'react-alert';
export const QuizContext = createContext();

export const QuizProvider = (props) => {
	//General App data
	const [ quizzes, setQuizzes ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ faqs, setFaqs ] = useState([]);
	const alert = useAlert();

	//New quiz related data
	const [ quizDraft, setQuizDraft ] = useState({});
	// const [ category, setCategory ] = useState([]);

	const value = useContext(UserContext);

	//Publish Quiz
	const postQuiz = (published) => {
		let unsavedQuiz = { ...quizDraft };
		unsavedQuiz.published = published;
		axios.post('https://quizdom-backend.herokuapp.com/api/quiz', unsavedQuiz).then((res) => {
			setQuizDraft({});
			alert.success('Quiz successfully published!!');
		});
	};

	//Create a quiz
	const createQuiz = (name, category, difficult, description, questionset) => {
		const unsavedQuiz = {
			name,
			category,
			difficult,
			description,
			creatorId: value.user._id,
			questionset
		};
		setQuizDraft(unsavedQuiz);
	};

	//Add question to a quiz
	const addQuestion = (set) => {
		if (Object.entries(quizDraft).length > 0) {
			let quiz_temp = { ...quizDraft };
			quiz_temp.questionset.push(set);
			setQuizDraft(quiz_temp);
		} else {
			alert.error('No Quiz selected! Redirecting to create quiz!');
		}
	};

	useEffect(() => {}, [ quizDraft ]);
	useEffect(
		() => {
			if (Object.entries(quizDraft).length > 0) {
				// When you want to more than one drafts
				// let unsavedQuizzes = JSON.parse(localStorage.getItem('unsavedQuizzes')) || [];
				// unsavedQuizzes = [ ...unsavedQuizzes, quizDraft ];
				// localStorage.setItem('unsavedQuizzes', JSON.stringify(unsavedQuizzes));
				localStorage.setItem('unsavedQuiz', JSON.stringify(quizDraft));
			}
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
		[ quizDraft ]
	);

	// useEffect(() => {}, [ quiz ]);
	return (
		<QuizContext.Provider value={{ quizzes, faqs, categories, quizDraft, createQuiz, addQuestion, postQuiz }}>
			{props.children}
		</QuizContext.Provider>
	);
};

export const QuizConsumer = QuizContext.Consumer;

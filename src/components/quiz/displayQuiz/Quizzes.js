//No react-bootstrap

import React, { useContext } from 'react';
import { Quiz } from './Quiz';
import { QuizContext } from '../../../QuizContext';

const Quizzes = (props) => {
	const value = useContext(QuizContext);
	const { quizzes } = value;

	return <div className="quizzes">{quizzes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)}</div>;
};

export default Quizzes;

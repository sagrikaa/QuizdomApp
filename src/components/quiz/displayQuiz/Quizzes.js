import React, { useContext } from 'react';
import { Quiz } from './Quiz';
import { QuizContext } from '../../../QuizContext';

const Quizzes = (props) => {
	const value = useContext(QuizContext);
	const { quizzes } = value;

	return (
		<div className="row">
			<div className="col-sm-8 offset-sm-2">{quizzes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)}</div>
		</div>
	);
};

export default Quizzes;

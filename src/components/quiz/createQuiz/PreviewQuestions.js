import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PreviewQuestion from './PreviewQuestion';
import { QuizContext } from '../../../QuizContext';
export default function PreviewQuestions(props) {
	const [ questionset, setQuestionset ] = useState([]);
	const [ quiz, setQuiz ] = useState({});
	const value = useContext(QuizContext);

	useEffect(() => {
		// axios.get(`https://quizdom-backend.herokuapp.com/api/quiz/${props.id}`).then((res) => {
		// 	setQuiz(res.data);
		// 	// console.log(res.data);
		// 	setQuestionset(res.data.questionset);
		// });
		setQuiz(value.quiz);
		setQuestionset(value.quiz.questionset);
	});

	return (
		<React.Fragment>
			<h3 className="card-header gradientNav">{quiz.name}(Preview)</h3>
			<div className="card-body">
				<ul className="list-group list-group-flush">
					{questionset ? (
						questionset.map((quest, index) => (
							<li key={index} className="list-group-item">
								<div className="form-group">
									<PreviewQuestion question={quest} id={index + 1} />

									<div>
										<label>Answer: {quest.correctAns}</label>
									</div>
								</div>
							</li>
						))
					) : null}
				</ul>
			</div>
		</React.Fragment>
	);
}

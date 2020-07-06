import React, { useState, useEffect, useContext } from 'react';
import PreviewQuestion from './PreviewQuestion';
import { QuizContext } from '../../../QuizContext';
import ReactModal from 'react-modal';

export default function PreviewQuiz(props) {
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

	// return (
	// 	<div className="box preview-quiz">

	// 	</div>
	// );
	const handleClose = () => {};
	return (
		<div>
			<ReactModal
				isOpen={props.isOpen}
				onRequestClose={() => {
					props.setIsOpen(false);
				}}
				ariaHideApp={false}
				style={{
					overlay: {
						position: 'fixed',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0, 0.4)'
					},
					content: {
						position: 'unset',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: '#fff',
						border: '1px solid #ccc',
						overflow: 'auto',
						WebkitOverflowScrolling: 'touch',
						borderRadius: '.4rem',
						padding: '20rem',
						textTransform: 'uppercase'
						// fontSize: '3rem'
						// color: 'white'
					}
				}}>
				<h3 className="heading-3">{quiz.name} (Preview)</h3>
				{questionset ? (
					<ul className="play_questions-list">
						{questionset.map((quest, index) => (
							<li key={index} className="play_questions-list--item">
								<PreviewQuestion question={quest} id={index + 1} />
							</li>
						))}
					</ul>
				) : (
					'No questions added'
				)}
			</ReactModal>
		</div>
	);
}

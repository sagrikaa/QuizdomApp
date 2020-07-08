import React, { useState, useEffect, useContext } from 'react';
import PreviewQuestion from './PreviewQuestion';
import { QuizContext } from '../../../QuizContext';
import ReactModal from 'react-modal';

export default function PreviewQuiz(props) {
	// const { quizDraft, postQuiz } = props;
	// const { questionset } = quizDraft;
	const quizDraft = JSON.parse(localStorage.getItem('unsavedQuiz'));
	const { questionset } = quizDraft;
	return (
		<ReactModal
			isOpen={props.isOpen}
			onRequestClose={() => props.setIsOpen(false)}
			ariaHideApp={false}
			overlayClassName="preview-quiz_overlay"
			className="preview-quiz_content">
			<h3 className="heading-3">{quizDraft.name} (Preview)</h3>
			{questionset ? (
				<ul className="preview-quiz_questions_list">
					{questionset.map((quest, index) => (
						<li key={index} className="preview-quiz_questions_list--item">
							<PreviewQuestion question={quest} id={index + 1} />
						</li>
					))}
				</ul>
			) : (
				'No questions added'
			)}
			<button type="button" className="button button-green" value="Save" onClick={() => props.postQuiz(true)}>
				Publish
			</button>
		</ReactModal>
	);
}

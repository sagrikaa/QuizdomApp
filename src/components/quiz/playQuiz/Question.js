/****************************/
/* @author: Sagrika Aggarwal*/
/*****************************/

import React from 'react';

const TickCross = (props) => {
	if (props.selectedOption.trim() === props.correctAns.trim()) {
		return <i className="tick fas fa-check " />;
	} else {
		return <i className="cross fas fa-times " />;
	}
};

const Question = ({ set, index, showAnswer, reset, selectedOption, handleSelectedOptionChange }) => {
	const handleChange = (e) => {
		handleSelectedOptionChange(index - 1, e.target.value);
	};

	const { question, options, _id, correctAns } = set;
	return (
		<div className="question">
			<h5 className="question_heading">
				{/* renders a tick/cross for each right wrong answer */}
				{showAnswer && (
					<TickCross correctAns={correctAns} selectedOption={selectedOption} showAnswer={showAnswer} />
				)}
				<span>{`${index}.`}</span>
				{question}
			</h5>
			{options.map((option, i) => {
				return (
					<div className="form_radio-group" key={i}>
						<input
							type="radio"
							name={_id}
							id={option}
							value={option}
							checked={selectedOption === option}
							onChange={handleChange}
							className="form_radio-input"
						/>
						<label htmlFor={option} className="form_radio-label">
							<span className="form_radio-button" />

							{option}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default Question;

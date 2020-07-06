import React, { Component } from 'react';

export default class PreviewQuestion extends Component {
	render() {
		const { question, id } = this.props;
		const { correctAns, options, _id } = question;

		return (
			<div className="form_group">
				<h5 className="question_heading">
					<span>{`${id}.`}</span>
					{question}
				</h5>
				<label htmlFor="name">
					<span>{id}.</span> {question.question}
				</label>

				{options.map((option, i) => (
					// <div className="radio" disabled key={i}>
					// 	<label>
					// 		<input
					// 			type="radio"
					// 			name={question._id}
					// 			value={option}
					// 			checked={correctAns === option}
					// 			readOnly
					// 		/>
					// 		{option}
					// 	</label>
					// </div>
					<div className="form_radio-group" key={i}>
						<input
							type="radio"
							name={_id}
							id={option}
							value={option}
							checked={correctAns === option}
							disabled
							className="form_radio-input"
						/>
						<label htmlFor={option} className="form_radio-label">
							<span className="form_radio-button" />
							{option}
						</label>
					</div>
				))}

				<label>Answer: {question.correctAns}</label>
			</div>
		);
	}
}

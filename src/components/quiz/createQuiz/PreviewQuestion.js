import React, { Component } from 'react';

export default class PreviewQuestion extends Component {
	render() {
		const { question, id } = this.props;
		const { correctAns, options, _id } = question;
		const questionText = question.question;
		return (
			<div className="form_group">
				<h5 className="question_heading">
					<span>{`${id}.`}</span>
					{questionText}
				</h5>

				{options.map((option, i) => (
					<div className="form_radio-group" key={i}>
						<input type="radio" checked={question.correctAns === option} className="form_radio-input" />
						<label htmlFor={option} className="form_radio-label">
							<span className="form_radio-button" />
							{option}
						</label>
					</div>
				))}

				<label style={{ color: 'blue' }}>Answer:{question.correctAns}</label>
			</div>
		);
	}
}

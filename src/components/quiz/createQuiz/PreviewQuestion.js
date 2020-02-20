import React, { Component } from 'react';

export default class PreviewQuestion extends Component {
	render() {
		const { question, id } = this.props;
		const { correctAns } = question;

		return (
			<div>
				<label htmlFor="name">
					<span>{id}.</span> {question.question}
				</label>

				{question.options.map((option, i) => (
					<div className="radio" disabled key={i}>
						<label>
							<input
								type="radio"
								name={question._id}
								value={option}
								checked={correctAns === option}
								readOnly
							/>
							{option}
						</label>
					</div>
				))}
			</div>
		);
	}
}

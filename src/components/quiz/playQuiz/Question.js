/*****************************\
| * @author: Sagrika Aggarwal.|	
\*****************************/

import React, { Component } from 'react';

const TickCross = (props) => {
	if (props.selectedOption.trim() === props.correctAns.trim()) {
		return <i className="tick fas fa-check " />;
	} else {
		return <i className="cross fas fa-times " />;
	}
};

export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: ''
			// selectedOptionId: 0
		};
	}

	componentDidUpdate() {
		// this.props.reset && this.setState({ selectedOption: '' });
	}

	handleChange = (e) => {
		this.setState({ selectedOption: e.target.value });
		this.props.alterResultArray(this.props.index - 1, e.target.value);
	};
	render() {
		const { set, index, showAnswer } = this.props;
		const { question, options, _id, correctAns } = set;
		return (
			<div className="question">
				<h5 className="question_heading">
					{/* renders a tick/cross for each right wrong answer */}
					{showAnswer && (
						<TickCross
							correctAns={correctAns}
							selectedOption={this.state.selectedOption}
							showAnswer={showAnswer}
						/>
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
								checked={this.state.selectedOption === option}
								onChange={this.handleChange}
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
	}
}

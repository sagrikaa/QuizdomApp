/*****************************\
| * @author: Sagrika Aggarwal.|	
\*****************************/

import React, { Component } from 'react';

const TickCross = (props) => {
	if (props.selectedOption.trim() === props.correctAns.trim()) {
		return <i className="fas fa-check tick" style={{ cursor: 'pointer', float: 'left', color: '#90D5EC' }} />;
	} else {
		return <i className="fas fa-times" style={{ cursor: 'pointer', float: 'left', color: 'red' }} />;
	}
};

export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			selectedOptionId: 0
		};
	}

	handleChange = (e) => {
		this.setState({ selectedOption: e.target.value });
		this.props.alterResultArray(this.props.index - 1, e.target.value);
	};
	render() {
		const { set, index, getResult } = this.props;
		const { question, options, _id, correctAns } = set;
		return (
			// <div className="question">
			// 	<label htmlFor="question">
			// 		{/* renders a tick/cross for each right wrong answer */}
			// 		{getResult && (
			// 			<TickCross
			// 				correctAns={correctAns}
			// 				selectedOption={this.state.selectedOption}
			// 				getResult={getResult}
			// 			/>
			// 		)}
			// 		<span>{index}. </span> {question}
			// 	</label>
			// 	{options.map((option, i) => {
			// 		return (
			// 			<div className="radio" key={i}>
			// 				<label>
			// 					<input
			// 						type="radio"
			// 						name={_id}
			// 						value={option}
			// 						checked={this.state.selectedOption === option}
			// 						onChange={this.handleChange}
			// 					/>
			// 					{option}
			// 				</label>
			// 			</div>
			// 		);
			// 	})}
			// </div>
			<div className="question">
				<h5 className="question_heading">
					{/* renders a tick/cross for each right wrong answer */}
					{getResult && (
						<TickCross
							correctAns={correctAns}
							selectedOption={this.state.selectedOption}
							getResult={getResult}
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
								<span class="form_radio-button" />

								{option}
							</label>
						</div>
					);
				})}
			</div>
		);
	}
}

// //returns a tick or cross for each right/wrong answer
// renderTickCross = (correctAns) => {
// 	if (this.props.getResult) {
// 		if (this.state.selectedOption.trim() === correctAns.trim()) {
// 			return <i className="fas fa-check" style={{ cursor: 'pointer', float: 'left', color: '#90D5EC' }} />;
// 		} else {
// 			return <i className="fas fa-times" style={{ cursor: 'pointer', float: 'left', color: 'red' }} />;
// 		}
// 	}
// 	return null;
// };

// onChange={() => {
// 	this.setState({ selectedOption: option, selectedOptionId: i });
// }}

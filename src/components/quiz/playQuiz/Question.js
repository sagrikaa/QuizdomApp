import React, { Component } from 'react';

// const TickCross = (props) => {
// 	if (props.getResult === true) {
// 		if (props.selectedOption.trim() === props.correctAns.trim()) {
// 			return <i className="fas fa-check" style={{ cursor: 'pointer', float: 'left', color: '#90D5EC' }} />;
// 		} else {
// 			return <i className="fas fa-times" style={{ cursor: 'pointer', float: 'left', color: 'red' }} />;
// 		}
// 	}
// 	return null;
// };
export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			selectedOptionId: 0
		};
	}

	//returns a tick or cross for each right/wrong answer
	renderTickCross = (correctAns) => {
		if (this.props.getResult) {
			if (this.state.selectedOption.trim() === correctAns.trim()) {
				return <i className="fas fa-check" style={{ cursor: 'pointer', float: 'left', color: '#90D5EC' }} />;
			} else {
				return <i className="fas fa-times" style={{ cursor: 'pointer', float: 'left', color: 'red' }} />;
			}
		}
		return null;
	};

	handleChange = (e) => {
		this.setState({ selectedOption: e.target.value });
		this.props.alterResultArray(this.props.index - 1, e.target.value);
	};
	render() {
		const { set, index } = this.props;

		return (
			<div>
				<label htmlFor="name">
					{/* renders a tick/cross for each right wrong answer */}
					{this.renderTickCross(set.correctAns)}
					{/* <TickCross
						correctAns={set.correctAns}
						selectedOption={this.state.selectedOption}
						getResult={getResult}
					/> */}
					<span>{index}.</span> {set.question}
				</label>
				{set.options.map((option, i) => {
					return (
						<div className="radio" key={i}>
							<label>
								<input
									type="radio"
									name={set._id}
									value={option}
									checked={this.state.selectedOption === option}
									// onChange={() => {
									// 	this.setState({ selectedOption: option, selectedOptionId: i });
									// }}
									onChange={this.handleChange}
								/>
								{option}
							</label>
						</div>
					);
				})}
			</div>
		);
	}
}

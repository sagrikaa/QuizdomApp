import React, { Component } from 'react';

export default class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			selectedOptionId: 0,
			blueMark: false
		};
	}

	confirmAns = (correctAns) => {
		if (this.props.getResult === true) {
			if (this.state.selectedOption.trim() === correctAns.trim()) {
				return <i className="fas fa-check" style={{ cursor: 'pointer', float: 'left', color: '#90D5EC' }} />;
			} else {
				return <i className="fas fa-times" style={{ cursor: 'pointer', float: 'left', color: 'red' }} />;
			}
		}
		return null;
	};
	render() {
		const { set, index, getResult } = this.props;
		if (getResult === true) {
			this.confirmAns(set.correctAns);
		}
		return (
			<div>
				<label htmlFor="name">
					{this.confirmAns(set.correctAns)}
					<span>{index}.</span> {set.question}
				</label>

				{set.options.map((option, i) => (
					<div className="radio" key={i}>
						<label>
							<input
								type="radio"
								name={set._id}
								value={option}
								checked={this.state.selectedOption === option}
								onChange={() => {
									this.setState({ selectedOption: option, selectedOptionId: i });
								}}
							/>
							{option}
						</label>
					</div>
				))}
			</div>
		);
	}
}

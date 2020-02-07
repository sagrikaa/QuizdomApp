import React, { Component } from 'react';
import Question from './Question';
export default class PlayQuiz extends Component {
	state = {
		showAns: false
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	getResult = (e) => {
		e.preventDefault();
		this.setState({ showAns: !this.state.showAns });
	};
	render() {
		const { quiz } = this.props.location.state;
		const { questionset } = quiz;
		return (
			<div className=" card col-md-8 offset-md-2">
				{/* Header Starts*/}
				<div className="m-3 quizHeader text-center">
					<h3 className="m-3">{quiz.name.toUpperCase()}</h3>
					<p>{quiz.description}</p>
				</div>
				{/* Header Ends */}

				<div className="card-body">
					<ul className="list-group list-group-flush">
						<form onSubmit={this.getResult}>
							{questionset.map((quest, index) => (
								<li className="list-group-item" key={index}>
									<div className="form-group">
										<Question
											set={quest}
											index={index + 1}
											key={index + 1}
											getResult={this.state.showAns}
										/>

										{this.state.showAns ? (
											<div>
												<label style={{ color: 'blue' }}>Answer: {quest.correctAns}</label>
											</div>
										) : null}
									</div>
								</li>
							))}

							<li className="list-group-item">
								<input
									type="submit"
									id="getResult"
									className="btn btn-block gradientButton"
									value={this.state.showAns ? 'Hide Result' : 'Get Result'}
								/>
							</li>
						</form>
					</ul>
				</div>
			</div>
		);
	}
}

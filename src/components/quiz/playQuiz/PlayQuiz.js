import React, { Component } from 'react';
import Question from './Question';
import { Redirect, Link } from 'react-router-dom';
export default class PlayQuiz extends Component {
	get quiz() {
		return this.props.location.state.quiz;
	}

	state = {
		showAns: false,
		resultArray: Array(this.quiz.questionset.length).fill(false)
	};

	alterResultArray = (i, selectedOption) => {
		const { questionset } = this.quiz;
		const res = [ ...this.state.resultArray ];
		if (questionset[i].correctAns.trim() === selectedOption.trim()) res[i] = true;
		else res[i] = false;
		this.setState({
			resultArray: res
		});
	};

	getNumberofCorrectAnswers = () => {
		let count = this.state.resultArray.reduce((n, val) => {
			return n + (val === true);
		}, 0);
		return count;
	};

	getResult = (e) => {
		e.preventDefault();
		this.setState({ showAns: !this.state.showAns });
		alert(this.getNumberofCorrectAnswers() + '/' + this.quiz.questionset.length);
	};

	// onRedirect = () => {
	// 	const location = {
	// 		pathname: '/quizzes',
	// 		state: 'hello'
	// 	};

	// 	return <Redirect to="/quizzes" />;
	// };

	render() {
		const quiz = this.quiz;
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
						<form>
							{questionset.map((quest, index) => (
								<li className="list-group-item" key={index}>
									<div className="form-group">
										<Question
											set={quest}
											index={index + 1}
											key={index + 1}
											getResult={this.state.showAns}
											addresult={this.addresult}
											deductresult={this.deductresult}
											alterResultArray={this.alterResultArray}
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
								{this.state.showAns ? (
									// <input
									// 	type="submit"
									// 	id="tryAgain"
									// 	className="btn btn-block gradientButton"
									// 	value="Try Again"
									// 	onClick={this.onRedirect}
									// />
									<Link to="/quizzes" className="btn btn-block gradientButton">
										Try a new Quiz
									</Link>
								) : (
									<input
										type="submit"
										id="getResult"
										className="btn btn-block gradientButton"
										value="Get Result"
										onClick={this.getResult}
									/>
								)}
							</li>
						</form>
					</ul>
				</div>
			</div>
		);
	}
}

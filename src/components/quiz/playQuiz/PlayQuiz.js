/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { Component } from 'react';
import Question from './Question';
export default class PlayQuiz extends Component {
	get quiz() {
		return this.props.location.state.quiz;
	}

	initialState() {
		return {
			showAns: false,
			resultArray: Array(this.quiz.questionset.length).fill(false)
		};
	}

	state = this.initialState();

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
	// 		pathname: '/playquiz',
	// 		state: 'hello'
	// 	};

	// 	return <Redirect to={location} />;
	// };

	render() {
		const quiz = this.quiz;
		const { questionset } = quiz;

		return (
			<div className="play-section">
				{/* Header Starts*/}
				<div className="play_header">
					<h3 className="play_heading">{quiz.name.toUpperCase()}</h3>
					<p className="play_description">{quiz.description}</p>
				</div>
				{/* Header Ends */}

				<ul className="play_questions-list">
					<form className="form">
						{/* Rendering each question in quiz */}
						{questionset.map((quest, index) => (
							<li className="play_questions-list--item" key={index}>
								<div className="form_group">
									<Question
										set={quest}
										index={index + 1}
										key={index + 1}
										getResult={this.state.showAns}
										addresult={this.addresult}
										// deductresult={this.deductresult}
										alterResultArray={this.alterResultArray}
									/>

									{this.state.showAns && (
										<div>
											<label style={{ color: 'blue' }}>Answer: {quest.correctAns}</label>
										</div>
									)}
								</div>
							</li>
						))}

						{this.state.showAns ? (
							<button
								type="button"
								id="tryAgain"
								className="btn btn-block gradientButton"
								value="Play Again"
								onClick={() => {
									this.setState(this.initialState());
								}}>
								Play Again
							</button>
						) : (
							// <Link to="/quizzes" className="btn btn-block gradientButton">
							// 	Try a new Quiz
							// </Link>
							<input
								type="submit"
								id="getResult"
								className="btn btn-block gradientButton"
								value="Get Result"
								onClick={this.getResult}
							/>
						)}
					</form>
				</ul>
			</div>
		);
	}
}

/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { Component } from 'react';
import Question from './Question';
import { withAlert } from 'react-alert';

class PlayQuiz extends Component {
	get quiz() {
		return this.props.location.state.quiz;
	}

	initialState() {
		return {
			showAnswer: false,
			resultArray: Array(this.quiz.questionset.length).fill(false),
			reset: true
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
		this.setState({ showAnswer: !this.state.showAnswer, reset: false });
		this.props.alert.success(this.getNumberofCorrectAnswers() + '/' + this.quiz.questionset.length);
	};

	render() {
		const quiz = this.quiz;
		const { questionset } = quiz;

		return (
			<div className="play-section box">
				{/* Header Starts*/}
				<div className="play_header">
					<h3 className="heading-3">{quiz.name.toUpperCase()}</h3>
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
										showAnswer={this.state.showAnswer}
										alterResultArray={this.alterResultArray}
										reset={this.state.reset}
									/>

									{this.state.showAnswer && (
										<div>
											<label style={{ color: 'blue' }}>Answer: {quest.correctAns}</label>
										</div>
									)}
								</div>
							</li>
						))}

						{this.state.showAnswer ? (
							<button
								type="button"
								id="tryAgain"
								className="button button-green"
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
								className="button button-green"
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
export default withAlert()(PlayQuiz);

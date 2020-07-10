/****************************/
/* @author: Sagrika Aggarwal*/
/*****************************/

import React, { Component } from 'react';
import Question from './Question';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';

class PlayQuiz extends Component {
	//Quiz Getter
	get quiz() {
		return this.props.location.state.quiz;
	}

	initialState() {
		return {
			showAnswer: false,
			reset: true,
			selectedOptions: Array(this.quiz.questionset.length).fill('')
		};
	}

	state = this.initialState();

	handleSelectedOptionChange = (index, value) => {
		let arr = [ ...this.state.selectedOptions ];
		arr.splice(index, 1, value);
		this.setState({ selectedOptions: [ ...arr ] });
	};

	getNumberofCorrectAnswers = () => {
		const { questionset } = this.quiz;
		let count = 0;
		questionset.forEach((question, index) => {
			if (this.state.selectedOptions[index].trim() === question.correctAns.trim()) count++;
		});
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
										reset={this.state.reset}
										selectedOption={this.state.selectedOptions[index]}
										handleSelectedOptionChange={this.handleSelectedOptionChange}
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
							<div className="horizontal-div">
								<Link to="/quizzes" className="button button-green">
									Try a new Quiz
								</Link>
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
							</div>
						) : (
							<input
								type="submit"
								id="getResult"
								className="button button-blue"
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

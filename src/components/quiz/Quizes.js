import React, { Component } from 'react';
import Quiz from './displayQuiz/Quiz';
import { Consumer } from '../../context';

export default class Quizes extends Component {
	render() {
		return (
			<Consumer>
				{(value) => {
					const { quizes } = value;
					return (
						<div className="row">
							<div className="col-sm-8 offset-sm-2">
								{quizes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)}
							</div>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

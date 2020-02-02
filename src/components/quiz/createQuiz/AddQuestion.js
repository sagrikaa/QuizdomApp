import React, { Component } from 'react';
import { Consumer } from '../../../context';
import axios from 'axios';

class AddQuestion extends Component {
	state = {
		question: '',
		option: '',
		correctAns: '',
		options: ''
	};

	componentDidMount() {
		axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => console.log(res));
	}

	onChange = (e) => {
		this.setState({ errorMessage: '' });
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (dispatch, e) => {
		e.preventDefault();
		let { question, options, correctAns } = this.state;
		options = options.toLowerCase();
		correctAns = correctAns.toLowerCase();
		const questionset = {
			question,
			options,
			correctAns
		};

		console.log(questionset);
		console.log(sessionStorage.getItem('quizId'));
		axios
			.patch(
				`https://quizdom-backend.herokuapp.com/api/quiz/${sessionStorage.getItem('quizId')}/question`,
				questionset
			)
			.then((res) => console.log(res));
		// dispatch({type:"ADD_CONTACT", payload:newContact});

		this.setState({ name: '', category: '', description: '', difficult: '' });
	};
	addOption = () => {
		console.log(this.state.options);
		if (this.state.option !== '') {
			this.setState({ options: this.state.option + ',' + this.state.options });
			var node = document.createElement('li');
			var textnode = document.createTextNode(this.state.option);
			node.appendChild(textnode);
			document.getElementById('myOptions').appendChild(node);
			this.setState({ options: this.state.options + ',' + this.state.option });
			console.log(this.state.options);
			this.setState({ option: '' });
		} else {
			this.setState({ errorMessage: 'Please enter an option' });
		}
	};
	render() {
		const { question, option, correctAns } = this.state;

		return (
			<div className="card mb-3 col-md-6 offset-md-3">
				<h3 className="card-header gradientNav">Add Question</h3>
				<div className="card-body">
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="form-group">
							<label htmlFor="name">Question</label>
							<input
								type="text"
								className="form-control form-control-md"
								name="question"
								placeholder="Question"
								value={question}
								onChange={this.onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="name">Options</label>

							<div className="row">
								<div className="col-md-6">
									<input
										type="text"
										className="form-control form-control-md"
										name="option"
										placeholder="Option.."
										value={option}
										onChange={this.onChange}
									/>
									<i
										style={{ cursor: 'pointer', color: 'black' }}
										className="fas fa-plus-circle col-md-1 mt-3"
										onClick={this.addOption}
									/>
									{this.state.errorMessage ? (
										<label htmlFor="errorMessage" style={{ float: 'right', color: 'red' }}>
											{this.state.errorMessage}
										</label>
									) : null}
								</div>

								<label htmlFor="optionList" className="col-md-6">
									<ul id="myOptions" />
								</label>
							</div>
						</div>

						<div className="form-group" />

						<div className="form-group">
							<label htmlFor="name">Correct Answer</label>
							<input
								onChange={this.onChange}
								className="form-control form-control-md"
								name="correctAns"
								type="text"
								vaue={correctAns}
							/>
						</div>

						<input type="submit" className="btn btn-block gradientButton" value="Add" />
					</form>
				</div>
			</div>
		);
	}
}

export default AddQuestion;

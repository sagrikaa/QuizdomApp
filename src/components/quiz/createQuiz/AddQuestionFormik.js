/**
 * Adding a Question
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useEffect } from 'react';
// import { Redirect, Link } from 'react-router-dom';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PreviewQuestions from './PreviewQuestions';

const Options = (props) => (
	<label htmlFor="optionList" className="col-md-6">
		<ul id="myOptions">{props.options.map((o) => <li key={o}>{o}</li>)}</ul>
	</label>
);
const AddQuestion = (props) => {
	const [ options, setOptions ] = useState([]);
	const [ optionError, setOptionError ] = useState(false);
	const { errors, handleSubmit, values, status, touched } = props;

	const addOption = () => {
		if (values.option !== undefined && values.option !== '') {
			setOptions([ ...options, values.option ]);
			values.option = '';
			setOptionError(false);
		} else {
			setOptionError(true);
		}
	};

	const resetForm = (reset) => {
		if (reset) {
			values.question = '';
			values.option = '';
			values.correctAns = '';
			values.options = [];
			setOptionError(false);
			setOptions([]);
		}
	};
	useEffect(() => {
		values.options = options;
		if (status) {
			resetForm(status.reset);
			status.reset = false;
		}
	});

	return (
		<div className="row">
			<div className="col">
				<div className="card" style={{ margin: '50px' }}>
					<h3 className="card-header gradientNav">Add Question</h3>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="name">Question</label>
								<Field
									className={
										errors.question && touched.correctAns ? (
											'form-control is-invalid'
										) : (
											'form-control'
										)
									}
									name="question"
									placeholder="Question"
								/>
								<div className="invalid-feedback">
									<ErrorMessage name="question" />
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="name">Options</label>

								<div className="row">
									<div className="col-md-6">
										<Field
											type="text"
											className={optionError ? 'form-control is-invalid' : 'form-control'}
											name="option"
											placeholder="Option.."
										/>

										<i
											style={{ cursor: 'pointer', color: 'black' }}
											className="fas fa-plus-circle col-md-1 mt-3"
											onClick={addOption}
										/>

										{optionError ? (
											<div className="invalid-feedback" style={{ float: 'right' }}>
												<ErrorMessage name="option" />
											</div>
										) : null}
									</div>
									{/* Display entered options */}
									<Options options={options} />
								</div>
							</div>

							{/* Retrieving dropdown options from options entered above */}
							<div className="form-group">
								<label htmlFor="name">Correct Answer</label>
								<Field
									className={
										errors.correctAns && touched.correctAns ? (
											'form-control is-invalid'
										) : (
											'form-control'
										)
									}
									name="correctAns"
									component="select">
									<option value="">Not Selected</option>
									{options.map((o) => (
										<option key={o} value={o}>
											{o}
										</option>
									))}
								</Field>
								<div className="invalid-feedback">
									<ErrorMessage name="correctAns" />
								</div>
							</div>

							<input type="submit" className="btn btn-block gradientButton" value="Add Question" />
						</form>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="card showQuestion" style={{ margin: '50px' }}>
					<PreviewQuestions id={`${sessionStorage.getItem('quizId')}`} />
				</div>
			</div>
		</div>
	);
};

const AddQuestionFormik = withFormik({
	mapPropsToValues() {
		return {
			question: '',
			option: '',
			correctAns: ''
		};
	},
	validationSchema: Yup.object().shape({
		question: Yup.string().required('Please enter a question'),
		correctAns: Yup.string().required('Please select a correct ans from the list')
		// option: Yup.string().required('Please enter an option before clicking add')
	}),

	handleSubmit(values, { resetForm, setErrors, setSubmitting, setValues, setStatus, props }) {
		// const { quiz, setQuiz } = props.location.status;
		let { question, options, correctAns } = values;

		const questionset = {
			question,
			options,
			correctAns
		};

		console.log(questionset);
		resetForm();
		setStatus({ reset: true });
		setSubmitting(false);
		// console.log(sessionStorage.getItem('quizId'));
		// axios
		// 	.patch(
		// 		`https://quizdom-backend.herokuapp.com/api/quiz/${sessionStorage.getItem('quizId')}/question`,
		// 		questionset
		// 	)
		// 	.then((res) => {
		// 		console.log(res);

		// 		setSubmitting(false);
		// 		setStatus({ reset: true });
		// 	});
	}
})(AddQuestion);
export default AddQuestionFormik;

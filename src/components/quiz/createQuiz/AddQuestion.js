/**
 * Adding a Question
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useEffect, useContext } from 'react';
// import { Redirect, Link } from 'react-router-dom';
import { Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PreviewQuestions from './PreviewQuestions';
import { QuizContext } from '../../../QuizContext';
import { UserContext } from '../../../UserContext';

const OutterComponent = (props) => {
	const value = useContext(QuizContext);
	const { user } = useContext(UserContext);
	const { addQuestion, quiz } = value;
	return (
		<Formik
			initialValues={{
				question: '',
				option: '',
				correctAns: ''
			}}
			onSubmit={(values, actions) => {
				// const { quiz, setQuiz } = props.location.status;
				let { question, options, correctAns } = values;

				const questionset = {
					question,
					options,
					correctAns
				};

				addQuestion(questionset);
				actions.resetForm();
				actions.setStatus({ reset: true });
				actions.setSubmitting(false);
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
			}}
			validationSchema={Yup.object().shape({
				question: Yup.string().required('Please enter a question'),
				correctAns: Yup.string().required('Please select a correct ans from the list')
				// option: Yup.string().required('Please enter an option before clicking add')
			})}>
			{/* Form Inner component starts*/}
			{({ handleSubmit, errors, values, touched, status }) => (
				<div className="m-3">
					<AddQuestion
						errors={errors}
						handleSubmit={handleSubmit}
						values={values}
						status={status}
						touched={touched}
					/>
				</div>
			)}
		</Formik>
	);
};
const Options = (props) => (
	<label htmlFor="optionList" className="col-md-6">
		<ul id="myOptions">{props.options.map((o) => <li key={o}>{o}</li>)}</ul>
	</label>
);
const AddQuestion = (props) => {
	const [ options, setOptions ] = useState([]);
	const [ optionError, setOptionError ] = useState(false);
	const { errors, handleSubmit, values, status, touched } = props;
	const { quiz, postQuiz } = useContext(QuizContext);
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

	// const SaveQuiz = (e, published) => {
	// 	let quiz_temp = quiz;
	// 	quiz_temp.creatorId = '5e33a1baac64085b044514fb';
	// 	quiz_temp.published = published;
	// 	axios.post('http://localhost:2000/api/quiz', quiz_temp).then((res) => {
	// 		// sessionStorage.setItem('quizId', res.data._id);
	// 		// actions.setErrors({});
	// 		console.log(res.data);
	// 	});
	// };
	useEffect(() => {
		values.options = options;
		if (status) {
			resetForm(status.reset);
			status.reset = false;
		}
	});

	return (
		<div className="create-question-section">
			<div className="box create-question">
				<h3 className="heading-3">Add Question</h3>
				<form onSubmit={handleSubmit} className="form">
					<div className="form_group">
						<Field
							className={
								errors.question && touched.question ? 'form_input form_input-invalid' : 'form_input'
							}
							name="question"
							placeholder="Question"
						/>
						<label htmlFor="question" className="form_label">
							Question
						</label>

						<div className="form_feedback-invalid">
							<ErrorMessage name="question" />
						</div>
					</div>

					<div className="options-section">
						<div className="form_group">
							<Field
								type="text"
								className={optionError ? 'form_input form_input-invalid' : 'form_input'}
								name="option"
								placeholder="Option.."
							/>
							<label htmlFor="option" className="form_label">
								Options
							</label>
							<i
								style={{ cursor: 'pointer', color: 'black' }}
								className="fas fa-plus-circle col-md-1 mt-3"
								onClick={addOption}
							/>

							{optionError ? (
								<div className="form_feedback-invalid" style={{ float: 'right' }}>
									<ErrorMessage name="option" />
								</div>
							) : null}
						</div>

						{/* Display entered options */}
						<Options options={options} />
					</div>

					{/* Retrieving dropdown options from options entered above */}
					<div className="form_group">
						<Field
							className={
								errors.correctAns && touched.correctAns ? 'form_input form_input-invalid' : 'form_input'
							}
							name="correctAns"
							component="select">
							<option value="">Not Selected</option>
							{options.map((option, index) => (
								<option key={`${index}-${option}`} value={option}>
									{option}
								</option>
							))}
						</Field>
						<label htmlFor="correctAns" className="form_label">
							Correct Answer
						</label>
						<div className="form_feedback-invalid">
							<ErrorMessage name="correctAns" />
						</div>
					</div>

					<input type="submit" className="button button-blue" value="Add Question" />
					<button type="button" className="button button-green" value="Save" onClick={() => postQuiz(false)}>
						Save
					</button>
				</form>
			</div>

			<div className="box preview-question">
				<PreviewQuestions />
			</div>
		</div>
	);
};

export default OutterComponent;

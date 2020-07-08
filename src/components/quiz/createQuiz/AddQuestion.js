/**
 * Adding a Question
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import PreviewQuiz from './PreviewQuiz';
import { QuizContext } from '../../../QuizContext';

const Options = ({ options, deleteOption }) => {
	const [ showOptions, setShowOptions ] = useState(false);

	return (
		<div className="options">
			<button className="button button-yellow" onClick={() => setShowOptions(!showOptions)}>
				Show Options
			</button>
			{showOptions &&
			options.length > 0 && (
				<ul id="options_list" className="options_list animate__animated animate__fadeInDown">
					{options.map((option, index) => (
						<li className="options_list-item" key={option + index}>
							<span className="bullet-green" />
							<p>{option}</p>
							<i
								className="cross fas fa-times icon"
								onClick={() => {
									console.log('no');
									deleteOption(index);
								}}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const OutterComponent = (props) => {
	const value = useContext(QuizContext);
	const { addQuestion, quizDraft } = value;
	return (
		<Formik
			initialValues={{
				question: '',
				option: '',
				correctAns: ''
			}}
			onSubmit={(values, actions) => {
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
			}}
			validationSchema={Yup.object().shape({
				question: Yup.string().required('Please enter a question'),
				correctAns: Yup.string().required('Please select a correct ans from the list')
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
const AddQuestion = (props) => {
	const [ options, setOptions ] = useState([]);
	const [ optionError, setOptionError ] = useState(false);
	const [ previewQuiz, setPreviewQuiz ] = useState(false);
	const { errors, handleSubmit, values, status, touched } = props;
	const { postQuiz, quizDraft } = useContext(QuizContext);
	const addOption = () => {
		if (values.option !== undefined && values.option !== '') {
			setOptions([ ...options, values.option ]);
			values.option = '';
			setOptionError(false);
		} else {
			setOptionError(true);
		}
	};

	const deleteOption = (index) => {
		const newOptions = [ ...options ];
		newOptions.splice(index, 1);
		setOptions(newOptions);
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
							component="textarea"
						/>
						<label htmlFor="question" className="form_label">
							Question
						</label>

						<div className="form_feedback-invalid">
							<ErrorMessage name="question" />
						</div>
					</div>

					<div className="form_group">
						<div className="horizontal-div">
							<Field
								component="textarea"
								className={optionError ? 'form_input form_input-invalid' : 'form_input'}
								name="option"
								placeholder="Option"
							/>
							<i className="fas fa-plus-circle icon " onClick={addOption} />

							{/* Display entered options */}
							<Options options={options} deleteOption={deleteOption} />
						</div>
						<label htmlFor="option" className="form_label">
							Option
						</label>
						{/* {optionError && (
								<div className="form_feedback-invalid">
									<ErrorMessage name="option" />
								</div>
							)} */}
						<div className="form_feedback-invalid">
							<ErrorMessage name="option" />
						</div>
						<small className="form-text text-muted" style={{ alignSelf: 'flex-start' }}>
							Add options one at a time.{' '}
						</small>{' '}
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
								<option key={option + index} value={option}>
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
					<div className="horizontal-div">
						<input type="submit" className="button button-blue" value="Add Question" />
						<button
							type="button"
							className="button button-yellow"
							value="Preview"
							onClick={() => setPreviewQuiz(!previewQuiz)}>
							Preview
						</button>
						{/* <button
							type="button"
							className="button button-green"
							value="Save"
							onClick={() => postQuiz(false)}>
							Save
						</button> */}
					</div>
				</form>
			</div>

			<PreviewQuiz isOpen={previewQuiz} setIsOpen={setPreviewQuiz} quizDraft={quizDraft} postQuiz={postQuiz} />
		</div>
	);
};

export default OutterComponent;

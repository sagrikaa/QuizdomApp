/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { QuizContext } from '../../../QuizContext';

const AddQuiz = (props) => {
	const { handleSubmit, errors, values } = props;
	const value = useContext(QuizContext);
	const { categories } = value;
	const { quiz, setQuiz } = useState({});
	const submit = (e) => {
		const quiz = handleSubmit(e);
		console.log(quiz);
	};
	return (
		<div className="card mb-3 col-md-6 offset-md-3">
			<h3 className="card-header gradientNav">
				Add Quiz
				{/* <i style={{cursor:'pointer',float:'right',color:'red'}} className="fas fa-plus-circle "></i>
     */}
			</h3>

			<div className="card-body">
				<form onSubmit={submit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>

						<Field
							className={errors.name ? 'form-control is-invalid' : 'form-control'}
							name="name"
							placeholder="What do you want to call this quiz?"
						/>
						<div className="invalid-feedback">
							<ErrorMessage name="name" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="name">Category</label>

						<Field
							className={errors.category ? 'form-control is-invalid' : 'form-control'}
							component="select"
							name="category">
							<option value="">Not Selected</option>
							{categories.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
						</Field>
						<div className="invalid-feedback">
							<ErrorMessage name="category" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="name">Difficult</label>
						<Field
							className={errors.difficult ? 'form-control is-invalid' : 'form-control'}
							component="select"
							name="difficult">
							<option value="">Not Selected</option>
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</Field>
						<div className="invalid-feedback">
							<ErrorMessage name="difficult" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="name">Description</label>
						<Field
							component="textarea"
							className={errors.description ? 'form-control is-invalid' : 'form-control'}
							name="description"
							placeholder="Let your quizzers know what they are into!"
						/>
					</div>

					<input
						type="submit"
						id="addQuiz"
						className="btn btn-block gradientButton"
						value="Save Quiz"
						style={{ color: 'white' }}
					/>
					{values.nextQuestion ? (
						<Link
							to={'/addquestion'}
							className="btn btn-block gradientButton"
							style={{ color: 'white' }}
							id="addQuestion">
							Add Question
							<i style={{ cursor: 'pointer', color: 'white' }} className="fas fa-arrow-right ml-3 " />
						</Link>
					) : null}
				</form>

				{values.nextquestion && <Redirect to={'/addquestion'} />}
			</div>
		</div>
	);
};

const FormikAddQuiz = withFormik({
	mapPropsToValues() {
		return {
			name: '',
			category: '',
			difficult: '',
			description: ''
		};
	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required('Name is  not required'),
		category: Yup.string().required('Please select a category'),
		difficult: Yup.string().required('Please select a level difficulty')
	}),

	handleSubmit(values, { resetForm, setErrors, setSubmitting, setValues }) {
		let quiz = {};
		// axios.post('https://quizdom-backend.herokuapp.com/api/quiz', values).then((res) => {
		// 	sessionStorage.setItem('quizId', res.data._id);
		// 	quiz = { ...values };
		// 	setErrors({});
		// });
		quiz = values;
		return ' hello';
		// setValues({ redirect: true, nextQuestion: true });
		// document.getElementById('addQuiz').disabled = true;
	}
})(AddQuiz);

FormikAddQuiz.contextType = QuizContext;

export default FormikAddQuiz;

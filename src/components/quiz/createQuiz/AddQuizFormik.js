/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { QuizContext } from '../../../QuizContext';

const AddQuiz = (props) => {
	const value = useContext(QuizContext);
	const { categories } = value;
	const [ quiz, setQuiz ] = useState({});
	return (
		<div className="card mb-3 col-md-6 offset-md-3">
			<h3 className="card-header gradientNav">
				Add Quiz
				{/* <i style={{cursor:'pointer',float:'right',color:'red'}} className="fas fa-plus-circle "></i>
     */}
			</h3>

			<Formik
				initialValues={{
					name: '',
					category: '',
					difficult: '',
					description: ''
				}}
				onSubmit={(values, actions) => {
					// axios.post('https://quizdom-backend.herokuapp.com/api/quiz', values).then((res) => {
					// 	sessionStorage.setItem('quizId', res.data._id);
					// 	actions.setErrors({});
					// });

					setQuiz(values);
					actions.setErrors({});
					actions.setValues({ redirect: true, nextQuestion: true });
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required('Name is  not required'),
					category: Yup.string().required('Please select a category'),
					difficult: Yup.string().required('Please select a level difficulty')
				})}>
				{/* Form Inner component starts*/}
				{({ handleSubmit, errors, values }) => (
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="name">Name</label>

								<Field
									type="text"
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

							{values.redirect ? (
								<Link
									to={{ pathname: '/addquestion', state: { quiz } }}
									className="btn btn-block gradientButton"
									style={{ color: 'white' }}
									id="addQuestion">
									Add Question
									<i
										style={{ cursor: 'pointer', color: 'white' }}
										className="fas fa-arrow-right ml-3 "
									/>
								</Link>
							) : (
								<input
									type="submit"
									id="addQuiz"
									className="btn btn-block gradientButton"
									value="Create Quiz"
									style={{ color: 'white' }}
								/>
							)}
						</form>

						{/* {values.nextquestion && <Redirect to={'/addquestion'} />} */}
					</div>
				)}
				{/* Form Inner component ends*/}
			</Formik>
		</div>
	);
};

export default AddQuiz;

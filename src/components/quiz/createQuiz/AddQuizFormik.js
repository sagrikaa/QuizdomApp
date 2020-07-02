/**
 * 
 * @author: Sagrika Aggarwal.
 */

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { QuizContext } from '../../../QuizContext';

const AddQuiz = (props) => {
	const value = useContext(QuizContext);
	const { categories, createQuiz } = value;
	const [ quiz, setQuiz ] = useState({});
	const [ redirect, setRedirect ] = useState(false);

	return (
		<div className="box create-quiz-section">
			<h3 className="heading-3">
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
					console.log(values);
					const { name, category, difficult, description } = values;
					createQuiz(name, category, difficult, description, []);
					actions.setErrors({});
					setRedirect(true);
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required('Please enter a name'),
					category: Yup.string().required('Please select a category'),
					difficult: Yup.string().required('Please select a difficulty level')
				})}>
				{/* Form Inner component starts*/}
				{({ handleSubmit, errors, values, touched }) => (
					<form onSubmit={handleSubmit} className="form">
						<div className="form_group">
							<Field
								type="text"
								className={touched.name && errors.name ? 'form_input form_input-invalid' : 'form_input'}
								// className="form_input"
								name="name"
								placeholder="Quiz Name"
								disabled={redirect}
								required
							/>
							<label htmlFor="name" className="form_label">
								Quiz Name
							</label>
							{/* form_feedback-invalid */}
							<div className="form_feedback-invalid">
								<ErrorMessage name="name" />
							</div>
						</div>

						<div className="form_group">
							<Field
								className={
									touched.category && errors.category ? 'form_input form_input-invalid' : 'form_input'
								}
								component="select"
								name="category"
								disabled={redirect}>
								<option value="">Not Selected</option>
								{categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
							</Field>
							<label htmlFor="category" className="form_label">
								Category
							</label>

							<div className="form_feedback-invalid">
								<ErrorMessage name="category" />
							</div>
						</div>

						<div className="form_group">
							<Field
								className={
									errors.difficult && touched.difficult ? (
										'form_input form_input-invalid'
									) : (
										'form_input'
									)
								}
								component="select"
								name="difficult"
								disabled={redirect}>
								<option value="">Not Selected</option>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</Field>
							<label htmlFor="name" className="form_label">
								Difficult
							</label>
							<div className="form_feedback-invalid">
								<ErrorMessage name="difficult" />
							</div>
						</div>

						<div className="form_group">
							<Field
								component="textarea"
								className={errors.description ? 'form_input form_input-invalid' : 'form_input'}
								name="description"
								placeholder="Let your quizzers know what they are into!"
								disabled={redirect}
								required
							/>
							<label htmlFor="name" className="form_label">
								Description
							</label>
							<div className="form_feedback-invalid">
								<ErrorMessage name="description" />
							</div>
						</div>

						{redirect ? (
							<Link
								to={{
									pathname: `/addquestion`,
									state: {
										quiz: quiz
									}
								}}
								className="button button-green">
								Add Question
								<i className="fas fa-arrow-right ml-3 " />
							</Link>
						) : (
							<input type="submit" id="addQuiz" className="button button-blue" value="Create Quiz" />
						)}
					</form>
				)}
				{/* Form Inner component ends*/}
			</Formik>
		</div>
	);
};

export default AddQuiz;

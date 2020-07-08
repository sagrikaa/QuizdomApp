//No react-bootstrap

import React, { useContext } from 'react';
import { QuizContext } from '../../../QuizContext';
import { Link } from 'react-router-dom';
import img from '../../../asset/img/questionmark.jpg';

export const Quiz = (props) => {
	const { name, category, difficult, description, createdAt } = props.quiz;
	const value = useContext(QuizContext);
	const { categories } = value;
	const cat = categories.filter((c) => c._id === category);
	const created = new Date(createdAt).toDateString();
	return (
		<Link to={{ pathname: '/playquiz', state: { quiz: props.quiz } }} className="quiz">
			<div className="quiz_content">
				<div className="quiz_img">
					<img src={img} alt="random_image" />
				</div>
				<div className="quiz_details">
					<h3 className="quiz_title">{name}</h3>
					<p className="quiz_description">{description}</p>
					<h6 className="quiz_difficulty"> {difficult ? difficult.toUpperCase() : null}</h6>
				</div>
				<div className="quiz_metadata">
					<h6 className="quiz_category"> {cat.map((c) => `#${c.name}`)}</h6>
					<h6 className="quiz_date"> {createdAt && `Posted: ${created}`}</h6>
				</div>
			</div>
		</Link>
	);
};

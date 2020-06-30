import React, { useState, useContext } from 'react';
import { Consumer } from '../../../context';
import { QuizContext } from '../../../QuizContext';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import img from '../../../asset/img/questionmark.jpg';
export const Quiz = (props) => {
	// const [ showDetails, setShowDetails ] = useState();

	const { name, category, difficult, description } = props.quiz;
	const value = useContext(QuizContext);
	const { categories } = value;
	const cat = categories.filter((c) => c._id === category);

	return (
		<Link to={{ pathname: '/playquiz', state: { quiz: props.quiz } }} style={{ textDecoration: 'none' }}>
			{/* <Card text="dark" border="black" className="text-center" style={{ margin: '20px' }}>
				<Card.Header>
					<Card.Title>{name}</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Title />
					<Card.Text>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<Badge pill variant="dark">
						{cat.map((c) => c.name.toUpperCase())}
					</Badge>
					<div className="ml-auto">
						<Badge pill variant="info">
							{difficult ? difficult.toUpperCase() : null}
						</Badge>
					</div>
				</Card.Footer>
			</Card> */}
			<div className="quiz">
				<img src={img} alt="randomimg" className="quiz_img" />
				<div className="quiz_content">
					<h3 className="quiz_title">{name}</h3>
					<p className="quiz_description">{description}</p>
					<h6 className="quiz_difficulty"> {difficult ? difficult.toUpperCase() : null}</h6>
				</div>
				<div className="quiz_categories">
					<h6 className="quiz_category"> {cat.map((c) => `#${c.name}`)}</h6>
				</div>
			</div>
		</Link>
	);
};

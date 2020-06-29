import React, { Component } from 'react';
import { Consumer } from '../../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
export default class Quiz extends Component {
	state = {
		showItemDetails: false
	};

	deleteQuiz = (id, dispatch) => {
		dispatch({ type: 'DELETE_QUIZ', payload: id });
		axios.delete('https://quizdom-backend.herokuapp.com/api/quiz', { data: { id } }).then((res) => {
			console.log(res);
		});
	};

	render() {
		console.log(this.props.quiz);
		const { name, category, difficult, description, getUser } = this.props.quiz;
		return (
			<Consumer>
				{(value) => {
					const { categories } = value;
					const cat = categories.filter((c) => c._id === category);

					return (
						<Link
							to={{ pathname: '/playquiz', state: { quiz: this.props.quiz } }}
							style={{ textDecoration: 'none' }}>
							<Card text="dark" border="black" className="text-center" style={{ margin: '20px' }}>
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
							</Card>
						</Link>
					);
				}}
			</Consumer>
		);
	}
}

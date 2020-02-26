/**
 * 
 * @author: Joshua Dias.
 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context';
import Card from 'react-bootstrap/Card';

const Faq = (props) => {
	const [ visible, setVisible ] = useState(false);
	const { question, answer } = props;
	return (
		<li className="list-group-item mb-3">
			<div className="mb-3">
				<h6>
					{question}
					<i
						className=" ml-2 fas fa-caret-down"
						style={{ cursor: 'pointer' }}
						onClick={() => setVisible(!visible)}
					/>
				</h6>
			</div>
			{visible ? <div className="faq-ans">{answer}</div> : null}
		</li>
	);
};
export default class Faqs extends Component {
	state = {
		showItemDetails: false
	};

	render() {
		// const { showItemDetails } = this.state;
		return (
			<Consumer>
				{(value) => {
					const { dispatch } = value;
					const { faqs } = value;
					return (
						<Card body className="col-10 offset-1 mt-3">
							{/* {faqs.map((faq) => (
								<div className="card card-body mb-3">
									<h4>
										{faq.question}
										<i
											className="fas fa-caret-down"
											style={{ cursor: 'pointer' }}
											onClick={() =>
												this.setState({
													showItemDetails: !this.state.showItemDetails
												})}
										/>
									</h4>
									{showItemDetails ? (
										<ul className="list-group">
											<li className="list-group-item">Answer: {faq.answer}</li>
										</ul>
									) : null}
								</div>
							))} */}
							{faqs.map((faq) => <Faq question={faq.question} answer={faq.answer} />)}
						</Card>
					);
				}}
			</Consumer>
		);
	}
}

Faq.propTypes = {
	// name:PropTypes.string.isRequired,
	faq: PropTypes.object.isRequired,
	answer: PropTypes.string.isRequired
};

/**
 * 
 * @author: Joshua Dias.
 */

import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { QuizContext } from '../QuizContext';

const Faq = (props) => {
	const [ visible, setVisible ] = useState(false);
	const { question, answer } = props;
	return (
		<li className="list-faq_item">
			<h5 className="list-faq_item--question heading-md" onClick={() => setVisible(!visible)}>
				{question}
				{visible ? <i className="fas fa-caret-up icon" /> : <i className="fas fa-caret-down icon" />}
			</h5>
			{visible && (
				<p className=" list-faq_item--answer faq-ans animate__animated animate__fadeInDown">{answer}</p>
			)}
		</li>
	);
};
const Faqs = (props) => {
	const [ showItemDetails, setShowItemDetails ] = useState(false);
	const value = useContext(QuizContext);
	const { faqs } = value;
	return (
		<div className="box faq-box">
			<h3 className="heading-lg">Frequently Asked Questions</h3>
			<ul className="list-faq">{faqs.map((faq) => <Faq question={faq.question} answer={faq.answer} />)}</ul>
		</div>
	);
};

export default Faqs;

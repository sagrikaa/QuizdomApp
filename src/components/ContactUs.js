/**
 * 
 * @author: Sagrika Aggarwal
 */

import React, { useState } from 'react';
import axios from 'axios';

export default function ContactUs(props) {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ message, setMessage ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		axios({
			method: 'POST',
			url: 'https://quizdom-backend.herokuapp.com/api/contactus/send',
			data: {
				name: name,
				email: email,
				message: message
			}
		}).then((response) => {
			console.log(response);
			if (response.data.msg === 'success') {
				alert('Message Sent.');
				resetForm();
			} else if (response.data.msg === 'fail') {
				alert('Message failed to send.');
			}
		});
	};

	const resetForm = () => {
		setMessage('');
		setName('');
		setEmail('');
	};

	return (
		<div className=" contact">
			<h3 className="text-center">Drop us a message!</h3>
			<img className="contact__img" src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
			<form id="form" onSubmit={handleSubmit} method="POST">
				<div className="form_group">
					<input
						type="text"
						className="form_input"
						id="name"
						name="name"
						placeholder="Name"
						required
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<label htmlFor="name" className="form_label">
						Name
					</label>
				</div>

				<div className="form_group">
					<input
						type="email"
						className="form_input"
						placeholder="Email"
						id="email"
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						name="email"
					/>
					<label htmlFor="email" className="form_label">
						Email
					</label>
				</div>
				<div className="form_group">
					<textarea
						type="text"
						className="form_input"
						placeholder="Message"
						id="message"
						required
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						name="message"
					/>
					<label htmlFor="message" className="form_label">
						Message
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from './layouts/Header';
import ContactUs from '../components/ContactUs';
import AddQuizFormik from './quiz/createQuiz/AddQuizFormik';
import Faq from '../components/Faq';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddQuestionFormik from './quiz/createQuiz/AddQuestionFormik';
import Quizes from './quiz/displayQuiz/Quizes';
import PlayQuiz from './quiz/playQuiz/PlayQuiz';
import Provider from '../context';

export default class Home extends Component {
	render() {
		return (
			<BrowserRouter>
				<Provider>
					<div>
						<Header branding="Quizdom" />
						<Switch>
							<Route exact path="/" name="Quizzes" component={Quizes} />
							<Route path="/addquiz" name="Add Quiz" component={AddQuizFormik} />
							<Route path="/quizzes" name="Quizzez" component={Quizes} />
							<Route path="/contactus" name="Contact Us" component={ContactUs} />
							<Route path="/faq" name="Frequently Asked Questions" component={Faq} />
							<Route path="/addQuestion" name="AddQuestion" component={AddQuestionFormik} />
							<Route path="/playquiz" name="PlayQuiz" component={PlayQuiz} />
						</Switch>
					</div>
				</Provider>
			</BrowserRouter>
		);
	}
}

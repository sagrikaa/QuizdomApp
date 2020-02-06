import React, { Component, useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from './layouts/Header';
import ContactUs from '../components/ContactUs';
import AddQuizFormik from './quiz/createQuiz/AddQuizFormik';
import Faq from '../components/Faq';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AddQuestionFormik from './quiz/createQuiz/AddQuestionFormik';
import Quizes from './quiz/displayQuiz/Quizes';
import PlayQuiz from './quiz/playQuiz/PlayQuiz';
import Login from './Login';
import Provider from '../context';
import { UserContext } from '../UserContext';

function PrivateRoute({ component: Component, ...rest }) {
	const value = useContext(UserContext);
	console.log(value);
	return <Route {...rest} render={(props) => (value.user ? <Component {...props} /> : <Redirect to="/login" />)} />;
}

export default class Home extends Component {
	render() {
		return (
			<BrowserRouter>
				<Provider>
					<div>
						<Header branding="Quizdom" />
						<Switch>
							<Route exact path="/" name="Quizzes" component={Quizes} />
							<PrivateRoute path="/addquiz" name="Add Quiz" component={AddQuizFormik} />
							<Route path="/quizzes" name="Quizzez" component={Quizes} />
							<Route path="/contactus" name="Contact Us" component={ContactUs} />
							<Route path="/faq" name="Frequently Asked Questions" component={Faq} />
							<Route path="/addQuestion" name="AddQuestion" component={AddQuestionFormik} />
							<Route path="/playquiz" name="PlayQuiz" component={PlayQuiz} />
							<Route path="/login" name="Login" component={Login} />
						</Switch>
					</div>
				</Provider>
			</BrowserRouter>
		);
	}
}

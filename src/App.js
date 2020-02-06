import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { UserProvider, UserContext } from './UserContext';
import Provider from './context';

import AddQuestionFormik from './components/quiz/createQuiz/AddQuestionFormik';
import AddQuizFormik from './components/quiz/createQuiz/AddQuizFormik';
import ContactUs from './components/ContactUs';
import Faq from './components/Faq';
import Header from './components/layouts/Header';
import Login from './components/Login';
import PlayQuiz from './components/quiz/playQuiz/PlayQuiz';
import Quizes from './components/quiz/displayQuiz/Quizes';

function PrivateRoute({ component: Component, ...rest }) {
	const value = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				value.user ? <Component {...props} /> : <Redirect to={{ pathname: '/login', from: props.location }} />}
		/>
	);
}

class App extends React.Component {
	render() {
		return (
			<UserProvider>
				<BrowserRouter>
					<Provider>
						<div>
							<Header branding="Quizdom" />
							<Switch>
								<Route exact path="/" name="Quizzes" component={Quizes} />
								<PrivateRoute path="/addquiz" name="Add Quiz" component={AddQuizFormik} />
								<Route path="/addQuestion" name="AddQuestion" component={AddQuestionFormik} />
								<Route path="/contactus" name="Contact Us" component={ContactUs} />
								<Route path="/faq" name="Frequently Asked Questions" component={Faq} />
								<Route path="/login" name="Login" component={Login} />
								<Route path="/playquiz" name="PlayQuiz" component={PlayQuiz} />
								<Route path="/quizzes" name="Quizzez" component={Quizes} />
							</Switch>
						</div>
					</Provider>
				</BrowserRouter>
			</UserProvider>
		);
	}
}
export default App;

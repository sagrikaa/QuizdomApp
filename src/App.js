/*
 * @author: Sagrika Aggarwal.
 */

//React imports
import './App.scss';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Context imports
import { UserProvider, UserContext } from './UserContext';
import { QuizProvider } from './QuizContext';

//Component imports
import AddQuestion from './components/quiz/createQuiz/AddQuestion';
import AddQuizFormik from './components/quiz/createQuiz/AddQuizFormik';
import ContactUs from './components/ContactUs';
import Faq from './components/Faq';
// import Header from './components/layouts/Header';
import Header from './components/Header';

import Login from './components/Login';
import PlayQuiz from './components/quiz/playQuiz/PlayQuiz';
import Quizzes from './components/quiz/displayQuiz/Quizzes';

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

const options = {
	position: 'top center',
	timeout: 5000,
	offset: '5rem',
	transition: 'scale'
	// containerStyle: {
	// 	backgroundColor: '#343A40'
	// }
};
class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<AlertProvider template={AlertTemplate} {...options}>
					<UserProvider>
						<QuizProvider>
							<div className="App">
								<Header branding="Quizdom" />
								<Switch>
									<Route exact path="/" name="Quizzes" component={Quizzes} />
									<PrivateRoute path="/addquiz" name="AddQuiz" component={AddQuizFormik} />
									<PrivateRoute path="/addQuestion" name="AddQuestion" component={AddQuestion} />
									<Route path="/contactus" name="ContactUs" component={ContactUs} />
									<Route path="/faq" name="FAQ" component={Faq} />
									<Route path="/login" name="Login" component={Login} />
									<Route path="/playquiz" name="PlayQuiz" component={PlayQuiz} />
									<Route path="/quizzes" name="Quizzes" component={Quizzes} />
								</Switch>
							</div>
						</QuizProvider>
					</UserProvider>
				</AlertProvider>
			</BrowserRouter>
		);
	}
}
export default App;

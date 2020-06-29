import React, { Component } from 'react';

import axios from 'axios';

const Context = React.createContext();

export default class Provider extends Component {
	state = {
		faqs: [],
		quizes: [],
		categories: []
	};

	componentDidMount() {
		axios.get('http://localhost:2000/api/quiz').then((res) => {
			this.setState({ quizes: res.data });
		});

		axios.get('https://quizdom-backend.herokuapp.com/api/category').then((res) => {
			this.setState({ categories: res.data });
			// console.log(this.state.categories);
		});

		axios.get('https://quizdom-backend.herokuapp.com/api/faq').then((res) => {
			this.setState({ faqs: res.data });
			// console.log(this.state.faqs);
		});
	}

	render() {
		return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
	}
}

export const Consumer = Context.Consumer;

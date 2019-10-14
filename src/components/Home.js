import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
// import './App.css';
import Contacts from './contact/Contacts';
import AddContact from './contact/AddContact';
import Header from './layouts/Header';
import ContactUs from '../components/ContactUs';
import Provider from '../context';
import AddQuizFormik from './quiz/AddQuizFormik';
import Faq from  '../components/Faq';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddQuestionFormik from './quiz/AddQuestionFormik';
import Dashboard from './Dashboard';
import Quizes from './quiz/Quizes'
import PlayQuiz from './quiz/PlayQuiz'

export default class Home extends Component {

    
    render() {
        return (
          
    <BrowserRouter>
    <Provider>
    <div >
      
       <Header branding = "Quizdom"/>
         <Switch>

            <Route exact path="/" name="Quizzes" component={Quizes} />
            {/* <Route path='/addcontact' name='Add Contact' component={AddContact}/> */}
            <Route path='/addquiz' name='Add Quiz' component={AddQuizFormik}/>
            <Route path='/quizzes' name='Quizzez' component={Quizes}/>
            {/* <Route path='/contacts' name='Contacts' component={Contacts}/> */}
            <Route path='/contactus' name='Contact Us' component ={ContactUs}/>
            <Route path='/faq' name='Frequently Asked Questions' component ={Faq}/>
            <Route path='/addQuestion' name='AddQuestion' component ={AddQuestionFormik}/>
            <Route path='/playquiz' name='PlayQuiz' component ={PlayQuiz}/>
            <Route path='/home' name='Contact Us' component ={Dashboard}/>

            
        </Switch>
    
    </div>
    </Provider>
    </BrowserRouter>

        )
    }
}

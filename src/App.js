import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
// import './App.css';
import Contacts from './components/contact/Contacts';
import AddContact from './components/contact/AddContact';
import Header from './components/layouts/Header';
import ContactUs from './components/ContactUs';
import Provider from './context';
import AddQuiz from './components/quiz/AddQuiz';
import Faq from  './components/Faq';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddQuestion from './components/quiz/AddQuestion';
import Dashboard from './components/Dashboard';
import Quizes from './components/quiz/Quizes'
import PlayQuiz from './components/quiz/PlayQuiz'

class App extends React.Component {
  render(){
  return (
    <BrowserRouter>
    <Provider>
    <div className=" cointainer mainPlayQuiz">
      
      
      
       <Header branding = "Quizdom"/>
         <Switch>

           
            <Route exact path="/" name="Contacts Page" component={Contacts} />
            <Route path='/addcontact' name='Add Contact' component={AddContact}/>
            <Route path='/addquiz' name='Add Quiz' component={AddQuiz}/>
            <Route path='/quizzes' name='Add Quiz' component={Quizes}/>
            <Route path='/addcontact' name='Add Contact' component={AddContact}/>
            <Route path='/contacts' name='Contacts' component={Contacts}/>
            <Route path='/contactus' name='Contact Us' component ={ContactUs}/>
            <Route path='/faq' name='Frequently Asked Questions' component ={Faq}/>
            <Route path='/addQuestion' name='Contact Us' component ={AddQuestion}/>
            <Route path='/playquiz' name='Contact Us' component ={PlayQuiz}/>
            <Route path='/home' name='Contact Us' component ={Dashboard}/>

            
        </Switch>
    
      
      {/* <AddContact/>
        <Contacts/>
       */}
    
    
        
    </div>
    </Provider>
    </BrowserRouter>
  );
}
}

export default App;

import React, { Component } from 'react'
import Quiz from './Quiz'
import {Consumer} from '../../context'

export default class Quizes extends Component {
  
    
    // deleteOnclick=(id)=>{
    //     const newContacts = this.state.contacts.filter(contact=>contact.id!==id)
    //     this.setState(
    //         {contacts:newContacts}
    //         )
    // }
    componentDidMount(){

    }
    render(){
        return(
            <Consumer>

            {value => {
             const {quizes} = value;
             return(
                 <React.Fragment>

                 {quizes.map(quiz =>< Quiz key={quiz._id} quiz={quiz} /> 
                 )}

                 </React.Fragment>
                 ) 
               }  }      

         </Consumer>
        )
    }
    
}
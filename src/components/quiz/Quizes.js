import React, { Component } from 'react'
import Quiz from './Quiz'
import {Consumer} from '../../context'
import { Row ,Col} from 'react-bootstrap';

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
                 <div className='row'>
                    
                
                {/* <div class="col-sm-6"> */}
    {/* <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>

  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div> */}
                
                <div className='col-sm-8'>
                 
                 {quizes.map(quiz =>< Quiz key={quiz._id} quiz={quiz} /> 
                 )}
              </div>
              </div>
                 ) 
               }  }      

         </Consumer>
        )
    }
    
}
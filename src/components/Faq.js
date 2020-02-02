import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../context'
export default class Faq extends Component {

    state=
    {
        showItemDetails:false
    }

    render() {
        const {showItemDetails}=this.state;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch} = value;
                const {faqs} = value;
                return(
                    <React.Fragment>

                    {faqs.map(faq =>
                     <div className="card card-body mb-3">
                     <h4>{faq.question}
                     <i className="fas fa-caret-down" style={{cursor:'pointer'}} 
                     onClick={ ()=>
                         this.setState(
                             {
                                 showItemDetails:!this.state.showItemDetails
                             }
                         )
                     }></i>
                     
                     </h4>
                     {showItemDetails ? (<ul className="list-group">
                         <li className="list-group-item">Answer: {faq.answer}</li>
                         
                     </ul>):null}
                 
                     
                 </div> 
                    )}
   
                    </React.Fragment>
                   
                )
            }
            }
            </Consumer>
            
        );

    
    
}
}

Faq.propTypes = {
    // name:PropTypes.string.isRequired,
    faq:PropTypes.object.isRequired,
    answer:PropTypes.string.isRequired,
    
};

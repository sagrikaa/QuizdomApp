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
        const {id,question,answer}=this.props.faq;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch} = value;
                return(
                    <div className="card card-body mb-3">
                        <h4>{question}
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
                            <li className="list-group-item">Answer:{answer}</li>
                            
                        </ul>):null}
                    
                        
                    </div>
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

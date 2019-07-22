import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../../context'
import axios from 'axios'

export default class Quiz extends Component {
    state=
    {
        showItemDetails:false
    }

    deleteQuiz = (id, dispatch)=>{
       dispatch({type:"DELETE_QUIZ",payload:id});
       axios.delete('http://localhost:2001/api/quiz',{data:{id}})
       .then(res => 
           { console.log(res) })
    }

    render() {
        const {showItemDetails}=this.state;
        const { _id,name,category,difficult,description}=this.props.quiz;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch,categories} = value;
                const cat = categories.filter(c=>c._id===category);
                
                return(
                   
                    <div className="card card-body mb-3">
                        
                        <h4>{name}
                        <i className="fas fa-caret-down" style={{cursor:'pointer'}} 
                        onClick={ ()=>
                            this.setState(
                                {
                                    showItemDetails:!this.state.showItemDetails
                                }
                            )
                        }></i>
                        <i className="fas fa-trash-alt" style={{cursor:'pointer',float:'right',color:'red'}}  onClick={this.deleteQuiz.bind(this,_id,dispatch)}></i>
                        </h4>
                        {showItemDetails ? (<ul className="list-group">
                            <li className="list-group-item">Description: {description}</li>
                            <li className="list-group-item">Category: {cat.map(c=>c.name)}</li>
                            <li className="list-group-item">Difficult:{difficult}</li>
                        </ul>):null}
                    
                        
                    </div>
                )
            }
            }
            </Consumer>
            
        );
    }
}

Quiz.propTypes = {
    // name:PropTypes.string.isRequired,
    contact:PropTypes.object.isRequired,
    phone:PropTypes.string.isRequired,
    
};

Quiz.defaultProps={
    name:"null",
    phone:"null",
  
}
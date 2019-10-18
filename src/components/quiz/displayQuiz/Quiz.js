import React, { Component } from 'react'
import {Consumer} from '../../../context'
import axios from 'axios'
import {Link} from 'react-router-dom' 

export default class Quiz extends Component {
    state=
    {
        showItemDetails:false
    }

    deleteQuiz = (id, dispatch)=>{
       dispatch({type:"DELETE_QUIZ",payload:id});
       axios.delete('https://quizdom-backend.herokuapp.com/api/quiz',{data:{id}})
       .then(res => 
           { console.log(res) })
    }

    render() {
        
        const { _id,name,category,difficult,description}=this.props.quiz;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch,categories} = value;
                const cat = categories.filter(c=>c._id===category);
                
                return(
                    
                
                  <Link to={{pathname:"/playquiz",state:{quiz:this.props.quiz}}}
                  style={{textDecoration:'none'}}>
                    <div className=" quizCard m-4">
                        
                        <span>
                            <div className='quizCardName'>
                                <h3 className='text-center'>
                                    {name}
                            {/* <i className="fas fa-trash-alt" style={{cursor:'pointer',float:'right',color:'#90D5EC'}}  onClick={this.deleteQuiz.bind(this,_id,dispatch)}></i> */}
                            </h3>
                            
                            </div>
                          
                        <span className='mr-2' style={{float:'right',textTransform:'uppercase'}}>{difficult}</span>
                        <span className='m-2'>{category?<span>Category: {cat.map(c=>c.name)}</span>:null}</span>
                       
                        </span>
                        
                            <span className='m-3'> <center style={{color:'grey'}}>{description}</center></span>
                           
                            
                  
                    
                        
                    </div>
                    
                    </Link>

                 
                )
            }
            }
            </Consumer>
            
        );
    }
}


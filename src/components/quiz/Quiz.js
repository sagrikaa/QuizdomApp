import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Consumer} from '../../context'
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
        const {showItemDetails}=this.state;
        const { _id,name,category,difficult,description}=this.props.quiz;
        return (
            <Consumer>
                
            {
               value=>{
                const {dispatch,categories} = value;
                const cat = categories.filter(c=>c._id===category);
                
                return(
                    
                    
                //     <div className="offset-md-1 mb-3 mt-3 ml-3 mr-3 col-md-6 " style={{width:"40%",float:"left"}} >
                       

                //     <div className="card text-center quizCard">
                   
                //       <div className="card-body">
                //       <h3 className="card-title">{name}</h3>
                //         <h5 className="card-text">*{difficult} </h5>
                       
                //         <p className="card-text"><h6>{description}</h6></p>
                //         <Link to={{pathname:"/playquiz",state:{quiz:this.props.quiz}}} className="btn gradientButton">Play</Link>
                //       </div>
                //     </div>
                //   </div>
                  <Link to={{pathname:"/playquiz",state:{quiz:this.props.quiz}}} className='quizCard'>
                    <div className="card m-4 quizCard" >
                        
                        <span className='card-header' >
                            <h4>{name}
                            <i className="fas fa-trash-alt" style={{cursor:'pointer',float:'right',color:'#90D5EC'}}  onClick={this.deleteQuiz.bind(this,_id,dispatch)}></i>
                            </h4>
                        
                        
                        <h7><span className='mr-2' style={{float:'right'}} >{difficult}</span>
                        <span className='m-2' style={{display:'block'}}>Category: {cat.map(c=>c.name)}</span></h7>
                        </span>
                        <span >
                            <span className='m-3' stle={{display:'block'}}> {description}</span>
                           
                            
                        </span>
                    
                        
                    </div>
                    
                    </Link>

                    //Use this if needed
                    // <div class="card m-4" style={{width: "18rem", height:'30%',float:'left'}}>
                    // <img class="card-img-top " src={require('../../asset/img/images.jpg') } style={{height: "200px",float:'left'}}alt="Card cap"></img>
                    // <div class="card-body">
                    //     <p class="card-text">{description}</p>
                    // </div>

                    // </div>
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

/*Just checking */
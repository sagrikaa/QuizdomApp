import React, { Component } from 'react'
import Question from './Question'
export default class PlayQuiz extends Component {
  state={
 
    showAns:false
  }

  onChange = (e) =>{
       this.setState({[e.target.name] : e.target.value});
       
    };
    render() {
        const {quiz} = this.props.location.state;
        const {questionset} = quiz;
        return (

            <div className=' card col-md-8 offset-md-2'>

              {/* Header Starts*/}
                <div className='m-3 quizHeader text-center'>
                  <h3 className='m-3'>{quiz.name.toUpperCase()}</h3>
                 <p>{quiz.description}</p>
  
             </div>
             {/* Header Ends */}


            <div className='card-body'> 
               <ul className="list-group list-group-flush">  
               <form onSubmit={(e)=>{e.preventDefault();this.setState({showAns:true})}}>

               {questionset.map((quest,index)=>
                   <li className="list-group-item" >
                    

                     <div className="form-group">
                       <Question question={quest} id={index+1}/>
                         {/* <label htmlFor="name">
                           <span>{index+1}.</span> { quest.question}
                           </label>
                         {quest.options.map((option,i)=>
                         <div class="radio">
                           
                            <label><input type="radio"  name={quest._id} value={option} onChange={this.onChange}/>{option}</label>
                            </div>)} */}
                       {this.state.showAns? <div><label style={{color:'blue'}}>Answer: {quest.correctAns}</label></div>:null}
                     </div>

                    
                   </li>
                  )} 
                   
                  <li className="list-group-item">
                      <input type="submit" id='addQuiz' className="btn btn-block gradientButton" value="Show Answers" />
                  </li>
                       
</form>  
               
                
            </ul>
            </div> 
            </div>
        )
    }
}

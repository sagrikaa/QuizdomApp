import React, { Component } from 'react'

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

            <div className=' card  col-md-8 offset-md-2'>
                <div className='jumbotron quizCard text-center'>
                  <h5 className="card-header">{quiz.name}</h5>
                 <p className="card-text">{quiz.description}</p>
  
             </div>
            <div className='card-body'> 
               <ul className="list-group list-group-flush">  
               <form onSubmit={(e)=>{e.preventDefault();this.setState({showAns:true})}}>

               {questionset.map((quest,index)=>
                   <li className="list-group-item" >
                    

                     <div className="form-group">
                         <label htmlFor="name">{index+1}. { quest.question}</label>
                         {quest.options.map((option,i)=>
                         <div class="radio">
                            <label><input type="radio"  name={quest._id}  onChange={this.onChange}/>{option}</label>
                            </div>)}
                       {this.state.showAns? <div><label style={{color:'blue'}}>Answer: {quest.correctAns}</label></div>:null}
                     </div>

                    
                   </li>
                  )} 
                   
                  <li className="list-group-item">
                      <input type="submit" id='addQuiz' className="btn btn-block gradientButton" value="Show Answers" />
                  </li>
                       
</form>  
               
                {console.log(questionset)}
            </ul>
            </div> 
            </div>
        )
    }
}

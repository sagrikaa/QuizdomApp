
import React, { Component } from 'react'

export default class PreviewQuestion extends Component {
    
    
    render() {
      const {question,id}=this.props
      const{correctAns}=question
      
        return (
            <div>
                 <label htmlFor="name">
                           <span>{id}.</span> { question.question}
                           </label>

                           {question.options.map((option,i)=>
                         <div class="radio" disabled='true'>
                           
                            <label>
                              <input type="radio"  name={question._id} value={option} 
                            checked={correctAns === option} />
                            {option}
                            </label>
                            
                            </div>)}
            </div>
        )
    }
}

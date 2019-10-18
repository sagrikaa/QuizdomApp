
import React, { Component } from 'react'

export default class PreviewQuestion extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          quest:props.question,
          index:props.id,
          selectedOption: props.question.correctAns,
        };
      }
    render() {
        const {index,quest}=this.state;
        return (
            <div>
                 <label htmlFor="name">
                           <span>{index}.</span> { quest.question}
                           </label>

                           {quest.options.map((option,i)=>
                         <div class="radio" disabled='true'>
                           
                            <label><input type="radio"  name={quest._id} value={option} 
                            checked={this.state.selectedOption === option} />{option}</label>
                            
                            </div>)}
            </div>
        )
    }
}

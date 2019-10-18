 import React, { Component } from 'react'

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quest:props.question,
          index:props.id,
          selectedOption: props.question.options[0],
        };
      }
    render() {
        const {quest}= this.state;
        const index=this.props.id;
        return (
            <div>
                  <label htmlFor="name">
                           <span>{index}.</span> { quest.question}
                           </label>

                           {quest.options.map((option,i)=>
                         <div class="radio">
                           
                            <label><input type="radio"  name={quest._id} value={option} 
                            checked={this.state.selectedOption === option} onChange={()=>{this.setState({selectedOption:option})}}/>{option}</label>
                            </div>)}
            </div>
        )
    }
}

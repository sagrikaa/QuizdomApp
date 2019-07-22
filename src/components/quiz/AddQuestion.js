import React, { Component } from 'react';
import {Consumer} from '../../context';
import axios from 'axios';

class AddQuestion extends Component {

    state={
       
        question:"",
        options:"",
        correctAns:"",
      
    }

    componentDidMount(){
        axios.get('http://localhost:2000/api/category')
        .then(res=>console.log(res));
    }

    // this.setState({categories:res.data}
    onChange = e => this.setState({[e.target.name] : e.target.value});
        
    onSubmit = (dispatch , e) => {
        e.preventDefault();
        const {question,options,correctAns} = this.state;  
        const quiz = {
            
            question,
            options,
            correctAns,
            
        };

        console.log(quiz);
        axios.post('http://localhost:2000/api/quiz',quiz)
        .then(res => console.log(res)
        )
        // dispatch({type:"ADD_CONTACT", payload:newContact});

        this.setState({name:'',category:'',description:'',difficult:''});
    }
    
    render() {
        const {question,options,correctAns} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return(
                            <div className='card mb-3'>
                            <h3 className="card-header">Add Question</h3>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Question</label>
                                        <input type="text" className="form-control form-control-md" name="name" placeholder="Question" value={question}
                                        onChange={this.onChange}/>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Options(* Seperate by comma)</label>
                                        <input type="text" className="form-control form-control-md" name="options" placeholder="Category" value={options} onChange={this.onChange}/>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Correct Answer</label>
                                        <input onChange={this.onChange} className="form-control form-control-md"  name='correctAns' type="text" vaue={correctAns}>
                                           
                                        </input>
                                    </div>
            
                                   

                                    
                                    <input type="submit" className="btn btn-block btn-danger" value="Add" />
                                </form>
                            </div>
                            
                        </div>
                        
                            );
                    }
                }
            </Consumer>
            
        )
    }
}

export default AddQuestion;
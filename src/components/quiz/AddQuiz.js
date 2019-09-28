import React, { Component } from 'react';
import {Consumer} from '../../context';
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom'
class AddQuiz extends Component {

    state={
       
        name:"",
        category:"",
        difficult:"",
        descripion:"",
        categories:[],
        nextquestion:false,
        redirect:false
    }

    componentDidMount(){
        
        axios.get('https://quizdom-backend.herokuapp.com/api/category')
        .then(res=>this.setState({categories:res.data}));
    }

    // this.setState({categories:res.data}
    onChange = e => this.setState({[e.target.name] : e.target.value});
        
    nextQuestion=()=>{
        
            this.setState({nextquestion:true});
            console.log(this.state.nextquestion)
          
    }
    onSubmit = (dispatch , e) => {
        e.preventDefault();
        const {name,category,description,difficult} = this.state;  
        const quiz = {
            
            name,
            category,
            description,
            difficult
        };

        console.log(quiz);
        axios.post('https://quizdom-backend.herokuapp.com/api/quiz',quiz)
        .then(res => 
            {
                console.log(res);
                 this.setState({redirect:true,nextQuestion:true});
                 sessionStorage.setItem('quizId',res.data._id);

            }

           
        )
        document.getElementById("addQuiz").disabled = true;
    
        
        // dispatch({type:"ADD_CONTACT", payload:newContact});

        // this.setState({name:'',category:'',description:'',difficult:''});
    }
    
    render() {
        const {name,category,difficult,description,categories} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return(
                            <div className='card mb-3 col-md-6 offset-md-3'>

                            <h3 className="card-header gradientNav">Add Quiz<i style={{cursor:'pointer',float:'right',color:'red'}} className="fas fa-plus-circle "></i></h3>
                            
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control form-control-md" name="name" placeholder="Enter Name" value={name}
                                        onChange={this.onChange}/>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Category</label>
                                        <select  name="category" onChange={this.onChange}  className="form-control form-control-md" >
                                        
                                        {
                                            categories.map(c=> <option value={c._id}>{c.name}</option>)
                                        }
                                       </select>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Difficult</label>
                                        <select onChange={this.onChange} className="form-control form-control-md"  name='difficult' vaue={difficult}>
                                            <option value='easy'>Easy</option>
                                            <option value='medium'>Medium</option>
                                            <option value='hard'>Hard</option>
                                        </select>
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="name">Description</label>
                                        <textarea type="text-area" className="form-control form-control-md" name="description" placeholder="description" value={description}
                                        onChange={this.onChange}/>
                                    </div>

                                    
                                     <input type="submit" id='addQuiz' className="btn btn-block gradientButton" value="Save Quiz" />
                                    
                                    {/* <button id='addQuestion' className="btn btn-block gradientButton" value="Add Question" style={{color:'white'}}> */}
                                       { this.state.nextQuestion?<Link to={'/addquestion'}  className='btn btn-block gradientButton'
                                        style={{color:'white'}} id='addQuestion'>
                                             Add Question
                                        <i style={{cursor:'pointer',color:'white'}} className="fas fa-arrow-right ml-3 "></i></Link>:null}
                                        {/* </button> */}
                                </form>
                                 
                                {this.state.nextquestion && <Redirect to={"/addquestion"}/>}
                            </div>
                           
                        </div>
                        
                            );
                    }
                }
            </Consumer>
            
        )
    }
}

export default AddQuiz;
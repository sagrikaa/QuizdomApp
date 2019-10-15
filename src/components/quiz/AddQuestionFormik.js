/**
 * Adding a Question
 * @author: Sagrika Aggarwal.
 */

import React,{useState,useEffect} from 'react'
import {Redirect,Link} from 'react-router-dom';
import { withFormik , Field, ErrorMessage } from 'formik';
import {Consumer} from '../../context';
import * as Yup from 'yup'
import axios from 'axios';
// import undefined from 'firebase/empty-import';

const AddQuestion = (props)=>{
    const [options,setOptions] = useState([]);
    const [optionError,setOptionError]=useState(false);
    const {errors,handleSubmit,values,setErrors} = props;
   
    const addOption=()=>{
        
        
        if(values.option!==undefined && values.option!==''){
        var node = document.createElement("li");   
        var textnode = document.createTextNode(values.option);        
        node.appendChild(textnode);                             
        document.getElementById("myOptions").appendChild(node); 
        setOptions([...options,values.option])
        values.option='';
        }
        else{
             setOptionError(true)
            
        }
        

    }

    useEffect(()=>{

        values.options = options;
    });

    return(
        <Consumer>
                {
                    value => {
                        const {dispatch} = value;

                        return(
                            <div className='card mb-3 col-md-6 offset-md-3'>
                            <h3 className="card-header gradientNav" >Add Question</h3>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="name">Question</label>
                                        <Field type="text"  className={errors.question ? 'form-control is-invalid': 'form-control'}  name="question" placeholder="Question" />
                                        <div className='invalid-feedback'><ErrorMessage name="question" /></div>
                                    </div>
            
                              
                                    <div className="form-group">
                                    <label htmlFor="name">Options</label>
                                      
                                      <div className='row'>  
                                      <div className='col-md-6'>

                                      <Field type="text" className={optionError? 'form-control is-invalid': 'form-control'}  name="option" placeholder="Option.." />

                                      <i style={{cursor:'pointer',color:'black'}} className="fas fa-plus-circle col-md-1 mt-3" onClick={addOption}></i>

                                         {optionError?  
                                           <div className='invalid-feedback'  style={{float:'right'}}>
                                                <ErrorMessage name='option'/> 
                                             </div> :null}
                                     </div>
                                     {/* Display entered options */}
                                      <label htmlFor="optionList" className='col-md-6'><ul  id='myOptions'></ul></label>
                                      </div>
                                      
                                    </div>
                                    
                                    {/* Retrieving dropdown options from options entered above */}
                                    <div className="form-group">
                                        <label htmlFor="name">Correct Answer</label>
                                        <Field className="form-control form-control-md"  name='correctAns' component="select">
                                            <option value="">Not Selected</option>
                                            {options.map(o=><option value={o}>{o}</option>)}
                                        </Field>
                                    </div>
            
                                   
                                   
                                    <input type="submit" className="btn btn-block gradientButton" value="Add Question" />
                                </form>
                            </div>
                            
                        </div>
                        
                            );
                    }
                }
            </Consumer>
    )
}

const AddQuestionFormik= withFormik({
    mapPropsToValues(){},
    validationSchema: Yup.object().shape({
        question: Yup.string().required('Please enter a question'),
       // option:Yup.string().required('Please enter an option before clicking add')
    }),

    handleSubmit(values,{resetForm,setErrors,setSubmitting,setValues}){
     
        console.log(values);
        let {question,options,correctAns} = values;  
      
        const questionset = {
            
            question,
            options,
            correctAns,
            
        };

        console.log(questionset);
        console.log(sessionStorage.getItem('quizId'))
        axios.patch(`https://quizdom-backend.herokuapp.com/api/quiz/5cfff20f5b05145c8489d2c1/question`,questionset)
        .then(res => console.log(res)
        )

     
    }
})(AddQuestion);
export default AddQuestionFormik;
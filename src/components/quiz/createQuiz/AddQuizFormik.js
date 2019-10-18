/**
 * Adding a Request( AddUpdateMaterialRequest )
 * @author: Sagrika Aggarwal.
 */

import React,{useState,useEffect} from 'react'
import {Redirect,Link} from 'react-router-dom';
import { withFormik , Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';


const AddQuiz = (props)=>{
  
  const  {handleSubmit,errors,values} = props;
  const [categories,setCategory] = useState([]);
 
  useEffect(() => {
 
    axios.get('https://quizdom-backend.herokuapp.com/api/category')
     .then(res=>setCategory(res.data)); 
 },[]);
 

return(
    <div className='card mb-3 col-md-6 offset-md-3'>

    <h3 className="card-header gradientNav">Add Quiz
    {/* <i style={{cursor:'pointer',float:'right',color:'red'}} className="fas fa-plus-circle "></i>
     */}
    </h3>
    
    <div className="card-body">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                
                <Field className={errors.name ? 'form-control is-invalid': 'form-control'} type='textarea' name="name"/>
              <div className='invalid-feedback'><ErrorMessage name="name" /></div>
                
            </div>

            <div className="form-group">
                <label htmlFor="name">Category</label>
              
                <Field className={errors.category ?'form-control is-invalid':'form-control'} component="select"  name="category">
              <option value="">Not Selected</option>
              { categories.map(c => <option value={c._id}>{c.name}</option>)}
                </Field>
              <div className='invalid-feedback'>
              <ErrorMessage name="category" />
              </div>
               
            </div>

            <div className="form-group">
                <label htmlFor="name">Difficult</label>
                <Field className={errors.difficult ?'form-control is-invalid':'form-control'} component="select"  name="difficult">
                    <option value="">Not Selected</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </Field>
              <div className='invalid-feedback'>
              <ErrorMessage name="difficult" />
              </div>
             
            </div>

            <div className="form-group">
                <label htmlFor="name">Description</label>
                <Field type="textarea" className={errors.difficult ?'form-control is-invalid':'form-control'}  name="description" placeholder="Description" />
            </div>

            
             <input type="submit" id='addQuiz' className="btn btn-block gradientButton" value="Save Quiz" />
            
            {/* <button id='addQuestion' className="btn btn-block gradientButton" value="Add Question" style={{color:'white'}}> */}
               { values.nextQuestion?<Link to={'/addquestion'}  className='btn btn-block gradientButton'
                style={{color:'white'}} id='addQuestion'>
                     Add Question
                <i style={{cursor:'pointer',color:'white'}} className="fas fa-arrow-right ml-3 "></i></Link>:null}
                {/* </button> */}
        </form>
         
        {values.nextquestion && <Redirect to={"/addquestion"}/>}
    </div>
   
</div>


)};

const FormikAddQuiz = withFormik(
  {
   
    mapPropsToValues(){
       return{
          name:'',
          category:'',
          difficult:'',
          description:'',
          
      }
  },
    
validationSchema : Yup.object().shape({
    name:Yup.string().required('Name is  not required'),
    category:Yup.string().required('Please select a category'),
    difficult:Yup.string().required('Please select a level difficulty'),
    
}),

 
handleSubmit(values,{resetForm,setErrors,setSubmitting,setValues}){
      
        axios.post('https://quizdom-backend.herokuapp.com/api/quiz',values)
        .then(res => 
            {
                 sessionStorage.setItem('quizId',res.data._id);
                 setErrors({})
            })
        setValues({redirect:true,nextQuestion:true})
        document.getElementById("addQuiz").disabled = true;
     
    }


})(AddQuiz);  




export default FormikAddQuiz;
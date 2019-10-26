import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PreviewQuestion from './PreviewQuestion'
export default function PreviewQuestions(props) {
   
    
    const [questionset,setQuestionset]=useState([]);
    const[quiz,setQuiz] = useState({})

   

    useEffect(()=>{
        axios.get(`https://quizdom-backend.herokuapp.com/api/quiz/${props.id}`)
       .then(res=>
        {
           setQuiz(res.data)
           console.log(res.data) 
           setQuestionset(res.data.questionset) 
        })
    },[quiz,props])

    return (

        <React.Fragment>
           <h3 className="card-header gradientNav" >{quiz.name}(Preview)</h3>
           <div className='card-body'> 
               <ul className="list-group list-group-flush">  
              

               {questionset.map((quest,index)=>
                   <li className="list-group-item" >
                    

                     <div className="form-group">
                       <PreviewQuestion question={quest} id={index+1}/>
                        
                        <div><label>Answer: {quest.correctAns}</label></div>
                     </div>

                    
                   </li>
                  )} 
                   
              

               
                
            </ul>
            </div> 
           {console.log(questionset)}
        </React.Fragment>
    )
}

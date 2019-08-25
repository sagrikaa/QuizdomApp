import  React , {Component} from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state ,action) =>{
    switch(action.type){

        case 'DELETE_CONTACT': return{
            // ...state,
            contacts: state.contacts.filter(contact=>contact.id !== action.payload)
        };


        case 'ADD_CONTACT': return{
            ...state,
            contacts: [action.payload , ...state.contacts]
        };


        case 'DELETE_QUIZ': return{
            ...state,
            quizes:state.quizes.filter(quiz=>quiz._id!== action.payload)
            
        };
        default:
            return state;
    }
}
export default class Provider extends Component{

    state= {
        
        contacts:[
            {id:1,name:'sagrika aggarwal',email:'sagrika@gmail.com', phone:'666-666-6666' },
            {id:2,name:'leo antonio',email:'leo@gmail.com',phone:'777-777-7777'},
            {id:3,name:'bernardo sze',email:'b.sze@gmail.com',phone:'888-888-8888'}
        ],

        faqs:[],

        quizes:[],
        categories:[],
        dispatch: action=>this.setState(state=>reducer(state,action))
    }
    
    componentDidMount(){
        axios.get('https://quizdom-backend.herokuapp.com/api/quiz')
        .then(res => 
            { this.setState({quizes:res.data})   })

         axios.get('https://quizdom-backend.herokuapp.com/api/category')
        .then(res => 
            { this.setState({categories:res.data}) ;console.log(this.state.categories)  })

        axios.get('https://quizdom-backend.herokuapp.com/api/faq')
            .then(res => 
                { this.setState({faqs:res.data}) ;console.log(this.state.faqs)  })
    }
    
render(){
   return( 
   < Context.Provider value={this.state} >

        {this.props.children}
    
    </Context.Provider>)
}
}

export const Consumer = Context.Consumer;
import React, { Component } from 'react'
import axios from 'axios';

export default class ContactUs extends Component {

handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    axios({
        method: "POST", 
        url:"http://localhost:2000/api/contactus/send", 
        data: {
            name: name,   
            email: email,  
            message: message
        }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    })
}

resetForm(){
    document.getElementById('contact-form').reset();
}

render(){
    return(
       
            
        <div className=" card col-sm-4 offset-sm-4">
            <h3 className="text-center">Drop us a message!</h3>
            <div className="col-sm-3 offset-sm-3">
                
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="name" required />
                    
                </div>
                
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="form-group">
                    <label >Message</label>
                    <textarea className="form-control" rows="5" id="message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

}


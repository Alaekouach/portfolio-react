import React from 'react';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Include Sweetalert
import Swal from 'sweetalert2'
//axios for api request
import axios from 'axios';
import { Redirect } from "react-router-dom";


class Login extends React.Component {
  constructor(props)
    {
      super(props);
      this.addFormData = this.addFormData.bind(this);
    }

    state = { redirection: false }

  //Form Submission
  addFormData(evt)
    {
      evt.preventDefault();
      const fd = new FormData();
      fd.append('email', this.refs.myEmail.value);
      fd.append('password', this.refs.pass.value);
      
      axios.post('http://127.0.0.1:8000/api/login', fd
      ).then(res=>
        {
            //console.log(res.data.status);
            if (res.data.status==="success") {
                //Success alert
                console.log(res);
                Swal.fire({
                    title: 'Hurry',
                    text:   res.data['data']['name']+" has been logged In successfully",
                    type: 'success'
                })
                this.myFormRef.reset();
                 this.setState({ redirection: true });
            }else{
                alert(`Our System Failed To login Your Account!`);
                this.myFormRef.reset();
            }
        
        });
    }
 
    render() {

        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to="/profil" />;
        }
   
        return (        
            <div className="maincontainer ml-5 pl-5">
                
                <h1 className="mr-5 ml-5 mt-5">Reactjs Laravel 8 User Auth Login</h1>
                <div className="container mb-5 mt-5 text-left">
                    <form ref={(el) => this.myFormRef = el}>
                        <div className="form-group">
                            <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" ref="myEmail" />
                        </div>
                        
                        <div className="form-group">
                            <input type="password" className="form-control" id="pass" placeholder="Enter Password" ref="pass" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Submit</button>
                    </form>    
                </div>
            
            </div> 
        )
    };
}
export default Login;
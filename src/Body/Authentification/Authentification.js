import React from 'react';
//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
//Include Sweetalert
import Swal from 'sweetalert2'
//axios for api request
import axios from 'axios';
import { Redirect} from "react-router-dom";
import '../Authentification/Authentification.css';


class Authentification extends React.Component {
  constructor(props)
    {
      super(props);
      this.addFormDataRegister = this.addFormDataRegister.bind(this);
      this.addFormDataLogin = this.addFormDataLogin.bind(this);
    }

    state = {
        redirection_login: false,
    }

  //Form Submission
  addFormDataLogin(evt)
    {
      evt.preventDefault();
      const fd = new FormData();
      fd.append('email', this.refs.myemail.value);
      fd.append('password', this.refs.pass.value);

      axios.post('http://127.0.0.1:8000/api/login', fd
      ).then(res_login=>
        {
            //console.log(res.data.status);
            if (res_login.data.status==="success") {
                //Success alert
                console.log(res_login);
                // Swal.fire({
                //     title: 'Hurry',
                //     text:   res_login.data['data']['name']+" has been logged In successfully",
                //     type: 'success'
                // })
                 localStorage.setItem("user_id", res_login.data.data.id);  
               
                this.myFormRef.reset();
                this.setState({ redirection_login: true });
            }else{
                alert(`Our System Failed To login Your Account!`);
                this.myFormRef.reset();
            }

            //this.myFormRef.reset();
        });
    }



    addFormDataRegister(evt)
    {
      evt.preventDefault();
      const fd = new FormData();
      fd.append('name', this.refs.myname.value);
      fd.append('lastname', this.refs.mylastname.value);
      fd.append('email', this.refs.myEmail.value);
      fd.append('password', this.refs.passe.value);

      axios.post('http://127.0.0.1:8000/api/register', fd
      ).then(res_register=>
        {
          //console.log(res.data.status);
          if (res_register.data.status==="success") {
            //Success alert
            console.log(res_register);
            Swal.fire({
              title: 'Félicitations',
              text:   'Bienvenue à "VotrePortfolio.ma" '+res_register.data['data']['name']+' '+res_register.data['data']['lastname'],
              type: 'success'
            });

            this.myFormRef.reset();
            // this.setState({ redirection_register: true });
          }else{
            alert(`Our System Failed To Register Your Account!`);
            this.myFormRef.reset();
          }

          //this.myFormRef.reset();
        });
    }

    deconnexion(evt){
    
        axios.post('http://127.0.0.1:8000/api/logoutapi'
        ).then(res_logout=>
        {
          
        });

        localStorage.setItem("user_id","");
    }





    render() {

        const { redirection_login } = this.state;
        if (redirection_login) {
             //Affichage de la redirection
            return <Redirect to='/Profil'/>;
        }

        

        return (

        <div className="pt-3 pb-3">

            <div className="container col-md-9 mb-3">
                <div className="cercle"></div>
                <h2>Authentification</h2>
            </div>
            <div className="container authentification bg-light">

                <div className="container col-md-6">

                    <h1 className="text-center mt-3" style={{color: "rgb(103,208,186)"}}>Connexion</h1>
                    <div className="container mb-5 mt-5 text-left auth-form">
                        
                        <form ref={(el) => this.myFormRef = el}>
                            <div className="form-inner">
                                <div className="form-group">
                                    <label>Email :</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Entrez votre email" ref="myemail" />
                                </div>

                                <div className="form-group ">
                                    <label>Mot de passe :</label>
                                    <input type="password" className="form-control" id="pass" placeholder="Entrez votre mot de passe" ref="pass" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.addFormDataLogin}>Valider</button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className="container col-md-6  ">

                    <h1 className="text-center mt-3" style={{color: "rgb(103,208,186)"}}>Inscription</h1>
                    <div className="container mb-5 mt-5 text-left auth-form">
                        <form ref={(el) => this.myFormRef = el} >
                            <div className="form-inner">                                
                                <div className="form-group ">
                                    <label>Nom :</label>
                                    <input type="text" className="form-control" id="name" placeholder="Entrez Votre nom" ref="myname" />
                                </div>
                                <div className="form-group ">
                                    <label>Prenom :</label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Entrez Votre prenom" ref="mylastname" />
                                </div>
                                <div className="form-group ">
                                    <label>Email :</label>
                                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Entrez votre email" ref="myEmail" />
                                </div>
                                <div className="form-group ">
                                    <label>Mot de passe :</label>
                                    <input type="password" className="form-control" id="passe" placeholder="Entrez votre mot de passe" ref="passe" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.addFormDataRegister}>Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            

        </div>
        )
    };
}
export default Authentification;
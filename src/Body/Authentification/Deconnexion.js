import React from 'react';
import axios from 'axios';
import './Deconnexion.css';
import { Redirect} from "react-router-dom";




    function Deconnexion(){
        const url="http://127.0.0.1:8000/api/logoutapi";
        axios.post(url)
        .then( response => {
            localStorage.setItem("user_id","");
        })   
    


       return (
            <div>                
                <Redirect to='/Authentification'/>
            </div>
       )
    
}
export default Deconnexion;
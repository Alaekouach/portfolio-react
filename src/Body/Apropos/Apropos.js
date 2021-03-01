import React from 'react';
import './Apropos.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Apropos() {

  const [data,setData] = useState([]);
  const user_id= localStorage.getItem("user_id");
  const url="http://127.0.0.1:8000/api/apropos/" + user_id;

  useEffect( () =>  {
    axios.get(url)
        .then( response => {
            setData(response.data); 
            // console.log(data); 
        })
}, [url]);



  return (
    <div className="apropos bg-white pt-3  mt-1" >
                       
            <div className="container col-md-9 ">
              <div className="cercle"></div>
              <h2>A propos de moi</h2>
            </div> 

          
            <div key={data.id} className="container col-md-10 d-flex justify-content-around ">
             
                <div className="container mt-4">
                  <img src={data.photo_profil} alt=""></img>
                </div>
                
                <div className="container txt-bio bg-light col-md-8">
                  <h5 className="text-center font3">Hello!</h5>
                  <h5 className="text-center"> Je m'appelle <span className="text-primary font2"><span className="text-primary font2 text-uppercase">{data.nom}</span> {data.prenom}</span></h5>
                  <p className="container col-md-10 mt-2 text-justify">{data.bio}</p>
                
                  <div className="container d-flex justify-content-between mt-2 pl-5">
                    <div className="container col-md-5 ">
                      <p ><span >Nom :</span> {data.nom} </p>
                      <p><span >Prénom :</span> {data.prenom}</p> 
                      <p><span >Date de naissance :</span> {data.date_de_naissance}</p>                     
                      <p><span>Statut de travail :</span> {data.statut_de_travail}</p>
                      <p><span>Nationalité :</span> {data.nationalite}</p>
                    </div>
                    <div className="container col-md-5 ">
                      <p><span>Téléphone :</span> (+212) {data.tel}</p>
                      <p><span>Email :</span> {data.email}</p>
                      <p><span>Addresse :</span>{data.addresse}, {data.ville}, {data.pays}</p>
                      <p><span>Disponibilité :</span> {data.disponibilite}</p>
                    </div>
                  </div>

                  
                  <Link to=".\Cv\CV ALAE EDDINE KOUACH.pdf" target="_blank" download><button className="btn btn-primary float-right mr-5 mb-2">Télécharger mon CV</button></Link>
                </div>
             
            </div> 
          

            <div className="container d-flex justify-content-around text-center mt-4 carre">

              <div className="p-2 pt-4 ">
              <i class="fas fa-brain"></i><br />
                <small>La créativité</small>
              </div>
              <div className="p-2 pt-4">
                <i className="fas fa-coffee"></i><br />
                <small>Tasses de café</small>
              </div>
              <div className="p-2 pt-4">
                <i className="fas fa-smile"></i><br />
                <small style={{fontSize:"0.75rem"}}>Clients satisfaits</small>
              </div>
              <div className="p-2 pt-4">
                <i className="fas fa-sun"></i><br />
                <small style={{fontSize:"0.75rem"}}>Conception Web</small>
              </div>
              <div className="p-2 pt-4 ">
                <i className="fas fa-medal"></i><br />
                <small style={{fontSize:"0.75rem"}}>Qualité de travail</small>
              </div>
              <div className="p-2 pt-4">
                <i className="fas fa-code"></i><br />
                <small>Pattern Design</small>
              </div>

            </div>






    </div>
  )
}
export default Apropos;
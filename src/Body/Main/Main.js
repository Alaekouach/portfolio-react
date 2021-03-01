import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';


function Main() {


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
      
    <div className="main col-md-12 bg-white d-flex pt-3 pb-3">
       

      <div key={data.id} className="col-md-6 pl-5">
          <div className="">
                <figure className="titre">
                    <small>Bonjour les développeurs,</small>
                    <div className="text-center mt-1 mb-1 ">
                      <h1 className="mt-4 mb-4 font"> Je suis <span className="text-primary font">{data.statut_de_travail}</span></h1>
                    </div>
                    
                    <small>Bienvenue dans mon site Portfolio</small> 
                    <br /> <br />
                    <Link to={"Apropos"}> 
                        <button className="btn-lg btn-primary ml-4">Savoir plus sur moi</button>
                    </Link>
                </figure>                
          </div>

          <div className="main2 d-flex justify-content-around">
              <figure>
                    <figcaption><i className="fas fa-envelope"></i></figcaption>
                    <small>{data.email}</small>
              </figure>
              <figure>
                    <figcaption><i className="fas fa-phone"></i></figcaption>
                    <small>(+212) {data.tel}</small>
              </figure>
              <figure>
                    <figcaption><i className="fas fa-globe-africa"></i></figcaption>
                    <small> {data.ville} , {data.pays} </small>
              </figure>
          </div>
        
      </div>


      <div className="col-md-6">
            <img src=".\photos\accueil\IRGHmiGsa16stedQvIaZfw.gif" alt=""></img>
      </div>   

    </div>
 
  )
}
export default Main;
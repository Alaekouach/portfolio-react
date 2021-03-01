import React from 'react';
import './Projets.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Projets() {


    const user_id= localStorage.getItem("user_id");

    const [projets,setProjets] = useState([]);
    const url="http://127.0.0.1:8000/api/projet/" + user_id;

    useEffect( () =>  {
        axios.get(url)
            .then( response => {
                setProjets(response.data); 
               // console.log(projets[1].experiences[0].photo_projet); 
            })
            
    }, [url]);
   


    return (
        <div className="projets bg-white pt-3 pb-3" >

            <div className="container col-md-9">
                <div className="cercle"></div>
                <h2>Mes projets</h2>
            </div>

            <div className="container col-md-10 d-flex flex-wrap justify-content-around mt-4">  
                
                {projets.map(item =>(  
                    
                    <div key={item.id} className="container col-md-4 photos image mr-5 mb-5">

                        <Link to={{ pathname:"Projet/"+item.id,state: { id: item.id } }} >
                            <img src={item.experiences[0].photo_projet} alt="" className="container "></img> 
                                
                            <div className="col-md-12 d-flex justify-content-between photos2">
                                <p className="text-uppercase">{item.intitule_projet}</p>
                                <i className="fas fa-share-square"></i>
                            </div>   
                        </Link>                      

                    </div>

                ) )}   
                
            </div>

        </div>
    )

}
export default Projets;
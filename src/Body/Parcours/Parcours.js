import React from 'react';
import './Parcours.css';
import {useState,useEffect} from 'react';
import axios from 'axios';



function Parcours() {

    const user_id= localStorage.getItem("user_id");

    const [data,setData] = useState([]);
    const url="http://127.0.0.1:8000/api/parcours/" + user_id;

    useEffect( () =>  {
        axios.get(url)
            .then( response => {
                setData(response.data); 
                // console.log(data); 
            })
    }, [url]);



    const [data2,setData2] = useState([]);
    const url2="http://127.0.0.1:8000/api/projet/" + user_id;

    useEffect( () =>  {
        axios.get(url2)
            .then( response => {
                setData2(response.data); 
                // console.log(data2); 
            })
    }, [url2]);

    


    return (
        <div className="parcours bg-white pt-3 pb-3 " >
                           
            <div className="container col-md-9 ">
                <div className="cercle"></div>
                <h2>Mon parcours  </h2>
            </div>


            <div className="container col-md-10 d-flex justify-content-around pt-2 mt-5">

                <div className="container bg-light col-md-5 pb-3">

                    <u><h5 className="mt-2 mb-4">Mes Formations </h5></u>

                    {data.map(item =>(

                        <div key={item.id} className="d-flex">

                            <div className="d-flex col-md-1">
                                <div className="ligne_verticale" ></div>
                                <div className="petit_cercle" ></div>
                            </div>

                            <div className="col-md-11">
                                <figure className="mb-4 ">
                                    <h6 className="text-capitalize mb-n1 text-success">{item.diplome} {item.filiere}</h6>
                                    <div className="mb-3 mt-1 d-flex justify-content-between">
                                        <small className="col-md-6 ml-2"><span className="forma "><u>Ecole:</u> </span>{item.ecole}</small>
                                        <small className="col-md-5"><span className="forma"><u>Année:</u> </span> "{item.annee_de_debut} - {item.annee_de_fin}"  </small>
                                    </div>
                                    <p className=" description-forma text-justify">{item.description}</p>
                                </figure> 
                            </div>

                        </div>

                    ) )}

                </div>

                <div className="container bg-light col-md-5 pb-3">

                    <u><h5 className="mt-2 mb-4">Mes Expériences Professionnelles</h5></u>

                    {data2.map(item =>(
                        <div key={item.id} className="d-flex ">

                            <div className="d-flex col-md-1">
                                <div className="ligne_verticale" ></div>
                                <div className="petit_cercle" ></div>
                            </div>

                            <div className="col-md-11">
                                <figure className="mb-4">
                                    <h6 className="text-uppercase mb-n1" style={{color: "#D2691E"}}>{item.intitule_projet}</h6>
                                    <small > <span className="forma"><u>Client </u></span>: {item.client}</small>
                                    <small className="ml-5 pl-5"><span className="forma"><u>Durée </u></span>: {item.duree_realisation} jours</small>
                                    <small className="float-right"> <span className="forma"><u>Année</u></span> : {item.annee_de_realisation} </small>
                                    <br />
                                    <p className="mt-2 mb-4 description-forma text-justify">{item.description_projet}</p>
                                </figure> 
                            </div>

                        </div>
                    ) )}

                </div>

            </div> 

           
        </div>
    )

}
export default Parcours;
import React from 'react';
import './Projet.css';
import {useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';

import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
//import '../../../Register/node_modules/bootstrap/dist/css/bootstrap.min.css';




function Projet() {

    let location = useLocation();
    const user_id= localStorage.getItem("user_id");
    const wrapper = React.createRef();
    

    const [projet,setProjet] = useState([]);
    const url="http://127.0.0.1:8000/api/projet/" + user_id + "/" + location.state.id ;
    useEffect( () =>  {
        axios.get(url)
            .then( response => {
                setProjet(response.data); 
                // console.log(projet); 
            })
    }, [url]);


    const [photos,setPhotos] = useState([]);
    const url2="http://127.0.0.1:8000/api/experience/" + location.state.id;
    useEffect( () =>  {
        axios.get(url2)
            .then( response => {
                setPhotos(response.data); 
            })
    }, [url2]);

    const [technologies,setTechnologies] = useState([]);
    const url3="http://127.0.0.1:8000/api/technologie_by_projet/" + location.state.id;
    useEffect( () =>  {
        axios.get(url3)
            .then( response => {
                setTechnologies(response.data); 
                // console.log(technologies); 
            })
    }, [url3]);


    return(

        <div className="projet bg-white pt-3 pb-3" >

            <div className="container d-flex justify-content-between col-md-9 aa">
                <div>
                    <div className="cercle"></div>
                    <h2>Projet: <span className="text-uppercase text-success">{projet.intitule_projet}</span></h2>
                </div>
                <Link to="/Projets"> 
                    <i class="fas fa-undo-alt text-success" style={{fontSize:"40px",marginRight:"60px"}}></i>
                </Link>
            </div>

            <div className="col-md-10 ml-5 d-flex justify-content-around  " style={{paddingLeft:120+'px',marginTop:50+'px'}} >

                <div className="col-md-5">
                    
                    <Carousel ref={wrapper}>
                        {photos.map(item =>(
                            <Carousel.Item key={item.id} className="mt-2">                                
                                <img src={item.photo_projet}  alt="" className="container d-block w-100 photo"/>
                            </Carousel.Item>
                        ) )}
                    </Carousel>                
                      
                </div>

                <div className="col-md-6 bg-light pt-4">
                    <h4>INFOS PROJET</h4>

                    <hr /> 

                    <div className="col-md-7 d-flex justify-content-around mt-2 ">
                        <div>
                            <i className="far fa-calendar-alt"></i>
                            <small className="text-secondary ml-1">Année de réalisation : </small>
                        </div>
                        <strong>{projet.annee_de_realisation}</strong>
                    </div>
                    
                    <hr />

                    <div className="col-md-12 d-flex justify-content-between mt-2 ">
                        <div className="d-flex ">
                            <i className="fab fa-buffer"></i>
                            <small className="text-secondary ml-1">Technologies:</small>
                        </div>
                        <div className="col-md-9 d-flex justify-content-around flex-wrap ">
                            {technologies.map(item =>(
                                <div key={item.id} className="text-center mt-2 col-md-4 border bg-warning">
                                    
                                    <small>{item.intitule_technologie}</small>  
                        
                                </div> 
                            ) )}
                        </div>
                    </div>

                    <hr />

                    <div className="col-md-7 d-flex justify-content-around mt-2 ">
                        <div >
                            <i className="fas fa-user-tie"></i>
                            <small className="text-secondary ml-1">Client : </small>
                        </div>
                        <strong>{projet.client}</strong>
                    </div>

                    <hr />

                    <div className="col-md-7 d-flex justify-content-around mt-2 ">
                        <div className="d-flex ">
                            <i className="fas fa-stopwatch"></i>
                            <small className="text-secondary ml-1">Durée de réalisation  : </small>
                        </div>
                        <strong>{projet.duree_realisation} Jours</strong>
                    </div>

                    <hr />

                    <div className="mt-2 ">
                        <div className="d-flex col-md-5 mb-2">
                            <i className="fas fa-file-alt"></i>
                            <small className="text-secondary ml-1">Description projet  : </small>
                        </div>
                        <p className="container col-md-12 mt-3">{projet.description_projet}</p>
                    </div>


                </div>

            </div>
                  
        </div>
    )

}
export default Projet;
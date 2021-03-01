import React from 'react';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Dashboard.css';


function Dashboard() { 


    function Deconnexion(){
    
        const url="http://127.0.0.1:8000/api/logoutapi";
       
        axios.post(url)
        .then( response => {
            console.log("déconnecté avec succés");
            localStorage.setItem("user_id","");
        })   
        
    }


    return (
        <div className="dashboard bg-white pt-3 pb-3 " >
                           
            <div className="container col-md-9">
                <div className="cercle"></div>
                <h2>Tableau de bord</h2>
            </div>

            <div className="container col-md-10 pt-4 mr-5">

                <div className="container d-flex "> 
                    <div className="col-md-2 pho">
                        <img src=".\photos\apropos\alae.jpg" alt=""></img>
                    </div>

                    <div className="col-md-6 pt-4">
                        <h2>KOUACH ALAE EDDINE</h2>
                        <Link to={"Authentification"}> 
                            <h4 className="text-primary" onClick={() => Deconnexion()}>Déconnexion</h4>
                        </Link>
                    </div>
                </div>

                <div className="container mt-3"> 

                    <Nav justify variant="tabs" defaultActiveKey="/Profil">
                        <Nav.Item>
                            <Nav.Link href="/Profil">Profil</Nav.Link> 
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Formations">Formations</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Mesprojets">Projets</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Messages">Messages</Nav.Link>
                        </Nav.Item>
                    </Nav>

                </div>

            </div> 

        </div>
    )
}
export default Dashboard;
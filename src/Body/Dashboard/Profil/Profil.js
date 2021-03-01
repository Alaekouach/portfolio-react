import React from 'react';
import '../Profil/Profil.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button,Nav,Form,Row,Col } from 'react-bootstrap';


function Profil() {

     const userid= localStorage.getItem("user_id");

    const [userdata,setUserdata] = useState({
        name: '',
        lastname:'',
        email: ''
    });    

    const url_user="http://127.0.0.1:8000/api/user/" + userid;
    useEffect( () =>  {
      axios.get(url_user)
          .then( response => {
              setUserdata(response.data);
              console.log(response);
          })
    }, [url_user]);


    const [aproposdata,setAproposdata] = useState({
        source_profil:'',
        nom: '',
        prenom:'',
        email: '',
        date_de_naissance: '',
        nationalite: '',
        statut_de_travail: '',
        bio: '',
        tel: '',
        addresse: '',
        ville:'',
        pays:'',
        photo_profil:'',
        disponibilite:'',
        user_id: '',
    }); 
       

    const url_apropos="http://127.0.0.1:8000/api/apropos/" + userid;
        useEffect( () =>  {
        axios.get(url_apropos)
            .then( res => {
                setAproposdata(res.data);
                console.log(res);
            })
    }, [url_apropos]);

    

   
    const HandleSubmit = (event) => {
        event.preventDefault();
        const apropos_id=aproposdata.id;


        const url_apropos_put="http://127.0.0.1:8000/api/apropos/" + userid + "/" + apropos_id;
        axios.put(url_apropos_put, aproposdata)
        .then( response => {
            console.log(response);
        })       
        

        const url_user_put="http://127.0.0.1:8000/api/user/" + userid;
        axios.put(url_user_put, userdata)
        .then( response => {
            console.log(response);
        })
    };



    const handleName = (event) => {
        event.persist();
        setUserdata((userdata) => ({
            ...userdata,
            name: event.target.value,
        }));
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            nom: event.target.value,
        }));
    };

    const handleLastname = (event) => {
        event.persist();
        setUserdata((userdata) => ({
            ...userdata,
            lastname: event.target.value,
        }));
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            prenom: event.target.value,
        }));
    };

    const handleEmail = (event) => {
        event.persist();
        setUserdata((userdata) => ({
            ...userdata,
            email: event.target.value,
        }));
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            email: event.target.value,
        }));
    };

    const handlePassword = (event) => {
        event.persist();
        setUserdata((userdata) => ({
            ...userdata,
            password: event.target.value,
        }));
    };

    


    const handleDatedenaissance = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            date_de_naissance: event.target.value,
        }));
    };

    const handleTel = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            tel: event.target.value,
        }));
    };

    const handleNationalite = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            nationalite: event.target.value,
        }));
    };

    const handleAddresse = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            addresse: event.target.value,
        }));
    };

    const handleVille = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            ville: event.target.value,
        }));
    };

    const handlePays = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            pays: event.target.value,
        }));
    };

    const handleStatutdetravail = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            statut_de_travail: event.target.value,
        }));
    };  

    

    const handlePhotoprofil = (event) => {
        event.persist();
        
        if( event.target.files && event.target.files[0])
        {
                const file= event.target.files;
                //console.log(file);

                const reader =new FileReader();
                            
                reader.onload=(event)=> {
                    console.log("img_data", event.target.result);
                    setAproposdata((aproposdata) => ({
                        ...aproposdata,
                        source_profil: event.target.result, 
                    }));               
                }
                reader.readAsDataURL(file[0]); 
                
                setAproposdata((aproposdata) => ({
                    ...aproposdata,
                    photo_profil: (event.target.files[0].name).substr((event.target.files[0].name).lastIndexOf('\\') + 1).split('.')[0]
                }));
            
        }else{
            setAproposdata((aproposdata) => ({
                ...aproposdata,
                source_profil: '', 
            })); 
        }
    };



    const handleBio = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            bio: event.target.value,
        }));
    };

    const handleDisponibilite = (event) => {
        event.persist();
        setAproposdata((aproposdata) => ({
            ...aproposdata,
            disponibilite: event.target.value,
        }));
    };



    
    function Deconnexion(){
        const url="http://127.0.0.1:8000/api/logoutapi";
        axios.post(url)
        .then( response => {
            console.log("déconnecté avec succés");
            localStorage.setItem("userid","");
        })   
        //localStorage.setItem("user_id","");
    }






    return (


        <div className="profil bg-white pt-3 pb-3 " >
                           
            <div className="container col-md-9">
                <div className="cercle"></div>
                <h2>Tableau de bord</h2>
            </div>

            <div className="container col-md-10 pt-4 mr-5">

                <div className="container d-flex "> 
                    <div className="col-md-2 pho">
                        <img src={userdata.profile_photo_url} alt=""></img>
                    </div>

                    <div className="col-md-6 pt-4">
                        <h2><span className="text-uppercase">{userdata.name}</span> {userdata.lastname}</h2>
                        <Link to={"Authentification"}> 
                            <h4 className="text-primary" onClick={() => Deconnexion()}>Déconnexion</h4>
                        </Link>
                    </div>
                </div>

                <div className="container mt-3"> 

                    <Nav justify variant="tabs" defaultActiveKey="/Profil" className="bg-light">
                        <Nav.Item>
                            <Nav.Link href="/Profil" className="bg-info text-white">Profil</Nav.Link> 
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
                 
                    <div className="container mt-4 pt-3 formulaire">
                     
                        <Form onSubmit={HandleSubmit}>
                        
                            <h4 >CONNEXION</h4>
                            <hr />
                            <div className="container col-md-10">                               
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="3" className="text-success">Email</Form.Label>
                                    <Col sm="5"><Form.Control type="email" value={aproposdata.email} onChange={handleEmail}  required /></Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="3" className="text-success">Password</Form.Label>
                                    <Col sm="5"><Form.Control type="password" value={userdata.password} onChange={handlePassword} /></Col>
                                </Form.Group>
                            </div>

                            <h4 >IDENTITE</h4>
                            <hr />
                            <div className="container col-md-10">

                                <div className="col-md-10 d-flex justify-content-between">
                                    <Form.Group  controlId="formPlaintextNom">
                                        <Form.Label column sm="2" className="text-success">Nom</Form.Label>
                                        <Col sm="12"><Form.Control type="text" value={aproposdata.nom} onChange={handleName}  required/></Col>
                                    </Form.Group>
                                    <Form.Group  controlId="formPlaintextPrenom">
                                        <Form.Label column sm="2" className="text-success">Prénom</Form.Label>
                                        <Col sm="12"><Form.Control type="text" value={aproposdata.prenom} onChange={handleLastname}   required/></Col>
                                    </Form.Group>
                                </div>

                                <Form.Group as={Row} controlId="formPlaintextDatenaissance">
                                    <Form.Label column sm="3" className="text-success">Date de Naissance</Form.Label>
                                    <Col sm="5"><Form.Control type="date" value={aproposdata.date_de_naissance} onChange={handleDatedenaissance} required/></Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPhone">
                                    <Form.Label column sm="3" className="text-success">Numéro de Téléphone</Form.Label>
                                    <Col sm="5"><Form.Control type="number" value={aproposdata.tel} onChange={handleTel} maxLength="10" minLength="10"  required/></Col>
                                </Form.Group> 

                                <Form.Group as={Row} controlId="formPlaintextNationalite">
                                    <Form.Label column sm="3" className="text-success">Nationalité</Form.Label>
                                    <Col sm="5"><Form.Control type="text" value={aproposdata.nationalite} onChange={handleNationalite} required/></Col>
                                </Form.Group>

                                <div className="col-md-12 d-flex justify-content-between">
                                    <Form.Group as={Row} controlId="formPlaintextPhoto">
                                        <Form.Label column sm="4" className="text-success">Photo du profil</Form.Label>                                    
                                        <Col sm="5"><Form.Control type="file" onChange={handlePhotoprofil}/></Col>
                                    </Form.Group>
                                    <img src={aproposdata.source_profil} alt="" className="card-img w-25"></img>
                                </div>
                            </div>

                            <h4 >COORDONNEES</h4>
                            <hr />
                            <div className="container col-md-10">
                                <Form.Group  controlId="formPlaintextAdresse">
                                    <Form.Label column sm="2" className="text-success">Adresse</Form.Label>
                                    <Col sm="8"><Form.Control type="text" value={aproposdata.addresse} onChange={handleAddresse}   required/></Col>
                                </Form.Group>

                                <div className="col-md-8 d-flex justify-content-between">
                                    <Form.Group  controlId="formPlaintextVille">
                                        <Form.Label column sm="2" className="text-success">Ville</Form.Label>
                                        <Col sm="12"><Form.Control type="text" value={aproposdata.ville} onChange={handleVille}   required/></Col>
                                    </Form.Group>
                                    <Form.Group  controlId="formPlaintextPays">
                                        <Form.Label column sm="2" className="text-success">Pays</Form.Label>
                                        <Col sm="12"><Form.Control type="text" value={aproposdata.pays} onChange={handlePays}   required/></Col>
                                    </Form.Group>
                                </div>
                                                              
                            </div>

                            <h4 >STATUT</h4>
                            <hr />
                            <div className="container col-md-10">
                                <Form.Group as={Row} controlId="formPlaintextStatut">
                                    <Form.Label column sm="3" className="text-success">Statut de travail</Form.Label>
                                    <Col sm="5"><Form.Control type="text" value={aproposdata.statut_de_travail} onChange={handleStatutdetravail} required/></Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextDisponibilite">
                                    <Form.Label column sm="3" className="text-success">Disponibilité</Form.Label>
                                    <Col sm="5"><Form.Control as="select" value={aproposdata.disponibilite} onChange={handleDisponibilite}>
                                        <option value="">Disponibilité...</option>
                                        <option value="Immédiate">Immédiate</option>
                                        <option value="Après 1mois">Après 1mois</option>
                                        <option value="Après 3mois">Après 3mois</option>
                                        <option value="Après plus de 3mois">Après plus de 3mois</option>
                                    </Form.Control></Col>
                                </Form.Group>                                
                                <Form.Group as={Row} controlId="formPlaintextBio">
                                    <Form.Label column sm="3" className="text-success">Bio</Form.Label>
                                    <Col sm="10"><Form.Control as="textarea" value={aproposdata.bio} onChange={handleBio} rows={5} required/></Col>
                                </Form.Group>
                            </div>

                            <div className="mr-5 pr-5 mt-3 mb-4 float-right">
                                <Button variant="primary" type="submit" className="btn-lg" >Valider</Button>
                            </div>

                        </Form>
                    </div>

                </div>

            </div> 

        </div>
    )
}
export default Profil;
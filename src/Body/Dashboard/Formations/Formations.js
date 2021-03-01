import React from 'react';
import '../Formations/Formations.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button,Nav,Form,Row,Col,Table,Modal } from 'react-bootstrap';



function Formations() {


    // les informations du user authentifier
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
    /////////////////////////////////////////////

    // les informations des formations 
    const [data,setData] = useState([]);    

    const url_parcours_get="http://127.0.0.1:8000/api/parcours/" + userid;
    useEffect( () =>  {
        axios.get(url_parcours_get)
            .then(resul => {
                setData(resul.data);                    
                console.log(resul);
            })
    }, [url_parcours_get]);
    /////////////////////////////////////////////////////


    // l'ajout d'une formation
    const [parcoursdata,setParcoursdata] = useState({
        ecole: '',
        diplome:'',
        filiere: '',
        annee_de_debut: '',
        annee_de_fin: '',
        description: '',
        user_id: userid,
    });

    const HandleSubmit = (event) => {
        event.preventDefault();
        const url_parcours_store="http://127.0.0.1:8000/api/parcours";

        axios.post(url_parcours_store, parcoursdata)
        .then( response => {
            console.log(parcoursdata);
            const initdata={
                ecole: '',
                diplome:'',
                filiere: '',
                annee_de_debut: '',
                annee_de_fin: '',
                description: '',
                user_id: userid,
            };
            setParcoursdata(initdata);
        }) 
    };
    
    const handleEcole= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            ecole: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            ecole: event.target.value,
        }));
    };

    const handleDiplome= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            diplome: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            diplome: event.target.value,
        }));
    };

    const handleFiliere= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            filiere: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            filiere: event.target.value,
        }));
    };

    const handleAnneededebut= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            annee_de_debut: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            annee_de_debut: event.target.value,
        }));
    };

    const handleAnneedefin= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            annee_de_fin: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            annee_de_fin: event.target.value,
        }));
    };

    const handleDescription= (event) => {
        event.persist();
        setParcoursdata((parcoursdata) => ({
            ...parcoursdata,
            description: event.target.value,
        }));
        setParcourdata((parcourdata) => ({
            ...parcourdata,
            description: event.target.value,
        }));
    };
    /////////////////////////////////////////////////////

    //Ouvrir le modal avec les informations d'une formation
    const [lgShow, setLgShow] = useState(false);
    const [parcourdata,setParcourdata] = useState({
        ecole: '',
        diplome:'',
        filiere: '',
        annee_de_debut: '',
        annee_de_fin: '',
        description: '',
        user_id: userid,
    });

    const HandleSubmitmodifier = (id) => {
        setLgShow(true);

        const url_parcours_modifier="http://127.0.0.1:8000/api/parcours/" + userid + "/" + id ;
        
        axios.get(url_parcours_modifier)
           .then( res => {
               console.log(res);
               setParcourdata(res.data);
           })
           localStorage.setItem("parcour_id", id);
    };

    /////////////////////////////////////////////////////

    // la modification d'une formation
    const parcour_id= localStorage.getItem("parcour_id");
    const HandleSubmitmodification = (event) => {
        
         const url_parcours_modification="http://127.0.0.1:8000/api/parcours/" + userid + "/" + parcour_id ;
        
         axios.put(url_parcours_modification, parcourdata)
         .then( response => {
            console.log(response);
         })        
    };
    /////////////////////////////////////////////////////

    // la suppression d'une formation
    const HandleSubmitsupprimer = (id) => {
        
        const url_parcours_delete="http://127.0.0.1:8000/api/parcours/" + userid + "/" + id ;
        
        axios.delete(url_parcours_delete)
           .then( res => {
               console.log(res);
           })
        
    };
    /////////////////////////////////////////////////////
    







    function Deconnexion(){
        const url="http://127.0.0.1:8000/api/logoutapi";
       
        axios.post(url)
        .then( response => {
            console.log("déconnecté avec succés");
            localStorage.setItem("user_id","");
        })    
    }


    return (
        <div className="formations bg-white pt-3 pb-3" >
                           
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

                    <Nav justify variant="tabs" defaultActiveKey="/Formations" className="bg-light">
                        <Nav.Item>
                            <Nav.Link href="/Profil">Profil</Nav.Link> 
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Formations" className="bg-info text-white">Formations</Nav.Link>                            
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Mesprojets">Projets</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Messages">Messages</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="container mt-4 pt-3 formulaire">

                        
                        <h4 >Mon parcours académique</h4>
                        <hr />

                        <Table striped bordered hover className="mt-5 mb-5 text-center">
                            <thead>
                                <tr>
                                    <th scope="col" >Ecole</th>
                                    <th scope="col">Diplôme</th>
                                    <th scope="col">Filière</th>
                                    <th scope="col">Durée</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map(item =>(
                                <tr key={item.id}>
                                    <td>{item.ecole}</td>
                                    <td>{item.diplome}</td>
                                    <td>{item.filiere}</td>
                                    <td>{item.annee_de_debut} / {item.annee_de_fin}</td>
                                    <td className="d-flex justify-content-around">                                    
                                        <Button variant="warning" type="submit" className="btn-sm" onClick={() => HandleSubmitmodifier(item.id)}>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                                                                
                                        <Button variant="danger" type="submit" className="btn-sm" onClick={ () => HandleSubmitsupprimer(item.id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button>                                                                              
                                    </td>
                                </tr> 
                             ) )}                                   
                            </tbody>                                
                        </Table>


                        <Modal size="lg" show={lgShow}  onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg" className="text-capitalize" style={{color:"lightsalmon"}}>
                                    Modification d'une Formation
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={HandleSubmitmodification} >
                                    <div className="container col-md-10 mb-5">                               
                                        <Form.Group as={Row} controlId="formPlaintextEcole">
                                            <Form.Label column sm="3" className="text-success">Ecole</Form.Label>
                                            <Col sm="8"><Form.Control type="text" value={parcourdata.ecole} onChange={handleEcole} required /></Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextDiplome">
                                            <Form.Label column sm="3" className="text-success">Diplôme</Form.Label>
                                            <Col sm="8"><Form.Control type="text" value={parcourdata.diplome} onChange={handleDiplome} /></Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextFiliere">
                                            <Form.Label column sm="3" className="text-success">Filière</Form.Label>
                                            <Col sm="8"><Form.Control type="text" value={parcourdata.filiere} onChange={handleFiliere}  required /></Col>
                                        </Form.Group>

                                        <div className="container col-md-10 d-flex justify-content-between">
                                            <Form.Group  controlId="formPlaintextAnneededebut">
                                                <Form.Label column sm="12" className="text-success">Année de début</Form.Label>
                                                <Col sm="12"><Form.Control type="number" value={parcourdata.annee_de_debut} onChange={handleAnneededebut}  required/></Col>
                                            </Form.Group>
                                            <Form.Group  controlId="formPlaintextAnneedefin">
                                                <Form.Label column sm="12" className="text-success">Année de fin</Form.Label>
                                                <Col sm="12"><Form.Control type="number" value={parcourdata.annee_de_fin} onChange={handleAnneedefin}   required/></Col>
                                            </Form.Group>
                                        </div>

                                        <Form.Group as={Row} controlId="formPlaintextDescription">
                                            <Form.Label column sm="6" className="text-success">Description de la formation</Form.Label>
                                            <Col sm="12"><Form.Control as="textarea" value={parcourdata.description} onChange={handleDescription} rows={5} required/></Col>
                                        </Form.Group>

                                    </div>

                                    <div className="mr-5  mb-4 float-right">
                                        <Button variant="warning" type="submit" className="btn-lg" >Modifier</Button>
                                    </div>

                                </Form>
                            </Modal.Body>
                        </Modal>

                        
                            
                        <h4 >Ajouter une nouvelle formation</h4>
                        <hr />
                        
                        <Form onSubmit={HandleSubmit} >
                            <div className="container col-md-10 mb-5">                               
                                <Form.Group as={Row} controlId="formPlaintextEcole">
                                    <Form.Label column sm="3" className="text-success">Ecole</Form.Label>
                                    <Col sm="5"><Form.Control type="text" placeholder="Le nom de l'école" value={parcoursdata.ecole} onChange={handleEcole} required /></Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextDiplome">
                                    <Form.Label column sm="3" className="text-success">Diplôme</Form.Label>
                                    <Col sm="5"><Form.Control type="text" placeholder="Le nom du diplôme" value={parcoursdata.diplome} onChange={handleDiplome} /></Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextFiliere">
                                    <Form.Label column sm="3" className="text-success">Filière</Form.Label>
                                    <Col sm="5"><Form.Control type="text" placeholder="L'intitulé de la filière" value={parcoursdata.filiere} onChange={handleFiliere}  required /></Col>
                                </Form.Group>

                                <div className="col-md-10 d-flex justify-content-between">
                                    <Form.Group  controlId="formPlaintextAnneededebut">
                                        <Form.Label column sm="12" className="text-success">Année de début</Form.Label>
                                        <Col sm="12"><Form.Control type="number" placeholder="Année de début" value={parcoursdata.annee_de_debut} onChange={handleAnneededebut}  required/></Col>
                                    </Form.Group>
                                    <Form.Group  controlId="formPlaintextAnneedefin">
                                        <Form.Label column sm="12" className="text-success">Année de fin</Form.Label>
                                        <Col sm="12"><Form.Control type="number" placeholder="Année de fin" value={parcoursdata.annee_de_fin} onChange={handleAnneedefin}   required/></Col>
                                    </Form.Group>
                                </div>

                                <Form.Group as={Row} controlId="formPlaintextDescription">
                                    <Form.Label column sm="3" className="text-success">Description de la formation</Form.Label>
                                    <Col sm="10"><Form.Control as="textarea" placeholder="Donnez une description à votre formation" value={parcoursdata.description} onChange={handleDescription} rows={5} required/></Col>
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
export default Formations;
import React from 'react';
import '../Messages/Messages.css';
// import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import { Button,Nav,Table,Modal,Form,Row,Col } from 'react-bootstrap';




function Messages() {


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


    // les informations des messages
    const [data,setData] = useState([]);    

    const url_contact_get="http://127.0.0.1:8000/api/contact/" + userid;
    useEffect( () =>  {
        axios.get(url_contact_get)
            .then(resul => {
                setData(resul.data); 
                console.log(resul.data);
            })          
            
    }, [url_contact_get]);        
    /////////////////////////////////////////////////////


    // la suppression d'un message
    const HandleSubmitsupprimer = (id) => {
        
        const url_contact_delete="http://127.0.0.1:8000/api/contact/" + id ;
        
        axios.delete(url_contact_delete)
        .then( res => {
            console.log(res);
        })        
    };
    /////////////////////////////////////////////////////


    //Ouvrir le modal avec les informations d'un message
    const [lgShow, setLgShow] = useState(false);
    const [contactdata,setContactdata] = useState([]);

    const HandleSubmitmodifier = (id) => {
        setLgShow(true);

        const url_contact_modifier="http://127.0.0.1:8000/api/contact/" + userid + "/" + id ;
        
        axios.get(url_contact_modifier)
        .then( res => {
            setContactdata(res.data);
            //console.log(res.data[0]);            
        })
    };
    /////////////////////////////////////////////////////

    // la déconnexion du user
    function Deconnexion(){
        const url="http://127.0.0.1:8000/api/logoutapi";
        axios.post(url)
        .then( response => {
            console.log("déconnecté avec succés");
            localStorage.setItem("userid","");
        })   
        //localStorage.setItem("user_id","");
    }
    /////////////////////////////////////////////////////


    return (
        <div className="messages bg-white pt-3 pb-3 " >
                           
            <div className="container col-md-9">
                <div className="cercle"></div>
                <h2>Tableau de bord</h2>
            </div>

            <div className="container col-md-10 pt-4 mr-5">

            <   div className="container d-flex "> 
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

                    <Nav justify variant="tabs" defaultActiveKey="/Messages" className="bg-light ">
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
                            <Nav.Link href="/Messages" className="bg-info text-white">Messages</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="container mt-4 pt-3 formulaire">

                        <h4 >Les Messages recus</h4>
                        <hr />

                        <Table striped bordered hover className="mt-5 mb-5 text-center">
                            <thead>
                                <tr>
                                    <th scope="col" >L'Email de l'émetteur</th>
                                    <th scope="col">Sujet</th>
                                    <th scope="col">Message</th>                                    
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map(item =>(
                                <tr key={item.id}> 
                                    <td>{item.email}</td>
                                    <td>{item.sujet}</td>
                                    <td>{item.message}</td>
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
                                    Message
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={ () => HandleSubmitsupprimer(contactdata.id)} >
                                    <div className="container col-md-12 mb-2 mt-2">   
                                        <div className="container col-md-10">                            
                                            <Form.Group as={Row} controlId="formPlaintextEmailEmetteur">
                                                <Form.Label column sm="4" className="text-success text-center">L'Email de l'émetteur :</Form.Label>
                                                <Col sm="8"><p>{contactdata.email}</p></Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextSujet">
                                                <Form.Label column sm="4" className="text-success text-center">sujet :</Form.Label>
                                                <Col sm="8"><p>{contactdata.sujet}</p></Col>
                                            </Form.Group>                                            
                                        </div>

                                        <div className="container col-md-10">                                                                                                     
                                            <Form.Group as={Row} controlId="formPlaintextMessage">
                                                <Form.Label column sm="4" className="text-success text-center">Message :</Form.Label>
                                                <Col sm="8">{contactdata.message}</Col>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    
                                    <Modal.Footer>
                                        <div className="mr-2 float-right d-flex ">
                                            <Button variant="danger" type="submit" className=" ml-2 mr-2" >Supprimer</Button>
                                            <Button variant="secondary" onClick={() => setLgShow(false)} >Fermer</Button>
                                        </div>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>

                    </div>

                </div>

            </div> 

        </div>
    )
}
export default Messages;
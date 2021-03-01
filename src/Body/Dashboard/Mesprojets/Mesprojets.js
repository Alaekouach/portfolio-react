import React from 'react';
import '../Mesprojets/Mesprojets.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button,Nav,Form,Row,Col,Table,Modal } from 'react-bootstrap';
import Select from 'react-select';





function Mesprojets() {


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


    // les informations des projets
    const [data,setData] = useState([]);    

    const url_projets_get="http://127.0.0.1:8000/api/projet/" + userid;
    useEffect( () =>  {
        axios.get(url_projets_get)
            .then(resul => {
                setData(resul.data); 
                console.log(resul.data);
            })          
            
    }, [url_projets_get]);

        
    /////////////////////////////////////////////////////


    // l'ajout d'un projet
    const [projetsdata,setProjetsdata] = useState({
        intitule_projet: '',
        description_projet:'',
        client: '',
        duree_realisation: '',
        annee_de_realisation: '',
        user_id: userid,
    });


    const HandleSubmit = (event) => {
        event.preventDefault();

        const url_projets_store="http://127.0.0.1:8000/api/projet";
            axios.post(url_projets_store, projetsdata)
            .then( response => {
                console.log(response);
                
                localStorage.setItem("new_projet_id",response.data.id); 
                
                for(let i=0;i<technologiedata.length;i++){
                    const url_technologies_store="http://127.0.0.1:8000/api/technologie";
                    axios.post(url_technologies_store,technologiedata[i])
                    .then( response => {
                        console.log(response);                
                    })
                }

                    
                const url_experience_store="http://127.0.0.1:8000/api/experience";
                axios.post(url_experience_store,imageprojetsdata)
                .then(response => {
                  console.log(response);                
                })

                const initdata={
                    intitule_projet: '',
                    description_projet:'',
                    client: '',
                    duree_realisation: '',
                    annee_de_realisation: '',
                    user_id: userid,
                };
                setProjetsdata(initdata);               
           })        
             
    };
    
    const handleIntituleprojet= (event) => {
        event.persist();
        setProjetsdata((projetsdata) => ({
            ...projetsdata,
            intitule_projet: event.target.value,
        }));
        setProjetdata((projetdata) => ({
            ...projetdata,
            intitule_projet: event.target.value,
        }));
    };

    const handleDescriptionprojet= (event) => {
        event.persist();
        setProjetsdata((projetsdata) => ({
            ...projetsdata,
            description_projet: event.target.value,
        }));
        setProjetdata((projetdata) => ({
            ...projetdata,
            description_projet: event.target.value,
        }));
    };

    const handleClient= (event) => {
        event.persist();
        setProjetsdata((projetsdata) => ({
            ...projetsdata,
            client: event.target.value,
        }));
        setProjetdata((projetdata) => ({
            ...projetdata,
            client: event.target.value,
        }));
    };

    const handleDureerealisation= (event) => {
        event.persist();
        setProjetsdata((projetsdata) => ({
            ...projetsdata,
            duree_realisation: event.target.value,
        }));
        setProjetdata((projetdata) => ({
            ...projetdata,
            duree_realisation: event.target.value,
        }));
    };

    const handleAnneederealisation= (event) => {
        event.persist();
        setProjetsdata((projetsdata) => ({
            ...projetsdata,
            annee_de_realisation: event.target.value,
        }));
        setProjetdata((projetdata) => ({
            ...projetdata,
            annee_de_realisation: event.target.value,
        }));
    };

    
    let new_projet_id= localStorage.getItem("new_projet_id");
    const [imageprojetsdata,setImageProjetsdata] = useState([{
        source_photo: [null],
        photo_projet:[null],
        projet_id: [null],
    }]);

    const fileArray = [];
    const fileName = [];
    const fileProjetId = [];

    const handleImageProjets = (event) => {
        event.persist();

        if(event.target.files && event.target.files[0])
        { 
            var counter = -1, file;
        
            while ( (file = event.target.files[ ++counter ]) ) {
             
                var reader = new FileReader();
                reader.onload = (function(file){  

                    return function(event){
                        console.log("img_data",event.target.result);                        

                        fileArray.push(event.target.result);
                        fileName.push((file.name).substr((file.name).lastIndexOf('\\') + 1).split('.')[0]);
                        fileProjetId.push(new_projet_id);

                        setImageProjetsdata({ 
                            source_photo: fileArray,
                            photo_projet: fileName,
                            projet_id : fileProjetId,
                        }); 
                    }                        
                })(file);                    
                reader.readAsDataURL( file );                
            }

            // setImageProjetsdata({ 
            //     source_photo: fileArray,
            //     photo_projet: fileName,
            //     projet_id : fileProjetId,
            // });   
            
        }else{
            setImageProjetsdata({ 
                source_photo: '',
                photo_projet: '',
                projet_id : '',
            });  
        }
    }

    const renderPhotos = (source) => {
        return (source || []).map( (photos) => {
            return <img src={photos} key={photos} alt="" className="card-img" style={{width:"100px"}}></img>
         })

    }


    /////////////////////////////////////////////////////


    //Ouvrir le modal avec les informations d'un projet
    const [lgShow, setLgShow] = useState(false);
    const [projetdata,setProjetdata] = useState({
        intitule_projet: '',
        description_projet:'',
        client: '',
        duree_realisation: '',
        annee_de_realisation: '',
        user_id: userid,
    });

    const [ttechnologiedata,setTtechnologiedata] = useState([]);
    const [experiencedata,setExperiencedata] = useState([]);

    const HandleSubmitmodifier = (id) => {
        setLgShow(true);

        const url_parcours_modifier="http://127.0.0.1:8000/api/projet/" + userid + "/" + id ;        
        axios.get(url_parcours_modifier)
        .then( res => {
            //console.log(res);
            setProjetdata(res.data);
        })

        
        const url_gettechnologies_modifier="http://127.0.0.1:8000/api/technologie_by_projet/" + id ;        
        axios.get(url_gettechnologies_modifier)
        .then( resultat => {
            setTtechnologiedata(resultat.data);
        })
        
        localStorage.setItem("projet_id", id);

        const url_getexperience_modifier="http://127.0.0.1:8000/api/experience/" + id ;
        axios.get(url_getexperience_modifier)
        .then( resultat => {
            setExperiencedata(resultat.data);
            console.log(resultat.data);
        })
    };
    /////////////////////////////////////////////////////

    // la modification d'un projet
    const projet_id= localStorage.getItem("projet_id");

    const HandleSubmitmodification = (event) => {
        event.preventDefault();

        const url_projet_modification="http://127.0.0.1:8000/api/projet/" + userid + "/" + projet_id ;
        axios.put(url_projet_modification, projetdata)
        .then( response => {
            console.log(response);
        })       
                 

        for(let i=0;i<technologiedata.length;i++){
            const url_technologies_put="http://127.0.0.1:8000/api/technologie/" + projet_id;
            axios.put(url_technologies_put,technologiedata[i])
            .then( response => {
                console.log(response);                
            })
        }

        const url_experience_store="http://127.0.0.1:8000/api/experience/" + projet_id;
                axios.post(url_experience_store,imageprojetsdata)
                .then(response => {
                  console.log(response);                
                })



        setLgShow(false);
    };
    /////////////////////////////////////////////////////

    // la suppression d'un projet
    const HandleSubmitsupprimer = (id) => {
        const url_projet_delete="http://127.0.0.1:8000/api/projet/" + userid + "/" + id ;
        
        axios.delete(url_projet_delete)
        .then( res => {
            console.log(res);
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


    // l'ajout des technologies utilisées pour un projet
    // let new_projet_id= localStorage.getItem("new_projet_id");

    const [technologiedata,setTechnologiedata] = useState({
        intitule_technologie:'',        
        user_id: userid,
        projet_id: '1',
        categorie_id: '1'
    });
    
    const options = [
        { value: 'HTML',label: 'HTML', intitule_technologie: 'HTML',user_id: userid,projet_id: new_projet_id ,categorie_id: '1'},
        { value: 'CSS', label: 'CSS', intitule_technologie: 'CSS',user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'BOOTSTRAP', label: 'BOOTSTRAP', intitule_technologie: 'BOOTSTRAP',user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'JAVASCRIPT', label: 'JAVASCRIPT', intitule_technologie: 'JAVASCRIPT', user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'JQUERY', label: 'JQUERY', intitule_technologie: 'JQUERY',user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'AJAX', label: 'AJAX', intitule_technologie: 'AJAX',user_id: userid,projet_id: new_projet_id,categorie_id: '1'},
        { value: 'PHP', label: 'PHP', intitule_technologie: 'PHP', user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'LARAVEL', label: 'LARAVEL', intitule_technologie: 'LARAVEL', user_id: userid,projet_id: new_projet_id,categorie_id: '1'},
        { value: 'REACT', label: 'REACT', intitule_technologie: 'REACT', user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'REST API', label: 'REST API', intitule_technologie: 'REST API',user_id: userid,projet_id: new_projet_id,categorie_id: '1' },
        { value: 'MySQL', label: 'MySQL', intitule_technologie: 'MySQL',user_id: userid,projet_id: new_projet_id,categorie_id: '1' }
    ]

    const handleSelect = (value)  => {
        setTechnologiedata(value);
    };   
    /////////////////////////////////////////////////////



    // la suppression d'une technologies utilisées pour un projet
    //const HandleSupprimerTechnologie = (id)  => {

        const [show, setShow] = useState(false);

        const HandleClose = () => setShow(false);

        const [singletechnologiedata,setSingletechnologiedata] = useState([]);    

        const HandleShow = (id) => {
            setShow(true);
            
            const url_single_technologie_get="http://127.0.0.1:8000/api/technologie/" + userid + "/" + id;
            
                axios.get(url_single_technologie_get)
                    .then(resultat => {
                        setSingletechnologiedata(resultat.data); 
                        //console.log(singletechnologiedata);
                    })          
        }


        const HandleSupprimerTechnologie = (id) => {

            const url_single_technologie_delete="http://127.0.0.1:8000/api/technologie/" + userid + "/" + id;
            
                axios.delete(url_single_technologie_delete)
                    .then(resultat => { 
                        setShow(false);
                        setLgShow(false);
                        //console.log(singletechnologiedata);
                        
                    })   
                
        }

    /////////////////////////////////////////////////////


    // la suppression d'une image utilisées pour un projet

        const [showexperience, setShowexperience] = useState(false);

        const HandleCloseexperience = () => setShowexperience(false);  
        
        const [singleexperiencedata,setSingleexperiencedata] = useState([]);  

        const HandleShowexperience = (id) => {
                setShowexperience(true);
            
            const url_single_experience_get="http://127.0.0.1:8000/api/experience/" + userid + "/" + id;
            
                axios.get(url_single_experience_get)
                    .then(resultat => {
                        setSingleexperiencedata(resultat.data); 
                        //console.log(singletechnologiedata);
                    })          
        }


        const HandleSupprimerExperience = (id) => {

            const url_single_experience_delete="http://127.0.0.1:8000/api/experience/" + userid + "/" + id;
           
                axios.delete(url_single_experience_delete)
                    .then(resultat => { 
                        setShowexperience(false);
                        setLgShow(false);
                        //console.log(singletechnologiedata);
                    })   
                
        }

    /////////////////////////////////////////////////////
    
    



    return (


        <div className="formations bg-white pt-3 pb-3 " >
                           
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

                    <Nav justify variant="tabs" defaultActiveKey="/Mesprojets" className="bg-light">
                        <Nav.Item>
                            <Nav.Link href="/Profil" >Profil</Nav.Link> 
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Formations">Formations</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Mesprojets" className="bg-info text-white">Projets</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Messages">Messages</Nav.Link>
                        </Nav.Item>
                    </Nav>
                 
                    <div className="container mt-4 pt-3 formulaire">

                    <h4 >Mes projets réalisés</h4>
                        <hr />

                        <Table striped bordered hover className="mt-5 mb-5 text-center">
                            <thead>
                                <tr>
                                    <th scope="col" >Intitulé du projet</th>
                                    <th scope="col">Description du projet</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Durée</th>
                                    <th scope="col">Année </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map(item =>(
                                <tr key={item.id}> 
                                    <td>{item.intitule_projet}</td>
                                    <td>{item.description_projet}</td>
                                    <td>{item.client}</td>
                                    <td>{item.duree_realisation} J</td>
                                    <td>{item.annee_de_realisation}</td>
                                    <td className="d-flex justify-content-around">
                                        <Button variant="warning" type="submit" className="btn-sm" onClick={() => HandleSubmitmodifier(item.id)}>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                                                                
                                        <Button variant="danger" type="submit" className="btn-sm" onClick={ (event) => HandleSubmitsupprimer(item.id,event)}>
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
                                    Modification d'un projet
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={HandleSubmitmodification} >
                                    <div className="container col-md-12 mb-5">   
                                        <div className="container col-md-10">                            
                                            <Form.Group as={Row} controlId="formPlaintextIntituleprojet">
                                                <Form.Label column sm="3" className="text-success">Intitulé du projet :</Form.Label>
                                                <Col sm="8"><Form.Control type="text" value={projetdata.intitule_projet} onChange={handleIntituleprojet} required /></Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextClient">
                                                <Form.Label column sm="3" className="text-success">Client :</Form.Label>
                                                <Col sm="8"><Form.Control type="text" value={projetdata.client} onChange={handleClient}  required /></Col>
                                            </Form.Group>

                                             <div className="container col-md-10 d-flex justify-content-between">
                                                <Form.Group  controlId="formPlaintextDureerealisation">
                                                    <Form.Label column sm="12" className="text-success">Durée de réalisation :</Form.Label>
                                                    <Col sm="12"><Form.Control type="number" value={projetdata.duree_realisation} onChange={handleDureerealisation}  required/></Col>
                                                </Form.Group>
                                                <Form.Group  controlId="formPlaintextAnneederealisation">
                                                    <Form.Label column sm="12" className="text-success">Année de réalisation :</Form.Label>
                                                    <Col sm="12"><Form.Control type="number" value={projetdata.annee_de_realisation} onChange={handleAnneederealisation}   required/></Col>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-around">
                                                            
                                            <div className="col-md-8 ">
                                                <Form.Group as={Row} controlId="exampleForm.ControlSelect">
                                                    <Form.Label column sm="12" className="text-success">Séléctionnez les Technologies utilisées </Form.Label>
                                                        <Col sm="12">
                                                            <Select                                             
                                                                options={options}                                      
                                                                onChange={handleSelect}
                                                                isMulti
                                                                placeholder="Séléction des Technologies"
                                                            />
                                                        </Col>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-4 d-flex justify-content-between flex-wrap">
                                                {ttechnologiedata.map(items =>(
                                                    <div key={items.id} className="text-center mt-2 col-md-6 border " style={{backgroundColor:"#FF6347"}}>  
                                                                                                                
                                                        <i className="fas fa-times-circle supp" onClick={ () => HandleShow(items.id) } ></i>

                                                        <Modal show={show} onHide={HandleClose} centered >
                                                            <Modal.Header closeButton className="bg-light">
                                                                <Modal.Title className="text-capitalize" style={{color:"lightsalmon"}}>Suppression d'une technologie</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body className="bg-light">Voulez-vous vraiment enlever la technologie<span style={{color:"#FF4500"}}> {singletechnologiedata.intitule_technologie} </span>de votre projet? </Modal.Body>
                                                            <Modal.Footer className="bg-light">
                                                                <Button variant="danger" onClick={ () =>HandleSupprimerTechnologie(singletechnologiedata.id) }>Supprimer</Button>
                                                                <Button variant="secondary" onClick={HandleClose}>Fermer</Button>
                                                            </Modal.Footer>
                                                        </Modal>

                                                        <small className="text-lowercase">{items.intitule_technologie}</small>                                                             
                                                    </div> 
                                                ) )}
                                            </div>

                                        </div>

                                        <div className="container col-md-10">                                                                                                     
                                            <Form.Group as={Row} controlId="formPlaintextDescription">
                                                <Form.Label column sm="8" className="text-success">Description du projet :</Form.Label>
                                                <Col sm="12"><Form.Control as="textarea" value={projetdata.description_projet} onChange={handleDescriptionprojet} rows={5} required/></Col>
                                            </Form.Group>
                                        </div>

                                        <div className="container col-md-9 d-flex justify-content-between flex-wrap mb-3 mt-4">
                                            {experiencedata.map(items =>(
                                                <div key={items.id} >  
                                                                                                                
                                                    <i className="fas fa-times-circle mb-3 sup" onClick={ () => HandleShowexperience(items.id) } ><img src={items.photo_projet} key={items.photo_projet} alt="" className="card-img" style={{width:"100px"}}></img></i>

                                                    <Modal show={showexperience} onHide={HandleCloseexperience} centered >
                                                        <Modal.Header closeButton className="bg-light">
                                                            <Modal.Title className="text-capitalize" style={{color:"lightsalmon"}}>Suppression d'une image d'un projet</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body className="bg-light">Voulez-vous vraiment supprimer l'image de votre projet? </Modal.Body>
                                                        <Modal.Footer className="bg-light">
                                                            <Button variant="danger" onClick={ () =>HandleSupprimerExperience(singleexperiencedata.id) }>Supprimer</Button>
                                                            <Button variant="secondary" onClick={HandleCloseexperience}>Fermer</Button>
                                                        </Modal.Footer>
                                                    </Modal>                                                            
                                            
                                                </div> 
                                            ))}
                                        </div>

                                        <Form.Group as={Row} controlId="formPlaintextImageprojets">
                                            <Form.Label column sm="4" className="text-success">Images projets :</Form.Label>                                    
                                            <Col sm="5"><Form.Control type="file" multiple onChange={handleImageProjets}/></Col>
                                        </Form.Group>
                                        
                                        <div className="container col-md-9 d-flex justify-content-around flex-wrap mt-2">
                                            {renderPhotos(imageprojetsdata.source_photo)}
                                        </div>
                                    </div>

                                    <div className="mr-2 mb-1 float-right">
                                        <Button variant="warning" type="submit" className="mr-2">Modifier</Button>                                    
                                        <Button variant="secondary" onClick={() =>  setLgShow(false)}>Fermer</Button>
                                    </div>

                                </Form>
                            </Modal.Body>
                        </Modal>

                        
                            
                        <h4 >Ajouter un nouveau Projet</h4>
                        <hr />
                        
                        <Form onSubmit={HandleSubmit} >
                            <div className="container col-md-10 mb-5">                               
                                <Form.Group as={Row} controlId="formPlaintextIntituleprojet">
                                    <Form.Label column sm="3" className="text-success">Intituleprojet :</Form.Label>
                                    <Col sm="5"><Form.Control type="text" placeholder="Donnez un nom à votre projet" value={projetsdata.intitule_projet} onChange={handleIntituleprojet}  /></Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextClient">
                                    <Form.Label column sm="3" className="text-success">Client :</Form.Label>
                                    <Col sm="5"><Form.Control type="text" placeholder="Votre client" value={projetsdata.client} onChange={handleClient}   /></Col>
                                </Form.Group>

                                <div className="col-md-10 d-flex justify-content-between">
                                    <Form.Group  controlId="formPlaintextDureerealisation">
                                        <Form.Label column sm="12" className="text-success">Durée de réalisation :</Form.Label>
                                        <Col sm="12"><Form.Control type="number" placeholder="Durée de réalisation" value={projetsdata.duree_realisation} onChange={handleDureerealisation}  /></Col>
                                    </Form.Group>
                                    <Form.Group  controlId="formPlaintextAnneederealisation">
                                        <Form.Label column sm="12" className="text-success">Année de réalisation :</Form.Label>
                                        <Col sm="12"><Form.Control type="number" placeholder="Année de réalisation" value={projetsdata.annee_de_realisation} onChange={handleAnneederealisation}   /></Col>
                                    </Form.Group>
                                </div>


                                <Form.Group as={Row} controlId="exampleForm.ControlSelect">
                                    <Form.Label column sm="12" className="text-success">Séléctionnez les Technologies utilisées </Form.Label>
                                        <Col sm="9">
                                            <Select                                             
                                                options={options}                                      
                                                onChange={handleSelect}
                                                isMulti
                                                placeholder="Séléction des Technologies"
                                                defaultValue=""
                                            />
                                        </Col>
                                </Form.Group>


                                <Form.Group as={Row} controlId="formPlaintextDescription">
                                    <Form.Label column sm="3" className="text-success">Description du projet :</Form.Label>
                                    <Col sm="10"><Form.Control as="textarea"  placeholder="Donnez une description à votre projet" value={projetsdata.description_projet} onChange={handleDescriptionprojet} rows={5} /></Col>
                                </Form.Group>


                                
                                <Form.Group as={Row} controlId="formPlaintextImageprojets">
                                    <Form.Label column sm="4" className="text-success">Images projets :</Form.Label>                                    
                                    <Col sm="5"><Form.Control type="file" multiple onChange={handleImageProjets}/></Col>
                                </Form.Group>
                                <div className="container col-md-10 d-flex justify-content-between flex-wrap">
                                    {renderPhotos(imageprojetsdata.source_photo)}
                                </div>


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
export default Mesprojets;
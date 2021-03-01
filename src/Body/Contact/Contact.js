import React from 'react';
import './Contact.css';
import {useState,useEffect} from 'react';
//import { useForm } from 'react-hook-form';
import axios from 'axios';



function Contact() {

    const user_id= localStorage.getItem("user_id");
    
    const url="http://127.0.0.1:8000/api/contact" ;

    const [data,setData] = useState({
        email:"",
        sujet:"",
        message:"",
        user_id:user_id
    })


    function Submit(e){
        e.preventDefault()
        axios.post(url,data)
            .then(res =>{
                console.log(res,data);
                const initdata={
                    email:"",
                    sujet:"",
                    message:"",
                    user_id:user_id
                };
                setData(initdata);
        })
    }


    function handle(e){
        const newdata={...data}
        newdata[e.target.id]=e.target.value;
        setData(newdata)
    }

    const [data2,setData2] = useState([]);
    const url2="http://127.0.0.1:8000/api/apropos/" + user_id;

    useEffect( () =>  {
    axios.get(url2)
        .then( response => {
            setData2(response.data); 
                // console.log(data2); 
        })
    },[url2]);
   




// const url3="http://127.0.0.1:8000/api/auth/signup"
//     const [data3,setData3] = useState({
//         name:"",
//         email:"",
//         password:"",
//         password_confirmation:""
//     })


//     function Submit_signup(e){
//         e.preventDefault()
//         axios.post(url3,data3)
//             .then(res =>{
//                 console.log(res,data3);
//         })
//     }


//     function handle_signup(e){
//         const newdata3={...data3}
//         newdata3[e.target.id]=e.target.value;
//         setData3(newdata3)
//     }




//     const url5="http://127.0.0.1:8000/api/auth/login"
//     const [data5,setData5] = useState({
        
//         emai:"",
//         passwor:""
//     })


//     function Submit_login(e){
//         e.preventDefault()
//         axios.post(url5,data5)
//             .then(res =>{
//                 console.log(res,data5);
//         })
//     }


//     function handle_login(e){
//         const newdata5={...data5}
//         newdata5[e.target.id]=e.target.value;
//         setData5(newdata5)
//     }





//     const [data4,setData4] = useState([]);
//     const url4="http://127.0.0.1:8000/api/auth/user";
  
//     useEffect( () =>  {
//       axios.get(url4)
//           .then( response => {
//               setData4(response.data4); 
//               console.log(data4); 
//           })
//   }, [url4]);


    return (

    <div className="contact bg-white pt-3 pb-3" >

        <div className="container col-md-9 mb-5">
            <div className="cercle"></div>
            <h2>Contactez moi</h2>
        </div>

        <div className="container col-md-8 d-flex justify-content-around mt-3  ">

            <div className="container col-md-6 bg-light mt-3 mb-3 pt-3 pb-3 ">
                <form onSubmit={(e) => Submit(e)}>

                    <div className="form-group"> 
                        <label className="col-md-2 mt-3" htmlFor="email">Email:</label>
                        <input className="col-md-10 form-control" onChange={(e) => handle(e)} value={data.email} type="text"  placeholder="Entrez votre email"  id="email" name="email" required minLength="6" maxLength="60"></input>
                    </div>    
                    <div className="form-group"> 
                        <label className="col-md-2 mt-3" htmlFor="sujet">Sujet:</label>
                        <input className="col-md-10 form-control" onChange={(e) => handle(e)} value={data.sujet} type="text"  placeholder="Le titre de votre sujet"  id="sujet" name="sujet" required minLength="3" maxLength="60"></input>
                    </div>
                    <div className="form-group"> 
                        <label className="col-md-12 mt-3" htmlFor="message">Message:</label><br />
                        <textarea className="col-md-12 form-control" onChange={(e) => handle(e)} value={data.message} placeholder="Ecrivez votre message"  id="message" name="message" rows="5" required minLength="3" maxLength="600"></textarea>
                    </div>  

                    <input type="submit" value="Envoyer message" className="m-3 btn btn-primary float-right" ></input>  
                </form>
            </div>
            
                <div key={data2.id} className="container col-md-6 mt-3 mb-3 pt-5 ">

                    <h4 className="text-primary ml-3">Parlons de tout !!</h4>
                    <p className="ml-3 text-justify">Si vous aimez mon travail,si vous avez des missions freelance, des projets à me proposer, ou si vous souhaitez me contacter pour un devis n’hésitez pas à me contacter directement ou en utilisant le formulaire, je serais très heureux de vous répondre dans les plus brefs délais.</p>
                

                    <figure>
                        <label className="col-md-2">Email:</label>
                        <div className="d-flex col-md-6 justify-content-around">
                            <i className="fas fa-envelope"></i>
                            <small>{data2.email}</small>
                        </div>
                    </figure>
                    <figure>
                        <label className="col-md-2">Téléphone:</label>
                        <div className="d-flex col-md-6 justify-content-around">
                            <i className="fas fa-phone"></i>
                            <small>(+212) {data2.tel}</small>
                        </div>
                    </figure>

                </div>
            
        </div>


    </div>        

)}
export default Contact;
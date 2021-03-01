import Header from './Body/Header/Header';
import Main from './Body/Main/Main';
import Apropos from './Body/Apropos/Apropos';
import Parcours from './Body/Parcours/Parcours';
import Projets from './Body/Projets/Projets';
import Projet from './Body/Projets/Projet/Projet';
import Contact from './Body/Contact/Contact';
import Authentification from './Body/Authentification/Authentification';
import Login from '../src/Login/Login';
import Register from '../src/Register/Register';
import Dashboard from '../src/Body/Dashboard/Dashboard';
import Profil from '../src/Body/Dashboard/Profil/Profil';
import Formations from '../src/Body/Dashboard/Formations/Formations';
import Messages from '../src/Body/Dashboard/Messages/Messages';
import Mesprojets from '../src/Body/Dashboard/Mesprojets/Mesprojets';
import {useState,useRef,useEffect} from 'react';


import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Deconnexion from './Body/Authentification/Deconnexion';




function App() {

  const userid= localStorage.getItem("user_id");
  let button;
    if (userid==="") {
      button =<ul> <li><NavLink exact activeClassName="current" to="/Authentification" style={{outline:"none"}}>Connexion</NavLink></li> </ul>
    } else {
      button =<ul> <li><NavLink exact activeClassName="current" to="/Profil" style={{outline:"none"}}>Profil</NavLink></li><li><NavLink exact activeClassName="current" to="/Deconnexion" style={{outline:"none"}}>Déconnexion</NavLink></li></ul>

    }

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  
  }, [isActive]);




  return (
    <div className="App">

      <div className="">
        <Header />
      </div> 

      <div className="d-flex">

        <Router>
          <div className="sidebar bg-light">
              <header>
                    <div className="m-2 cercle2">
                      <button onClick={onClick} className="">
                        <i className="fas fa-user mt-3 ml-3"></i>
                      </button>
                      <nav ref={dropdownRef} className={`bg-light menu ${isActive ? 'active' : 'inactive'}`}>
                        
                          {button}
                        
                      </nav>
                    </div>
           
                  <nav>
                    <ul className=" d-flex rotate-text ">
                      <li >
                        <NavLink exact activeClassName="current" to="/Contact" >Contact</NavLink>
                      </li>
                      <li >
                        <NavLink exact activeClassName="current" to="/Projets">Projets</NavLink>
                      </li>
                      <li >
                        <NavLink exact activeClassName="current" to="/Parcours" >Parcours</NavLink>
                      </li>
                      <li >
                        <NavLink exact activeClassName="current" to="/Apropos" >Apropos</NavLink>
                      </li>
                      <li >
                        <NavLink exact activeClassName="current" to="/" >Accueil</NavLink>
                      </li>
                                            
                    </ul>
                  </nav>
              </header>
          </div>

          <div className="col-md-12">
              <Switch>

                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/Apropos" exact>
                    <Apropos />
                </Route>
                <Route path="/Parcours/" exact>
                    <Parcours />
                </Route>
                <Route path="/Projets/" exact>
                    <Projets />
                </Route>
                <Route path="/Contact/" exact>
                    <Contact />
                </Route>
                <Route path="/Projet/:id" exact>
                    <Projet />
                </Route>
                <Route path="/Register" exact>
                    <Register />
                </Route>
                <Route path="/Login" exact>
                    <Login />
                </Route>
                <Route path="/Authentification" exact>
                    <Authentification />
                </Route>
                <Route path="/Dashboard" exact>
                    <Dashboard />
                </Route>
                <Route path="/Profil" exact>
                    <Profil />
                </Route>
                <Route path="/Formations" exact>
                    <Formations />
                </Route>
                <Route path="/Mesprojets" exact>
                    <Mesprojets />
                </Route>
                <Route path="/Messages" exact>
                    <Messages />
                </Route>
                <Route path="/Deconnexion" exact>
                    <Deconnexion />
                </Route>
              </Switch>
          </div>

        </Router>

      </div>
                
      
    </div>
  );
}

export default App;

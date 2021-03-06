import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiLogIn, BiLogOut } from "react-icons/bi";
import trainingDiaryServices from '../services/trainingDiary';
import loginServices from '../services/login';
import signinServices from '../services/signin';

const Navigointi = (props) => {

    const [signInDialog, setsignInDialog] = useState(false);
    const [signUpDialog, setsignUpDialog] = useState(false);

    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [registerCheckBox, setRegisterCheckBox] = useState(false);

    const handleCloseSignIn = () => setsignInDialog(false);
    const handleCloseSignUp = () => setsignUpDialog(false);
    const handleShowSignIn = () => setsignInDialog(true);

    const handleRegisterDialog = () => {
        setsignInDialog(false);
        setsignUpDialog(true);
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginServices.login({
                email, password,
            })
            //Setting token containing user information to memory cache
            window.localStorage.setItem(
                'loggedTrainingDiaryAppUser', JSON.stringify(user)
            )
            trainingDiaryServices.setToken(user.token)
            props.setUser(user)
            props.setIsLoggedAmmattilainen(user.isProfessional);
            props.setName(user.name);
            props.setIsLogged(true);
            console.log('succesfully logged in')
            handleCloseSignIn();
        } catch (exception) {
            console.log('wrong username or password')
            handleCloseSignIn();
        }
    }

    const registerUser = () => {

        if (!props.name || !lastname || !email || !password) 
          return;
        
        signinServices.signin({
            name: props.name,
            lastname: lastname,
            email: email,
            password: password,
            isProfessional: registerCheckBox,  
        });
    };

    const handleRegister = () => {
        registerUser();
        props.setName("");
        setLastName("");
        setPasword("");
        setEmail("");
        setRegisterCheckBox(false);

        handleCloseSignUp();
    }

    const handleLogOut = () => {
        props.handleLogOut()
        props.setName("");
        props.setIsLoggedAmmattilainen(false);
        props.setIsLogged(false)
    }

    return (
        <>  
            <nav className='nav'>
                <Link to="/">
                    <button className='navButton'>
                        Etusivu
                    </button>
                </Link>
                <Link to="/harrastajien_tulokset">
                    <button className='navButton'>
                        Harrastajat
                    </button>
                </Link>
                {props.isLoggedAmmattilainen &&
                <Link to="/ammattilaisten_tulokset">
                    <button className='navButton'>
                        Ammattilaiset
                    </button>
                </Link>
                }
                {props.isLogged && (
                  <>
                    <Link to="/omat_treenit">
                        <button className='navButton'>
                            Omat Treenit
                        </button>
                    </Link>
                    <Link to="/oma_profiili">
                      <button className='navButton'>
                          Oma Profiili
                      </button>
                    </Link>
                  </>
                )}
                {"  "}
                {props.isLogged? 
                    <button variant="primary" onClick={handleLogOut} className='navButton'><BiLogOut className='loginIcon' /></button>:
                    <button variant="primary" onClick={handleShowSignIn} className='navButton'>Kirjaudu<BiLogIn className='loginIcon' /></button>
                }
            </nav>

            <Modal show={signInDialog} onHide={handleCloseSignIn} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title id='modalTitle'>Kirjaudu sis????n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>S??hk??posti</label><br />
                    <input type="text" id='modalInput' placeholder='esim. maija.meikalainen@gmail.com' onChange={(e) => setEmail(e.target.value)}></input><br />
                    <label>Salasana</label><br />
                    <input type="password" id='modalInput' placeholder='esim. Salasana1!' onChange={(e) => setPasword(e.target.value)}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-info' onClick={handleLogin}>
                        Kirjaudu
                    </Button>
                    <Button variant='outline-info' onClick={handleRegisterDialog}>
                        Luo tunnukset
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={signUpDialog} onHide={handleCloseSignUp} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title id='modalTitle'>Rekister??idy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Etunimi</label><br />
                    <input type="text" id='modalInput' placeholder='esim. Maija' onChange={(e) => props.setName(e.target.value)}></input><br />
                    <label>Sukunimi</label><br />
                    <input type="text" id='modalInput' placeholder='esim. Meik??l??inen' onChange={(e) => setLastName(e.target.value)}></input><br />
                    <label>S??hk??posti</label><br />
                    <input type="text" id='modalInput' placeholder='esim. maija.meikalainen@gmail.com' onChange={(e) => setEmail(e.target.value)}></input><br />
                    <label>Salasana</label><br />
                    <input type="text" id='modalInput' placeholder='esim. Salasana1!' onChange={(e) => setPasword(e.target.value)}></input><br /> <br />
                    <label>Olen ammattilainen</label>{ " " }
                    <input type="checkbox" onChange={(e) => setRegisterCheckBox(e.target.checked)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-info' onClick={handleRegister}>
                        Rekister??idy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navigointi;

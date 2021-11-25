import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { FaHome } from 'react-icons/fa';
import { BiLogIn, BiLogOut } from 'react-icons/bi';

const Navigointi = props => {
  //
  const [signInDialog, setsignInDialog] = useState(false);
  const [signUpDialog, setsignUpDialog] = useState(false);

  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [registerCheckBox, setRegisterCheckBox] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState('');

  const handleCloseSignIn = () => {
    setsignInDialog(false);
  };
  const handleCloseSignUp = () => setsignUpDialog(false);

  const handleRegisterDialog = () => {
    setsignInDialog(false);
    setsignUpDialog(true);
  };

  const handleShowSignIn = () => setsignInDialog(true);

  const registerUser = () => {
    if (!props.name || !lastname || !email || !password) return;

    Axios.post('http://localhost:5000/user/register', {
      name: props.name,
      lastname: lastname,
      email: email,
      password: password,
      isProfessional: registerCheckBox,
    });
  };

  const readUser = () => {
    Axios.post('http://localhost:5000/user/read', {
      email: email,
      password: password,
    }).then(response => {
      if (response.data === 'Kirjautuminen epäonnistui') {
        console.log('Tarkista kirjautumistiedot');
        return;
      } else {
        setLoggedIn(true);
        setLoggedInAs(response.data[0]);
        props.setIsLoggedAmmattilainen(response.data[1]);
        props.setName(response.data[0]);
        props.setIsLogged(true);
      }
    });
  };

  const handleSignUp = () => {
    if (!email || !password) {
      console.log('Tyhjät kentät ei käy');
      handleCloseSignIn();
      return;
    } else {
      readUser();
      handleCloseSignIn();
    }
  };

  const handleRegister = () => {
    registerUser();
    props.setName('');
    setLastName('');
    setPasword('');
    setEmail('');
    setRegisterCheckBox(false);

    handleCloseSignUp();
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    props.setName('');
    props.setIsLoggedAmmattilainen(false);
    setLoggedInAs('');
    props.setIsLogged(false);
  };

  return (
    <>
      <Link to='/'>
        <button>
          <FaHome />
        </button>
      </Link>
      <Link to='/harrastajien_tulokset'>
        <button>Harrastajat</button>
      </Link>
      {props.isLoggedAmmattilainen && (
        <Link to='/ammattilaisten_tulokset'>
          <button>Ammattilaiset</button>
        </Link>
      )}
      {props.isLogged && (
        <>
          <Link to='/omat_treenit'>
            <button>Omat Treenit</button>
          </Link>
          <Link to='/oma_profiili'>
            <button>Oma Profiili</button>
          </Link>
        </>
      )}{' '}
      {loggedIn && <label>Kirjautunut: {loggedInAs}</label>}
      {'    '}
      {props.isLogged ? (
        <button variant='primary' onClick={handleLogOut}>
          <BiLogOut />
        </button>
      ) : (
        <button variant='primary' onClick={handleShowSignIn}>
          Kirjaudu <BiLogIn />
        </button>
      )}
      <Modal show={signInDialog} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>Kirjaudu sisään</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Sähköposti</label>
          <br />
          <input type='text' onChange={e => setEmail(e.target.value)}></input>
          <br />
          <label>Salasana</label>
          <br />
          <input
            type='password'
            onChange={e => setPasword(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleSignUp}>
            Kirjaudu
          </Button>
          <Button variant='secondary' onClick={handleRegisterDialog}>
            Rekisteröidy
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={signUpDialog} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Rekisteröidy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Etunimi</label>
          <br />
          <input
            type='text'
            onChange={e => props.setName(e.target.value)}
          ></input>
          <br />
          <label>Sukunimi</label>
          <br />
          <input
            type='text'
            onChange={e => setLastName(e.target.value)}
          ></input>
          <br />
          <label>Sähköposti</label>
          <br />
          <input type='text' onChange={e => setEmail(e.target.value)}></input>
          <br />
          <label>Salasana</label>
          <br />
          <input type='text' onChange={e => setPasword(e.target.value)}></input>
          <br /> <br />
          <label>Olen ammattilainen</label>{' '}
          <input
            type='checkbox'
            onChange={e => setRegisterCheckBox(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleRegister}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navigointi;

import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Axios from 'axios';

const OmaProfiili = () => {
  //
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/user/result/profile').then(response => {
      console.log('selected user', response.data[0]);

      // TODO: kirjautuneen käyttäjän valinta
      setUser({
        name: response.data[0].name,
        lastname: response.data[0].lastname,
        isProfessional: response.data[0].isProfessional,
      });
    });
  }, []);

  return (
    <div>
      <h1 class='title'>Oma profiili</h1>
      <Card style={{ width: '18rem', marginLeft: '5%' }}>
        {/* <Card.Img variant='top' src='holder.js/100px180?text=Image cap' /> */}
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>
            {user.name} {user.lastname}
          </Card.Title>
          {/* <Card.Text>Profile description</Card.Text> */}
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>
            Nimike: {user.isProfessional ? 'Ammattilainen' : 'Harrastelija'}
          </ListGroupItem>
        </ListGroup>
        {/* <Card.Body>
          <Card.Link href='#'>Card Link</Card.Link>
          <Card.Link href='#'>Another Link</Card.Link>
        </Card.Body> */}
      </Card>
    </div>
  );
};

export default OmaProfiili;

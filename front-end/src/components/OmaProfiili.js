import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import profileServices from '../services/profile';

const OmaProfiili = (props) => {
  //
  const [user, setUser] = useState([]);

  useEffect(() => {
    profileServices.getOwnProfile(props.user.email).then(response => {
      console.log('selected user', response, props.user);
      setUser(
        response
    );
    });
  }, [props.user]);

  return (
    <div>
      <h1 className='title'>Oma profiili</h1>
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
            Sähköposti: {user.email}
            </ListGroupItem>
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

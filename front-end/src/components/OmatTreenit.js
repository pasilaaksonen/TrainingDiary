import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import { GrEdit } from "react-icons/gr";
import { MdDeleteSweep } from "react-icons/md";

const OmatTreenit = (props) => {

  
    const [userData, setUserData] = useState([]);


    //Addmore dialogiin
    const [addMoreDialog, setAddMoreDialog] = useState(false);
    const handleShowAddNew = () => setAddMoreDialog(true);
    const handleCloseAddNew = () => setAddMoreDialog(false);
    const [newDate, setNewDate] = useState('');
    const [newSport, setNewSport] = useState('');
    const [newReps, setNewReps] = useState('');
    const [newWeight, setNewWeight] = useState('');

    //Edit dialogiin
    const [editTrainingDialog, seteditTrainingDialog] = useState(false);
    const handleShowEditTraining = () => seteditTrainingDialog(true);
    const handleCloseEditTraining = () => seteditTrainingDialog(false);
    const [editDate, setEditDate] = useState('');
    const [editSport, setEditSport] = useState('');
    const [editReps, setEditReps] = useState('');
    const [editWeight, setEditWeight] = useState('');
    const [idForEdit, setIdForEdit] = useState('');


      function convertToArrayOfObjects(data) {
        var keys = data.shift(),
            i = 0, k = 0,
            obj = null,
            output = [];
    
        for (i = 0; i < data.length; i++) {
            obj = {};
    
            for (k = 0; k < keys.length; k++) {
                obj[keys[k]] = data[i][k];
            }
    
            output.push(obj);
        }
    
        return output;
    }

    const handleAddNew = () => {

      Axios.post("http://localhost:5000/user/addnew", {
        name: props.name,
        pvm: newDate,
        laji: newSport,
        suoritukset_yht: newReps,
        paino: newWeight,
        isProfessional: props.isLoggedAmmattilainen,
    });
      setUserData([...userData, {Pvm: newDate, Laji: newSport, Suoritukset_yht: newReps, Paino: newWeight}])
      setNewDate('');
      setNewSport('');
      setNewReps('');
      setNewWeight('');
      handleCloseAddNew();
    }

    const handleRemove = (id) => {
      Axios.delete(`http://localhost:5000/user/delete/${id}`);
      let items = userData.filter((training) => training.ID !== id);
      setUserData(items);
    }

    const getData = () => {
//
     
      Axios.get("http://localhost:5000/user/result/omat").then((response) => {
        
        const newArray = [['ID', 'Pvm', 'Laji', 'Suoritukset_yht', 'Paino']];
        const datesArray = [];

        const ownData = response.data.filter(item => item.name === props.name);
      

        for (let i = 0; i <= ownData.length - 1; i++) {
          const tempArray = []
          tempArray.push(ownData[i]._id, ownData[i].pvm, ownData[i].laji, ownData[i].suoritukset_yht, ownData[i].paino)
          newArray.push(tempArray);
        }
        
        
        const newArrayOfObjects = convertToArrayOfObjects(newArray);
        
        setUserData(newArrayOfObjects);

        });
    }

      useEffect(() => {
        getData();
      },);

      const handleEdit = (id) => {
        setIdForEdit(id);
        handleShowEditTraining();
      }

      const handleNewEdit = () => {
        Axios.put("http://localhost:5000/user/update", {id: idForEdit, pvm: editDate, laji: editSport, suoritukset_yht: editReps, paino: editWeight});
        getData();
        handleCloseEditTraining();
      }
    
      const renderPlayer = (users, index) => {
        return(
          <tr key={users.ID}>
            <td>{users.Pvm}</td>
            <td>{users.Laji}</td>
            <td>{users.Suoritukset_yht}</td>
            <td>{users.Paino}</td>
            <td>
                <button onClick={() => handleEdit(users.ID)}><GrEdit /></button>
                <button onClick={() => handleRemove(users.ID)}><MdDeleteSweep /></button>
            </td>
          </tr>
        )
      }

    return (
        <div>
            <h1>Omat treenit</h1>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Pvm</th>
                    <th>Laji</th>
                    <th>Suorituskerrat</th>
                    <th>Paino</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {userData.map(renderPlayer)}
            </tbody>
        </Table>
        <Button variant="primary" onClick={handleShowAddNew}>Lisää</Button>
        <Modal show={addMoreDialog} onHide={handleCloseAddNew}>
            <Modal.Header closeButton>
                <Modal.Title>Lisää uusi harjoite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Pvm</label><br />
                <input type="text" onChange={(e) => setNewDate(e.target.value)}></input><br />
                <label>Laji</label><br />
                <input type="text" onChange={(e) => setNewSport(e.target.value)}></input><br />
                <label>Suorituskerrat</label><br />
                <input type="number" onChange={(e) => setNewReps(e.target.value)}></input><br />
                <label>Paino</label><br />
                <input type="number" onChange={(e) => setNewWeight(e.target.value)}></input><br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleAddNew}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={editTrainingDialog} onHide={handleCloseEditTraining}>
            <Modal.Header closeButton>
                <Modal.Title>Muokkaa harjoitustietoja</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Pvm</label><br />
                <input type="text" onChange={(e) => setEditDate(e.target.value)}></input><br />
                <label>Laji</label><br />
                <input type="text" onChange={(e) => setEditSport(e.target.value)}></input><br />
                <label>Suoritukset</label><br />
                <input type="number" onChange={(e) => setEditReps(e.target.value)}></input><br />
                <label>Paino</label><br />
                <input type="number" onChange={(e) => setEditWeight(e.target.value)}></input><br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleNewEdit}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default withRouter(OmatTreenit);

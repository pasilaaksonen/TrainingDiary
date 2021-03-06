import React, {useState, useEffect, useCallback } from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {GrEdit} from 'react-icons/gr';
import {MdDeleteSweep} from 'react-icons/md';
import trainingDiaryServices from '../services/trainingDiary';
import { convertToArrayOfObjects } from '../functions/convertToArrayOfObjects';

const OmatTreenit = (props) => {

  const [userData, setUserData] = useState([]);

  // For add more dialog
  const [addMoreDialog, setAddMoreDialog] = useState(false);
  const handleShowAddNew = () => setAddMoreDialog(true);
  const handleCloseAddNew = () => setAddMoreDialog(false);
  const [newDate, setNewDate] = useState('');
  const [newSport, setNewSport] = useState('');
  const [newReps, setNewReps] = useState('');
  const [newWeight, setNewWeight] = useState('');

  // For edit dialog
  const [editTrainingDialog, seteditTrainingDialog] = useState(false);
  const handleShowEditTraining = () => seteditTrainingDialog(true);
  const handleCloseEditTraining = () => seteditTrainingDialog(false);
  const [editDate, setEditDate] = useState('');
  const [editSport, setEditSport] = useState('');
  const [editReps, setEditReps] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [idForEdit, setIdForEdit] = useState('');

  const handleAddNew = () => {

    trainingDiaryServices.create({
      name: props.name,
      pvm: newDate,
      laji: newSport,
      suoritukset_yht: newReps,
      paino: newWeight,
      isProfessional: props.isLoggedAmmattilainen,
    })
    setUserData([...userData, {Pvm: newDate, Laji: newSport, Suoritukset_yht: newReps, Paino: newWeight}])
    setNewDate('');
    setNewSport('');
    setNewReps('');
    setNewWeight('');
    handleCloseAddNew();
  }

  const handleRemove = (id) => {
    trainingDiaryServices.deleteEntry(id);
    let items = userData.filter((training) => training.ID !== id);
    setUserData(items);
  }

  const getData = useCallback(() => {

    trainingDiaryServices.getOwnEntries().then((response) => {
    
    const newArray = [['ID', 'Pvm', 'Laji', 'Suoritukset_yht', 'Paino']];

    const ownData = response.data.filter(item => item.name === props.name);
  
    for (let i = 0; i <= ownData.length - 1; i++) {
      const tempArray = []
      tempArray.push(ownData[i]._id, ownData[i].pvm, ownData[i].laji, ownData[i].suoritukset_yht, ownData[i].paino)
      newArray.push(tempArray);
    }
    
    const newArrayOfObjects = convertToArrayOfObjects(newArray);
    setUserData(newArrayOfObjects);

    });
},[props.name]);


  useEffect(() => {
    getData();
  },[getData]);

  const handleEdit = (id) => {
    setIdForEdit(id);
    handleShowEditTraining();
  };

  const handleNewEdit = () => {
    trainingDiaryServices.modifyEntry({id: idForEdit, pvm: editDate, laji: editSport, suoritukset_yht: editReps, paino: editWeight});
    getData();
    handleCloseEditTraining();
    getData();
  };
    
  const renderPlayer = (users, index) => {
    return (
      <tr key={users.ID}>
        <td>{users.Pvm}</td>
        <td>{users.Laji}</td>
        <td>{users.Suoritukset_yht}</td>
        <td>{users.Paino}</td>
        <td>
          <button onClick={() => handleEdit(users.ID)} className='editAndDelete'><GrEdit className='editAndDelete' /></button>
          <button onClick={() => handleRemove(users.ID)} className='editAndDelete'><MdDeleteSweep className='editAndDelete' /></button>
        </td>
      </tr>
    );
  };


  return (
    <div>
      <h1 className='title'>Omat treenit</h1>
      <Table striped bordered hover responsive variant='info' id='table'>
        <thead className='align-middle'>
          <tr>
            <th>P??iv??m????r??</th>
            <th>Laji</th>
            <th>Suorituskerrat</th>
            <th>Paino (kg)</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {userData.map(renderPlayer)}
        </tbody>
      </Table>

      <button type='button' className='addButton' onClick={handleShowAddNew}>Lis???? uusi</button>

      <Modal show={addMoreDialog} onHide={handleCloseAddNew} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title id='modalTitle'>Lis???? uusi harjoite</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>P??iv??m????r??</label><br />
          <input type='text' id='modalInput' placeholder='esim. 12.11.2021' onChange={(e) => setNewDate(e.target.value)}></input><br />
          <label>Laji</label><br />
          <input type='text' id='modalInput' placeholder='esim. maastaveto' onChange={(e) => setNewSport(e.target.value)}></input><br />
          <label>Suorituskerrat</label><br />
          <input type='number' id='modalInput' placeholder='esim. 10' onChange={(e) => setNewReps(e.target.value)}></input><br />
          <label>Paino (kg)</label><br />
          <input type='number' id='modalInput' placeholder='esim. 50' onChange={(e) => setNewWeight(e.target.value)}></input><br />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-info' onClick={handleAddNew}>
            Lis????
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editTrainingDialog} onHide={handleCloseEditTraining} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Muokkaa harjoitustietoja</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>P??iv??m????r??</label><br />
          <input type='text' id='modalInput' placeholder='esim. 12.11.2021' onChange={(e) => setEditDate(e.target.value)}></input><br />
          <label>Laji</label><br />
          <input type='text' id='modalInput' placeholder='esim. maastaveto' onChange={(e) => setEditSport(e.target.value)}></input><br />
          <label>Suoritukset</label><br />
          <input type='number' id='modalInput' placeholder='esim. 10' onChange={(e) => setEditReps(e.target.value)}></input><br />
          <label>Paino</label><br />
          <input type='number' id='modalInput' placeholder='esim. 50' onChange={(e) => setEditWeight(e.target.value)}></input><br />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-info' onClick={handleNewEdit}>
            Tallenna
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withRouter(OmatTreenit);

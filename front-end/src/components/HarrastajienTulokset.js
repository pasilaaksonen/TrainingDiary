import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import trainingDiaryServices from '../services/trainingDiary';
import { convertToArrayOfObjects } from '../functions/convertToArrayOfObjects';

const HarrastajienTulokset = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    trainingDiaryServices.getOwnEntries().then((response) => {
        
      const newArray = [['Pvm', 'Suoritukset_yht', 'Suorittajalkm']];
      const datesArray = [];

      // Filters away professionals
      const nonProfessionalData = response.data.filter(item => item.isProfessional === false);
        
      for (let i=0; i <= nonProfessionalData.length - 1; i++) {
        if (!datesArray.includes(nonProfessionalData[i].pvm)) {
          datesArray.push(nonProfessionalData[i].pvm);
        };
      };
        
      for (let i=0; i <= datesArray.length - 1; i++) {
        const tempArray = [];
        let tempDay = datesArray[i];
        let tempRepsTotal = 0;
        let tempUsers = [];
        let items = nonProfessionalData.filter(item => item.pvm === datesArray[i]);
        for (let i2=0; i2 <= items.length - 1; i2++) {
          tempRepsTotal += items[i2].suoritukset_yht;
          if (!tempUsers.includes(items[i2].name)) {
            tempUsers.push(items[i2].name);
          };
        };
        tempArray.push(tempDay, tempRepsTotal, tempUsers.length);
        newArray.push(tempArray);
      };

      const newArrayOfObjects = convertToArrayOfObjects(newArray);
      setUsers(newArrayOfObjects);
    });
  }, []);

  const renderPlayer = (users, index) => {
    return (
      <tr key={index}>
        <td>{users.Pvm}</td>
        <td>{users.Suoritukset_yht}</td>
        <td>{users.Suorittajalkm}</td>
      </tr>
    );
  };

  return (
    <div>
      <h1 className='title'>Harrastajat</h1>
      <ReactBootStrap.Table striped bordered hover responsive variant='info' id='table'>
        <thead className='align-middle'>
          <tr>
            <th>Päivämäärä</th>
            <th>Suoritukset yht.</th>
            <th>Suorittajalkm</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {users.map(renderPlayer)}
        </tbody>
      </ReactBootStrap.Table> 
    </div>
  );
};

export default HarrastajienTulokset;

import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import Axios from 'axios';

const AmmattilaistenTulokset = () => {
    
    const [professionals, setProfessionals] = useState([]);

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

    useEffect(() => {
      //
      Axios.get("http://localhost:5000/user/result/amateurs").then((response) => {
      
      const newArray = [['Pvm', 'Suoritukset_yht', 'Suorittajalkm']];
      const datesArray = [];
      const datasByDates = [];

      //Suodattaa harrastelijat pois
      const nonProfessionalData = response.data.filter(item => item.isProfessional === true);
      

      for (let i=0; i <= nonProfessionalData.length - 1; i++) {
        if (!datesArray.includes(nonProfessionalData[i].pvm)) {
          datesArray.push(nonProfessionalData[i].pvm)
        } 
      }
      
      for (let i=0; i <= datesArray.length - 1; i++) {
        const tempArray = []
        let tempDay = datesArray[i]
        let tempRepsTotal = 0;
        let tempUsers = [];
        let items = nonProfessionalData.filter(item => item.pvm === datesArray[i]);
        for (let i2=0; i2 <= items.length - 1; i2++) {
          tempRepsTotal += items[i2].suoritukset_yht;
          if (!tempUsers.includes(items[i2].name)) {
            tempUsers.push(items[i2].name)
          }
        }
        tempArray.push(tempDay, tempRepsTotal, tempUsers.length);
        newArray.push(tempArray)
      };

      const newArrayOfObjects = convertToArrayOfObjects(newArray);
      setProfessionals(newArrayOfObjects);
      });
    },[]);
    
      const renderPlayer = (users, index) => {
        return(
          <tr key={index}>
            <td>{users.Pvm}</td>
            <td>{users.Suoritukset_yht}</td>
            <td>{users.Suorittajalkm}</td>
          </tr>
        )
      }
      
    return (
        <div>
            <h1>Ammattilaiset</h1>
        <ReactBootStrap.Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Pvm</th>
                    <th>Suoritukset yht</th>
                    <th>Suorittajalkm</th>
                </tr>
            </thead>
            <tbody>
                {professionals.map(renderPlayer)}
            </tbody>
        </ReactBootStrap.Table> 
        </div>
    )
}

export default AmmattilaistenTulokset;

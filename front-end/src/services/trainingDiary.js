import axios from 'axios';
const baseUrl = '/user';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getOwnEntries = async () => {
   const response = await axios.get(`${baseUrl}/result/amateurs`);
   return response;  
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.post(`${baseUrl}/addnew`, newObject, config);
    // console.log(response.data)
    return response.data;
}

const deleteEntry = async id => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/delete/${id}`, config);
    return response;   
}

const modifyEntry = async newObject => {
  const response = axios.put(`${baseUrl}/update`, newObject);
  return response;
}


const trainingDiaryServices = { setToken, getOwnEntries, create, deleteEntry, modifyEntry };

export default trainingDiaryServices;
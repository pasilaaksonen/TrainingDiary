import axios from 'axios'
const baseUrl = '/user'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getOwnEntries = async () => {
   const response = await axios.get(`${baseUrl}/result/omat`)
   return response;  
}

const create = async newObject => {
    const response = await axios.post(`${baseUrl}/addnew`, newObject)
    console.log(response.data)
    return response.data
}

const deleteEntry = async id => {
    const response = await axios.delete(`${baseUrl}/delete/${id}`);
    return response;   
}

const modifyEntry = async newObject => {
  const response = axios.put(`${baseUrl}/update`, newObject);
  return response;
}


const trainingDiaryServices = { setToken, getOwnEntries, create, deleteEntry, modifyEntry };

export default trainingDiaryServices;
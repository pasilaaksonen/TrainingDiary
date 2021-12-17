import axios from 'axios';
const baseUrl = '/user/login';

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
};

const loginServices = { login };

export default loginServices;
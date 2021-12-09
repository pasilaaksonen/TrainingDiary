import axios from 'axios';
const baseUrl = '/user/result/profile';

const getOwnProfile = async (email) => {
  const response = await axios.post(baseUrl, {email: email});
  return response.data;
};

const profileServices = { getOwnProfile };

export default profileServices;

import axios from 'axios'
const baseUrl = '/user/register'

const signin = async accountInformation => {
  const response = await axios.post(baseUrl, accountInformation)
  return response.data
}

const signinServices = { signin }

export default signinServices
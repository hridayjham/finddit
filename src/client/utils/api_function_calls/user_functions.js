import {NGROK_URL} from '../constants';
import axios from 'axios';

async function sendSignUpRequest(firstName, lastName, email, iconID) {
  try {
    console.log(email, firstName, lastName, iconID)
      await axios.post(`${NGROK_URL}/users`, { email, firstName, lastName, iconID });
  } catch (error) {
      throw error
  }
}


async function findUserByEmailOrName(emailOrName,loggedInUser) {
    try {
      const response = await axios.get(`${NGROK_URL}/users/email-or-name/${emailOrName}`); 
      if(response.data){
        const retValue = response.data.filter(user => user.email !== loggedInUser)
        return retValue;
      }else{
        return []
      }
    } catch (error) {
      throw error
    }
  }
  

module.exports = {sendSignUpRequest, findUserByEmailOrName};
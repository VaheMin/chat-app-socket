import axios from 'axios';
import { IUserAuthPostData } from '../../types';
import { BASE_URL, SingInStatuses } from '../../constants/constants';

export const userAuth = async (data: IUserAuthPostData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, data);

    return { name: response.data.body.name, token: response.data.body.token, status: SingInStatuses.SUCCESS };
  } catch (error) {
    console.error('Failed to fetch user', error);
    return { name: null, token: null, status: SingInStatuses.FAILED };
  }
};

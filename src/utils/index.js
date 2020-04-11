import axios from 'axios';

const server = '';

export const fetchUsers = () => {
  return axios.get(`${server}/getUsers`);
};

export const addUsers = () => {
  return axios.post(`${server}/updateUsers`);
};

export const updateUser = (userid) => {
  return axios.post(`${server}/updateUser/${userid}`);
};
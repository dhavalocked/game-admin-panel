import axios from 'axios';

const server = 'http://localhost:5000';

export const fetchUsers = () => {
  return axios.get(`${server}/getTables`);
};

export const addUsers = (users) => {
  return axios.post(`${server}/createTable`);
};

export const updateUser = (userid) => {
  return axios.post(`${server}/updateUser/${userid}`);
};

// export const fetchGames = () => {
//   return axios.get(`${server}/getTables`);
// };

// export const addGame = (game) => {
//   return axios.post(`${server}/createGame`, {
//     game
//   });
  
// };

// export const deleteGame = () => {
//   return axios.post();
// };
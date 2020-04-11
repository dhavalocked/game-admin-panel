// const users = [{
//   title: 'Swaraj', // userName
//   dataIndex: '1' // userId
// }, {
//   title: 'Dhaval',
//   dataIndex: '2'
// }, {
//   title: 'Nupur',
//   dataIndex: '3'
// }];
const users = [];

export const getUsers = () => new Promise((resolve) => {
  resolve(users);
});

export const addUser = (user) => new Promise((resolve) => {
  users.push(user);
  resolve();
});

export const removeUser = (id) => new Promise((resolve) => {
  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });
  users.splice(userIndex, 1);
  resolve();
});;

export const updateUser = (id, value) => new Promise((resolve) => {
  users.forEach((user) => {
    if (user.dataIndex === id) {
      user.title = value;
      user.dataIndex = value;
    }
  });
  resolve();
});
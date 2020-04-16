import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'appUsers',
  initialState: {
    users: [],
    day: ''
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setDay: (state, { payload }) => {
      state.day = payload;
    },
    updateUser: (state, { payload }) => {
      const { id, updatedUser } = payload;
      state.users = state.users.map((user) => {
        if (id === user.id) {
          return updatedUser;
        }
        return user;
      });
    }
  }
});

export default reducer;

export const { setUsers, updateUser, setDay } = actions;

export const getUsers = (state) => state.rummy.usersData.users;
export const getDay = (state) => state.rummy.usersData.day;

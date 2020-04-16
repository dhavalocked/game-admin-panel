import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'appGames',
  initialState: {
    games: [],
    isUpdating: false,
    updatingGame: {}
  },
  reducers: {
    setGames: (state, { payload }) => {
      state.games = payload;
    },
    updateGame: (state, { payload }) => {
      const { id, updatedGame } = payload;
      state.games = state.games.map((game) => {
        if (id === game.id) {
          return updatedGame;
        }
        return game;
      });
    },
    setIsUpdating: (state, { payload }) => {
      state.isUpdating = payload;
    },
    setUpdatingGame: (state, { payload }) => {
      state.updatingGame = payload;
    }
  }
});

export default reducer;

export const { setGames, updateGame, setIsUpdating, setUpdatingGame } = actions;

export const getGames = (state) => state.rummy.gamesData.games;
export const getIsUpdating = (state) => state.rummy.gamesData.isUpdating;
export const getUpdatingGame = (state) => state.rummy.gamesData.updatingGame;

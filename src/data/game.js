const DBgames = [{
  id: 'a1',
  name: 'Game1',
  users: [{
    id: '1a',
    name: 'Swaraj',
    points: -100
  }, {
    id: '2b',
    name: 'Dhaval',
    points: -100
  }, {
    id: '3c',
    name: 'Nupur',
    points: 200
  }]
}, {
  id: 'a2',
  name: 'Game2',
  users: [{
    id: '1a',
    name: 'Swaraj',
    points: -500
  }, {
    id: '2b',
    name: 'Dhaval',
    points: 600
  }, {
    id: '3c',
    name: 'Nupur',
    points: -100
  }]
}];
// const DBgames = [];

const games = DBgames.map((game) => {
  const result = {};
  game.users.forEach((user) => {
    result[user.id] = user.points;
  });
  return result;
});

export const getGames = () => new Promise((resolve) => {
  resolve(games);
});

export const addGame = (game) => new Promise((resolve) => {
  const result = {};
  game.users.forEach((user) => {
    result[user.id] = user.points;
  });
  games.push(result);
  resolve();
});

export const removeGame = (id) => new Promise((resolve) => {
  const gameIndex = games.findIndex((game) => {
    return game.id === id;
  });
  games.splice(gameIndex, 1);
  resolve();
});
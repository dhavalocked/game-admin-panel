import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import uniqid from 'uniqid';

import AddUserModal from "./components/AddUserModal";
import AddGameModal from "./components/AddGameModal";
import { getUsers } from './data/users';
import { getGames } from './data/game';

import "./App.css";

function App() {
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [isAddGameVisible, setIsAddGameVisible] = useState(false);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  const getGamesFrombackend = async () => {
    const gamesResults = await getGames();
    setGames(gamesResults);
  };

  const getUsersFromBackend = async () => {
    const usersResults = await getUsers();
    setUsers(usersResults);
  };

  useEffect(() => {
    getGamesFrombackend();
    getUsersFromBackend();
  });

  const updateUsers = () => {
    setIsAddUserVisible(false);
    getUsersFromBackend();
    getGamesFrombackend();
  };

  const closeAddUserPopup = () => {
    setIsAddUserVisible(false);
    getUsersFromBackend();
    getGamesFrombackend();
  };

  const updateGame = () => {
    setIsAddGameVisible(false);
    getGamesFrombackend();
    getGamesFrombackend();
  };

  const closeAddGamePopup = () => {
    setIsAddGameVisible(false);
    getGamesFrombackend();
    getGamesFrombackend();
  };
  const updatedGamesData = games.map((game) => {
    return {
      key: uniqid(),
      ...game
    }
  });

  return (
    <div className="game-data">
      <div className="game-data__action-button">
        <div>
          <Button type="primary" onClick={() => setIsAddUserVisible(true)}>
            Add Player
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => setIsAddGameVisible(true)}>
            Add game
          </Button>
        </div>
      </div>
      <AddUserModal
        isAddUserVisible={isAddUserVisible}
        updateUsers={updateUsers}
        closeAddUserPopup={closeAddUserPopup}
        games={games}
        users={users}
      />
      <AddGameModal
        isAddGameVisible={isAddGameVisible}
        updateGame={updateGame}
        closeAddGamePopup={closeAddGamePopup}
        games={games}
        users={users}
      />
      <Table
        columns={users}
        dataSource={updatedGamesData}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default App;

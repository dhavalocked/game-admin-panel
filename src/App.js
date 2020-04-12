import React, { useState, useEffect } from "react";
import { Button, Table, Typography, Popconfirm } from "antd";
import dayjs from "dayjs";
import uniqid from "uniqid";

import AddUserModal from "./components/AddUserModal";
import AddGameModal from "./components/AddGameModal";
import { getUsers } from "./data/users";
import { getGames, removeGame } from "./data/game";

import "./App.css";

const { Text } = Typography;

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
    getUsersFromBackend();
    getGamesFrombackend();
  };

  const closeAddGamePopup = () => {
    setIsAddGameVisible(false);
    getUsersFromBackend();
    getGamesFrombackend();
  };

  const updatedGamesData = games.map((game, index) => {
    return {
      key: uniqid(),
      index: index + 1,
      ...game,
    };
  });
  const lastGameId = updatedGamesData[games.length - 1] && updatedGamesData[games.length - 1].key;
  
  const updatedUsers = [{ title: "Game no.", dataIndex: "index" }]
    .concat(
      users.map((user) => {
        return {
          ...user,
          render: (value) => {
            if (value >= 0) {
              return <span style={{ color: "#52c41a" }}>{value || 0}</span>;
            }
            return <Text type="danger">{value || 0}</Text>;
          },
        };
      })
    )
    .concat([
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
        lastGameId === record.key ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={async () => {
                const newGames = games.filter(game => game.id === record.key);
                setGames(newGames);
                await removeGame();
              }}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ]);

  return (
    <div className="game-data">
      <div className="game-data__date">
        Date: {dayjs().format("DD/MM/YYYY")}
      </div>
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
      {isAddUserVisible && (
        <AddUserModal
          isAddUserVisible={isAddUserVisible}
          updateUsers={updateUsers}
          closeAddUserPopup={closeAddUserPopup}
          games={games}
          users={users}
        />
      )}
      {isAddGameVisible && (
        <AddGameModal
          isAddGameVisible={isAddGameVisible}
          updateGame={updateGame}
          closeAddGamePopup={closeAddGamePopup}
          games={games}
          users={users}
        />
      )}
      <Table
        columns={updatedUsers}
        dataSource={updatedGamesData}
        pagination={false}
        bordered
        summary={(pageData) => {
          const totalArray = [];
          for (let i = 0; i < users.length; i++) {
            let userSum = 0;
            const userId = users[i].dataIndex;
            for (let j = 0; j < pageData.length; j++) {
              userSum += pageData[j][userId] || 0;
            }
            totalArray.push(userSum);
          }
          return (
            <tr>
              <th>Total</th>
              {totalArray.map((value) => {
                if (value >= 0) {
                  return (
                    <td>
                      <Text>
                        <span style={{ color: "#52c41a" }}>{value}</span>
                      </Text>
                    </td>
                  );
                }
                return (
                  <td>
                    <Text type="danger">{value}</Text>
                  </td>
                );
              })}
            </tr>
          );
        }}
      />
    </div>
  );
}

export default App;

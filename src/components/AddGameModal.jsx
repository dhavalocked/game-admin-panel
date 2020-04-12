import React, { useState, useCallback } from "react";
import { Modal, Radio, InputNumber } from "antd";
import uniqid from 'uniqid';
import { addGame } from "../data/game";

export default function AddGameModal({
  isAddGameVisible,
  updateGame,
  closeAddGamePopup,
  users
}) {
  const [winner, setWinner] = useState('');
  const [userPoints, setUserPoints] = useState({});

  const updateUserPoints = useCallback((points, userId) => {
    userPoints[userId] = points;
    setUserPoints(userPoints);
  }, [setUserPoints, userPoints]);

  const updateWinner = useCallback((e, userId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setWinner(userId);
      userPoints[userId] = 0;
      setUserPoints(userPoints);
    }
  }, [setWinner, userPoints, setUserPoints]);

  const createGame = async () => {
    const id = uniqid();
    const totalSum = Object.values(userPoints).reduce((val, acc) => acc + val, 0);
    const game = {
      id,
      name: `Game-${id}`,
      users: users.map((user) => {
        if (user.dataIndex === winner) {
          return {
            id: user.dataIndex,
            name: user.title,
            points: Math.abs(totalSum)
          };
        }
        return {
          id: user.dataIndex,
          name: user.title,
          points: userPoints[user.dataIndex] || 0
        }
      })
    };
    await addGame(game);
    setUserPoints({});
    updateGame();
  };

  return (
    <Modal
      title="Add Game"
      visible={isAddGameVisible}
      onOk={() => createGame()}
      onCancel={closeAddGamePopup}
    >
      {users.map((user) => {
        const isWinner = user.dataIndex === winner;
        return (
          <div className="game-user__wrapper">
            <div className="game-user__name">{user.title}</div>
            <div className="game-user__status-wrapper">
              <div className="game-user__points">
                <InputNumber
                  onChange={(e) => updateUserPoints(e, user.dataIndex)}
                  defaultValue={userPoints[user.dataIndex]}
                  disabled={isWinner}
                />
              </div>
              <div>
                <Radio checked={isWinner} onChange={(e) => updateWinner(e, user.dataIndex)} />
              </div>
            </div>
          </div>
        );
      })}
    </Modal>
  );
}

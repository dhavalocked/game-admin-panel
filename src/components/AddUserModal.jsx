import React, { useState } from 'react';
import uniqid from 'uniqid';
import { Modal, Button, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import UserNameField from './UserNameField';
import { updateUser, addUser } from '../data/users';

export default function AddUserModal({ isAddUserVisible, updateUsers, closeAddUserPopup, users }) {
  const [name, setName] = useState('');
  const updateUserName = async (id, value) => {
    await updateUser(id, value);
  };
  const onNameChange = (e) => {
    const name = e.target.value.trim();
    setName(name);
  };
  const addNewUser = async () => {
    const id = uniqid();
    await addUser({
      title: name,
      dataIndex: id
    })
    setName('');
  };

  return (
    <div>
      <Modal
        title="Add Users"
        visible={isAddUserVisible}
        onOk={updateUsers}
        onCancel={closeAddUserPopup}
      >
        {users.map((user) => (
          <div className="user-wrapper">
            <UserNameField user={user} updateUserName={updateUserName} />
          </div>
        ))}
        <div className="user-wrapper">
          <div className="edit-wrapper">
            <Input value={name} onChange={onNameChange} className="input-wrapper" />
            <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={addNewUser} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

export default function UserNameField({ user, updateUserName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.title);
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  const updateName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const saveName = () => {
    toggleIsEditing();
    updateUserName(user.dataIndex, name);
  }

  if (isEditing) {
    return (
      <div className="edit-wrapper">
        <Input placeholder="username" value={name} className="input-wrapper" onChange={updateName} />
        <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={saveName} />
      </div>
    );
  }
  return (
    <div className="edit-wrapper">
      <Input placeholder="username" value={name} className="input-wrapper" disabled />
      <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={toggleIsEditing} />
    </div>
  );
}
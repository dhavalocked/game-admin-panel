import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function UserNameField({ user, updateUserName, saveUserInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  const updateName = (e) => {
    const name = e.target.value.trim();
    updateUserName(user.dataIndex, name);
  };

  if (isEditing) {
    return (
      <div className="edit-wrapper">
        <Input placeholder="username" value={user.title} className="input-wrapper" onChange={updateName} />
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={toggleIsEditing} />
      </div>
    );
  }
  return (
    <div className="edit-wrapper">
      <Input placeholder="username" value={user.title} className="input-wrapper" disabled />
      <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={toggleIsEditing} />
    </div>
  );
}
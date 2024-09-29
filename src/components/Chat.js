import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUserCircle, FaCog } from 'react-icons/fa';


const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  border-right: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: calc(100% - 20px);  
  padding: 10px;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 5px;
  margin-bottom: 20px;
  margin-right: 10px;  
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f9f9f9' : '#444')};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? (theme.body === '#ffffff' ? '#dcf8c6' : '#333') : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f0f0f0' : '#555')};
  }
`;

const ProfileIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 10px;
  font-weight: bold;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f9f9f9' : '#333')};
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  position: relative;
  color: ${({ theme }) => theme.text};

  &.sent {
    background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#dcf8c6' : '#005c0a')};
    align-self: flex-end;
    margin-left: auto;
  }

  &.received {
    background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f1f0f0' : '#444')};
    align-self: flex-start;
    margin-right: auto;
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 20px;
  margin-right: 10px;
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#fff' : '#444')};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');
  const senderId = localStorage.getItem('senderId');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/api/auth/users', {
        headers: { Authorization: token },
      });
      const filteredUsers = response.data.filter((user) => user._id !== senderId); // Exclude self
      setUsers(filteredUsers);
    };

    const fetchMessages = async () => {
      if (selectedUser) {
        const response = await axios.get(
          `http://localhost:3000/api/chat?recipientId=${selectedUser._id}`,
          {
            headers: { Authorization: token },
          }
        );
        setMessages(response.data.messages);
      }
    };

    fetchUsers();
    fetchMessages();
  }, [token, selectedUser, senderId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim() && selectedUser) {
      const newMessage = {
        text,
        participants: [senderId, selectedUser._id],
        sender: senderId,
      };
      setMessages([...messages, { text, type: 'sent' }]);

      await axios.post('http://localhost:3000/api/chat/create', newMessage, {
        headers: { Authorization: token },
      });
      setText('');
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <ChatContainer>
      <Sidebar>
        <HeaderIcons>
          <FaUserCircle size={24} />
          <FaCog size={24} />
          <Button onClick={handleLogout}>Logout</Button>
        </HeaderIcons>
        <SearchInput type="text" placeholder="Search users..." />
        {users.map((user) => (
          <UserItem
            key={user._id}
            selected={selectedUser && selectedUser._id === user._id}
            onClick={() => setSelectedUser(user)}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                style={{ width: '35px', height: '35px', borderRadius: '50%', marginRight: '10px' }}
              />
            ) : (
              <ProfileIcon>{user.name[0]}</ProfileIcon>
            )}
            {user.name} ({user.email})
          </UserItem>
        ))}
      </Sidebar>
      <ChatArea>
        <MessagesContainer>
          {messages?.map((msg, index) => (
            <Message
              key={index}
              className={msg.sender === senderId ? 'sent' : 'received'}
            >
              {msg.text}
            </Message>
          ))}
        </MessagesContainer>
        <InputContainer onSubmit={sendMessage}>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <Button type="submit">Send</Button>
        </InputContainer>
      </ChatArea>
    </ChatContainer>
  );
};

export default Chat;

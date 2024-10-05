import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import styled from 'styled-components';
import { FaUserCircle, FaCog, FaArrowRight, FaEllipsisV } from 'react-icons/fa';
import { showError } from '../redux/actions/notificationActions';
import { showLoader, hideLoader } from '../redux/actions/loaderActions';

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

const SmallerSidebar = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 20px;
  padding: 20px;
  border-right: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
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
  gap: 10px;
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

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
`;

const ChatUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatUserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
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
  margin: 5px 10px;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 55%;
  position: relative;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &.sent {
    background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#dcf8c6' : '#007bff')};
    align-self: flex-end;
    margin-left: auto;
    color: ${({ theme }) => (theme.body === '#ffffff' ? '#000' : '#fff')};
    border-radius: 20px 20px 5px 20px;
  }

  &.received {
    background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f1f0f0' : '#444')};
    align-self: flex-start;
    margin-right: auto;
    color: ${({ theme }) => (theme.body === '#ffffff' ? '#000' : '#fff')};
    border-radius: 20px;
  }
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  height: 30px;
  flex: 1;
  padding: 10px 40px 10px 15px;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 10px;
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#fff' : '#444')};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: #007bff;

    & + button {
      svg {
        color: #007bff;
      }
    }
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 15px;
  background: transparent;
  border: none;
  color: #6a6a6b;
  cursor: pointer;

  &:hover {
    color: #999999;
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

const NoMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');
  const senderId = localStorage.getItem('senderId');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/api/auth/users', {
        headers: { Authorization: token },
      });
      const filteredUsers = response.data.filter((user) => user._id !== senderId); // Exclude self
      setUsers(filteredUsers);
    };

    const fetchMessages = async () => {
      dispatch(showLoader())

      try {
        if (selectedUser) {
          const response = await axios.get(
            `http://localhost:3000/api/chat?recipientId=${selectedUser._id}`,
            {
              headers: { Authorization: token },
            }
          );
          if(response.data.messages) {
            dispatch(hideLoader())
            setMessages(response.data.messages);
          } else {
            dispatch(hideLoader())
            setMessages([]);
          }
          dispatch(hideLoader())
        }
      } catch (error) {
          dispatch(hideLoader())
          dispatch(showError(error.response.data.message))
          setMessages([]);
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

      try {
        await axios.post('http://localhost:3000/api/chat/create', newMessage, {
          headers: { Authorization: token },
        });
        setText('');
      } catch (error) {
        dispatch(showError(error.response.data.message))
      }
      
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  console.log(messages, "messages")

  return (
    <ChatContainer>
      <SmallerSidebar>
        <FaUserCircle size={24} />
        <FaCog size={24} />
        <Button onClick={handleLogout}>Logout</Button>
      </SmallerSidebar>
      <Sidebar>
        <SearchInput type="text" placeholder="Search users.." />
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
            <div>{user.name}</div>
          </UserItem>
        ))}
      </Sidebar>

      <ChatArea>
        {selectedUser ? (
          <>
            <ChatHeader>
              <ChatUserInfo>
                <FaUserCircle size={35} />
                <ChatUserName>{selectedUser.name}</ChatUserName>
              </ChatUserInfo>
              <FaEllipsisV />
            </ChatHeader>
            <MessagesContainer>
              {messages && messages.length > 0 ? (
                messages?.map((message, idx) => (
                  <Message
                    key={idx}
                    className={message.sender === senderId ? 'sent' : 'received'}
                  >
                    {message.text}
                  </Message>
                ))
              ) : (
                <NoMessage>No messages yet</NoMessage>
              )}
            </MessagesContainer>
            <InputContainer onSubmit={sendMessage}>
              <Input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <IconButton>
                <FaArrowRight />
              </IconButton>
            </InputContainer>
          </>
        ) : (
          <NoMessage>Select a user to start chatting</NoMessage>
        )}
      </ChatArea>
    </ChatContainer>
  );
};

export default Chat;

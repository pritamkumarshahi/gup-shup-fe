import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 20px;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      {auth.isAuthenticated ? (
        <>
          <p>Username: {auth.token.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </ProfileContainer>
  );
};

export default Profile;

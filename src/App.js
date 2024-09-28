import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import Sun and Moon icons
import store from './redux/store';
import GlobalStyles from './styles/GlobalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Profile from './components/Profile';

// Styled components
const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: sticky;   /* Make header sticky */
  top: 0;             /* Stick to the top */
  z-index: 1000;      /* Ensure it stays above other content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: add a shadow for visual separation */
`;

const Logo = styled.div`
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center; /* Center items vertically */
  
  a {
    margin: 0 1rem;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 16px; /* Optional: to match the button font size */

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    display: flex;
    align-items: center; /* Center the icon inside the button */
    margin-left: 1rem; /* Space between the last link and the button */
    background: none; /* Remove default button background */
    border: none; /* Remove border */
    cursor: pointer;
    color: ${({ theme }) => theme.text}; /* Match button color to theme */
    font-size: 16px; /* Match the font size with links */

    &:hover {
      opacity: 0.7; /* Optional: Add hover effect */
    }
  }
`;

// Themes
const lightTheme = {
  body: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  body: '#000000',
  text: '#ffffff',
};

// Custom hook to check for token
const useAuth = () => {
  const token = localStorage.getItem('token'); // Replace 'token' with your token key
  return !!token; // Returns true if token exists, false otherwise
};

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const isAuthenticated = useAuth(); // Check for token

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <AppContainer>
            {
              !isAuthenticated && (
                <Header>
                <Logo>GupShup</Logo>
                <Nav>
                  <Link to="/">Features</Link>
                  <Link to="/privacy">Privacy Policy</Link>
                  {/* Theme toggle button beside privacy link */}
                  <button onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === lightTheme ? <FaMoon /> : <FaSun />}
                  </button>
                </Nav>
              </Header>
              )
            }
            <Routes>
              {isAuthenticated ? (
                // Redirect to Chat if authenticated
                <Route path="/" element={<Navigate to="/chat" replace />} />
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              )}
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy" element={<div>Privacy Policy</div>} />
            </Routes>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import Sun and Moon icons
import store from './redux/store';
import GlobalStyles from './styles/GlobalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Styled components
const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
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

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // track auth status

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsAuthenticated(true); // Update state if token exists
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update state on login success
  };

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
            { !isAuthenticated &&
              <Header>
                <Logo>GupShup</Logo>
                <Nav>
                  <Link to="/">Features</Link>
                  <Link to="/privacy">Privacy Policy</Link>
                  <button onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === lightTheme ? <FaMoon /> : <FaSun />}
                  </button>
                </Nav>
              </Header>
            }
            <Routes>
              {/* Redirect root path based on authentication */}
              {isAuthenticated ? (
                <Route path="/" element={<Navigate to="/chat" replace />} />
              ) : (
                <Route path="/" element={<Navigate to="/login" replace />} />
              )}

              {/* Public routes */}
              <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess}/> : <Navigate to="/chat" replace />} />
              <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/chat" replace />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset/:token" element={<ResetPassword />} />

              {/* Protected routes */}
              {isAuthenticated && (
                <>
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              )}

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} replace />} />
            </Routes>
          </AppContainer>
        </Router>
      </ThemeProvider>
      <ToastContainer />
      <Loader />
    </Provider>
  );
};

export default App;

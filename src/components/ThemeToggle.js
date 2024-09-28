import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  padding: 10px;
  border: none;
  background-color: ${({ theme }) => theme.toggleBackground};
  color: ${({ theme }) => theme.toggleColor};
  cursor: pointer;
  border-radius: 5px;
`;

const ThemeToggle = ({ toggleTheme }) => {
  return <ToggleButton onClick={toggleTheme}>Toggle Theme</ToggleButton>;
};

export default ThemeToggle;

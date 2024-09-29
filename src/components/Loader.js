// components/Loader.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;      /* Stay on top of the screen */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7); /* Slight opacity */
  z-index: 1000;       /* Ensure it's above other elements */
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
    // Use Redux to get the loader state
    const { loader } = useSelector((state) => state.loader);

    return (
        loader && (
            <LoaderContainer>
                <Spinner />
            </LoaderContainer>
        )
    );
};

export default Loader;

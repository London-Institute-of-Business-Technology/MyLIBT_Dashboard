import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Profile from './views/profile';
import Home from './views/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a1c3d',
    },
    secondary: {
      main: '#ffab00',
    },
  },
});

function App() {
  return (

    <ThemeProvider theme={theme}>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

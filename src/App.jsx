import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layouts/Main';
import Home from './routes/Home/Home';
import Sub1 from './routes/Sub1/Sub1';
import Sub2 from './routes/Sub2/Sub2';


function App() {

  const [display, setDisplay] = useState({
    home: true,
    sub1: false,
    sub2: false
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={
          <Layout display={display} setDisplay={setDisplay}>
            <Home />
          </Layout>
        } />
        <Route path="/sub1" element={
          <Layout display={display} setDisplay={setDisplay}>
            <Sub1 />
          </Layout>
        } />
        <Route path="/sub2" element={
          <Layout display={display} setDisplay={setDisplay}>
            <Sub2 />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

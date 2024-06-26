
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './styles/styles.module.scss'

import Index from './Pages/index';
import Home from './components/Home/Home';
import Edit from './components/Edit/Edit'

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
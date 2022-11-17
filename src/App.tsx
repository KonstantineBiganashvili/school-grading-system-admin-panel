import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import store from './store/index';
import AdminPanel from './components/AdminPanel/index';
import ErrorModal from './components/Modals/ErrorModal/index';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </Router>
      <ErrorModal />
    </Provider>
  );
}

export default App;

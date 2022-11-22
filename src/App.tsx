import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import store from './store/index';
import AdminPanel from './components/AdminPanel/index';
import ErrorModal from './components/Modals/ErrorModal/index';
import UsersList from './components/UsersList';
import Header from './layout/Header/index';
import SubjectsList from './components/SubjectsList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/subjects-list" element={<SubjectsList />} />
        </Routes>
      </Router>
      <ErrorModal />
    </Provider>
  );
}

export default App;

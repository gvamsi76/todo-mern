import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import TodoList from './todo/TodoList';
import AddTodo from './todo/AddTodo';
import CustomNavbar from './common/NavBar';

function App() {

  const location = useLocation()
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, [location.pathname]);
  return (
    <>
      {authenticated && <CustomNavbar/> }
    <Routes>
      {authenticated ? (
        <>

          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:id?" element={<AddTodo />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </>
      )}
    </Routes>
    </>
  );
}

export default App;

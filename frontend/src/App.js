import './App.css';
import React,{createContext, useState} from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';// react toastify
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost';
import {LoginContext} from "./context/LoginContext"
import Modal from './components/Modal'

function App() {
  const [userLogin, setUserLogin]=useState(false)
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin, setModalOpen}}>
    <Navbar login={userLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/createPost' element={<Createpost/>}/>
    </Routes>
    <ToastContainer theme='dark'/>
    
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }  { /*setModalOpen passing as a props*/}
    </LoginContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;

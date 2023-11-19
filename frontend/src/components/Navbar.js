import React,{useContext} from 'react'
import Logo from '../img/Logo.png'
import  './Navbar.css'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

function Navbar({login}) {
  const {setModalOpen}=useContext(LoginContext)
  const loginStatus=()=>{
    const token = localStorage.getItem("jwt")
    if(login || token){
      return [
        <>
         <NavLink to="/profile"> <li>profile</li></NavLink> 
           <NavLink to="/createPost"><li>Create Post </li></NavLink>
           <NavLink to={""}>
            <button className='primaryBtn' onClick={()=>setModalOpen(true)}>
            Log out
            </button>
            </NavLink>
        </>
      ]
    }
    else{
      return [
        <>
         <NavLink to="/signup"> <li>signup</li></NavLink>
           <NavLink to="/signin"><li>signin</li></NavLink> 
        </>
      ]
    }
  }

  return (
    <div className='navbar'>
        <img src={Logo} alt="" />
        <ul className='nav-menu'>
          {loginStatus()}
        </ul>
      
    </div>
  );
}

export default Navbar

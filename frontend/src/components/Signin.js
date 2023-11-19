import React, { useState, useContext } from 'react'
import "./Signin.css"
import Logo from '../img/Logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext } from '../context/LoginContext'

function Signin() {
  const {setUserLogin}=useContext(LoginContext)
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");

  //toast functions
  const notifyA = (msg)=> toast.error(msg);
const notifyB = (msg)=> toast.success(msg);
const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData=()=>{
    //Checking email..
    if(!emailRegex.test(email)){ // if email doesn't match with regex then return age ka code
    notifyA("Invalid email")
    return  
    }
    //sending data to server...
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ // this is called serealization in this js object convert into json format string for server understanding.
         email:email, 
        password:password
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error) 
      }
      else{
        notifyB("Signed In Successfully")
        console.log(data)
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true)
        navigate("/")
      }
      console.log(data)
    })
  }
  
  return (
    <div className='signIn'>
      <div className='loginForm'>
        <img className='signUpLogo' src={Logo} alt="" />
        <div>
        <input type="email" name="email" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div>
        <input type="password" name="password" id="password" placeholder=' password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div>
        <input type="submit" value="Sign In" onClick={()=>{postData()}} id='login-btn' />
        </div>
        <div className="loginForm2">
          Don't have an account?
          <NavLink to="/signup">
          <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
          </NavLink>
          
        </div>
      </div>
    </div>
  )
}

export default Signin

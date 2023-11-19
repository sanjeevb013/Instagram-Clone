import React, {useState } from 'react'
import Logo from '../img/Logo.png'
import './SignUp.css'
import { NavLink, useNavigate } from 'react-router-dom' // using useNavigate we redirect user to any page.
import { toast } from 'react-toastify'

function Signup() {
  const navigate= useNavigate()
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [userName, setUserName]= useState("");
const [password, setPassword]= useState("");

// Toast function 
const notifyA = (msg)=> toast.error(msg);
const notifyB = (msg)=> toast.success(msg);
const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const postData=()=>{
  //Checking email..
  if(!emailRegex.test(email)){ // if email doesn't match with regex then return age ka code
  notifyA("Invalid email")
  return  
  }
  else if(!passwordRegex.test(password)) { // if ye test fail hojata h to 
    notifyA("password must contain at least eight character, including at least 1 number and 1 includes both lower and uppercase letter and special character for example #,?,!")
    return // empty return taki jo age ka code h vo data ko age server me send na kre.
  }

  //sending data to server...
  fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({ // this is called serealization in this js object convert into json format string for server understanding.
      name:name,
      userName:userName,
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
      notifyB(data.message)
      navigate("/signin")
    }
    console.log(data)
  })
}

  return (
    <div className='signUp'>
        <div className='form-container'>
            <div className="form">
            <img className='signUpLogo' src={Logo} alt="" />
            <p className='loginPara'>
                Sign up to see photo and videos <br /> from your friends
                </p>
                <div>
                    <input type="email" name="email" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div>
                    <input type="text" name="name" id="name" placeholder='Full name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div>
                    <input type="text" name="UserName" id="UserName" placeholder=' UserName' value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder=' password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <p className='loginPara' style={{fontSize:"12px", margin:"3px 0px"}}>
                    By signing up, you agree to out terms, <br /> privacy policy and cooky policy.
                </p>
                <input type="submit" id='submit-btn' value="sign Up" onClick={()=>{postData()}} />
            </div>
          <div className='form2'>
            Already have an account ?
            <NavLink to="/signin">
            <span style={{color:"blue", cursor:"pointer"}}>Sign in</span>
            </NavLink>
          </div>
        </div>
    
    </div>
  )
}

export default Signup

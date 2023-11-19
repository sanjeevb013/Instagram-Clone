import React, { useEffect, useState } from 'react'
import "./Createpost.css"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Createpost() {
  const [body,setBody]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  const navigate= useNavigate()

  const notifyA = (msg)=> toast.error(msg);
  const notifyB = (msg)=> toast.success(msg);

  useEffect(()=>{
    if(url){
      //saving post to mongoDB
 fetch("http://localhost:5000/createPost",{
  method:"post",
  headers:{
    "content-type":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem("jwt")
  },
  body:JSON.stringify({
    body,
    pic:url
  })
}).then(res=>res.json())
.then(data=>{if(data.error){
  notifyA(data.error)
}
else{
  notifyB("successfully posted")
  navigate("/")
}})
.catch(err=>console.log(err))
    }
 
  },[url])

  //posting image to cloudinary
  const postDetails =()=>{
    console.log(body, image)
    const data= new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name", "dig82n93d")
    fetch("https://api.cloudinary.com/v1_1/dig82n93d/image/upload",
    {
      method: "post",
      body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err))
  }

    const loadfile=(event)=>{
        var output= document.getElementById('output');
        output.src= URL.createObjectURL(event.target.files[0]);
        output.onload=function(){
            URL.revokeObjectURL(output.src)//free memory
        };
    }
  return (
    <div className='createPost'>
        {/* header */}
      <div className="post-header">
        <h4 style={{margin:"3px auto"}}> create new post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img id='output'  src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' alt=''/>
        <input type="file" accept='image/*' onChange={(event)=>{loadfile(event)
        setImage(event.target.files[0])
        }}/>
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
            <div className="card-pic">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <h5>Unknown profile</h5>
        </div>
        <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} type="text" placeholder='write a caption'></textarea>
      </div>
    </div>
  )
}

export default Createpost

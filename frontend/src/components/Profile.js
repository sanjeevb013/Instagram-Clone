import React, { useEffect, useState } from 'react'
import "./Profile.css"
import PostDetail from './PostDetail'

function Profile() {
  const [pic,setPic]=useState([]);
  const[show,setShow]=useState(false);
  const[posts,setPosts]=useState([]);

  //to show and hide comments
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPosts(posts)
    }
  }

  useEffect(()=>{
    fetch("http://localhost:5000/myposts",{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{setPic(result)})
  },[])

  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        {/* profile data */}
        <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className="profile-info" style={{display:'flex'}}>
          <p>40 post</p>
          <p>40 followers</p>
          <p>40 following</p>

        </div>
        </div>
      </div>
    <hr style={{width:"90%",  opacity:"0.8", margin:"25px auto"}}/>
      {/* Gallery */}
      <div className="gallery">
       {pic.map((pics)=>{
        return <img key={pics._id} src={pics.photo} onClick={()=>{toggleDetails(pics)}} className='item' alt="" />
       })}
      </div>
      {/*conditional rendering if show true h to postdetails component print lrva do */}
      {
        show && 
      <PostDetail item={posts} toggleDetails={toggleDetails}/>
}
    </div>
  )
}

export default Profile

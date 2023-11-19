import React, { useEffect, useState } from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])

    //toast functions
    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup")
    }
    //Fetching all posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result);
      })
      .catch(err => console.log(err))
  }, [])

  //to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setItem(posts)
      setShow(true)
    }
  }


  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }

        })
        setData(newData)
        console.log(result)
      })
  }

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }

        })
        setData(newData)
        console.log(result)
      })
  };

  //function to make comment..
  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text: text,
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }

        })
        setData(newData)
        setComment("")
        notifyB("comment posted");
        console.log(result)
      })
  }

  return (
    <div className='home'>
      {/* card */}
      {data.map((posts) => {
        return (
          <div className='card'>
            {/*/ card header */}
            <div className="card-header">
              <div className='card-pic'>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
              <h5>{posts.postedBy.name}</h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={posts.photo} alt="profile" />
            </div>
            {/* card content*/}
            <div className="card-content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(posts._id) }}>
                  favorite
                </span>)
                  : (<span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }}>
                    favorite
                  </span>)
              }
              <p>{posts.likes.length} likes</p>
              <p>{posts.body}</p>
              <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => { toggleComment(posts) }}>view all comments</p>
            </div>
            {/* add comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder='add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className='comment' onClick={() => { makeComment(comment, posts._id);}}>post</button>
            </div>
          </div>
        )
      })}

      {/* show comments */}
      {/* yaha conditional rendering hogi */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic"><img src={item.photo} alt="" /></div>
            <div className="details">
              {/*/ card header */}
              <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                <div className='card-pic'>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>
              {/* comment section */}
              <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                {item.comments.map((comment) => {
                  return (
                    <p className='comm'>
                      <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy.name} </span>
                      <span className='commentText'>{comment.comment}</span>
                    </p>

                  )
                })}

              </div>
              {/* card content*/}
              <div className="card-content">
                <p>{item.likes.length}likes</p>
                <p>{item.body}</p>
              </div>

              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">
                  mood
                </span>
                <input type="text" placeholder='add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                <button className='comment' onClick={() => { makeComment(comment, item._id); toggleComment();}}
                >post</button>
              </div>
            </div>
          </div>
          <div className="close-comment" onClick={() => { toggleComment() }}><span class="material-symbols-outlined material-symbols-outlined-comment">
            close
          </span></div>
        </div>)
      }


    </div>
  );
}

export default Home

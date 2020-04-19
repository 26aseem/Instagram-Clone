import React, {useState, useEffect,useContext} from 'react'
import {Link} from "react-router-dom"
import { FaHeart} from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {UserContext} from "../App"
import M from "materialize-css"
import { MdDeleteForever } from "react-icons/md"

export default function Home() {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    
    useEffect(()=>{
        fetch("http://localhost:8000/allpost", {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result =>{
            setData(result.posts)
        })
    },[])

    // Like Post
    const likePost = (id) => {
        fetch("http://localhost:8000/like", {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    const unlikePost = (id) => {
        fetch("http://localhost:8000/unlike", {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    // Comment
    const commentPost = (text,id) => {
        fetch("http://localhost:8000/comment", {
            method: "PUT",  
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                postId: id,
                text: text
            })
        }).then(res=>res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                } else{
                    return item
                }
               })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    };

    // Delete Post
    const deletepost = (postId) => {
        fetch(`http://localhost:8000/deletepost/${postId}`,{
        method: "DELETE",
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }        
        }).then(res=>res.json())
        .then(result => {
            const newData = data.filter(item=>{
                    return item._id !== result.result._id
            })
            setData(newData)
            M.toast({html: "Post deleted successfully", classes:"#00c853 green accent-4 font-weight-bold"})
        })
        .catch(err => {
            console.log(err)
        })
    };

    return (
    <div className="home">
      {  data.map((post, index) =>{
            return(
                <div key={index} className="card home-card">
                    <h5 className="mt-3 ml-2">
                            <Link to={post.postedBy._id !== state._id ? "/profile/" + post.postedBy._id : "/profile"}> 
                                <img 
                                src={post.postedBy.profilePic} 
                                style={{width:"50px", height:"50px",borderRadius:"30px"}}
                                alt="" className="mr-4 ml-2" title={post.postedBy.username}
                                />

                                @{post.postedBy.username} 
                            </Link>
                        {(post.postedBy._id===state._id)?
                        <MdDeleteForever 
                        style={{fontSize:"1.5em",color:"black",float:"right"}} 
                        className="mr-2"
                        onClick={()=>
                        deletepost(post._id)
                        }/> : 
                        ""
                        } </h5>
                    
                    <div className="card image mx-3" style={{height:"350px"}}>
                        <img 
                        src={post.photo} 
                        alt="Post"
                        title={post.title}
                        />
                    </div>
                    <div className="card-content mt-0 pt-0">

                        {post.likes.includes(state._id) ?
                            <FaHeart style={{fontSize:"1.5em",color:"red"}} className="mb-3 mr-3"/> :
                            <FaHeart style={{fontSize:"1.5em",color:"black"}} className="mb-3 mr-3"/>
                        }

                        {post.likes.includes(state._id) ?
                        <AiFillDislike style={{fontSize:"1.5em"}} className="mr-2 mb-3" onClick={()=>unlikePost(post._id)}/> :
                        <AiFillLike style={{fontSize:"1.5em"}} className="mr-2 mb-3" onClick={()=>likePost(post._id)}/>
                        }

                        <h6> {post.likes.length} {post.likes.length>1 ?"Likes":"Like"} </h6>
                        <h6 className="font-weight-bold"> {post.title} </h6>
                        <p className="font-weight-bold">{post.body}</p>

                        {
                            post.comments.map((record,index) => {
                                return(
                                    <h6 key={index} className="mt-2">
                                        <span className="font-weight-bold">@{record.postedByUser} </span>
                                        {record.text}    
                                    </h6>
                                )
                            })
                        }

                        <form onSubmit={(event)=>{
                            event.preventDefault()
                            commentPost(event.target[0].value, post._id)
                            }}>
                        <input type="text" placeholder="Add a Comment"/>
                        </form>
                    </div>
                </div>
            
            )
            })
        }

    </div>        
        
        
    )
}

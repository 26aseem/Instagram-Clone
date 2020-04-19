import React, {Fragement,useContext,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from "../App"
import { Fragment } from 'react'
import M from "materialize-css"
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch,MdClose } from "react-icons/md"

export default function Navbar() {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });

      

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [info,setInfo] = useState(undefined)

    const findFriend = (text) => {
        fetch("http://localhost:8000/finduser",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                info:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const renderList = () => {
        if(state){
            return[
                <Fragment>
                <li className="ml-3 ml-m-0"> 
                    <form onSubmit={(event)=>{
                            event.preventDefault()
                            findFriend(event.target[0].value)
                            }}>
                        
                        <div class="input-field" >
                            <input id="search" type="search" placeholder="Search Your Friends..."/>
                            <label class="label-icon" for="search"><MdSearch style={{fontSize:"20px",color:"black"}}/></label>
                        
                        </div>

                    </form>
                </li>
                <li><Link to="/" className="sidenav-close">Home</Link></li>
                <li><Link to="/profile" className="sidenav-close">Profile</Link></li>
                <li><Link to="/friendPosts" className="sidenav-close">Friends</Link> </li>
                <li><Link to="/createpost" className="sidenav-close">New Post</Link></li>
                <li className="sidenav-close ml-4 ml-m-0">
                    <button 
                    className="btn btn-danger mr-2 mb-2"
                    onClick={()=> {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("user")
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                    M.toast({html: "You have been logged out successfully", classes:"#00c853 green accent-4 font-weight-bold"})
                    }}
                    >
                        Logout
                    </button>
                </li>
                </Fragment>
            ]
        } else{
            return[
                <Fragment>
                <li><Link to="/login" className="sidenav-close">Login</Link></li>
                <li><Link to="/signup" className="sidenav-close">Signup</Link></li>

                </Fragment>    
            ]
        }
    }

    
    return (
    <nav>
        <div className="nav-wrapper white" >
            <Link to={state?"/":"/login"} className="brand-logo left instagram-text ml-5">Instagram</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
            </ul>
            
            <ul class="sidenav" id="slide-out">
                {renderList()}
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger right"><GiHamburgerMenu style={{fontSize:"20px"}} className="mr-3"/></a>
        </div>
    </nav>
        
    )
}

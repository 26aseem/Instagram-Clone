import React, {Fragement,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from "../App"
import { Fragment } from 'react'
import M from "materialize-css"

export default function Navbar() {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = () => {
        if(state){
            return[
                <Fragment>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/friendPosts">Friends</Link> </li>
                <li><Link to="/createpost">New Post</Link></li>
                <li>
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
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
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
        </div>
    </nav>
        
    )
}

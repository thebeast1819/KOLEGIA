import React, { useEffect, useState } from 'react';
import { FaBell,FaBars,FaSearch } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { SiGooglechat } from "react-icons/si";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser} from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";





import './Navbar.css'
import { emptySearchLostFound, lostFoundSearch } from '../../redux/actions/LostFoundActions';
import { buySellSearch, emptySearchBuySell } from '../../redux/actions/BuySellActions';
const Navbar = ({visibleSearch,presentPage}) => {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const token = localStorage.getItem("jwt");

    const handleClick =  ()=> {
        const token = localStorage.getItem("jwt");
        const decoded = jwt_decode(token);
        const logout= dispatch(logoutUser(decoded.auth_token));
        navigate('/')
    }

    let typingTimer;              
    
    //when user is finished typing, call appropriate action

    const handleSearchChange=(event)=>{
        setSearchQuery(event.target.value); 
        if(event.target.value.length==0){
            if(presentPage=="lostFound"){
                dispatch(emptySearchLostFound());
            }else{
                dispatch(emptySearchBuySell());
            }
        }
    }
    const handleSearch=(e)=>{
        e.preventDefault();
            if (searchQuery.length>0) {
                    if(presentPage=="lostFound"){
                        dispatch(lostFoundSearch(searchQuery));
                    }else{
                        dispatch(buySellSearch(searchQuery));
                    }
            }
    }

    return (  
        <div className="container-nav">
            <div className="part_one">
                <div onClick={()=>navigate('/dashboard')} className="header1">
                    <img src="https://res.cloudinary.com/kartikeyvaish/image/upload/v1642841457/Kolegia/logo_snpqqs.png" alt="" />
                    <p id='abc'>olegia</p>
                </div>
                <div className='ul'>
                    {visibleSearch?
                    <p><form className="form" id="form" onSubmit={handleSearch}>                            
                    <input  type="text" placeholder='Search...' id="search" className="search" value={searchQuery} onChange={handleSearchChange} />
                    <div className="icon" onClick={handleSearch}><FaSearch/></div>
                    </form></p>:null
                    }
                </div>
            </div>
            
            <div className="a">            
                <p><Link to='/chatRoom'><SiGooglechat/></Link></p>
                <p><Link to='/dashboard'>Dashboard</Link></p>
                <p className="log_out" on onClick={handleClick}>Logout</p>
            </div>   
            <div className="nav_mobile">
                {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                <div className="nav_mobile_menu scale-up-center">
                <div className="nav_mobile_menu_part">
                    <p><Link to='/chatRoom'><SiGooglechat/></Link></p>
                    <p><Link className="nav-profile" to='/sideBar'>Profile</Link></p>
                    <p><Link to='/dashboard'>Dashboard</Link></p>                    
                </div>
                <div className="nav_mobile_menu_sign">
                    <p className="log_out_menu" on onClick={handleClick}>LogOut</p>
                </div>
                </div>
                )}
            </div>         
        </div>
    );
}
 
export default Navbar;

import './DashboardCards.css'
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';


const Profile = () => {

    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);
    

    return ( 
            <div className="Dcard profile-card">
            <Link to="/sidebar">
            <div className="main-content">
                <div className="profile-img">
                    <img src={decoded.profile_picture} alt="profile-picture"  />
                </div>
                <h1 style={{fontSize:'25px',color:'#332A7C',marginTop:'-18px'}}>{decoded.name}</h1>
                <h4 >{decoded.email.split('@')[0]}</h4>
            </div>  
        </Link> 
        </div>
        
     );
}
 
export default Profile;
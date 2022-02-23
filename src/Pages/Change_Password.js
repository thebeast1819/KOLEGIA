import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import {changePasswordAction,resetStatus,resetErrorMessage} from '../redux/actions/authActions'
import LoadingButton from '@mui/lab/LoadingButton';
import Navbar from "../Components/Appbar/Navbar";


import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Change_Password = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const location=useLocation();
    const ChangePasswordRes=useSelector((state)=>state.auth.changePasswordResponse)
   
    const errorMessage=useSelector((state)=>state.auth.errorMessage)
    const [currentPassword,setPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [loading, setLoading] = useState(false);
    

    var message9;

    //CHECKING CHANGE PASSWORD STATUS
    if(ChangePasswordRes===200){
        dispatch(resetErrorMessage)
        dispatch(resetStatus);
         navigate('/sidebar')
         
     }
     else{
         message9=errorMessage;

     }

     //TOGGLE LOADING
      useEffect(()=>{
        setLoading(false);
       },[message9]);
   

//CONTAINER STYLES
    const style={

box:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:'400px',
    display:"flex",
    flexDirection:'column',
    alignItems:"center",
    gap:"2rem",
    padding:'5px',
    fontFamily: "Inconsolata, monospace",
borderRadius: '16px',
background: '#FFFFFF',
boxShadow:  '20px 20px 50px #D9D7F1,-20px -20px 40px #D9D7F1'
             
},
cont:{
    backgroundColor:'#FFFFFF',
    width:'100vw',
    height:'100vh'
}
}

//FUCNTION TO DISPATCH ACTION
     const handleClick =()=>{
         setLoading(true)
        
     dispatch(changePasswordAction(currentPassword,newPassword));}
    
    


    return ( 
        <>
        <Navbar/>
        <div style={style.cont} className="otp-container">
            <div style={style.box} className="otp-box">
            <p style={{fontSize:'1.3rem',fontWeight:'700'}}>
               RESET PASSWORD
            </p>
            <input style={{fontFamily: "Inter, monospace"}} onChange={(e)=>setPassword(e.target.value)} style={{width:'12rem',height:'2rem'}} type="password" placeholder="Current Password"/>
            <input style={{fontFamily: "Inter, monospace"}} onChange={(e)=>setNewPassword(e.target.value)} style={{width:'12rem',height:'2rem'}} type="password" placeholder="New Password"/>
            <LoadingButton
                style={{width:'13rem',color:'white',fontFamily: "Inter, monospace",background:'#332A7C',borderRadius:'10px',margin:'20px',height:'2.5rem',fontWeight:'700'}}
                className='submit button'
        onClick={handleClick}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
  Submit
      </LoadingButton>
            <p style={{color:'black'}}>{message9}</p>
            </div>
           
        </div>
        </>
     );
}
 
export default Change_Password;
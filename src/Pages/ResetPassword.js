import {useState,useEffect} from 'react';
import { useDispatch ,useSelector} from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import {resetPasswordAction,resetErrorMessage} from '../redux/actions/authActions'
import LoadingButton from '@mui/lab/LoadingButton';
import Navbar from "../Components/Appbar/Navbar";


import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ResetPassword = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const location=useLocation();
    const loginWithEmailResponse=useSelector((state)=>state.auth.loginWithEmailResponse)
    const responseStatusCode= useSelector((state) => state.auth.resetStatusCode);
    const reset_request_id=useSelector((state)=>state.auth.requestId)
    const errorMessage=useSelector((state)=>state.auth.errorMessage)
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading, setLoading] = useState(false);
    
var Email;
    if(location.state !=null){
        Email=location.state.Email;
       
   }

    
    
    var message4;
    if(loginWithEmailResponse.data){
        dispatch(resetErrorMessage)
        if(loginWithEmailResponse.data.user_token){
          localStorage.setItem("jwt",loginWithEmailResponse.data.user_token);
          navigate('/dashboard');
      }
      }
      else {
        message4=errorMessage
      }
      useEffect(()=>{
        setLoading(false);
       },[message4]);
   
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
boxShadow:  '20px 20px 30px #D9D7F1,-20px -20px 30px #D9D7F1'
             
},
cont:{
    backgroundColor:'#FFFFFF',
    width:'100vw',
    height:'100vh'
}
}
     const handleClick =()=>{
         setLoading(true)
         if(password===confirmPassword){
     dispatch(resetPasswordAction(Email,password,reset_request_id));}
     else{
         message4='Passwords do not match'
     }
    }


    return (
        <>
        <Navbar/>
        <div style={style.cont} className="otp-container">
            <div style={style.box} className="otp-box">
            <p style={{fontSize:'1.3rem'}}>
               Reset Password
            </p>
            <input onChange={(e)=>setPassword(e.target.value)} style={{width:'12rem',height:'2rem'}} type="password" placeholder="Password"/>
            <input onChange={(e)=>setConfirmPassword(e.target.value)} style={{width:'12rem',height:'2rem'}} type="password" placeholder="Confirm Password"/>
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
            <p style={{color:'black'}}>{message4}</p>
            </div>
           
        </div>
        </>
     );
}
 
export default ResetPassword;
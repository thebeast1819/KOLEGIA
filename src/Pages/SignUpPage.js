import '../Components/LoginSignUp/Login.css'
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import {verifyEmail} from '../redux/actions/authActions'
import {  useNavigate } from "react-router-dom";
import Googlelogin from '../Components/GoogleLogin/Googlelogin';
import LoadingButton from '@mui/lab/LoadingButton';
import {resetErrorMessage} from '../redux/actions/authActions'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



 

const SignUp = () => {

  

  const [loading, setLoading] = useState(false);
  // window.localStorage.removeItem('jwt');
  const responseStatusCode= useSelector((state) => state.auth.loginStatusCode);
  const loginWithEmailResponse=useSelector((state)=>state.auth.loginWithEmailResponse)
  const errorMessage=useSelector((state)=>state.auth.errorMessage)

  
  
  

  const navigate = useNavigate();
  const dispatch=useDispatch();

 const [email,setEmail]= useState('')

 


 //ErrorMessage
var Message;

 //user-login-verification
if(loginWithEmailResponse.data){
  dispatch(resetErrorMessage)
  if(loginWithEmailResponse.data.user_token){
    localStorage.setItem("jwt",loginWithEmailResponse.data.user_token);
    navigate('/dashboard');
}
}
else if(responseStatusCode===200){
  dispatch(resetErrorMessage)
  navigate('/otpPage',{
    state:{Email:email,verification:'EMAIL_VERIFICATION'}
  });

}else if(errorMessage) {
  
  Message=errorMessage
  // setLoading(false);
}

const handleClick=()=>{
  dispatch(resetErrorMessage);
  navigate('/loginSignUp')
}
 


 useEffect(()=>{
  setLoading(false);
  
 },[Message]);
 


 



const handleSubmitSignUp=()=>{
  setLoading(true);
  dispatch(verifyEmail(email));
  
}

    return (
      <>
      {/* <Navbar/> */}

        <div className="body">
        
    
        <div className="container " id="container">
          <button onClick={handleClick} className='mobile_view_signUp'>Sign In</button>
          <div>
            
              <div className="signip-form form2">
                <h1   style={{fontSize:'50px',marginTop:'90px'}} className='h1'>SIGN UP</h1>
    
                
                <div>
                  <input
                  style={{marginTop:'50px'}}
                    className="signup-email input"
                    type="email"
                    name="email"
                    placeholder=" &#xf0e0;  Email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
               
                

                <LoadingButton
                style={{width:'18rem',color:'black',background:'#F0BC5E',borderRadius:'10px',margin:'20px',height:'2.8rem',fontFamily:'Inter,sans-serif',fontWeight:'700'}}
                className='submit button'
        onClick={handleSubmitSignUp}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Verify Email
      </LoadingButton>

                <p style={{color:'black'}}>{Message}</p>
                
                <Googlelogin />
              </div>
             
            </div>
          
          </div>  
          
            <div className="overlay2">
              <div className="overlay-panel ">
                {/* <h1 className='h1'>You're Welcome</h1> */}
                <p className='p'>Login to enter Kolegia</p>
            <button onClick={handleClick}  style={{borderRadius:'50px'}} className="ghost button" id="signIn" >Sign In</button>
              </div>
              
            </div>
          </div>
          </>
    
    
        
      
     );
}
 
export default SignUp;
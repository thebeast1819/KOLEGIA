import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import "../Components/Buy_sell/AddItems.css";
import { editRequirements,resetStatus } from "../redux/actions/RequirementActions";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import {  useNavigate,useLocation } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingButton from '@mui/lab/LoadingButton';



function Modal() {
  const navigate= useNavigate();
  const location=useLocation();
  const productData=location.state.Data;
var Title,Description,id;

  if(productData){
     Title=productData.title;
     Description=productData.description;
     id=productData._id;
  }

  
  const errorMessage2=useSelector((state)=>state.requirement.errorMessageRequirements)
  const [title, setTitle] = useState(Title);
  const [description, setDescription] = useState(Description);
  const [loading, setLoading] = useState(false);

     const dispatch = useDispatch();


     useEffect(()=>{
   
      setLoading(false);
     },[errorMessage2]);

 const  Status=useSelector((state=>state.requirement.editRequirementresponse));
 
   if(Status===200){
    dispatch(resetStatus);
     navigate('/sidebar/myOwnRequirements')
     
 }




 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
    

    dispatch(editRequirements(id,title,description,decoded.auth_token));
  };

  return (
    
       
        <div className="modal">
          <div  className="overlay"></div>
          <div className="modal-content">
            <h2 style={{ color: "#332A7C" }}>Edit item</h2>
            <form style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
              <label htmlFor="input">Title</label>
              <input defaultValue={Title} onChange={(e) => setTitle(e.target.value)} type="text" />

              <label htmlFor="input">description</label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                defaultValue={Description}
              />

<LoadingButton
                style={{width:'13rem',color:'white',fontFamily: "Inter, monospace",background:'#332A7C',borderRadius:'10px',margin:'20px',height:'2.5rem',fontWeight:'700'}}
                className='submit button'
        onClick={handleSubmit}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >Submit
      </LoadingButton>
              <p>{errorMessage2}</p>
            </form>


          
          </div>
        </div>
      
    
  );
}

export default Modal;

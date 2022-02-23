import { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import "../Components/Buy_sell/AddItems.css";
import jwt_decode from "jwt-decode";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingButton from '@mui/lab/LoadingButton';

import { addNewBuySellItem ,resetStatus} from "../redux/actions/BuySellActions";

 function Modal({toggleModal,modal}) {
  const [itemName,setItemName]=useState('');
  const [description,setDescription]=useState('');
 const [price,setPrice]=useState(0);
 const [imageList,setImageList]=useState([])
 const [brand,setBrand]=useState('')
 const [color,setColor]=useState('')
 const [category,setCategory]=useState('')
 const [boughtTime,setBoughtTime]=useState('')
 const [warranty,setWarranty]=useState('')
 const [loading, setLoading] = useState(false);

 

 
const dispatch=useDispatch();

function get_iso_time({ date, time }) {
  try {
    let newDateTime = date ? new Date(date) : new Date();

    if (time) {
      let digits = time.split(":");
      let hours = parseInt(digits[0]);
      let minutes = parseInt(digits[1]);

      newDateTime.setHours(hours, minutes);
    }

    return newDateTime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

const newBoughtTime=get_iso_time({date:boughtTime});
const newWarranty=get_iso_time({date:warranty});

var Status3;
var Message3;

Status3=useSelector((state=>state.buySell.addItemsResponse));
const errorMessage4=useSelector((state)=>state.buySell.errorMessageBuySell)

//VERIFYING ADDITEMS-RESPONSE

if(Status3===200){
  dispatch(resetStatus);
  window.location.reload(true);
   
}else{
Message3=errorMessage4;
}

useEffect(()=>{
   
  setLoading(false);
 },[Message3]);



 

//FUCNTION TO DISPATCH ACTION
const handleSubmit=(e)=>{
  e.preventDefault();
  setLoading(true);
  const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

  const formData= new FormData();
  for(var i=0;i<imageList.length;i++){
    formData.append('files',imageList[i]);
  }
  formData.append('name',itemName)
  formData.append('description',description)
  formData.append('price',price)
  formData.append("token", decoded.auth_token)
  formData.append('category',category)
  formData.append('color',color)
  formData.append('bought_datetime',newBoughtTime)
  formData.append('warranty_till',newWarranty)
  formData.append('brand',brand)
  

  dispatch(addNewBuySellItem(formData));

}

  return (
    <>
      
     
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <h2 style={{color:'#332A7C',marginBottom:'18px',fontFamily:"Inter, sans-serif"}}>Add Product</h2>
            <form className="form02" >
           
            
            <input  onChange={e=>setItemName(e.target.value)} type="text" placeholder="Name of product" />
            <input onChange={e=>setBrand(e.target.value)} type="text" placeholder="Brand" />
            <input  onChange={e=>setColor(e.target.value)} type="text" placeholder="Color of product" />
            
            
        <input  onChange={e=>setDescription(e.target.value)} type="text" placeholder="Description" />
            <div>
            <p>Bought date</p>
    
            <input  onChange={e=>setBoughtTime(e.target.value)} type="date" placeholder="Bought date" />
            </div>
           
            <input  onChange={e=>setPrice(e.target.value)} type="number" placeholder="Price"/>
           <div>
            <p>Warranty till</p>
            <input  onChange={e=>setWarranty(e.target.value)} type="date" placeholder="Warranty Ends" />
            </div>
            <input  onChange={e=>setCategory(e.target.value)} type="text" placeholder="Category" />
            <label style={{fontFamily:"Hind Siliguri, sans-serif",fontWeight:'700',fontSize:'18px'}} htmlFor="input">Upload-Image</label>
            <input  onChange={e=>setImageList([...imageList,...e.target.files])} type="file" multiple />
            {/* <button style={{fontFamily:"Inter, sans-serif"}}>Submit</button> */}
            <LoadingButton
                style={{width:'24rem',height:'2.5rem',fontSize:'1.4rem',background:"#F25767",color:'white',border:'none',fontFamily:"Inter, monospace",fontWeight:'700',borderRadius:'6px'}}
                className='submit button'
        onClick={handleSubmit}
        endIcon={<ArrowForwardIosIcon/>}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >Submit
      </LoadingButton>
            <p style={{fontFamily:"Hind Siliguri, sans-serif",fontWeight:'700',fontSize:'14px'}} >{Message3}</p>
            </form>

            <button  className="close-modal" onClick={toggleModal}>
              +
            </button>

            
            
          </div>
         </div>
      )}
     
    </>
  );
}

export default Modal;

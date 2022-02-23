import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import "../Components/Buy_sell/AddItems.css";
import jwt_decode from "jwt-decode";
import { editBuySellItem,resetStatus } from "../redux/actions/BuySellActions";
import {useLocation,useNavigate} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingButton from '@mui/lab/LoadingButton';

 function Modal() {
const dispatch=useDispatch();
const navigate= useNavigate();
const location=useLocation();
const productData=location.state.Data;

var Name,Description,Price,id,Category,Brand,Color;

//STORING DATA FROM LOCATION

if(productData){
   Name=productData.name;
   Description=productData.description;
   Price=productData.price;
   id=productData._id;
   Category=productData.category;
   Brand=productData.brand;
   Color=productData.color;
}


const [itemName,setItemName]=useState(Name);
const [description,setDescription]=useState(Description);
const [price,setPrice]=useState(Price);
const [imageList,setImageList]=useState([])
const [brand,setBrand]=useState(Brand)
const [color,setColor]=useState(Color)
const [category,setCategory]=useState(Category)
const [boughtTime,setBoughtTime]=useState('')
const [warranty,setWarranty]=useState('')
const [loading, setLoading] = useState(false);




const  Status1=useSelector((state=>state.buySell.editBuySellResponse));

//CHECKING RESPONSE 
if(Status1===200){
    dispatch(resetStatus);
     navigate('/sidebar/myOwnBuySellItems')
     
 }

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
  formData.append('product_id',id);
  formData.append('name',itemName)
  formData.append('description',description)
  formData.append('price',price)
  formData.append("token", decoded.auth_token);
  formData.append('category',category)
  formData.append('color',color)
  formData.append('bought_datetime',boughtTime)
  formData.append('warranty_till',warranty)
  formData.append('brand',brand)
  

  dispatch(editBuySellItem(formData));

}

  return (
  
      
    
        <div className="modal">
          <div  className="overlay"></div>
          <div className="modal-content">
          <h2 style={{color:'#332A7C',marginBottom:'10px'}}>Edit Product</h2>
            <form className="form02" >
           
          
            <input placeholder="Name of product" defaultValue={Name}  onChange={e=>setItemName(e.target.value)} type="text" />
            <input placeholder="Brand" defaultValue={Brand} onChange={e=>setBrand(e.target.value)} type="text" placeholder="Brand" />
            <input  defaultValue={Color} onChange={e=>setColor(e.target.value)} type="text" placeholder="Color of product" />
 
            <div>
            <p>Bought date</p>
            <input  onChange={e=>setBoughtTime(e.target.value)} type="date" placeholder="Bought date" />
            </div>
            <input placeholder="Category" defaultValue={Category} onChange={e=>setCategory(e.target.value)} type="text" placeholder="Category" />
            
            <input defaultValue={Description} onChange={e=>setDescription(e.target.value)} type="text" />
            <div>
            <p>Warranty till</p>
            <input  onChange={e=>setWarranty(e.target.value)} type="date" placeholder="Warranty Ends" />
            </div>
            
           
            <input defaultValue={Price} onChange={e=>setPrice(e.target.value)} type="number" />
            <label htmlFor="input">Upload-Image</label>
            <input style={{border:'none'}} onChange={e=>setImageList([...imageList,...e.target.files])} type="file" multiple />
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
            </form>

            
            
          </div>
         </div>
     
     
    
  );
}

export default Modal;

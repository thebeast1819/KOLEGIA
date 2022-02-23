import jwt_decode from "jwt-decode";
import "../Components/Requirement/requirement.css";
import Req_feed from '../Components/Requirement/Req_feed';
import { useDispatch, useSelector } from "react-redux";
import {getAllOwnRequirements} from '../redux/actions/RequirementActions'
import LoadingBox from "../Components/LoadingBox";
import { useState, useEffect } from "react";
import { deleteRequirement } from "../redux/actions/RequirementActions";

const My_requirements = () => {
    const itemList = useSelector((state) => state.requirement.ownItems);
  
    const isLoading = useSelector((state) => state.requirement.isLoading);

    const dispatch = useDispatch();

    const [items,setItems]=useState([])

    useEffect(async() => {
      await  dispatch(getAllOwnRequirements());
      setItems(itemList)
      }, []);
      
     


      //delete-item
const handleClick=(data,e)=>{
    
    const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
   dispatch(deleteRequirement(data._id,decoded.auth_token));
   const newitems = items.filter(item => item._id != data._id)
   setItems(newitems)


}
    
    return (
      <>
      {isLoading ? (
      <LoadingBox />
    ) :(
    
       <div className='requirement_page'>
     
      <div className='page_content'>
      {items.length>0?(
          items.map((item,index)=>{
          return(
             <Req_feed key={index} editOption={true} postedBy={"You"} handleClick={handleClick} data = {item} />
          );
        })
        ) : (
            <div>No Requirements as of now</div>
          )}
    
      </div>
   
  </div>
  )};
   </>
    );
}

export default My_requirements;

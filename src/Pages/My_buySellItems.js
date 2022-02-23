import NoteCard from "../Components/Buy_sell/BuySellCard";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../Components/LoadingBox";

import { deleteBuySellItem, getAllOwnBuySellItems } from "../redux/actions/BuySellActions";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: "20px",
      
    },
  };
});

const My_buySellItems = () => {
  const itemList = useSelector((state) => state.buySell.ownBuySellItems);

  const isLoading = useSelector((state) => state.buySell.isLoading);

 

const [items,setItems]=useState([])


  const dispatch = useDispatch();

  useEffect(async() => {
   await dispatch(getAllOwnBuySellItems());
    setItems(itemList)
  }, []);

  ///delete item

 
  const handleClick=async(data,e)=>{
    
    const token = localStorage.getItem("jwt");
      const decoded = jwt_decode(token);
  await dispatch(deleteBuySellItem(data._id,decoded.auth_token));
  const newitems = items.filter(item => item._id != data._id)
  setItems(newitems)
  //  window.location.reload(true);
}
  
 

  const classes = useStyles();
  return ( 
    <>
    {isLoading ? (
    <LoadingBox />
  ) :(
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {items.length > 0 ? (
          items.map((item, index) => {
            return (
              <Grid lg={3} sm={4} xm={12} md={4} item key={index}>
                <NoteCard handleClick={handleClick}  data={item} editOption={true} />
              </Grid>
            );
          })
        ) : (
          <div>No buy sell items</div>
        )}
      </Grid>
      
    </Container>
    
  )};
  </>
);
        }


export default My_buySellItems;

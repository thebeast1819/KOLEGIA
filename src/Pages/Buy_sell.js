import NoteCard from "../Components/Buy_sell/BuySellCard";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import Modal from "./Additems_buySell";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import Navbar from "../Components/Appbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { getAllBuySellItems } from "../redux/actions/BuySellActions";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: "10vh",
    },
  };
});

const Cards = () => {
  const itemList = useSelector((state) => state.buySell.itemList);
  const isLoading = useSelector((state) => state.buySell.isLoading);

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();


  //GETTING BUY SELL ITEMS
  useEffect(() => {
    dispatch(getAllBuySellItems());
   
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };


  //TOGGLE MODEL
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const classes = useStyles();
  return (
    <>
    <Navbar visibleSearch={true} presentPage="buySell" />
    {isLoading ? (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  ) :(
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {itemList.length > 0 ? (
          itemList.map((item, index) => {
            return (
              <Grid lg={3} sm={4} xs={12} md={4} item key={index}>
                <NoteCard editOption={false} data={item} />
              </Grid>
            );
          })
        ) : (
          <div></div>
        )}
      </Grid>
      <div className="circle">
     
       <FaPlusCircle onClick={toggleModal} className="btn-modal btn"/>
        
      </div>
      <Modal const toggleModal={toggleModal} modal={modal} />
    </Container>
    
  )};
  </>
);
        }


export default Cards;

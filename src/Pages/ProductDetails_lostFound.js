import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "../Components/Lost_Found/LostFound.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLostFoundItem,
  getLostFoundProductDetails,
  markAsFound,
  raiseHand,
} from "../redux/actions/LostFoundActions";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PanToolIcon from "@mui/icons-material/PanTool";
import DoneIcon from "@mui/icons-material/Done";
import { CircularProgress } from "@material-ui/core";
import Navbar from "../Components/Appbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "70vw",
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LostFoundItemDetails() {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [dateString, setDateString] = useState("");
  const [note, setNote] = useState("");
  const [rseponseOfRaisedHand, setResponseOfRaisedHand] = useState(null);
  const [deleteItemResponse, setDeleteItemResponse] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [itemFound, setItemFound] = useState(null);
  const [itemFoundSuccess, setItemFoundSuccess] = useState(false);

  const product_id = params.id;
  const product = useSelector((state) => state.lostFound.singleProduct.Product);
  const raisedHandResponse = useSelector(
    (state) => state.lostFound.raisedHandResponse
  );
  const deleteLostFoundItemResponse = useSelector(
    (state) => state.lostFound.deleteLostFoundItemResponse
  );
  const foundItemResponse = useSelector((state) => state.lostFound.itemFound);
  const isLoading = useSelector((state) => state.lostFound.isLoading);
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;

  useEffect(async() => {
   await dispatch(getLostFoundProductDetails({ product_id, decoded }));

    if (product?.lost_date) {
      const date = new Date(product?.lost_date);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      setDateString(day + "-" + month + "-" + year);
    }
  }, [product_id, product?.lost_date]);

  const raiseHandFunction = async (e) => {
    e.preventDefault();

    setOpenModal(false);
    dispatch(raiseHand({ product_id, token, note }));
  };
var result;
  
if(product){result = product.lost_time?.slice(12,19)}
  


  //TOASTIFY FUNCTIONS START
  useEffect(() => {
    setResponseOfRaisedHand(raisedHandResponse);
  }, [raisedHandResponse]);

  useEffect(() => {
    if (rseponseOfRaisedHand?.status === 200) {
      toast.success(rseponseOfRaisedHand?.message);
      setResponseOfRaisedHand(null);
    } else {
      toast.error(rseponseOfRaisedHand?.message);
      setResponseOfRaisedHand(null);
    }
  }, [rseponseOfRaisedHand]);

  useEffect(() => {
    
    setDeleteItemResponse(deleteLostFoundItemResponse);
  }, [deleteLostFoundItemResponse]);

  useEffect(() => {

    if (deleteItemResponse?.status === 200) {
      toast.success(deleteItemResponse?.message);
      setDeleteSuccess(true);
      setDeleteItemResponse(null);
    } else {
      toast.error(deleteItemResponse?.message);
      setDeleteItemResponse(null);
    }
  }, [deleteItemResponse]);

  useEffect(() => {

    setItemFound(foundItemResponse);
  }, [foundItemResponse]);

  useEffect(() => {
    
    if (itemFound?.status === 200) {
      toast.success(itemFound?.message);
      setItemFoundSuccess(true);
      setItemFound(null);
    } else {
      toast.error(itemFound?.message);
      setItemFound(null);
    }
  }, [itemFound]);

  //TOASTIFY FUNCTIONS END

  //EDIT AND DELETE MY LOST FOUND FUNCTIONS START

  useEffect(() => {
    if (deleteSuccess) {
      navigate("/lostFound");
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (itemFoundSuccess) {
      navigate("/lostFound");
    }
  }, [itemFoundSuccess]);

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    if (e.target.value === "true") {
      dispatch(deleteLostFoundItem({ product_id, user_details, token }));
    } else {
      setOpenModal2(false);
    }
  };

  const handleMarkAsFound = (e) => {
    e.preventDefault();
    if (e.target.value === "true") {
      dispatch(markAsFound({ product_id, user_details, token }));
    } else {
      setOpenModal3(false);
    }
  };

  const handleClick = async (e) => {
    
    if (e.target.value === "edit") {
      navigate(`/editLostFoundItems/${product_id}`);
    } else if (e.target.value === "delete") {
      setOpenModal2(true);
    } else if (e.target.value === "found") {
      setOpenModal3(true);
    }
  };

  //EDIT AND DELETE MY LOST FOUND FUNCTIONS END

  return (
    <>
      <Navbar />
      <div className="LostItemMaincontainer">
        <div className="LostItemDetailsContainerWrapper">
          <div className="headingContainer">
            <div className="headingText">
              <h1
                style={{
                  fontWeight: "700",
                  fontFamily: "Hind Siliguri, sans-serif",
                }}
              >
                Lost Item Details
              </h1>
              <h4 style={{ fontWeight: "400" }}>Item ID : {product?._id}</h4>
            </div>
            {product?.owner_details?._id === user_details._id ? (
              <div
                className="buttonContainer"
                style={{ display: "flex", height: "70%" }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  value="edit"
                  endIcon={<EditIcon />}
                  style={{ marginRight: "10%", height: "70%" }}
                  onClick={handleClick}
                >
                  EDIT
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="error"
                  value="delete"
                  style={{ marginRight: "10%", height: "70%" }}
                  endIcon={<DeleteIcon />}
                  onClick={handleClick}
                >
                  DELETE
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  color="success"
                  value="found"
                  style={{ height: "70%" }}
                  endIcon={<DoneIcon />}
                  onClick={handleClick}
                >
                  FOUND
                </Button>
              </div>
            ) : (
              <Button
                size="medium"
                variant="contained"
                color="primary"
                endIcon={<PanToolIcon />}
                style={{
                  display: "flex",
                  height: "70%",
                  fontWeight: "700",
                  fontFamily: "Hind Siliguri, sans-serif",
                }}
                onClick={(e) => setOpenModal(true)}
              >
                RAISE HAND
              </Button>
            )}
          </div>
          <div className="LostItemDetailsContainer">
            <div className="firstHalf">
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Item Lost</h4>
                <p>{product?.name}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Category</h4>
                <p>{product?.category}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Brand</h4>
                <p>{product?.brand}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Primary Color</h4>
                <p>{product?.color}</p>
              </div>
            </div>
            <div className="secondHalf">
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Date Lost</h4>
                <p>{dateString}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4>Time Lost</h4>
                <p>{result}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Location Lost</h4>
                <p>{product?.lost_location}</p>
              </div>
              <div className="LostDetailsListItem">
                <h4 style={{fontFamily:"Hind Siliguri,sans-serif",fontWeight:'700'}}>Description</h4>
                <p>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={openModal}
          onClose={(e) => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={modalStyle} className={`${classes.paper}`}>
            <h4>Lost Item</h4>
            <form
              className="form"
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={raiseHandFunction}
            >
              <div className="inputDiv">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{ marginBottom: "10px" }}
                >
                  Note (optional)
                </label>
                <textarea
                  id="descripion"
                  style={{
                    outline: "none",
                    border: "1px solid gray",
                    maxWidth: "100%",
                    minWidth: "100%",
                    minHeight: "68px",
                  }}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder=""
                  value={note}
                ></textarea>
              </div>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                style={{ marginLeft: "2%", width: "100%" }}
              >
                {isLoading && <CircularProgress size={14} />}
                {!isLoading && "SUBMIT"}
              </Button>
            </form>
          </div>
        </Modal>
        <Modal
          open={openModal2}
          onClose={(e) => setOpenModal2(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={modalStyle} className={`${classes.paper}`}>
            <h4
              style={{ fontFamily: "Helvetica", fontWeight: "600" }}
              className="label"
            >
              Delete Lost Item
            </h4>
            <p
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                fontFamily: "Helvetica",
                fontWeight: "400",
              }}
            >
              Are you sure you want to delete this item permanently?
            </p>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              onClick={handleConfirmDelete}
              style={{ width: "fit-content" }}
              value="true"
            >
              {isLoading && <CircularProgress size={14} />}
              {!isLoading && "GO AHEAD"}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              style={{ marginLeft: "2%", width: "fit-content" }}
              value="false"
              onClick={handleConfirmDelete}
            >
              {isLoading && <CircularProgress size={14} />}
              {!isLoading && "CANCEL"}
            </Button>
          </div>
        </Modal>
        <Modal
          open={openModal3}
          onClose={(e) => setOpenModal3(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={modalStyle} className={`${classes.paper}`}>
            <p
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                fontFamily: "Helvetica",
                fontWeight: "400",
              }}
            >
              click confirm to proceed further.
            </p>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              onClick={handleMarkAsFound}
              style={{ width: "fit-content" }}
              value="true"
            >
              {isLoading && <CircularProgress size={14} />}
              {!isLoading && "CONFIRM"}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              style={{ marginLeft: "2%", width: "fit-content" }}
              value="false"
              onClick={handleMarkAsFound}
            >
              {isLoading && <CircularProgress size={14} />}
              {!isLoading && "CANCEL"}
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LostFoundItemDetails;

import "../Components/Buy_sell/ProductDetails.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSingleProductDetails } from "../redux/actions/BuySellActions";
import LoadingBox from "../Components/LoadingBox";
import { useParams } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core";
import Navbar from "../Components/Appbar/Navbar";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import axios from "axios";

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

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const buySell = useSelector((state) => state.buySell);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  var isLoading = buySell?.isLoading;
  var singleProduct = buySell?.singleProduct;
  const [image2, setimage2] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const [isLoading2, setIsLoading2] = useState(false);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;
  var { owner_details } = singleProduct;
  

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getSingleProductDetails(productId));
  }, []);

  useEffect(() => {
    buySell && setimage2(buySell?.firstImage);
  }, [buySell]);

  const handleClick = (e) => {
    setimage2(e.target.src);
  };


  const handleConnectionRequest = async (e) => {
    if (e.target.value === "true") {
      var message = `Buy Item Details\n\nItem Name - ${singleProduct.name}\nDescription - ${singleProduct.description}\n\n - ${decoded.name} wants to buy this item`;
      // const str = toString(message);
      const data = {
        user_details,
        reciever_id: owner_details._id,
        // initial_message: message,
      };
      const res = await axios.post(
        "https://kolegia.herokuapp.com/api/v1/chats/get-or-create-chat-room",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setIsLoading2(false);
        navigate(`/chatRoom`);
      } else if (res.status !== 200) {
        setIsLoading2(false);
        alert(res.data.message);
      }
    } else if (e.target.value === "false") {
      setIsLoading2(false);
      setOpenModal(false);
    }
  };


  return (
    <div>
      <Navbar visibleSearch={false} />
      <div className="container09">
        {isLoading ? (
          <LoadingBox />
        ) : (
          <div className="containerWrapper">
            <div className="imageListContainer">
              {singleProduct ? (
                singleProduct.files?.map((image, index) => {
                  return (
                    <div key={index}>
                      <img
                        className="sideImage"
                        src={image.uri}
                        onClick={handleClick}
                      />
                    </div>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
            <div className="imageContainer">
              <img alt="image" className="previewImage" src={image2} />
            </div>

           

           
            <div className="owner">
              <div className="ownerImg">
               
             
                <div className="detailsContainer">
                  <div>
                  <h1 style={{ fontSize: "40px" }}>{singleProduct?.name}</h1>
                  <p>
                    in{" "}
                    {singleProduct.category == "Other"
                      ? singleProduct.other_category_name
                      : singleProduct?.category}
                  </p>
                  <p
                    style={{
                      fontSize: "30px",
                      color: "green",
                      fontWeight: "600",
                    }}
                  >
                    ₹ {singleProduct?.price}
                  </p>
                  <p style={{ fontSize: "22px" }}>
                    {singleProduct?.description}
                  </p>
                  </div>
                  <div className="description">
              <h2>Details</h2>
              <p style={{ marginTop: "15px" }}>
                <span style={{ fontWeight: "600" }}>Brand:</span>{" "}
                {singleProduct?.brand}
              </p>
              <p style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "600" }}>Color:</span>{" "}
                {singleProduct?.color}
              </p>
              <p style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "600" }}>Bought on:</span>{" "}
                {singleProduct.bought_datetime?.split("T")[0]}
              </p>
              <p style={{ marginTop: "5px" }}>
                <span style={{ fontWeight: "600" }}>Warranty Till:</span>{" "}
                {singleProduct?.warranty_till?.split("T")[0]}
              </p>
            </div>
              <div>
                  <h3
                    style={{
                      marginTop: "15px",
                      marginBottom: "5px",
                      fontFamily: "Hind Siliguri, sans-serif",
                      fontWeight: "600",
                      fontSize: "25px",
                    }}
                  >
                    Seller Details
                  </h3>
                  <div className="owner">
                    <div className="ownerImg">
                      <img
                        src={owner_details?.profile_picture}
                        style={{ borderRadius: "50%" }}
                      ></img>
                    </div>
                    <div className="ownerDet">
                      <p style={{ marginTop: "5px" }}>
                        <span style={{ fontWeight: "600" }}>Name:</span>{" "}
                        {owner_details?.name}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <span style={{ fontWeight: "600" }}>Hostel:</span>{" "}
                        {owner_details?.hostel}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <span style={{ fontWeight: "600" }}>Room No:</span>{" "}
                        {owner_details?.room_number}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    onClick={(e) => setOpenModal(true)}
                    style={{
                      
                      color: "white",
                      background: "#332A7C",
                      borderRadius: "10px",
                      marginTop: "2rem",
                      height: "2.5rem",
                      fontFamily: "Hind Siliguri, sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    {isLoading2 ? (
                      <CircularProgress size={14} />
                    ) : (
                      "Connect with author"
                    )}
                  </Button>
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
                  <h4>Connect with this item seller</h4>
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

                  <button
                    className="button-7"
                    disabled={isLoading2}
                    onClick={(e) => handleConnectionRequest(e)}
                    style={{ width: "fit-content" }}
                    value="true"
                  >
                    {isLoading2 && <CircularProgress size={14} />}
                    {!isLoading2 && "CONFIRM"}
                  </button>
                  <button
                    className="button-7"
                    disabled={isLoading2}
                    style={{ marginLeft: "2%", width: "fit-content" }}
                    value="false"
                    onClick={(e) => handleConnectionRequest(e)}
                  >
                    {isLoading2 && <CircularProgress size={14} />}
                    {!isLoading2 && "CANCEL"}
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

import "../Components/Lost_Found/LostFound.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import LostFoundCard from "../Components/Lost_Found/LostFoundCard";
import Navbar from "../Components/Appbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { getAllLostFoundItems } from "../redux/actions/LostFoundActions";

import {  useNavigate } from "react-router-dom";

const Bcards = () => {
  const navigate = useNavigate();

  const Data = useSelector((state) => state.lostFound.lostFoundItemList);
  const isLoading = useSelector((state) => state.lostFound.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLostFoundItems());
  }, []);

  const image = [];

  return (
    <>
      <Navbar visibleSearch={true} presentPage="lostFound" />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="Bcards-cont">
          {Data.length > 0 &&
            Data.map((card, index) => {
              return (
                <LostFoundCard editOption={false} key={index} card={card} />
              );
            })}
          <div className="addNewBtnContainer">
            <button
              className="addNewBtn"
              onClick={(e) => navigate("/lostItem/addItem")}
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bcards;

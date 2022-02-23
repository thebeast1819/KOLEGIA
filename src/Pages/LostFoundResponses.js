import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Appbar/Navbar";

import {
  acceptRaisedHand,
  getLostFoundItemResponses,
  rejectRaisedHand,
} from "../redux/actions/LostFoundActions";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function LostFoundResponses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;
  const responses = useSelector((state) => state.lostFound.lostFoundResponses);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getLostFoundItemResponses({ user_details, token }));
  }, []);

  const handleClick = async (e, response) => {
    e.preventDefault();

    if (e.target.value === "accept") {
      setIsLoading(true);
      const res = await axios.post(
        "https://kolegia.herokuapp.com/api/v1/raisedhands/accept-raised-hand",
        { _id: response._id, user_details, token },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (res.status === 200) {
        setIsLoading(false);

        navigate(`/chatRoom`);

      } else if (res.status !== 200) {
        setIsLoading(false);
        alert(res.data.message);
      }
    } else if (e.target.value === "decline") {
      setIsLoading(true);
      const data = { _id: response._id, user_details, token };
      const res = await axios.delete(
        "http://localhost:3000/api/v1/raisedhands/reject-raised-hand",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data,
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        dispatch(getLostFoundItemResponses({ user_details, token }));
      } else {
        setIsLoading(false);
        alert(res.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="resposneMainContainer">
        {isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <div className="responseMainWrapper">
          {responses.length > 0 ? (
            responses.map((response, index) => {
              return (
                <div key={index} className="responseContainer">
                  <div className="responseProfileImageContainer">
                    <img
                      className="responseprofileImage"
                      src={response.raised_by_details.profile_picture}
                    />
                  </div>
                  <div className="responseDataContainer">
                    <div className="responseData">
                      <h5 className="dataLabel">Item Name: </h5>
                      <p>{response.product_details.name}</p>
                    </div>
                    {response.note && (
                      <div className="responseData">
                        <h5 className="dataLabel">Note : </h5>
                        <p>{response.note}</p>
                      </div>
                    )}
                    <div className="responseData">
                      <h5 className="dataLabel">Raised by : </h5>
                      <p>{response.raised_by_details.name}</p>
                    </div>
                  </div>
                  <div className="responseButtonContainer">
                    <Button
                      style={{ height: "60%", margin: "2%" }}
                      size="medium"
                      variant="contained"
                      color="success"
                      value="accept"
                      onClick={(e) => handleClick(e, response)}
                    >
                      Accept
                    </Button>
                    <Button
                      style={{ height: "60%", margin: "2% 0" }}
                      size="medium"
                      variant="contained"
                      color="error"
                      value="decline"
                      onClick={(e) => handleClick(e, response)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No responses as of now</div>
          )}
        </div>
      </div>
    </>
  );
}

export default LostFoundResponses;

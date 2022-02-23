import Buy from "../../assests/Buy.svg";
import Lostfound from "../../assests/Lostfound.svg";
import Tickets from "../../assests/Tickets.svg";
import Profile from "./Profile";
import Badge from "@mui/material/Badge";

import { Link, useNavigate } from "react-router-dom";
import StatsCard from "./StatsCard";

import "./DashboardCards.css";
import { useDispatch, useSelector } from "react-redux";
import { getLostFoundItemResponses } from "../../redux/actions/LostFoundActions";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const Dcards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;

  useEffect(() => {
    dispatch(getLostFoundItemResponses({ user_details, token }));
  }, []);

  const responses = useSelector((state) => state.lostFound.lostFoundResponses);

  const data = [
    {
      Title: "Lost-Found",
      img: Lostfound,
      button_title: "Explore",
      path: "/lostFound",
    },
    {
      Title: "Buy-Sell",
      img: Buy,
      button_title: "Explore",
      path: "/buySell",
    },
    {
      Title: "Requirements",
      img: Tickets,
      button_title: "ViewMore",
      path: "/requirements",
    },
    {
      Title: "My-Responses",
      img: Tickets,
      button_title: "ViewMore",
      path: "/responses",
    },
  ];

  return (
    <>
      <div className="Dcards-cont">
          <Profile />
        {data.map((card, index) => {
          return (
            <div className="Dcard" id={card.Title} key={index}>
              <h2>{card.Title}</h2>
              <img src={card.img} alt={card.Title} />
              <Link to={card.path}>
                <Badge
                  badgeContent={
                    card.Title === "My-Responses" ? responses?.length : 0
                  }
                  color="error"
                >
                  <button className="button-01">{card.button_title}</button>
                </Badge>
              </Link>
            </div>
          );
        })}
        <StatsCard />
      </div>
    </>
  );
};

export default Dcards;

import "../Components/Requirement/requirement.css";
import Req_feed from "../Components/Requirement/Req_feed";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequirements } from "../redux/actions/RequirementActions";
import Modal from "./Additems_requirements";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Navbar from "../Components/Appbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Requirement = () => {
  const itemList = useSelector((state) => state.requirement.items);
  const isLoading = useSelector((state) => state.requirement.isLoading);
  const status = useSelector(
    (state) => state.requirement.addrequirementresponse
  );
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRequirements());
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (status === 200) {
    window.location.reload(false);
  }
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      
      <Navbar visibleSearch={false} presentPage="buySell" />
    {isLoading ? (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  ) :(
      <div className="requirement_page" style={{ marginTop: "11vh" }}>
        <div className="page_heading"></div>
        <div className="page_content">
          {itemList.map((item, index) => {
            return (
              <Req_feed
                key={index}
                editOption={false}
                data={item}
                postedBy={item.posted_by_user_name}
              />
            );
          })}
        </div>
        <div className="circle">
          <FaPlusCircle onClick={toggleModal} className="btn-modal btn" />
        </div>
        <Modal const toggleModal={toggleModal} modal={modal} />
      </div>
    
    )};

</>
);
        }

export default Requirement;

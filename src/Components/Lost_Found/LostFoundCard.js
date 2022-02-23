import "./LostFound.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit,FaTrashAlt} from "react-icons/fa";

import { FaUser } from "react-icons/fa";

const LostFoundCard= ({card,editOption,handleClick,postedby}) => {

const  slicedFilesArray=card.files.slice(0,3);

const slicedDescription=card.description.slice(0,17);
    const [pht, setPht] = useState("");

    let result = card.posted_on.slice(0, 10);
   
    //showing images on click function
    const showImage = (e) => {
        let iD = e.target.alt;
        if (pht === e.target.src) {
          setPht("");
          document.querySelector(`#div${iD}`).classList.remove("hover-img");
        } else {
          setPht(e.target.src);
          document.querySelector(`#div${iD}`).classList.add("hover-img");
        }
      };


    return (
        <div className="found" id="Bcard" >
           
          {/* <h2 className="header-02">Found</h2> */}
          <div className="card-details">
            {postedby?<h2 className="pink">
              <label htmlFor="h2">
                <FaUser />
              </label>
              
              {postedby}
            </h2>:<h2 className="pink">
              <label htmlFor="h2">
                <FaUser />
              </label>
              
              {card.owner_details.name}
            </h2>}
            
            <h4 className="pink">
              <label htmlFor="h4">Item:</label>
              {card.name}
            </h4>
            <h4 className="pink">
              <label htmlFor="h4">Description:</label>
              {slicedDescription}...
            </h4>
            <div className="view-more-01">
              <div>
                <label htmlFor="h4">Created at:</label>
                <h4 className="pink">{result}</h4>
              </div>
              <Link to={`/lostItem/${card._id}`}>View More</Link>
            </div>
          </div>
          <div id={`div${card._id}`} className="Display">
            <img src={pht} alt="Watch" />
          </div>

          {slicedFilesArray.length ? (
            <div className="img-cont">
              {slicedFilesArray.map((item, index) => {
                return (
                  <img
                    key={index}
                    onClick={showImage}
                    src={item.uri}
                    alt={card._id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="img-cont">
              <h3>No images available</h3>
            </div>
          )}
        </div>
      );
}
 
export default LostFoundCard;
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import "../Components/Lost_Found/LostFound.css";
import {
  editLostFoundItem,
  getLostFoundProductDetails,
  resetStatus,
} from "../redux/actions/LostFoundActions";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../Components/Appbar/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit_MyLostFoundItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  //CATEGORIES DATA
  const categories = [
    {
      value: "Electronics and Mobiles",
      label: "Electronics and Mobiles",
    },
    {
      value: "Fashion",
      label: "Fashion",
    },
    {
      value: "Home and Garden",
      label: "Home and Garden",
    },
    {
      value: "Sports & Outdoors",
      label: "Sports & Outdoors",
    },
    {
      value: "Toys & Games",
      label: "Toys & Games",
    },
    {
      value: "Health & Beauty",
      label: "Health & Beauty",
    },
    {
      value: "Automotive",
      label: "Automotive",
    },
    {
      value: "Books & Audible",
      label: "Books & Audible",
    },
  ];
  // const location=useLocation();

  const token = localStorage.getItem("jwt");
  const decoded = jwt_decode(token);
  const product_id = params.id;
  const product = useSelector((state) => state.lostFound.singleProduct.Product);

  const [name, setName] = useState(product.name ? product.name : "");
  const [description, setDescription] = useState(
    product.description ? product.description : ""
  );
  const [brand, setBrand] = useState(product.brand ? product.brand : "");
  const [color, setColor] = useState(product.color ? product.color : "");

  const [category, setCategory] = useState(
    ""
    // product.category ? product.category : ""
  );
  const [OtherCategory, setCategoryOthers] = useState("");
  const [lostDate, setLostDate] = useState(
    product.lost_date ? product.lost_date : ""
  );
  const [lostTime, setLostTime] = useState(
    product.lost_time ? product.lost_time : ""
  );
  const [lostLocation, setLostLocation] = useState(
    product.lost_location ? product.lost_location : ""
  );
  const [files, setFiles] = useState([]);
  const [editItemResponse, setEditItemResponse] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);

  function get_iso_time({ date, time }) {
    try {
      let newDateTime = date ? new Date(date) : new Date();
  
      if (time) {
        let digits = time.split(":");
        let hours = parseInt(digits[0]);
        let minutes = parseInt(digits[1]);
  
        newDateTime.setHours(hours, minutes);
      }
  
      return newDateTime.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  }

  const newLostTime=get_iso_time({time:lostTime});

  useEffect(() => {
    dispatch(getLostFoundProductDetails({ product_id, decoded }));
  }, []);

  
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const editLostFoundItemResponse = useSelector(
    (state) => state.lostFound.editlostfoundResponse
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("name", name);
    formData.append("brand", brand);
    if (category) {
      formData.append("category", category);
    } else {
      formData.append("category", OtherCategory);
    }

    formData.append("color", color);
    formData.append("description", description);
    formData.append("lost_date", lostDate);
    formData.append("lost_time", newLostTime);
    formData.append("lost_location", lostLocation);
    formData.append("token", decoded.auth_token);
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
   
    dispatch(editLostFoundItem(formData));
  };

  useEffect(() => {
    setEditItemResponse(editLostFoundItemResponse);
  }, [editLostFoundItemResponse]);

  useEffect(() => {
    if (editItemResponse?.status === 200) {
      toast.success(editItemResponse?.message);
      setEditSuccess(true);
      setEditItemResponse(null);
    } else {
      toast.error(editItemResponse?.message);
      setEditItemResponse(null);
    }
  }, [editItemResponse]);

  useEffect(() => {
    if (editSuccess === true) {
      dispatch(resetStatus);
      navigate(`/lostItem/${product_id}`);
    }
  }, [editSuccess]);

  return (
    <>
      <Navbar />
      <div style={{ height: "100vh", marginTop: "10vh" }}>
        <form className="addItemForm" onSubmit={handleSubmit}>
          <div className="left">
            <div className="inputContainer">
              <label htmlFor="item" className="inputLabel">
                Item Lost
              </label>
              <input
                className="formInput"
                type="text"
                id="item"
                defaultValue={name}
                placeholder="enter item name you lost"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="brand" className="inputLabel">
                Brand
              </label>
              <input
                className="formInput"
                type="text"
                defaultValue={brand}
                id="brand"
                placeholder="enter brand of the item you lost"
                onChange={(e) => setBrand(e.target.value)}
                required
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="category" className="inputLabel">
                Category
              </label>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={category}
                onChange={handleChange}
                helperText="Please select the category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <input
                className="formInput"
                type="text"
                id="category"
                placeholder="if any other"
                onChange={(e) => setCategoryOthers(e.target.value)}
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="color" className="inputLabel">
                Color
              </label>
              <input
                className="formInput"
                type="name"
                defaultValue={color}
                id="color"
                placeholder="primary color of item"
                onChange={(e) => setColor(e.target.value)}
                required
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="images" className="inputLabel">
                Images of Item
              </label>
              <input
                className="formInput"
                type="file"
                multiple
                id="images"
                placeholder="Add images of item (if any)"
                onChange={(e) => setFiles([...files, ...e.target.files])}
              ></input>
            </div>
          </div>
          <div className="right">
            <div className="inputContainer">
              <label htmlFor="date" className="inputLabel">
                Date
              </label>
              <input
                className="formInput"
                type="date"
                defaultValue={lostDate}
                id="date"
                placeholder="date when item lost"
                onChange={(e) => setLostDate(e.target.value)}
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="time" className="inputLabel">
                Time
              </label>
              <input
                className="formInput"
                type="time"
                defaultValue={lostTime}
                id="time"
                placeholder="time when item lost"
                onChange={(e) => setLostTime(e.target.value)}
                required
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="location" className="inputLabel">
                Location
              </label>
              <input
                className="formInput"
                type="text"
                defaultValue={lostLocation}
                id="location"
                placeholder="location where item lost"
                onChange={(e) => setLostLocation(e.target.value)}
                required
              ></input>
            </div>
            <div className="inputContainer">
              <label htmlFor="description" className="inputLabel">
                Description
              </label>
              <textarea
                className="formInput"
                type="textarea"
                id="description"
                defaultValue={description}
                placeholder="tell us more about item, additional information"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="inputContainer">
              <button
                type="submit"
                className="primary submitBtn"
                style={{ marginBottom: "1.5rem" }}
              >
                SAVE
              </button>
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit_MyLostFoundItems;

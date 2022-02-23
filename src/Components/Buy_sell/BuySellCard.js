

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import { Link } from "react-router-dom";
import "./BuySellCard.css";
import { CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FaEdit,FaTrashAlt} from "react-icons/fa";

const useStyles = makeStyles((theme) => {
  return {

    card: {
      background: "#E7E7F7",
      position: "relative",
      boxShadow: `10px 8px 10px #D9D7F1, -10px -5px 10px #fdfdfd`,
      shadowColor: "#D9D7F1",
    },

    card_content: {
      background: "#fbfbfd",
     display:'flex',
     flexDirection:'Column',
     gap:'4px',
     fontSize:'15px',
     shadowColor: "#D9D7F1",
     shadowRadius: 5,
     elevation: 15,
    //  "fontFamily": `'Dosis', sans-serif`
     fontWeight:600,
     "fontFamily": `'Poppins', sans-serif`
    },

    Link: {
      color: "#F25767",
    },
    price: {
      background: "#F25767",
      color: "white",
      width: "10em",
      position: "absolute",
      top: "220px",
      left: "40px",
      "fontFamily": `'Poppins', sans-serif`

    },
  };
});



const NoteCard = ({ data,editOption,handleClick}) => {

  const slicedDescription=data.description.slice(0,10);
 
  
  const classes = useStyles();
  return (
    <Card elevation={3} className={classes.card}>
      { editOption?
      <div className='eidtIcons_buySell'>
      <Link 
   to='/editMyBuySellItems'
  state={{ Data: data }}><FaEdit /></Link>  
    < FaTrashAlt onClick={(e)=>handleClick(data,e)}/>
      </div> : null
}
      <CardMedia
        className={classes.media}
        component="img"
        padding="5"
        height="200"
        image={data.files[0].uri}
        alt="watch"
      />

      <CardContent className={classes.card_content}>
        <Typography variant="p">{data.name}</Typography>       
        <Typography variant="p">Rs: {data.price}</Typography>
        <Typography variant="p">Description: {slicedDescription}...</Typography>
        <div className="box">
         
          <Link to={`/product/${data._id}`} underline="none">
            {"View more"}
          </Link>
          {/* <Link
            className={classes.Link}
            
          >
            
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

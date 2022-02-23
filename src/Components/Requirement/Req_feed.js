import './req_feed.css';
import { FaEdit,FaTrashAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';



const Req_feed = ({ data,postedBy,handleClick ,editOption}) => {
  

  let result = data.posted_on.slice(0, 10);
  return (
  <div className='feed'>
    <div className='feed_title'>
      <h3>{ data.title }</h3>
{ editOption?
      <div className='eidtIcons'>
      <Link 
   to='/editMyRequirement'
  state={{ Data: data }}><FaEdit  className='svg'/></Link>  
    < FaTrashAlt className='svg' onClick={(e)=>handleClick(data,e)}/>
      </div> : null
}
  
    </div>
    <div className='feed_desc'>
      <p>{ data.description }</p>
    </div>
    <div className='feed_username'>
      <p>Posted by: { postedBy }</p>
    </div>
    <div className='feed_date'>
      <h3>{ result }</h3>
    </div>
  </div>
  );
};

export default Req_feed;

import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation ,useNavigate} from 'react-router-dom'
import {AddCircleOutlineOutlined } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppBar from  '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import My_buySellItems from '../../Pages/My_buySellItems';
import My_lostFoundItems from '../../Pages/My_lostFoundItems'
import My_requirements from '../../Pages/My_requirements';
import ProfileMobile from "../../Pages/ProfileMobile";
import HomeIcon from '@mui/icons-material/Home';
import { fontSize } from '@mui/system';
import ProfilePage from '../profile/ProfilePage'
import { SiWhitesource } from 'react-icons/si';
import LockIcon from '@mui/icons-material/Lock';



const drawerWidth = 230

const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: 'white',
      width: '100%',
      padding: theme.spacing(1),

     
    },
    root: {
      display: 'flex',

      fontFamily:'Inter, sans-serif',

    },
    drawer: {
      width: drawerWidth,
      background: '#332a7c',

      [theme.breakpoints.down(650)]: {
       width:'60px'
      },
      fontFamily:'Inter, sans-serif',

    },
    drawerPaper: {
      background: '#332a7c',
  
      width: drawerWidth,
      [theme.breakpoints.down(650)]: {
       width:'60px',


      },

    },
    active: {
      background: '#F0BC5E'
    },
    title: {
      padding: theme.spacing(0.75),
      color: 'white',
      cursor:'pointer',
      [theme.breakpoints.down(650)]: {
        display:'none',

      },
      fontFamily:'Hind Siliguri, monospace',
      fontWeight:'900',


       fontSize:'1.5rem'
    },
   
    date: {
      flexGrow: 1
    },
    list:{
       display:'flex',
       flexDirection:'column',
       

       
    },

    icon:{
      color:"white"
      
    },
    icon02:{
      color:"white",
      width:'50px',
      
    },
    label:{
      color: 'white',
           // display:'none'
      [theme.breakpoints.down(650)]: {
        display:'none'
      },
      }

   
  }
})

export default function SideBar() {
  const classes = useStyles()
  
  const location = useLocation()
  const navigate =useNavigate();

  const menuItems = [
    { 
      text: 'Profile', 
      icon: <PersonIcon  />,

      path: '/sidebar' 
    },

    { 
      text: 'My BuySell Items', 
      icon: <ShoppingCartIcon  />, 
      path: '/sidebar/myOwnBuySellItems' 
    },
    { 
      text: 'Lost/Found items', 
      icon: <ContentPasteSearchIcon />, 
      path: '/sidebar/myOwnLostFoundItems' 
    },
    { 
      text: 'My Requirements', 
      icon: <FormatListBulletedIcon  />, 
      path: '/sidebar/myOwnRequirements' 
    },
    { 
      text: 'Change Password', 
      icon: <LockIcon  />, 
      path: '/changePassword' 
    },
  ];

  return (
    <div className={classes.root}>
     

      {/* side drawer */}
      <Drawer
      
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        
      >
        <div>
        
          <ListItem 
              button 

               
              onClick={() => navigate('/dashboard')}
             
            >
              <ListItemIcon className={classes.icon02}><HomeIcon  /></ListItemIcon>
              <ListItemText  className={classes.title} primary={<Typography  variant="h5" className={classes.title}>
           KOLEGIA
          </Typography>} />
            </ListItem>
        </div>

        {/* links/list section */}
        <List className={classes.list}>
          {menuItems.map((item) => (
            <ListItem 
              button
              key={item.text} 
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon color='secondary' className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText  className={classes.label} primary={item.text} />
            </ListItem>
          ))}
        </List>        
      </Drawer>

      {/* main content */}
     
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Routes>
        <Route exact path="/myOwnBuySellItems" element={<My_buySellItems />} />
        <Route exact path="/myOwnLostFoundItems" element={<My_lostFoundItems />}/>
         <Route exact path="/myOwnRequirements" element={<My_requirements />} />
         <Route exact path="/" element={<ProfilePage/>} />
        </Routes>
      </div>
    </div>
  )
}

import  Nav_bar  from './nav_bar/Nav_bar';
import  Header  from './header/Header';
import  Feature  from './feature/Feature';
import  Motive  from './motive/Motive';
import  Feedback  from './feedback/Feedback';
import  Footer  from './footer/Footer';
import './homepage.css';
import { useEffect } from 'react';


const Homepage = () => {

    window.localStorage.removeItem('jwt');
    return ( 
        <div className="homepage-cont">
            <Nav_bar/>
            <Header/>
            <Feature/>
            <Motive/>
            <Feedback/>
            <Footer/>
        </div>
     );
}
 
export default Homepage;
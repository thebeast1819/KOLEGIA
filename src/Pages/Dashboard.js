import Dcards from "../Components/Dashboard/DashboardCards";

import "../Components/Dashboard/DashboardCards.css";
import Navbar from "../Components/Appbar/Navbar";




const Dashboard = () => {
  return (
    <>
      <Navbar visibleSearch={false}/>
      <div className="cont-dashboard">
        <Dcards />
        
      
      </div>
    </>
  );
};

export default Dashboard;

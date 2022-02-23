import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import My_requirements from './Edit_MyRequirement';
import My_lostFoundItems from './My_lostFoundItems';
import My_buySellItems from './My_buySellItems';
import SideBar from '../Components/SideAppbarr/SideBar'



function Layout() {
  return (
    
      <Router>
        <SideBar>
        <Routes>
        <Route exact path="/myOwnBuySellItems" element={<My_buySellItems />} />
        <Route exact path="/myOwnLostFoundItems" element={<My_lostFoundItems />} />
        <Route exact path="/myOwnRequirements" element={<My_requirements />} />
        </Routes>
          </SideBar>
      </Router>
 
  );
}

export default Layout;

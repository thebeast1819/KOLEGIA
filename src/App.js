import "./App.css";
import Cards from "./Pages/Buy_sell";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./Pages/Dashboard";

import Bcards from "./Pages/Lost_found";

import ProductDetails from "./Pages/ProductDetails_buySell";
import LoginSignUp from "./Pages/Login";
import ProfileMobile from "./Pages/ProfileMobile";
import Homepage from "./Components/homepage/Homepage";

import LostFoundItemDetails from "./Pages/ProductDetails_lostFound";
import AddItem from "./Pages/Additems_lostFound";
import OtpPage from "./Pages/OtpPage";
import SignUpForm from "./Pages/SignUp_form";
import Requirement from "./Pages/Requirement";
import Edit_MyRequirement from "./Pages/Edit_MyRequirement";

import Edit_MyBuySellItems from "./Pages/Edit_MyBuySellItems";

import Edit_MyLostFoundItems from "./Pages/Edit_MyLostFoundItems";
import ChatRoom from "./Components/ChatComponents/ChatRoom/ChatRoom";
import SideBar from "./Components/SideAppbarr/SideBar";
import VerifyEmailPage from "./Pages/VerifyEmailPage";
import ResetPassword from "./Pages/ResetPassword";
import LostFoundResponses from "./Pages/LostFoundResponses";
import Messenger from "./Pages/Messenger";
import Edit_Profile from "./Pages/Edit_Profile";
import ProfilePage from "./Components/profile/ProfilePage";
import Change_Password from "./Pages/Change_Password";
import SignUpPage from "./Pages/SignUpPage";
import Not_Found from "./Components/Not_Found/Not_Found";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFFF00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
    

         

          <Routes>
            <Route path="/" exact element={<Homepage />}></Route>

            <Route path="*" exact element={<Not_Found />}></Route>

            <Route path="/loginSignUp" exact element={<LoginSignUp />}></Route>
            <Route exact path="/signUpForm" element={<SignUpForm />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/otpPage" element={<OtpPage />} />
            <Route exact path="/buySell" element={<Cards />} />
            <Route exact path="/lostFound" element={<Bcards />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/requirements" element={<Requirement />} />
            <Route exact path="/resetPassword" element={<ResetPassword />} />
            <Route exact path="/editProfile" element={<Edit_Profile />} />
            <Route exact path="/verifyEmail" element={<VerifyEmailPage />} />
            <Route exact path="changePassword" element={<Change_Password />} />
            <Route exact path="/signUp" element={<SignUpPage />} />


            <Route
              exact
              path="/editMyRequirement"
              element={<Edit_MyRequirement />}
            />
            <Route
              exact
              path="/editMyBuySellItems"
              element={<Edit_MyBuySellItems />}
            />
            <Route
              exact
              path="/lostItem/:id"
              element={<LostFoundItemDetails />}
            />
            <Route exact path="/lostItem/addItem" element={<AddItem />} />
            <Route exact path="sidebar/*" element={<SideBar />} />

            <Route
              exact
              path="/editLostFoundItems/:id"
              element={<Edit_MyLostFoundItems />}
            />
            <Route path="/chatRoom" element={<Messenger />} />
            {/* <Route exact path="/chatRoom/:room_id" element={<Messenger />} /> */}

            <Route exact path="/responses" element={<LostFoundResponses />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

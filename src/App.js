import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/ContactDetails";
import Register from "./pages/login/register";
import User from "./pages/user/user";
import Hotels from "./pages/list/hotels";
import Profile from "./pages/user/profile";
import Predetail from "./pages/user/per-detail";
import PropertyListByType from "./components/propertyList/PropertyListByType";
import ReservationSuccess from "./components/reservationSuccess/ReservationSuccess"; 
import PropertyList from "./pages/home/ListYourProperty";
import Parterregister from "./pages/login/PartnerAccount";
import Contact from "./pages/login/ContactDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hotelslist" element={<Hotels/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/perdetail" element={<Predetail/>}/>
        <Route path="/properties/:type" element={<PropertyListByType />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/list-your-property" element={<PropertyList />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/parterregister" element={<Parterregister/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

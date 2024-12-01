import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/login/register";
import User from "./pages/user/user";
import Hotels from "./pages/list/hotels";
import Profile from "./pages/user/profile";
import Predetail from "./pages/user/per-detail";
import PropertyListByType from "./components/propertyList/PropertyListByType";
import ReservationSuccess from "./components/reservationSuccess/ReservationSuccess";
import PropertyList from "./pages/home/ListYourProperty"; // Corrected import here
import BlogPage from "./pages/blog/BlogPage";
import BlogDetail from "./pages/blog/BlogDetail";
import PartnerAccount from './pages/login/PartnerAccount';
import PropertyOwner from './pages/propertyowner/PropertyOwner';
import HotelGallery from "./components/hotelGallery/HotelGallery";
import ReservationHistory from './reservationHistory/ReservationHistory';
import CityDetails from './components/featured/CityDetails'; 
import Reserve from "./components/reserve/Reserve";
function App() {
  const photos = [
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotelslist" element={<Hotels />} />
        <Route path="/city/:cityName" element={<CityDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/perdetail" element={<Predetail />} />
        <Route path="/properties/:type" element={<PropertyListByType />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/list-your-property" element={<PropertyList />} /> {/* Corrected route */}
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/partner-account" element={<PartnerAccount />} />
        <Route path="/property-owners" element={<PropertyOwner />} />
        <Route path="/gallery" element={<HotelGallery photos={photos} />} />
        <Route path="/reservations-history" element={<ReservationHistory />} />
        <Route path="/city/:cityName" element={<CityDetails />} /> 
        <Route path="/hotels/:hotelId" element={<Hotel />} />
        <Route path="/rooms/:hotelid" element={<Reserve />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

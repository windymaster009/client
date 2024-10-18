import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
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
import BlogPage from "./pages/blog/BlogPage";  // Import the BlogPage component
import BlogDetail from "./pages/blog/BlogDetail"; // Import the BlogDetail component

function App() {
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/perdetail" element={<Predetail />} />
        <Route path="/properties/:type" element={<PropertyListByType />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/blog" element={<BlogPage />} /> {/* Add BlogPage route */}
        <Route path="/blog/:id" element={<BlogDetail />} /> {/* Add BlogDetail route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
import Hotels from "./pages/list/hotels"



import PropertyListByType from "./components/propertyList/PropertyListByType";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotel/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hotelslist" element={<Hotels/>}/>

        <Route path="/properties/:type" element={<PropertyListByType />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

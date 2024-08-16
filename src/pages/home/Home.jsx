import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
//import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Discounts from "../offers/dis";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Detail from "../../pages/offers/detail";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Detail />
        <div className="homeHeader">
          <h1 className="homeTitle">Offers</h1>
          <p className="homeDesc">Promotions, deals and special offers for you</p>
        </div>
        <Discounts />
        <div className="homeHeader">
          <h1 className="homeTitle">Trending destinations</h1>
          <p className="homeDesc">Most popular choices for travellers from Cambodia</p>
        </div>
        <Featured />
        <div className="homeHeader">
          <h1 className="homeTitle">Browse by property type</h1>
          <p className="homeDesc">Browse by property type</p>
        </div>
        <PropertyList />
        <div className="homeHeader">
          <h1 className="homeTitle">Explore Cambodia</h1>
          <p className="homeDesc">These popular destinations have a lot to offer</p>
        </div>
        <PropertyList />
        <div className="homeHeader">
          <h1 className="homeTitle">Homes guests love</h1>
          <p className="homeDesc">Homes guests love</p>
        </div>
        <FeaturedProperties />
        <MailList />
      </div>
    </div>
  );
};

export default Home;
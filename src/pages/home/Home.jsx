import { useNavigate } from "react-router-dom";
import BlogSection from "../../components/blogSection/BlogSection";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Discounts from "../offers/dis";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Detail from "../../pages/offers/detail";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleBlogClick = () => {
    navigate("/blogs");
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        {/* Blog Section */}
        <BlogSection onViewAllBlogs={handleBlogClick} />

        {/* Offers Section */}
        <Detail />
        <div className="homeHeader">
          <h1 className="homeTitle">Offers</h1>
          <p className="homeDesc">Promotions, deals, and special offers for you</p>
        </div>
        <Discounts />

        {/* Other Sections */}
        <div className="homeHeader">
          <h1 className="homeTitle">Trending destinations</h1>
          <p className="homeDesc">Most popular choices for travelers from Cambodia</p>
        </div>
        <Featured />
        <PropertyList />
        <FeaturedProperties />
        <MailList />
      </div>
    </div>
  );
};

export default Home;

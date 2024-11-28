import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import MapComponent from "../../components/mapComponent/MapComponent";
import "./hotel.css";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  // Calculate days difference between start and end date
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  };
  
  const days = dates?.[0]?.startDate && dates?.[0]?.endDate
    ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
    : 0;

  // Calculate total price based on stay duration, number of rooms, and cheapest price per night
  const totalPrice = days > 0 ? days * data.cheapestPrice * options.room : 0;

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hotelPage">
      <div className="contentContainer">
        <Navbar />
        <Header type="list" />

        {loading ? (
          "Loading..."
        ) : error ? (
          <div className="error-message">
            <p>Something went wrong: {error.message}</p>
          </div>
        ) : (
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <button className="bookNow" onClick={handleClick}>
                Reserve or Book Now!
              </button>
              <h1 className="hotelTitle">Discover {data.name}</h1>
              <p>Your serene getaway awaits! Unwind, explore, and relax at {data.name}. Ideally located to offer you a perfect stay.</p>
              
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.location?.address}</span>
              </div>
              <span className="hotelDistance">
                Experience the convenience of our prime location – {data.distance}m from the city center, ensuring you’re always close to the action!
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} and enjoy a free airport taxi for added convenience!
              </span>

              {/* Main Image Slider */}
              <div className="topSlider">
                {data.img && data.img.length > 0 ? (
                  data.img.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${data.name} Image ${index + 1}`}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))
                ) : (
                  <img src="default-image.jpg" alt="Default" className="thumbnail" />
                )}
              </div>

              <div className="mainImageContainer">
                {data.img && data.img.length > 0 && (
                  <img
                    src={data.img[selectedImage]}
                    alt={`Main ${data.name} Image`}
                    className="mainImage"
                  />
                )}
              </div>

              {/* Gallery Slider */}
              <div className="gallerySlider">
                <h2>Explore Our Gallery</h2>
                <p>Take a glimpse of our beautiful interiors, cozy rooms, and breathtaking views. Each image captures the elegance and ambiance we offer.</p>
                <div className="galleryImages">
                  {data.gallery && data.gallery.length > 0 ? (
                    data.gallery.map((galleryImage, index) => (
                      <img
                        key={index}
                        src={galleryImage}
                        alt={`${data.name} Gallery Image ${index + 1}`}
                        className={`galleryThumbnail ${selectedGalleryImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedGalleryImage(index)}
                      />
                    ))
                  ) : (
                    <p>No additional gallery images available.</p>
                  )}
                </div>

                {data.gallery && data.gallery.length > 0 && (
                  <div className="selectedGalleryImageContainer">
                    <img
                      src={data.gallery[selectedGalleryImage]}
                      alt={`Selected ${data.name} Gallery Image`}
                      className="selectedGalleryImage"
                    />
                  </div>
                )}
              </div>

              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1>About {data.name}</h1>
                  <p className="hotelDesc">
                    Nestled in the heart of the city, {data.name} offers you an oasis of calm and luxury. Whether you’re here for leisure or business, our amenities are designed to ensure a memorable stay.
                  </p>
                </div>

                <div className="hotelDetailsFavorite">
                  <h2>{data.favorite ? "This is a Favorite" : "Not a Favorite"}</h2>
                </div>

                <div className="hotelDetailsReviews">
                  <h1>What Our Guests Say</h1>
                  {data.review ? (
                    <p>Rating: {data.rating}/5 (Reviews: {data.review})</p>
                  ) : (
                    <p>Be the first to share your experience with us!</p>
                  )}
                </div>

                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days} {days === 1 ? 'night' : 'nights'} stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${totalPrice}</b> ({days} {days === 1 ? 'night' : 'nights'})
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>

              {data.location && (
                <MapComponent
                  location={{
                    latitude: data.location.latitude,
                    longitude: data.location.longitude,
                  }}
                />
              )}
            </div>
            <MailList />
            <Footer />
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      </div>
    </div>
  );
};

export default Hotel;

import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  useEffect(() => {
    console.log("Data:", data);
    console.log("Error:", error);
  }, [data, error]);

  if (loading) return <p>Loading...</p>;

  const hotels = data?.data || [];

  if (error || !Array.isArray(hotels)) return <p>Error loading featured properties</p>;

  return (
    <div className="featuredProperties">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div className="propertyItem" key={hotel._id}>
            <img
              src={hotel.img && hotel.img.length > 0 ? hotel.img[0] : hotel.gallery[0]}
              alt={hotel.name}
              className="propertyImage"
            />
            <div className="propertyInfo">
              <span className="propertyName">{hotel.name}</span>
              <span className="propertyProvince">{hotel.province}</span>
              <span className="propertyPrice">From ${hotel.cheapestPrice}</span>
              {hotel.rating && (
                <div className="propertyRating">
                  <button>{hotel.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No featured properties available.</p>
      )}
    </div>
  );
};

export default FeaturedProperties;

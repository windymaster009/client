// CityDetails.js
import "./cityDetails.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MapComponent from "../../components/mapComponent/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CityDetails = () => {
  const { cityName } = useParams();
  
  // Normalize city name for display (capitalize first letter only)
  const normalizedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  // State for handling date selection, price filter, and selected hotel
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Fetch hotels by city with price filtering; convert cityName to lowercase for case-insensitive search
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${cityName.toLowerCase()}&min=${min}&max=${max}`
  );

  // Handle search based on selected filters
  const handleSearch = () => {
    reFetch();
  };

  // Set selected hotel for displaying on the map
  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="cityDetailsContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search in {normalizedCityName}</h1>
            
            {/* Date selection */}
            <div className="lsItem">
              <label>Check-in Date</label>
              <div className="lsInputWithIcon" onClick={() => setOpenDate(!openDate)}>
                <FontAwesomeIcon icon={faCalendarAlt} className="lsIcon" />
                <span>
                  {dates[0] ? `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}` : "Select dates"}
                </span>
              </div>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            
            {/* Price Range Input */}
            <div className="lsItem">
              <label>Price Range</label>
              <div className="lsInputWithIcon">
                <input type="number" placeholder="Min" onChange={(e) => setMin(e.target.value)} />
                <input type="number" placeholder="Max" onChange={(e) => setMax(e.target.value)} />
              </div>
            </div>

            {/* Search Button */}
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Displaying hotels */}
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : error ? (
              <div>Error fetching data: {error.message}</div>
            ) : (
              <>
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                  data.data.map((hotel) => (
                    <div key={hotel._id} onClick={() => handleHotelSelect(hotel)}>
                      <SearchItem item={hotel} />
                    </div>
                  ))
                ) : (
                  <div>No hotels found in {normalizedCityName}.</div>
                )}
              </>
            )}
          </div>

          {/* Map component to display selected hotel location */}
          {selectedHotel && selectedHotel.location && (
            <MapComponent
              location={{
                latitude: selectedHotel.location.latitude,
                longitude: selectedHotel.location.longitude,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;

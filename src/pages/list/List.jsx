import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MapComponent from "../../components/mapComponent/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?province=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <div className="lsInputWithIcon">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="lsIcon" />
                <input
                  placeholder="Enter your destination"
                  type="text"
                  value={destination}
                  onChange={(e) =>  (e.target.value)}
                />
              </div>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <div className="lsInputWithIcon" onClick={() => setOpenDate(!openDate)}>
                <FontAwesomeIcon icon={faCalendarAlt} className="lsIcon" />
                <span>
                  {dates && dates[0]
                    ? `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`
                    : "Select dates"}
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
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : error ? (
              <div>Error fetching data: {error.message}</div>
            ) : (
              <>
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                  data.data.map((item) => (
                    <div key={item._id} onClick={() => handleHotelSelect(item)}>
                      <SearchItem item={item} />
                    </div>
                  ))
                ) : (
                  <div>No hotels found.</div>
                )}
              </>
            )}
          </div>
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

export default List;

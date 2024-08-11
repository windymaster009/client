import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./propertyListByType.css";

const PropertyListByType = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/hotels/byType/${type}`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="propertyListByType">
      <h1>{type}</h1>
      {loading ? (
        "Loading..."
      ) : (
        <div className="propertyList">
          {data.map((hotel) => (
            <div className="propertyListItem" key={hotel._id}>
              <img src={hotel.image} alt={hotel.name} className="propertyListImg" />
              <div className="propertyListTitles">
                <h1>{hotel.name}</h1>
                <h2>{hotel.city}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListByType;

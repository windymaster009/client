// src/components/mapComponent/MapComponent.jsx
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapComponent = ({ location }) => {
  // Load Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAQS8pcr1vlKvffmdwxtNJ-Iuc5uxiuCWI",
  });

  // Ensure that location is defined and has valid latitude and longitude
  if (!location || !location.latitude || !location.longitude) {
    return <div>Error: Invalid location data.</div>;
  }

  // Handle loading error
  if (loadError) return <div>Error loading Google Maps: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  const { latitude, longitude } = location;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMap
        center={{ lat: latitude, lng: longitude }}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;

import React from "react";
import "./sidebar.css"; // Import the CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">Home</li>
            <li className="sidebarListItem">Users</li>
            <li className="sidebarListItem">Rooms</li>
            <li className="sidebarListItem">Bookings</li>
            <li className="sidebarListItem">Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

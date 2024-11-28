// File: components/propertyList/PropertyOwnerList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './propertyOwner.css';

const PropertyOwnerList = () => {
  const [propertyOwners, setPropertyOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Fetch property owners from backend
  useEffect(() => {
    const fetchPropertyOwners = async () => {
      try {
        const response = await axios.get('/api/property-owners');
        setPropertyOwners(response.data);
      } catch (error) {
        console.error('Error fetching property owners:', error);
      }
    };

    fetchPropertyOwners();
  }, []);

  // Handle adding a new property owner
  const handleAddOwner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/property-owners', newOwner);
      setPropertyOwners([...propertyOwners, response.data]);
      setNewOwner({ name: '', phone: '', address: '' }); // Reset form fields
    } catch (error) {
      console.error('Error adding property owner:', error);
    }
  };

  // Handle deleting a property owner
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/property-owners/${id}`);
      setPropertyOwners(propertyOwners.filter(owner => owner._id !== id));
    } catch (error) {
      console.error('Error deleting property owner:', error);
    }
  };

  return (
    <div className="property-owner-list">
      <h2>Property Owners</h2>

      {/* Form for adding a new property owner */}
      <form className="add-owner-form" onSubmit={handleAddOwner}>
        <h3>Add New Property Owner</h3>
        <label>
          Name:
          <input
            type="text"
            value={newOwner.name}
            onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={newOwner.phone}
            onChange={(e) => setNewOwner({ ...newOwner, phone: e.target.value })}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={newOwner.address}
            onChange={(e) => setNewOwner({ ...newOwner, address: e.target.value })}
            required
          />
        </label>
        <button type="submit" className="add-btn">Add Owner</button>
      </form>

      {/* Table for displaying property owners */}
      <table className="property-owner-table">
       
        <tbody>
          {propertyOwners.map((owner) => (
            <tr key={owner._id}>
              <td>{owner.name}</td>
              <td>{owner.phone}</td>
              <td>{owner.address}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(owner._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyOwnerList;

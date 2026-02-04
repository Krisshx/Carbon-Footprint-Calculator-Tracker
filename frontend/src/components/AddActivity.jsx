import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/AddActivity.css';

const AddActivity = ({ onActivityAdded }) => {
  const [type, setType] = useState('transportation');
  const [subType, setSubType] = useState('car_petrol');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('km');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  const subTypes = {
    transportation: ['car_petrol', 'car_diesel', 'car_electric', 'bus', 'train', 'flight_short_haul', 'flight_long_haul'],
    energy: ['electricity', 'natural_gas', 'heating_oil'],
    diet: ['beef_meal', 'pork_meal', 'chicken_meal', 'fish_meal', 'vegetarian_meal', 'vegan_meal'],
    consumption: ['shopping', 'waste', 'water'],
  };

  const units = {
    transportation: 'km',
    energy: 'kWh',
    diet: 'meals',
    consumption: 'amount',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/activities',
        { type, subType, value: parseFloat(value), unit, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Activity added successfully!');
      setValue('');
      setNotes('');
      setTimeout(() => setSuccess(''), 3000);
      onActivityAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add activity');
    }
  };

  return (
    <div className="add-activity-container">
      <h2>Add New Activity</h2>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="activity-form">
        <div className="form-group">
          <label>Activity Type</label>
          <select value={type} onChange={(e) => {
            setType(e.target.value);
            setSubType(subTypes[e.target.value][0]);
            setUnit(units[e.target.value]);
          }}>
            <option value="transportation">Transportation</option>
            <option value="energy">Energy</option>
            <option value="diet">Diet</option>
            <option value="consumption">Consumption</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sub Type</label>
          <select value={subType} onChange={(e) => setSubType(e.target.value)}>
            {subTypes[type]?.map(st => (
              <option key={st} value={st}>{st.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            required
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Unit: {unit}</label>
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this activity"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">Add Activity</button>
      </form>
    </div>
  );
};

export default AddActivity;

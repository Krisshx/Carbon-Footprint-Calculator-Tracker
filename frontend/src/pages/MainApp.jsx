import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AddActivity from '../components/AddActivity';
import Dashboard from '../components/Dashboard';
import Recommendations from '../components/Recommendations';
import '../styles/MainApp.css';

const MainApp = () => {
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/activities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchActivities();
      fetchAnalytics();
      fetchRecommendations();
    }
  }, [token]);

  const handleActivityAdded = () => {
    fetchActivities();
    fetchAnalytics();
  };

  return (
    <div className="main-app">
      <nav className="navbar">
        <h1>🌱 Carbon Footprint Tracker</h1>
        <div className="nav-tabs">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'add' ? 'active' : ''}
            onClick={() => setActiveTab('add')}
          >
            Add Activity
          </button>
          <button
            className={activeTab === 'recommendations' ? 'active' : ''}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </nav>

      <div className="content">
        {activeTab === 'dashboard' && <Dashboard activities={activities} analytics={analytics} loading={loading} />}
        {activeTab === 'add' && <AddActivity onActivityAdded={handleActivityAdded} />}
        {activeTab === 'recommendations' && <Recommendations recommendations={recommendations} />}
      </div>
    </div>
  );
};

export default MainApp;

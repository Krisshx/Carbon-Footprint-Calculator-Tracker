import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ activities, analytics, loading }) => {
  if (loading) return <div className="loading">Loading...</div>;

  if (!analytics) {
    return (
      <div className="dashboard">
        <div className="welcome-message">
          <h2>Welcome to Carbon Footprint Tracker!</h2>
          <p>Start adding your daily activities to track your carbon emissions.</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => num?.toFixed(2) || '0.00';

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Emissions</h3>
          <p className="stat-value">{formatNumber(analytics.today)} kg CO₂</p>
        </div>
        <div className="stat-card">
          <h3>Weekly Emissions</h3>
          <p className="stat-value">{formatNumber(analytics.weekly)} kg CO₂</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Emissions</h3>
          <p className="stat-value">{formatNumber(analytics.monthly)} kg CO₂</p>
        </div>
        <div className="stat-card">
          <h3>Total Emissions</h3>
          <p className="stat-value">{formatNumber(analytics.total)} kg CO₂</p>
        </div>
      </div>

      <div className="breakdown-section">
        <h2>Emissions by Category</h2>
        <div className="category-breakdown">
          <div className="category-item">
            <span>Transportation</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(analytics.byCategory.transportation / analytics.total * 100) || 0}%` }}></div>
            </div>
            <span>{formatNumber(analytics.byCategory.transportation)} kg CO₂</span>
          </div>
          <div className="category-item">
            <span>Energy</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(analytics.byCategory.energy / analytics.total * 100) || 0}%` }}></div>
            </div>
            <span>{formatNumber(analytics.byCategory.energy)} kg CO₂</span>
          </div>
          <div className="category-item">
            <span>Diet</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(analytics.byCategory.diet / analytics.total * 100) || 0}%` }}></div>
            </div>
            <span>{formatNumber(analytics.byCategory.diet)} kg CO₂</span>
          </div>
          <div className="category-item">
            <span>Consumption</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(analytics.byCategory.consumption / analytics.total * 100) || 0}%` }}></div>
            </div>
            <span>{formatNumber(analytics.byCategory.consumption)} kg CO₂</span>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {activities.length === 0 ? (
            <p>No activities yet. Add one to get started!</p>
          ) : (
            activities.slice(0, 10).map(activity => (
              <div key={activity._id} className="activity-item">
                <div>
                  <strong>{activity.subType.replace(/_/g, ' ')}</strong>
                  <p>{new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <span className="emission-badge">{activity.carbonEmission.toFixed(2)} kg CO₂</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

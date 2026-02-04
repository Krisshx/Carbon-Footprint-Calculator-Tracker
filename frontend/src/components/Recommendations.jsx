import React from 'react';
import '../styles/Recommendations.css';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations-container">
      <h2>🎯 Personalized Recommendations</h2>
      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <p>Add more activities to get personalized recommendations.</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <div className="card-header">
                <h3>{rec.category}</h3>
                <span className={`impact-badge ${rec.impact?.toLowerCase()}`}>
                  {rec.impact || 'Medium'} Impact
                </span>
              </div>
              <p>{rec.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;

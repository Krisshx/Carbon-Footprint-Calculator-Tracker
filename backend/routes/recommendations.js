const express = require('express');
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/auth');
const { generateRecommendations } = require('../utils/aiRecommendations');

const router = express.Router();

// Get AI recommendations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId }).sort({ date: -1 }).limit(30);
    
    const recommendations = await generateRecommendations(activities);
    
    res.json({
      recommendations,
      activitiesAnalyzed: activities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

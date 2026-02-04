const express = require('express');
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get analytics summary
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const activities = await Activity.find({ userId: req.userId });
    
    const todayEmissions = activities
      .filter(a => new Date(a.date).toDateString() === new Date().toDateString())
      .reduce((sum, a) => sum + a.carbonEmission, 0);
    
    const weeklyEmissions = activities
      .filter(a => new Date(a.date) >= startOfWeek)
      .reduce((sum, a) => sum + a.carbonEmission, 0);
    
    const monthlyEmissions = activities
      .filter(a => new Date(a.date) >= startOfMonth)
      .reduce((sum, a) => sum + a.carbonEmission, 0);
    
    const totalEmissions = activities.reduce((sum, a) => sum + a.carbonEmission, 0);
    
    const byCategory = {
      transportation: 0,
      energy: 0,
      diet: 0,
      consumption: 0,
    };
    
    activities.forEach(a => {
      byCategory[a.type] += a.carbonEmission;
    });
    
    res.json({
      today: todayEmissions,
      weekly: weeklyEmissions,
      monthly: monthlyEmissions,
      total: totalEmissions,
      byCategory,
      activitiesCount: activities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get daily analytics
router.get('/daily/:days', authMiddleware, async (req, res) => {
  try {
    const days = parseInt(req.params.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const activities = await Activity.find({
      userId: req.userId,
      date: { $gte: startDate },
    });
    
    const dailyData = {};
    activities.forEach(a => {
      const dateKey = new Date(a.date).toISOString().split('T')[0];
      dailyData[dateKey] = (dailyData[dateKey] || 0) + a.carbonEmission;
    });
    
    const chartData = Object.entries(dailyData).map(([date, emissions]) => ({
      date,
      emissions,
    }));
    
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

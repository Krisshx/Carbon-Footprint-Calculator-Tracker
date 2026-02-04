const express = require('express');
const Activity = require('../models/Activity');
const authMiddleware = require('../middleware/auth');
const { calculateEmission } = require('../utils/carbonCalculator');

const router = express.Router();

// Add activity
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, subType, value, unit, notes, date } = req.body;
    
    const carbonEmission = calculateEmission(type, subType, value);
    
    const activity = new Activity({
      userId: req.userId,
      type,
      subType,
      value,
      unit,
      carbonEmission,
      notes,
      date: date || new Date(),
    });
    
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user activities
router.get('/', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get activities for date range
router.get('/range/:startDate/:endDate', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const activities = await Activity.find({
      userId: req.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: -1 });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update activity
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { type, subType, value, unit, notes, date } = req.body;
    
    const carbonEmission = calculateEmission(type, subType, value);
    
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, subType, value, unit, carbonEmission, notes, date },
      { new: true }
    );
    
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete activity
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

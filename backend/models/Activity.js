const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['transportation', 'energy', 'diet', 'consumption'],
    required: true,
  },
  subType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: String,
  carbonEmission: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Activity', activitySchema);

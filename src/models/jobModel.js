// this is the jobs model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
  client_id: {
    type: String,
    ref: 'User',
    required: true,
  },
  job_title: {
    type: String,
    required: true,
    trim: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_requirements: {
    type: String,
    required: true,
  },
  job_category: {
    type: String,
    enum: ['IT', 'Marketing', 'Finance', 'Design', 'Education', 'Healthcare', 'Construction', 'Other'], 
    required: true,
  },
  total_pay: {
    type: Number,
    required: true,
    min: 0,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  taken_status: {
    type: Boolean,
    default: false,
  },
  location_category: {
    type: String,
    default: 'Other',
  },
  duration_months: {
    type: Number,
    required: true,
    min: 1,
  },
  milestones: [{
    milestone_title: String,
    description: String,
    amount: {
      type: Number,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'in-progress', 'cancelled'],
      default: 'pending'
    },
    completed_at: {
      type: Date,
      default: null
    }
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', JobSchema);

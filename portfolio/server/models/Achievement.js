import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  organization: {
    type: String,
    default: '',
    trim: true
  },
  date: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Achievement', AchievementSchema);

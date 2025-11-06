const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  },
  explanation: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['rights', 'estate_business', 'regulations', 'tax', 'other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String],
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  questionNumber: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// 创建复合索引提高查询性能
questionSchema.index({ category: 1, difficulty: 1 });
questionSchema.index({ isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Question', questionSchema);
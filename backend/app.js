require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// 中间件
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '宅学苑后端服务运行正常',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 题目列表 API（模拟数据）
app.get('/api/questions', (req, res) => {
  const mockQuestions = [
    {
      id: 1,
      content: '宅地建物取引業の免許の有効期間は何年か？',
      options: ['5年', '3年', '10年', '1年'],
      correctAnswer: 'A',
      category: 'estate_business',
      difficulty: 'easy',
      explanation: '宅地建物取引業法第5条により、免許の有効期間は5年です。'
    },
    {
      id: 2,
      content: '抵当権の効力は目的物の従物に及ぶか？',
      options: ['及ぶ', '及ばない', '場合による', '判例がない'],
      correctAnswer: 'A',
      category: 'rights',
      difficulty: 'medium',
      explanation: '民法第87条により、抵当権の効力は目的物の従物にも及びます。'
    },
    {
      id: 3,
      content: '都市計画区域内における建築物の容積率の上限は？',
      options: ['100%', '200%', '400%', '用途地域による'],
      correctAnswer: 'D',
      category: 'regulations',
      difficulty: 'medium',
      explanation: '容積率は用途地域によって異なります。'
    }
  ];

  res.json({
    success: true,
    data: mockQuestions,
    message: '获取题目列表成功',
    total: mockQuestions.length
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API端点不存在'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : '内部服务器错误'
  });
});

module.exports = app;
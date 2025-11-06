const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// 题目管理路由
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestion);
router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
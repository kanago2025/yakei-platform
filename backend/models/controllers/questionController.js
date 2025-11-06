const Question = require('../models/Question');

// 获取题目列表
exports.getQuestions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      keyword = '',
      category = '',
      difficulty = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // 构建查询条件
    const query = { isActive: true };
    
    if (keyword) {
      query.content = { $regex: keyword, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // 排序
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // 执行查询
    const questions = await Question.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Question.countDocuments(query);

    res.json({
      success: true,
      data: questions,
      pagination: {
        page: page * 1,
        limit: limit * 1,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取题目列表错误:', error);
    res.status(500).json({
      success: false,
      message: '获取题目列表失败'
    });
  }
};

// 获取单个题目
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: '题目不存在'
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('获取题目错误:', error);
    res.status(500).json({
      success: false,
      message: '获取题目失败'
    });
  }
};

// 创建题目
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();

    res.status(201).json({
      success: true,
      data: question,
      message: '题目创建成功'
    });
  } catch (error) {
    console.error('创建题目错误:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: '数据验证失败',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: '创建题目失败'
    });
  }
};

// 更新题目
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: '题目不存在'
      });
    }

    res.json({
      success: true,
      data: question,
      message: '题目更新成功'
    });
  } catch (error) {
    console.error('更新题目错误:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: '数据验证失败'
      });
    }

    res.status(500).json({
      success: false,
      message: '更新题目失败'
    });
  }
};

// 删除题目（软删除）
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: '题目不存在'
      });
    }

    res.json({
      success: true,
      message: '题目删除成功'
    });
  } catch (error) {
    console.error('删除题目错误:', error);
    res.status(500).json({
      success: false,
      message: '删除题目失败'
    });
  }
};
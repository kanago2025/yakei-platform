const http = require('http');

const PORT = 3001;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      message: '简单服务器运行正常',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/api/questions' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: [
        { id: 1, content: '测试题目1', category: 'rights', difficulty: 'easy' },
        { id: 2, content: '测试题目2', category: 'estate_business', difficulty: 'medium' }
      ]
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '端点不存在' }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 简单服务器运行在 http://${HOST}:${PORT}`);
});

// 保持进程运行
process.on('uncaughtException', (err) => {
  console.error('未捕获异常:', err);
});
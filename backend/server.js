const app = require('./app');

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

// 未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error);
  console.log('🔄 服务器继续运行...');
});

// 未处理的 Promise 拒绝处理
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未处理的 Promise 拒绝:', reason);
  console.log('🔄 服务器继续运行...');
});

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 后端服务器运行在 http://${HOST}:${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`进程 ID: ${process.pid}`);
});

// 优雅关闭处理
process.on('SIGTERM', () => {
  console.log('🔄 收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🔄 收到 SIGINT 信号，正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

module.exports = server;
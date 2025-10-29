// 注释掉模拟上传器，使用真实 R2 上传器
// import { MockUploader } from '@/utils/mock-uploader';
import { R2Uploader } from '@/utils/r2-uploader';

export default {
  // ... 其他代码不变
  data() {
    return {
      // uploader: new MockUploader(),  // 注释这行
      uploader: new R2Uploader(),       // 使用这行
      // ... 其他数据
    };
  },
  // ... 其他方法不变
}
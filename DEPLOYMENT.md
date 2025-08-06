# Vercel 部署指南

## 配置文件说明

### vercel.json
- 配置了 Vercel 部署的构建和路由规则
- 支持 SPA 路由重定向到 index.html
- 指定了构建输出目录为 `dist`

### vite.config.js 更新
- 优化了生产环境构建配置
- 添加了代码分割策略（vendor 和 router 分离）
- 配置了开发和预览服务器端口

### .vercelignore
- 排除了不必要的文件，减少部署包大小
- 提高部署速度

## 部署命令

### 首次部署
```bash
# 安装 Vercel CLI（如果未安装）
npm i -g vercel

# 登录 Vercel
vercel login

# 初始化项目
vercel
```

### 后续部署
```bash
# 预览部署
npm run deploy:preview

# 生产部署
npm run deploy
```

### 本地测试
```bash
# 构建项目
npm run build

# 本地预览构建结果
npm run preview
```

## 部署优化

1. **代码分割**: 将 React 相关库和路由库分离，提高缓存效率
2. **资源优化**: 关闭 sourcemap，减少构建文件大小
3. **路由配置**: 支持 React Router 的客户端路由
4. **忽略文件**: 通过 .vercelignore 减少上传文件数量

## 注意事项

- 确保所有静态资源路径正确
- 检查环境变量配置
- 验证 API 接口在生产环境中的可用性
- 测试所有路由在部署后的正常工作
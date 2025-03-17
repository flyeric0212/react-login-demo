# React Login Demo

React Login Demo 是一个基于 React 的现代化 Web 应用，提供用户认证和注册功能。该应用采用最新的前端技术栈，确保良好的用户体验和性能表现。

## 功能特性

- 用户登录
- 用户注册
- 响应式设计
- 现代化UI界面

## 技术栈

- React 18
- React Router v6
- Tailwind CSS
- Vite
- PostCSS
- Nginx (用于生产环境部署)

## 开始使用

### 环境要求

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn
- Docker (可选，用于容器化部署)

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/flyeric0212/react-login-demo
cd react-login-demo
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 构建生产版本
```bash
npm run build
# 或
yarn build
```

5. 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

### Docker 部署

项目包含 Dockerfile 和 Nginx 配置，可以直接使用 Docker 进行部署：

```bash
docker build -t react-login-demo .
docker run -p 80:80 react-login-demo
```

## 项目结构

```
src/
  ├── components/     # React组件
  │   ├── Login.jsx  # 登录组件
  │   └── Register.jsx # 注册组件
  ├── App.jsx        # 主应用组件
  ├── main.jsx       # 应用入口
  └── index.css      # 全局样式
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
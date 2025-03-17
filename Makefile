# Makefile

# 默认值，如果不传参数则使用这些值
VERSION ?= latest
DOCKER_PASSWORD ?= your_password_here
IMAGE_NAME = react-login-demo
REGISTRY = registry.cn-chengdu.aliyuncs.com
REPOSITORY = flyeric/react-login-demo

# 定义目标
.PHONY: all build login docker-build docker-push docker-run clean help

# 构建项目
build:
	@echo "Installing dependencies..."
	npm install
	@echo "Building project..."
	npm run build
	@echo "Build completed successfully!"

# 登录到 Docker Registry
login:
	@echo "Logging into Docker Registry..."
	echo $(DOCKER_PASSWORD) | docker login --username=amuguelove1991 --password-stdin $(REGISTRY)

# 构建 Docker 镜像
docker-build:
	docker build -t $(REGISTRY)/$(REPOSITORY):$(VERSION) .

# 推送镜像到 Docker Registry
docker-push:
	docker push $(REGISTRY)/$(REPOSITORY):$(VERSION)

# 本地运行 Docker 镜像
docker-run:
	docker run -p 80:80 $(REGISTRY)/$(REPOSITORY):$(VERSION)

# 开发环境运行
dev:
	@echo "Starting development server..."
	npm run dev

# 预览生产构建
preview:
	@echo "Starting preview server..."
	npm run preview

# 一键运行所有步骤
all: build login docker-build docker-push
	@echo "All steps completed successfully!"

# 清理构建文件
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	# rm -rf node_modules
	@echo "Clean completed successfully!"

# 帮助信息
help:
	@echo "可用命令："
	@echo "  make build        - 构建项目"
	@echo "  make dev          - 启动开发服务器"
	@echo "  make preview      - 预览生产构建"
	@echo "  make login        - 登录 Docker Registry"
	@echo "  make docker-build - 构建 Docker 镜像"
	@echo "  make docker-push  - 推送镜像到 Registry"
	@echo "  make docker-run   - 本地运行 Docker 镜像"
	@echo "  make all          - 执行所有步骤"
	@echo "  make clean        - 清理构建文件"
	@echo "  make help         - 显示帮助信息"
	@echo ""
	@echo "使用示例："
	@echo "  make VERSION=1.0.0 docker-build  # 构建特定版本的镜像"
	@echo "  make DOCKER_PASSWORD=xxx login   # 使用指定密码登录"


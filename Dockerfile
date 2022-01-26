FROM svon/kdweb:v1 as build-stage

WORKDIR /build
COPY package*.json ./
COPY . .

# 修改 pnpm 镜像源
RUN pnpm config set registry https://registry.npmmirror.com/
# 安装项目依赖
RUN pnpm i

# 同步 ali icon 数据
RUN npm run icon

# 编译 中文环境
RUN npm run build:cn

# 编译 英文环境
RUN npm run build:en

# 替换默认的 nginx 配置
COPY nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 80
# 执行程序
CMD service nginx restart && npm run serve

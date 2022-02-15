# 获取 Node 镜像
FROM node:latest as base

FROM base as build

WORKDIR /build
COPY package*.json ./
COPY . .

# 安装 pnpm
RUN npm install -g pnpm

# 修改 pnpm 镜像源
# RUN pnpm config set registry https://registry.npmmirror.com/

# 安装项目依赖
RUN pnpm i

# 同步 ali icon 数据
RUN npm run icon

# 编译环境
RUN npm run build

FROM base

WORKDIR /app

COPY --from=build /build/dist/* /app/dist
COPY --from=build /build/src/* /app/src/*
COPY ./public .
COPY package.json .
COPY ./scripts .

EXPOSE 3333
# 执行程序
CMD npm run serve

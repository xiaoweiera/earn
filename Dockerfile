FROM svon/kdweb:v1 as build-stage

WORKDIR /build
COPY package*.json ./
COPY . .

RUN pnpm i

# 同步 ali icon 数据
RUN npm run icon

# 编译 中文环境
RUN npm run build:cn

# 编译 英文环境
RUN npm run build:en

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# 执行程序
CMD ["npm", "run", "serve"]

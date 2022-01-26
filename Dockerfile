FROM node:latest as base

FROM base as build-stage
WORKDIR /build
COPY package*.json ./
COPY . .

RUN npm install -g pnpm && pnpm i

# 同步 ali icon 数据
RUN npm run icon

# 编译 中文环境
RUN npm run build:cn

# 编译 英文环境
RUN npm run build:en

FROM nginx:latest
#COPY --from=build-stage /build/dist /usr/share/nginx/html
COPY --from=build-stage nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# 执行程序
CMD ["npm", "run", "serve"]

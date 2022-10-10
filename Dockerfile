FROM node:14.14.0 as builder
WORKDIR /code
ADD . /code
RUN npm config set registry https://registry.npm.taobao.org && npm config get registry && npm install
RUN npm run build

FROM nginx:1.22.0
COPY --from=builder /code/dist  /usr/share/nginx/html/
COPY --from=builder /code/conf/templates/* /etc/nginx/templates/
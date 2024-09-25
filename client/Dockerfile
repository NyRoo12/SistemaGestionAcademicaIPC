FROM node:20-alpine3.20 AS build-stage

WORKDIR /web

COPY package*.json .

# # build env args
# ARG REACT_APP_SERVER_URL=http://api.service.url:6000
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:1.27-alpine3.20

COPY --from=build-stage /web/build/. /usr/share/nginx/html/.

CMD ["nginx", "-g", "daemon off;"]
FROM node:20-alpine3.20 AS build-stage

# WORKDIR /web

# COPY package*.json ./

# ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
# ENV REACT_APP_API_URL=$REACT_APP_API_URL

# RUN npm install

# COPY . .

# RUN npm run build 

# FROM nginx:1.27-alpine3.20

# COPY --from=build-stage /web/build/. /usr/share/nginx/html/.

# CMD ["nginx", "-g", "daemon off;"]

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
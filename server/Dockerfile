# Usa la imagen base de Node.js
FROM node:20-alpine3.20 AS build-stage

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que la aplicación se ejecuta (por ejemplo, 3000)
EXPOSE 4006

# Comando por defecto para iniciar el servidor
CMD ["node", "index.js"]


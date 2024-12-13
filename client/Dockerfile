# Etapa 1: Construcción de la aplicación y entorno de desarrollo
FROM node:20-alpine3.20 AS development

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para la instalación de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usará React (el puerto predeterminado es 3000)
EXPOSE 3006

# Variables de entorno para desarrollo, si es necesario
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]

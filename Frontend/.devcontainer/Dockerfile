
# Use a base image with Node.js for frontend
FROM node:18-alpine AS frontend

# Set the working directory in the container
WORKDIR /app

# Copy frontend source code to the container
COPY /Frontend .
COPY package.json

# Install dependencies
RUN npm cache clean --force
RUN npm install

# expose frontend port
EXPOSE 9009

ENTRYPOINT ["npm", "start"]



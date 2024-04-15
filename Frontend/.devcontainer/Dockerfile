
# Use a base image with Node.js for frontend
FROM node:20 AS frontend

# Set the working directory in the container
WORKDIR /app

# Copy frontend source code to the container
COPY /Frontend .

# Install dependencies
RUN npm install

# expose frontend port
EXPOSE 9000

RUN npm start




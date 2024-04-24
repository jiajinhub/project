
# Use a base image with Node.js for frontend
FROM node:18 AS frontend

# Set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm cache clean --force

# Copy frontend source code to the container
COPY /Frontend .
RUN npm install

#Build app
RUN npm run webapp:build

# expose frontend port
EXPOSE 9000

CMD ["npm", "run", "start"]


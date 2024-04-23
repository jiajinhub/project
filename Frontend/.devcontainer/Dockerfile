
# Use a base image with Node.js for frontend
FROM node:18-alpine AS frontend

# Set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json
COPY /Frontend/package.json /Frontend/package-lock.json ./
# Build your application with Webpack
#RUN webpack --config webpack.prod.js

# Install dependencies
RUN npm cache clean --force

# Install serve globally
RUN npm install -g serve

# Copy frontend source code to the container
COPY /Frontend .

#Build app
RUN npm run build --prod

# expose frontend port
EXPOSE 9000

# Run the serve command to serve your application
CMD ["serve", "-s", "build", "-l", "9000"]

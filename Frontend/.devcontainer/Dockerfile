
# Use a base image with Node.js for frontend
FROM node:18-alpine AS frontend

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN npm cache clean --force

# Copy frontend source code to the container
COPY /Frontend .

RUN npm install

#Build app
RUN npm run build --prod

# expose frontend port
EXPOSE 9000

# Start Nginx and keep it running in the foreground
CMD ["node", "app.js"]


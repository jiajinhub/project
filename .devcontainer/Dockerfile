FROM maven:3.8-openjdk-11-slim AS backend

WORKDIR /app

COPY /springbootWithPostgresql .

RUN mvn clean package

WORKDIR /app/target

# Expose port 8080 (default Spring Boot port)
EXPOSE 8080  

# Start the application using the JAR file
CMD ["java", "-jar", "springbootWithPostgresql-0.0.1-SNAPSHOT.jar"]

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



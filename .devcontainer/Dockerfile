# # java ver
# ARG VARIANT="17"
# FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# # [Option] Install Maven
# ARG INSTALL_MAVEN="true"
# ARG MAVEN_VERSION="3.9.5"
# RUN ["${INSTALL_MAVEN}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven \"${MAVEN_VERSION}\""; 

# ARG NODE_VERSION="20"
# RUN su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1";


FROM maven:3.8-openjdk-11-slim

WORKDIR /app

COPY ./springbootWithPostgresql .

RUN mvn clean package

WORKDIR /app/target

# Expose port 8080 (default Spring Boot port)
EXPOSE 8080  

# Start the application using the JAR file
CMD ["java", "-jar", "springbootWithPostgresql-0.0.1-SNAPSHOT.jar"] 
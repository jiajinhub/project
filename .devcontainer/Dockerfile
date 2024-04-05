# # java ver
# ARG VARIANT="17"
# FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

# # [Option] Install Maven
# ARG INSTALL_MAVEN="true"
# ARG MAVEN_VERSION="3.9.5"
# RUN ["${INSTALL_MAVEN}" = "true" ]; then su vscode -c "umask 0002 && . /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven \"${MAVEN_VERSION}\""; 

# ARG NODE_VERSION="20"
# RUN su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1";


FROM openjdk:17-slim

WORKDIR /springbootWithPostgresql

COPY pom.xml ./

RUN mvn clean package

COPY target/*.jar ./

EXPOSE 8080

CMD ["java", "-jar", "*.jar"]
# ------------ Build stage ------------
FROM maven:3.9.1-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY ../../ ./
RUN mvn -B -f pom.xml -pl backend/team-service -am clean package -DskipTests

# ------------ Run stage ------------
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /workspace/backend/team-service/target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]

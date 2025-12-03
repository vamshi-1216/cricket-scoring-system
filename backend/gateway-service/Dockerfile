# ---------- Stage 1: Build ----------
FROM maven:3.9.1-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy entire project
COPY ../../ .

# Build ONLY gateway service
RUN mvn -B -f pom.xml -pl backend/gateway-service -am clean package -DskipTests


# ---------- Stage 2: Run ----------
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /workspace/backend/gateway-service/target/*SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]

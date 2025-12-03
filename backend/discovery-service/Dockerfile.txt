# ---------- Stage 1: Build ----------
FROM maven:3.9.1-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy the entire project (needed so root pom.xml is available)
COPY ../../ .

# Build only discovery-service
RUN mvn -B -f pom.xml -pl backend/discovery-service -am clean package -DskipTests


# ---------- Stage 2: Run ----------
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /workspace/backend/discovery-service/target/*SNAPSHOT.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","app.jar"]

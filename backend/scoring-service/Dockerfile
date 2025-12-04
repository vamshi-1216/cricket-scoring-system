# ---------- Stage 1: Build ----------
FROM maven:3.9.1-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY ../../ ./
RUN mvn -B -f pom.xml -pl backend/scoring-service -am clean package -DskipTests

# ---------- Stage 2: Run ----------
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /workspace/backend/scoring-service/target/*SNAPSHOT.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java","-jar","/app/app.jar"]

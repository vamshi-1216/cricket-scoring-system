# ---------- Stage 1: Build ----------
FROM maven:3.9.1-eclipse-temurin-17 AS build
WORKDIR /workspace

COPY ../../ ./
RUN mvn -B -f pom.xml -pl backend/stats-service -am clean package -DskipTests

# ---------- Stage 2: Run ----------
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /workspace/backend/stats-service/target/*SNAPSHOT.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java","-jar","/app/app.jar"]

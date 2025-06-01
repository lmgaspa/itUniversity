FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/University-System-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/application.yml /app/application.yml
ENTRYPOINT ["java", "-jar", "app.jar"]

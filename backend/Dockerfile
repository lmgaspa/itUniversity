# Etapa 1: Build
FROM maven:3.9.4-eclipse-temurin-21 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY pom.xml .
COPY src ./src

# Compila o projeto, ignorando os testes
RUN mvn clean install -DskipTests

# Etapa 2: Runtime
FROM eclipse-temurin:21-jre

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR gerado na fase de build
COPY --from=build /app/target/*.jar app.jar

# Exponha a porta 8081
EXPOSE 8081

# Define o comando de entrada para executar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]

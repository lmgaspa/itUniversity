# Use a imagem do JDK 21 para construção
FROM eclipse-temurin:21-jdk AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o código fonte para o contêiner
COPY . .

# Compila o projeto
RUN ./mvnw clean install -DskipTests

# Use uma imagem menor para o runtime
FROM eclipse-temurin:21-jre

# Define o diretório de trabalho no contêiner final
WORKDIR /app

# Copia o JAR gerado para o contêiner final
COPY --from=build /app/target/university-system-0.0.1-SNAPSHOT.jar app.jar

# Define a porta que será exposta
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

# Use a imagem oficial do OpenJDK 21
FROM eclipse-temurin:17-jdk-jammy

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia o jar da aplicação para o container
COPY target/*.jar app.jar

# Expõe a porta que a aplicação usa (exemplo: 8080)
EXPOSE 8081

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

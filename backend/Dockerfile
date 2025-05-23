# Use a base image with JDK
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY . .

# Give execute permission to the Maven Wrapper script
RUN chmod +x mvnw

# Build the Spring Boot application
RUN ./mvnw clean package -DskipTests

# Expose port (Render uses environment variable PORT)
EXPOSE 8080

# Run the JAR (assuming target/*.jar exists)
CMD ["sh", "-c", "java -jar target/*.jar"]

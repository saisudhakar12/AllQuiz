# Spring Boot + gRPC demo

This project is a minimal Spring Boot application with a gRPC service.

Quickstart

1. Build:

```powershell
mvn clean package -DskipTests
```

2. Run the app:

```powershell
java -jar target/spring-grpc-demo-0.0.1-SNAPSHOT.jar
```

The gRPC server will listen on port 9090 by default (see `src/main/resources/application.properties`).

The proto file is at `src/main/proto/helloworld.proto`.



---

Additional: Simple Quiz Project files

I added a simple static quiz demo in this repository for quick testing: `quiz.html`, `styles.css`, `quiz.js` and a `data/` folder with topic files.

To run the quiz UI (open in a browser) it's best to serve the directory. From the project root you can run:

```powershell
python -m http.server 8000
# then open http://localhost:8000/quiz.html
```

Each topic file is in `data/` and follows CSV lines in format:
`sequenceno, question, option a, option b, option c, option d, correctopt(a/b/c/d)`


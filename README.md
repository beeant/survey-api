# Survey Backend

Backend server for survey API written in node.js using [hapi.js](https://github.com/hapijs/hapi)

## Setup

#### Dependencies
- Node.js `v12.18.0`
- yarn `1.22.4`
- MySQL `10.5.8-MariaDB`
- Redis `6.0.9`

#### Start development server
1. Install packages
```
yarn
````
2. Start development server
```
yarn start
```
#### Run server with Docker `Optional`
1. Build Docker image
```
docker build -t survey-homework-api:latest .
```
2. Run Docker image
```
docker run -p 3333:80 survey-homework-api:latest
```

## Documentation

#### ER Diagram
[https://github.com/beeant/survey-api/blob/master/docs/ERDiagram.png](https://github.com/beeant/survey-api/blob/master/docs/ERDiagram.png)

#### API Documentation
1. Run the API server
2. Go to [https://localhost:3333/docs](https://localhost:3333/docs) (assuming that API server is running on port 3333)
3. Or visit the live version [https://survey.hachiari.com/docs](https://survey.hachiari.com/docs)

# survey-api (backend)

Backend server for survey API written in node.js using [hapi.js](https://github.com/hapijs/hapi)

## Demo

[https://beeant.github.io/survey-web](https://beeant.github.io/survey-web)

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
2. Edit `.env` file according to local environment and preferences

3. Start development server
```
yarn start
```
#### Run server with Docker `Optional`
1. Build Docker image
```
docker build -t survey-api:latest .
```
2. Run Docker image
```
docker run -p 3333:80 survey-api:latest
```

## Documentation

#### ER Diagram
[https://github.com/beeant/survey-api/blob/master/docs/ERDiagram.png](https://github.com/beeant/survey-api/blob/master/docs/ERDiagram.png)

#### API Documentation
1. Start the API server
2. Go to [http://localhost:3333/docs](http://localhost:3333/docs) (assuming that API server is running on port 3333)
3. Or visit the live version [https://survey.hachiari.com/docs](https://survey.hachiari.com/docs)


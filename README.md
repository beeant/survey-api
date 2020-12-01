## Backend

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
#### Run server with Docker
1. Build Docker image
```
docker build -t survey-homework-api:latest .
```
2. Run Docker image
```
docker run -p 3333:80 survey-homework-api:latest
```

# Animal Sighting Tracker
An app to help scientists track sightings of endangered animals.

## Getting Started

### Prerequisites
#### Node
- Install node here --> "https://nodejs.org/en/"

#### Postgres
- Install Postgres --> type "brew install postgresql" into terminal 
- Connect to Postgres --> type "psql postgres" into terminal
- Create User for DB --> "CREATE ROLE dbuser WITH LOGIN PASSWORD 'dbPass';"
- Create DB --> type "CREATE DATABASE animaldb;"
- Import DB dump --> type "psql animaldb < DBDump.pgsql" into terminal 

#### Express
- Cd into Express folder
- Install Express and node-postgres --> type "npm i express pg" into terminal
- Install body parser --> "npm install body-parser" into terminal

#### React
- Cd into React Folder
- Install node modules --> type "npm install" into terminal
- Install React Router --> type "npm install --save react-router-dom" into terminal

### Start Application
#### Express
- Cd into Express folder
- Start Express --> type "node index.js" into terminal

#### React
- Cd into React Folder
- Start React App --> type "npm start" into terminal
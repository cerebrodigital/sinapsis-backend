# Sinapsis Backend

[![Dependency Status](https://david-dm.org/Microsoft/TypeScript-Node-Starter.svg)](https://david-dm.org/Microsoft/TypeScript-Node-Starter) [![Build Status](https://travis-ci.org/Microsoft/TypeScript-Node-Starter.svg?branch=master)](https://travis-ci.org/Microsoft/TypeScript-Node-Starter)

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3003`

# DOCS

User Controller
namespace: '/users'

Get '/' -> Array of all users


Auth Controller
namespace: '/auth'

Get '/login' -> returns JWT {token: '5345435345234'}

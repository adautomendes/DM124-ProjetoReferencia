# Petstore Reference Project

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com/)

## 📋 Overview

Reference project for the course **DM124 - Development of Web Services with Security on Node.js Platform**.

A comprehensive educational example of microservices architecture with JWT authentication, inter-service communication, and monitoring with an alarm system. The project demonstrates best practices in developing secure and scalable applications with Node.js.

### Key Features

- ✅ **JWT Authentication**: Token exchange and validation between services
- ✅ **Independent Microservices**: Three specialized services communicating via HTTP
- ✅ **Data Persistence**: MongoDB integration
- ✅ **Real-Time Monitoring**: Alarm system for event detection
- ✅ **Containerization**: Docker Compose orchestration
- ✅ **Development Experience**: Nodemon for automatic reload

---

## 🏗️ Architecture

![Project Structure](docs/img/deployment.png)

### Services Architecture

| Service | Port | Responsibility |
|---------|------|-----------------|
| **Auth** | 3001 | JWT authentication and token validation |
| **Core** | 3000 | Pet entity management |
| **Monitor** | 3002 | Monitoring and alarm system |
| **MongoDB** | 27017 | Data storage |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** 9+ (included with Node.js)
- **MongoDB**
- **Docker** and **Docker Compose**

### Local Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd petstore-ref-project
```

#### 2. Configure Environment Variables

Create `.env` files in each service:

**`auth/.env`**
```env
PORT=3001
NODE_ENV=dev
CHAVE_PRIVADA=your_secure_private_key_here
TEMPO_EXP=1h
```

**`core/.env`**
```env
PORT=3000
NODE_ENV=dev
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DBNAME=petstore_db
AUTH_SERVER=http://localhost:3001
MONITOR_SERVER=http://localhost:3002
```

**`monitor/.env`**
```env
PORT=3002
NODE_ENV=dev
```

#### 3. Install Dependencies and Start Services

In **three separate terminals**, run:

**Terminal 1 - Auth Service**
```bash
cd auth
npm install
npm run dev
```

**Terminal 2 - Core Service**
```bash
cd core
npm install
npm run dev
```

**Terminal 3 - Monitor Service**
```bash
cd monitor
npm install
npm run dev
```

✅ All services will be running. You'll see log messages indicating they're ready to receive requests.

---

## 🐳 Running with Docker Compose

### Start All Services

```bash
docker compose up --build
```

This will:
- Build Docker images for each service
- Create the communication network between containers
- Start MongoDB, Auth, Core, and Monitor

To stop the services:
```bash
docker compose down
```

### Testing Connectivity Failure

To simulate MongoDB failure and test the alarm system:

```bash
docker stop petstore-mongo
```

This will trigger database unavailability alarms. To restart:

```bash
docker start petstore-mongo
```

---

## 📡 API Endpoints

### 🔐 Authentication Service (Auth)

**Base URL**: `http://localhost:3001`

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "usuario": "your_username",
  "senha": "your_password"
}
```

**Success Response (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validate Token
```http
POST /auth/validaToken
Content-Type: application/json

{
  "token": "your_jwt_token"
}
```

**Success Response (200)**
```json
{
  "valido": true,
  "usuario": "your_username"
}
```

---

### 🐾 Core Service (Pet Management)

**Base URL**: `http://localhost:3000`

**Authentication**: All routes require `Authorization: Bearer <token>` header

#### Create Pet
```http
POST /pet
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "nome": "Rex",
  "raca": "Golden Retriever",
  "idade": 3
}
```

**Response (201)**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Rex",
  "raca": "Golden Retriever",
  "idade": 3
}
```

#### List All Pets
```http
GET /pet
Authorization: Bearer <your_token>
```

**Response (200)**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Rex",
    "raca": "Golden Retriever",
    "idade": 3
  }
]
```

#### Search Pets by Name
```http
GET /pet?nome=Rex
Authorization: Bearer <your_token>
```

**Response (200)**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Rex",
    "raca": "Golden Retriever",
    "idade": 3
  }
]
```

---

### 🚨 Monitoring Service (Alarms)

**Base URL**: `http://localhost:3002`

#### List All Alarms
```http
GET /alarme
```

**Response (200)**
```json
[
  {
    "id": "MONGO_INDISPONIVEL",
    "descricao": "MongoDB is unavailable",
    "ativo": false,
    "ativacoes": ["2025-12-21T10:30:00Z"]
  }
]
```

#### Filter Alarms by Status
```http
GET /alarme?ativo=true
```

#### Activate Alarm
```http
POST /alarme/{id}/ativar
```

**Response (200)**
```json
{
  "id": "MONGO_INDISPONIVEL",
  "ativo": true
}
```

#### Deactivate Alarm
```http
POST /alarme/{id}/desativar
```

**Response (200)**
```json
{
  "id": "MONGO_INDISPONIVEL",
  "ativo": false
}
```

---

## 🧪 Testing with Postman

A complete collection is available in the `Petstore.postman_collection.json` file.

### How to Import

1. Open Postman
2. Click **Import** (Ctrl+O)
3. Select the `Petstore.postman_collection.json` file
4. Adjust environment variables as needed

---

## 📁 Project Structure

```
petstore-ref-project/
├── auth/                          # Authentication Service
│   ├── Dockerfile
│   ├── index.js                   # Application entry point
│   ├── routes.js                  # Route definitions
│   ├── package.json
│   └── src/
│       └── controllers/
│           └── AuthController.js  # Authentication logic
│
├── core/                          # Pet Management Service
│   ├── Dockerfile
│   ├── index.js
│   ├── routes.js
│   ├── package.json
│   └── src/
│       ├── controllers/
│       │   ├── AuthController.js  # Token validation
│       │   └── PetController.js   # Business logic
│       ├── database/
│       │   └── config.js          # MongoDB configuration
│       ├── models/
│       │   └── Pet.js             # Mongoose schema
│       └── service/
│           └── AlarmeService.js   # Monitor integration
│
├── monitor/                       # Monitoring Service
│   ├── Dockerfile
│   ├── index.js
│   ├── routes.js
│   ├── package.json
│   └── src/
│       └── controllers/
│           └── AlarmeController.js # Alarm management
│
├── docs/
│   ├── diagram/
│   │   └── deployment.puml        # Architecture diagram
│   └── img/
│       └── deployment.png
│
├── docker-compose.yaml            # Container orchestration
├── Petstore.postman_collection.json  # Postman collection
├── func.js                        # Utility functions
├── async.js                       # Async helpers
└── README.md                      # This file
```

---

## 🔧 Main Dependencies

### All Services
- **express** (4.18+): Web framework
- **dotenv** (16.3+): Environment variables management
- **morgan** (1.10+): HTTP logger
- **nodemon** (dev): Automatic reload on development

### Auth
- **jsonwebtoken** (9.0+): JWT creation and validation

### Core
- **mongoose** (8.0+): MongoDB ODM
- **axios** (1.6+): HTTP client for inter-service communication

---

## 🔐 Authentication Flow

```
1. Client makes POST /auth/login request (username + password)
   ↓
2. Auth service validates credentials and generates JWT
   ↓
3. Client receives token and stores it
   ↓
4. Client includes token in header: Authorization: Bearer <token>
   ↓
5. Core service validates token by calling Auth /auth/validaToken
   ↓
6. If valid, operation is executed
   If invalid, returns 401 Unauthorized
```

---

## 📊 Alarm System

The Monitor service manages real-time alarms. Alarms can be:

- **MONGO_INDISPONIVEL**: Detected when MongoDB connection fails
- **AUTH_INDISPONIVEL**: Authentication service is down
- **PETSTORE_ERRO**: Critical errors in the Core service

Each alarm has:
- `id`: Unique identifier
- `descricao`: Human-readable description
- `ativo`: Current status (true/false)
- `ativacoes`: History of timestamps when triggered

---

## 🛠️ Development

### Adding a New Endpoint

1. **Define the route** in `routes.js`:
```javascript
router.post('/novo', novoController.criar);
```

2. **Implement the logic** in `src/controllers/NovoController.js`

3. **Test via Postman** or cURL

### Running with Hot Reload

All services use `nodemon`. Any change in a `.js` file will automatically restart the service.

```bash
npm run dev
```

### Logs and Debugging

- **Morgan**: Detailed HTTP logs
- **Console.log**: Use for additional debugging
- **Docker logs**: `docker logs petstore-core`

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Verify MongoDB is running and accessible at the configured URL.

### Invalid/Expired Token
```
Status: 401 Unauthorized
```
**Solution**: Generate a new token via `/auth/login` and include it in all headers.

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Change the `PORT` in `.env` or kill the existing process.

### Services Can't Communicate
**Solution**: Check URLs in `AUTH_SERVER` and `MONITOR_SERVER`. Use `docker network ls` to verify connectivity.

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

## 👨‍🏫 About

Project developed as reference material for the course **DM124 - Development of Web Services with Security on Node.js Platform** using Node.js and microservices architecture.

**Last Update**: December 2025

## 🔔 Monitoring Behavior

When the MongoDB service is stopped, you'll see this log in the **Core** service:

```log
petstore-core  | [ATIVAR ALARME] - DB down
petstore-core  | Alarme alterado: {"id":"DB_0001","descricao":"MongoDB fora do ar.","ativo":true,"ativacoes":["2025-05-26T15:29:42.363Z"]}
```

While the MongoDB service is down, any request to the Core service will return `503 Service Unavailable` with the following payload:

```json
{
    "msg": "MongoDB fora do ar."
}
```

Start the MongoDB service again with the command below:

```shell
docker start petstore-mongo
```

With the MongoDB service restarted, you'll see this log in the **Core** service:

```log
petstore-core  | [DESATIVAR ALARME] - DB up
petstore-core  | Alarme alterado: {"id":"DB_0001","descricao":"MongoDB fora do ar.","ativo":false,"ativacoes":[]}
```
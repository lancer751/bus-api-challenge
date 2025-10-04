# Buses Management System

Una aplicacion full-stack para controlar la informacion de los buses con Spring Boot en backend y React en frontend.

## Prerequisitos

- Java 21
- Node.js 18+
- PostgreSQL database
- Maven
- Git

## Getting Started

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd buses-api-reto
```

### 2. Instalacion del backend (turismoApi)

1. Navegar al directorio backend:
```bash
cd turismoApi
```

2. Configurar bases de datos en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

La API estara disponible en `http://localhost:8085`

### 3. Instalacion del frontend (client)

1. Ve al directorio frontend:
```bash
cd ../client
```

2. Instalar dependencias:
```bash
npm install
```

3. Correr el servidor de desarrollo:
```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`

## API Documentation

### Endpoints

- `GET /bus` - Get all buses
- `GET /bus/{id}` - Get bus by ID
- `POST /bus/create` - Create new bus
- `PUT /bus/{id}` - Update bus
- `DELETE /bus/{id}` - Delete bus

### Autenticacion

Default credentials:
- Username: `admin`
- Password: `admin`

## Tecnologias usadas

- Backend:
  - Spring Boot 3
  - Spring Security
  - Spring Data JPA
  - PostgreSQL

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Vite

## Structura del proyecto
```
buses-api-reto/
├── client/           # React frontend
│   ├── src/         # Source files
│   └── public/      # Static files
└── turismoApi/      # Spring Boot backend
    └── src/         # Source files
```
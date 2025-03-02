# Road Management Application

A full-stack application for road management and analysis, built with React, TypeScript, and Bun.

## Project Structure

```
.
├── front-road-management-app/  # Frontend application
├── db-road-management-app/     # Database service
├── docker-compose.yml         # Docker compose configuration
└── .env                      # Environment variables
```

## Prerequisites

- Docker
- Docker Compose
- Git

## Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/Sergey-McArrow/road-management-app.git
cd road-management-app
```

2. Create a `.env` file in the root directory:
```env
NODE_ENV=production
FRONTEND_PORT=3000
DB_PORT=3001
VITE_API_URL=http://localhost:3001
TAG=latest
```

3. Build and start the containers:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## Docker Services

### Frontend Service
- Built with React, TypeScript, and Vite
- Uses Bun for package management
- Configured with multi-stage Docker build for optimal production image
- Environment variables are injected at runtime

### Database Service
- Built with Bun
- Exposes REST API endpoints
- Persists data using mounted volume

## Development with Docker

1. Start the services in development mode:
```bash
docker-compose up
```

2. View logs for a specific service:
```bash
docker-compose logs -f frontend  # or 'database' for database service
```

3. Rebuild a specific service:
```bash
docker-compose up --build frontend  # or 'database' for database service
```

4. Stop all services:
```bash
docker-compose down
```

## Environment Variables

### Root `.env`
- `NODE_ENV`: Application environment (development/production)
- `FRONTEND_PORT`: Port for the frontend service (default: 3000)
- `DB_PORT`: Port for the database service (default: 3001)
- `VITE_API_URL`: URL for the API (default: http://localhost:3001)
- `TAG`: Docker image tag (default: latest)

## Troubleshooting

1. If you encounter port conflicts:
   - Check if the ports 3000 or 3001 are already in use
   - Modify the port mappings in docker-compose.yml or .env file

2. If the frontend can't connect to the database:
   - Ensure the database service is running (`docker-compose ps`)
   - Check if VITE_API_URL is correctly set in both .env files
   - Verify the database service logs for any errors

3. For volume permission issues:
   - Ensure the db_data volume has correct permissions
   - Try removing the volume and recreating it: `docker-compose down -v`

## Contributing

1. Create a new feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test them with Docker:
```bash
docker-compose up --build
```

3. Commit your changes and push:
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

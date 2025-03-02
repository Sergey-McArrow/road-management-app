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
docker compose -f docker-compose.dev.yml up --build -d
```

The application will be available at:

- Frontend: http://localhost:5173
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

## AWS EC2 Deployment

### Prerequisites

- An AWS account with EC2 access
- SSH key pair for EC2 instance
- EC2 instance running (recommended: t2.micro or larger)
- Security Group with the following ports open:
  - 22 (SSH)
  - 80 (HTTP)
  - 443 (HTTPS)
  - 3000 (Frontend)
  - 3001 (Database API)

### Setup Steps

1. Connect to your EC2 instance:

```bash
ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-dns
```

2. Install Docker and Docker Compose:

```bash
# Update system packages
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

3. Install Git and clone the repository:

```bash
sudo yum install -y git
git clone https://github.com/Sergey-McArrow/road-management-app.git
cd road-management-app
```

4. Create the environment file:

```bash
cat > .env << EOL
NODE_ENV=production
FRONTEND_PORT=3000
DB_PORT=3001
VITE_API_URL=http://your-ec2-public-dns:3001
TAG=latest
EOL
```

5. Build and start the containers:

```bash
docker-compose up --build -d
```

### SSL/HTTPS Setup (Optional but Recommended)

1. Install Certbot for SSL certificates:

```bash
sudo yum install -y certbot
```

2. Obtain SSL certificate (replace with your domain):

```bash
sudo certbot certonly --standalone -d your-domain.com
```

3. Update environment variables to use HTTPS:

```bash
VITE_API_URL=https://your-domain.com:3001
```

### Monitoring and Maintenance

1. View container logs:

```bash
# View all container logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs database
```

2. Check container status:

```bash
docker-compose ps
```

3. Restart services:

```bash
docker-compose restart
```

4. Update application:

```bash
# Pull latest changes
git pull

# Rebuild and restart containers
docker-compose down
docker-compose up --build -d
```

### Backup and Restore

1. Backup database volume:

```bash
docker run --rm -v road-management-app_db_data:/source -v /backup:/backup ubuntu tar czf /backup/db_backup.tar.gz -C /source .
```

2. Restore database volume:

```bash
docker run --rm -v road-management-app_db_data:/source -v /backup:/backup ubuntu bash -c "cd /source && tar xzf /backup/db_backup.tar.gz"
```

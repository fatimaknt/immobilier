# Deployment Guide for Location Site

## VPS Setup Prerequisites

### 1. Requirements
- Ubuntu 20.04+ or CentOS 7+
- Docker 20.10+
- Docker Compose 2.0+
- Git
- At least 2GB RAM
- 20GB disk space

### 2. Initial VPS Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Git
sudo apt install git -y

# Verify installations
docker --version
docker-compose --version
git --version
```

## GitHub Actions Setup

### 1. Create GitHub Secrets

In your GitHub repository, go to Settings → Secrets and add:

```
DOCKER_USERNAME: your-docker-username
DOCKER_PASSWORD: your-docker-password (use Docker access token)
VPS_HOST: your-vps-ip-address
VPS_USER: your-vps-username (e.g., ubuntu)
VPS_SSH_KEY: (your private SSH key - see below)
VPS_PORT: 22 (or custom SSH port)
SLACK_WEBHOOK_URL: (optional - for notifications)
```

### 2. Generate SSH Key for VPS

```bash
# On your local machine
ssh-keygen -t ed25519 -f github_deploy -N ""

# Add public key to VPS
cat github_deploy.pub | ssh user@vps-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Copy private key content to GitHub Secrets
cat github_deploy
```

### 3. Environment Variables

Create `.env.production` on your VPS:

```bash
sudo nano /root/location-site/.env.production
```

Add:
```
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USER=location_user
DB_PASSWORD=your-secure-password
DB_NAME=location_site
```

## Local Testing with Docker Compose

### 1. Create `.env.local` file

```bash
cp .env.example .env.local
```

Edit with your values:
```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=location_site
```

### 2. Build and Run Locally

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### 3. Access Services

- **Application**: http://localhost:3000
- **Nginx**: http://localhost:80
- **MySQL**: localhost:3306

## VPS Deployment

### 1. Manual First Time Setup

```bash
# SSH into VPS
ssh -i path/to/key user@vps-ip

# Create deployment directory
mkdir -p ~/location-site
cd ~/location-site

# Clone repository
git clone https://github.com/your-username/location-site.git .

# Create env file
sudo nano .env.production
# Add production environment variables

# Create SSL certificates (if using self-signed for testing)
mkdir -p ssl
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes

# Start services
docker-compose up -d

# Verify deployment
curl http://localhost:3000
```

### 2. Automated Deployment (via GitHub Actions)

Once GitHub Secrets are configured:

1. **Trigger deployment** by pushing to `main` branch:
```bash
git add .
git commit -m "Deploy to VPS"
git push origin main
```

2. **Monitor deployment**:
   - Go to GitHub repository → Actions tab
   - Watch the workflow execution
   - Check logs for any errors

3. **Verify deployment**:
```bash
# SSH into VPS
ssh -i path/to/key user@vps-ip

# Check container status
docker ps

# View application logs
docker-compose logs -f app

# Test application
curl http://your-vps-ip:3000
```

## Post-Deployment

### 1. SSL Certificate Setup (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y

sudo certbot certonly --standalone -d your-domain.com
```

Update nginx.conf with real certificates:
```
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

### 2. Domain Configuration

Update your DNS records to point to your VPS:
```
A record: your-domain.com → your-vps-ip
CNAME record: www.your-domain.com → your-domain.com
```

### 3. Monitoring

```bash
# Check docker resources
docker stats

# Check disk space
df -h

# View application logs
docker-compose logs --tail=100 app

# Check MySQL status
docker exec location-site-mysql mysqladmin status -u root -p
```

### 4. Backup Database

```bash
# Backup MySQL data
docker exec location-site-mysql mysqldump -u root -p location_site > backup-$(date +%Y%m%d).sql

# Backup to external storage
scp backup-*.sql backup-server:/backups/
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs app

# Rebuild images
docker-compose build --no-cache
docker-compose up -d
```

### Database Connection Issues

```bash
# Check MySQL is running
docker ps | grep mysql

# Test connection
docker exec location-site-mysql mysql -u root -p location_site -e "SELECT 1;"
```

### Nginx Issues

```bash
# Check Nginx configuration
docker exec location-site-nginx nginx -t

# Restart Nginx
docker-compose restart nginx
```

### Disk Space Issues

```bash
# Clean up Docker
docker system prune -a

# Check space
docker exec location-site-mysql du -sh /var/lib/mysql
```

## Performance Optimization

### 1. Update docker-compose.yml

```yaml
app:
  resources:
    limits:
      cpus: '2'
      memory: 2G
    reservations:
      cpus: '1'
      memory: 1G
```

### 2. Database Optimization

```bash
docker exec location-site-mysql mysql -u root -p location_site -e "
CREATE INDEX idx_apartments_status ON apartments(status);
CREATE INDEX idx_bookings_date ON bookings(created_at);
CREATE INDEX idx_cars_status ON cars(status);
"
```

### 3. Enable Caching

Update nginx.conf to increase cache times for static assets.

## Rollback Procedure

```bash
# SSH into VPS
ssh -i path/to/key user@vps-ip

# Stop current deployment
docker-compose down

# Pull previous version
git checkout HEAD~1

# Restart
docker-compose up -d
```

## Support & Documentation

- Docker: https://docs.docker.com
- Docker Compose: https://docs.docker.com/compose
- Next.js: https://nextjs.org/docs
- MySQL: https://dev.mysql.com/doc

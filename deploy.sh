#!/bin/bash

# VPS Deployment Script
# Run this on the VPS to set up and deploy the application

set -e

echo "🚀 Starting VPS Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="${HOME}/location-site"
REPO_URL="${REPO_URL:-https://github.com/your-username/location-site.git}"
BRANCH="${BRANCH:-main}"

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root"
fi

# Step 1: Install dependencies
log_info "Installing dependencies..."
apt-get update
apt-get install -y \
    curl \
    git \
    wget \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common

# Step 2: Install Docker
log_info "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    log_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    log_info "Docker already installed: $(docker --version)"
fi

# Step 3: Install Docker Compose
log_info "Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null; then
    log_info "Installing Docker Compose..."
    LATEST_COMPOSE=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d'"' -f4)
    curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    log_info "Docker Compose already installed: $(docker-compose --version)"
fi

# Step 4: Create deployment directory
log_info "Setting up deployment directory..."
mkdir -p "${DEPLOY_DIR}"
cd "${DEPLOY_DIR}"

# Step 5: Clone or pull repository
if [ -d ".git" ]; then
    log_info "Repository already exists, pulling latest changes..."
    git fetch origin
    git checkout "${BRANCH}"
    git pull origin "${BRANCH}"
else
    log_info "Cloning repository..."
    git clone -b "${BRANCH}" "${REPO_URL}" .
fi

# Step 6: Setup environment file
log_info "Setting up environment variables..."
if [ ! -f ".env.production" ]; then
    log_warn "No .env.production file found. Creating template..."
    cat > .env.production << EOF
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USER=location_user
DB_PASSWORD=change_me_to_secure_password
DB_NAME=location_site
EOF
    log_warn "⚠️  Please update .env.production with your actual values"
    log_warn "File location: ${DEPLOY_DIR}/.env.production"
fi

# Step 7: Setup SSL certificates
log_info "Setting up SSL certificates..."
mkdir -p ssl
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    log_info "Generating self-signed SSL certificates..."
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
        -subj "/C=SN/ST=Dakar/L=Dakar/O=Location Site/CN=localhost"
    log_info "✅ SSL certificates generated (self-signed)"
    log_warn "For production, configure Let's Encrypt certificates"
fi

# Step 8: Start services
log_info "Starting Docker containers..."
docker-compose -f docker-compose.prod.yml down || true
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Step 9: Wait for services to be ready
log_info "Waiting for services to be ready..."
sleep 10

# Step 10: Verify deployment
log_info "Verifying deployment..."
if docker-compose -f docker-compose.prod.yml ps | grep -q "location-site-app"; then
    log_info "✅ Application container is running"
else
    log_error "Application container failed to start"
fi

if docker-compose -f docker-compose.prod.yml ps | grep -q "location-site-mysql"; then
    log_info "✅ MySQL container is running"
else
    log_error "MySQL container failed to start"
fi

if docker-compose -f docker-compose.prod.yml ps | grep -q "location-site-nginx"; then
    log_info "✅ Nginx container is running"
else
    log_error "Nginx container failed to start"
fi

# Step 11: Health check
log_info "Running health checks..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    log_info "✅ Application is responding"
else
    log_warn "⚠️  Application health check failed"
fi

# Step 12: Display summary
log_info "╔════════════════════════════════════════╗"
log_info "║  Deployment Complete! ✅               ║"
log_info "╠════════════════════════════════════════╣"
log_info "║ Deployment Directory: ${DEPLOY_DIR}"
log_info "║ Services Running:"
log_info "║   - App: http://localhost:3000"
log_info "║   - Nginx: http://localhost:80"
log_info "║   - MySQL: localhost:3306"
log_info "║                                        ║"
log_info "║ View Logs:                             ║"
log_info "║   docker-compose logs -f app           ║"
log_info "║   docker-compose logs -f mysql         ║"
log_info "║   docker-compose logs -f nginx         ║"
log_info "║                                        ║"
log_info "║ Next Steps:                            ║"
log_info "║   1. Update .env.production            ║"
log_info "║   2. Configure SSL certificates       ║"
log_info "║   3. Configure domain DNS              ║"
log_info "╚════════════════════════════════════════╝"

log_info "Deployment script completed successfully!"

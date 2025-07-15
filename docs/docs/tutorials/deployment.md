---
sidebar_position: 3
---

# Deployment Guide

This comprehensive guide covers deploying your ABP React application to various hosting platforms, from development to production environments.

## Overview

ABP React can be deployed to multiple platforms:

- **Vercel** - Recommended for Next.js applications
- **Netlify** - Great for static deployments
- **Docker** - Containerized deployments
- **AWS** - Amazon Web Services
- **Azure** - Microsoft cloud platform
- **Traditional Hosting** - VPS or dedicated servers

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] **Environment Variables**: All required environment variables configured
- [ ] **Build Success**: Application builds without errors locally
- [ ] **API Configuration**: Backend API is accessible and configured
- [ ] **Authentication**: OpenID Connect configuration is correct
- [ ] **Database**: Database connections are properly configured
- [ ] **Redis**: Session storage is configured (if using Redis)
- [ ] **SSL Certificates**: HTTPS is properly configured for production

## Environment Configuration

### Production Environment Variables

Create a production environment configuration:

```env
# Application URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-api.your-domain.com

# OpenID Connect Configuration
NEXT_PUBLIC_CLIENT_ID=your-production-client-id
NEXT_PUBLIC_SCOPE=openid profile email phone roles

# Session Security
SESSION_PASSWORD=your-very-secure-production-password-with-at-least-32-characters

# Redis Configuration (Production)
REDIS_HOST=your-redis-host.com
REDIS_PORT=6379
REDIS_PASSWORD=your-secure-redis-password

# Database (if needed)
DATABASE_URL=postgresql://user:password@host:port/database

# Email Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MULTI_TENANCY=true
```

### Security Considerations

1. **Session Password**: Use a strong, unique password for session encryption
2. **API Keys**: Never expose API keys in client-side code
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly on your API
5. **CSP**: Implement Content Security Policy headers

## Vercel Deployment

Vercel is the recommended platform for Next.js applications.

### Setup Process

1. **Connect Repository**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel
```

2. **Configure Environment Variables**

In your Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all required environment variables
- Set appropriate environments (Production, Preview, Development)

3. **Build Configuration**

Vercel automatically detects Next.js and uses optimal build settings:

```json
// vercel.json (optional customization)
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  }
}
```

4. **Custom Domain**

```bash
# Add custom domain
vercel domains add your-domain.com

# Configure DNS
# Add CNAME record: your-domain.com → cname.vercel-dns.com
```

### Advanced Vercel Configuration

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-api-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

## Docker Deployment

Containerize your application for consistent deployments across environments.

### Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
      - NEXT_PUBLIC_API_URL=http://api:5000
      - SESSION_PASSWORD=your-session-password
      - REDIS_HOST=redis
    depends_on:
      - redis
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --requirepass your-redis-password
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Build and Run

```bash
# Build the Docker image
docker build -t abp-react .

# Run with docker-compose
docker-compose up -d

# Or run standalone
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  -e NEXT_PUBLIC_API_URL=https://api.your-domain.com \
  -e SESSION_PASSWORD=your-session-password \
  abp-react
```

## AWS Deployment

Deploy to Amazon Web Services for scalable, enterprise-grade hosting.

### EC2 Deployment

1. **Launch EC2 Instance**

```bash
# Connect to your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Node.js and pnpm
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install 18
fnm use 18
npm install -g pnpm

# Install PM2 for process management
npm install -g pm2
```

2. **Deploy Application**

```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies and build
pnpm install
pnpm build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. **PM2 Configuration**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'abp-react',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
```

### ECS with Fargate

1. **Create ECS Task Definition**

```json
{
  "family": "abp-react",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "abp-react",
      "image": "your-account.dkr.ecr.region.amazonaws.com/abp-react:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "SESSION_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:abp-react-secrets"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/abp-react",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

2. **Deploy with AWS CLI**

```bash
# Build and push Docker image to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com

docker build -t abp-react .
docker tag abp-react:latest your-account.dkr.ecr.us-east-1.amazonaws.com/abp-react:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/abp-react:latest

# Create ECS service
aws ecs create-service \
  --cluster your-cluster \
  --service-name abp-react \
  --task-definition abp-react:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

## Azure Deployment

Deploy to Microsoft Azure for enterprise-level cloud hosting.

### Azure Container Instances

```bash
# Login to Azure
az login

# Create resource group
az group create --name abp-react-rg --location eastus

# Create container instance
az container create \
  --resource-group abp-react-rg \
  --name abp-react-app \
  --image your-registry.azurecr.io/abp-react:latest \
  --dns-name-label abp-react-unique \
  --ports 3000 \
  --environment-variables \
    NODE_ENV=production \
    NEXT_PUBLIC_APP_URL=https://abp-react-unique.eastus.azurecontainer.io \
  --secure-environment-variables \
    SESSION_PASSWORD=your-session-password
```

### Azure App Service

1. **Create App Service**

```bash
# Create App Service plan
az appservice plan create \
  --name abp-react-plan \
  --resource-group abp-react-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  --resource-group abp-react-rg \
  --plan abp-react-plan \
  --name abp-react-app \
  --deployment-container-image-name your-registry.azurecr.io/abp-react:latest
```

2. **Configure Environment Variables**

```bash
az webapp config appsettings set \
  --resource-group abp-react-rg \
  --name abp-react-app \
  --settings \
    NODE_ENV=production \
    NEXT_PUBLIC_APP_URL=https://abp-react-app.azurewebsites.net \
    SESSION_PASSWORD=your-session-password
```

## Nginx Configuration

For traditional hosting or reverse proxy setups.

### Nginx Configuration File

```nginx
# /etc/nginx/sites-available/abp-react
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/your-domain.crt;
    ssl_certificate_key /etc/nginx/ssl/your-domain.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Proxy to Next.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Cache static assets
    location /_next/static {
        alias /path/to/your/app/.next/static;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Handle API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Database and Redis Setup

### PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE abp_react_prod;
CREATE USER abp_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE abp_react_prod TO abp_user;
\q
```

### Redis Setup

```bash
# Install Redis
sudo apt update
sudo apt install redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf
# Set: requirepass your_secure_password
# Set: bind 127.0.0.1 your_server_ip

# Restart Redis
sudo systemctl restart redis
sudo systemctl enable redis
```

## SSL/TLS Configuration

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

### Custom SSL Certificate

```bash
# Create SSL directory
sudo mkdir -p /etc/nginx/ssl

# Copy your certificate files
sudo cp your-domain.crt /etc/nginx/ssl/
sudo cp your-domain.key /etc/nginx/ssl/

# Set proper permissions
sudo chmod 600 /etc/nginx/ssl/your-domain.key
sudo chmod 644 /etc/nginx/ssl/your-domain.crt
```

## Monitoring and Logging

### Application Monitoring

```javascript
// monitoring.js
import { performance } from 'perf_hooks'

export const logPerformance = (name, start) => {
  const duration = performance.now() - start
  console.log(`${name}: ${duration}ms`)
  
  // Send to monitoring service
  if (process.env.MONITORING_ENDPOINT) {
    fetch(process.env.MONITORING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metric: name, duration, timestamp: Date.now() })
    })
  }
}
```

### Health Check Endpoint

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connectivity
    // Check Redis connectivity
    // Check external services
    
    return Response.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version 
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
```

## Backup and Recovery

### Automated Backups

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Database backup
pg_dump -h localhost -U abp_user abp_react_prod > $BACKUP_DIR/db_backup_$DATE.sql

# Application files backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /path/to/your/app

# Upload to cloud storage (example: AWS S3)
aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql s3://your-backup-bucket/
aws s3 cp $BACKUP_DIR/app_backup_$DATE.tar.gz s3://your-backup-bucket/

# Cleanup old backups (keep last 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

## Performance Optimization

### Production Optimizations

```javascript
// next.config.mjs
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize bundles
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  
  // Compress responses
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Troubleshooting

### Common Deployment Issues

1. **Environment Variables Not Loading**
   - Verify all required variables are set
   - Check variable names match exactly
   - Restart the application after changes

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

3. **Authentication Issues**
   - Verify OpenID Connect configuration
   - Check SSL/HTTPS configuration
   - Validate redirect URIs

4. **Database Connection Problems**
   - Check database server accessibility
   - Verify connection strings
   - Test database credentials

### Debug Commands

```bash
# Check application logs
docker logs abp-react-container
pm2 logs abp-react
tail -f /var/log/nginx/error.log

# Test connectivity
curl -I https://your-domain.com
curl https://your-domain.com/api/health

# Check SSL certificate
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

## Best Practices

1. **Security**
   - Use HTTPS everywhere
   - Implement proper authentication
   - Regular security updates
   - Monitor for vulnerabilities

2. **Performance**
   - Enable caching
   - Optimize images
   - Use CDN for static assets
   - Monitor application performance

3. **Reliability**
   - Implement health checks
   - Set up monitoring and alerting
   - Regular backups
   - Disaster recovery plan

4. **Scalability**
   - Use load balancers
   - Implement horizontal scaling
   - Database optimization
   - Cache strategies

---

This deployment guide provides multiple options for hosting your ABP React application. Choose the platform that best fits your requirements, budget, and technical expertise.
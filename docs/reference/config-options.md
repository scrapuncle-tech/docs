# Configuration Options

Complete reference for all configuration options available in ScrapeUncle.

## Configuration File Format

ScrapeUncle supports multiple configuration file formats:

- **YAML** (recommended): `config.yaml`
- **JSON**: `config.json`
- **TOML**: `config.toml`

## Global Configuration

### Basic Settings

```yaml
# Global settings
app:
  name: "ScrapeUncle"
  version: "1.0.0"
  debug: false
  log_level: "INFO"
  log_format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
```

### API Configuration

```yaml
# API settings
api:
  key: "${SCRAPEUNCLE_API_KEY}"
  base_url: "https://api.example.com"
  timeout: 30
  retries: 3
  rate_limit: 100  # requests per minute
```

## Collector Configuration

### Web Collector

```yaml
# Web scraping settings
collectors:
  web:
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    timeout: 30
    retries: 3
    rate_limit: 1  # requests per second
    follow_redirects: true
    verify_ssl: true
    proxies:
      - "http://proxy1.example.com:8080"
      - "http://proxy2.example.com:8080"
    headers:
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      Accept-Language: "en-US,en;q=0.5"
```

### API Collector

```yaml
# API settings
collectors:
  api:
    base_url: "https://api.example.com"
    auth_type: "Bearer"
    auth_token: "${API_TOKEN}"
    timeout: 30
    retries: 3
    rate_limit: 60  # requests per minute
    headers:
      Content-Type: "application/json"
      Accept: "application/json"
```

### Database Collector

```yaml
# Database settings
collectors:
  database:
    connection_string: "${DATABASE_URL}"
    pool_size: 10
    max_overflow: 20
    pool_timeout: 30
    pool_recycle: 3600
```

## Pipeline Configuration

### Data Processing

```yaml
# Pipeline settings
pipeline:
  batch_size: 1000
  max_workers: 4
  timeout: 300
  retry_failed: true
  max_retries: 3
  
  # Data processing options
  processing:
    clean_data: true
    validate_data: true
    transform_data: true
    deduplicate: true
```

### Validation Rules

```yaml
# Validation configuration
validation:
  rules:
    price:
      required: true
      type: "number"
      min: 0
      max: 10000
    title:
      required: true
      type: "string"
      min_length: 1
      max_length: 200
    email:
      required: false
      type: "email"
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
```

## Storage Configuration

### Database Storage

```yaml
# Database storage
storage:
  type: "postgresql"
  connection:
    host: "localhost"
    port: 5432
    database: "scrapeuncle"
    username: "${DB_USERNAME}"
    password: "${DB_PASSWORD}"
    ssl_mode: "prefer"
  
  # Table settings
  tables:
    auto_create: true
    auto_migrate: true
    prefix: "su_"
```

### File Storage

```yaml
# File storage
storage:
  type: "file"
  path: "./data"
  format: "json"  # json, csv, parquet, excel
  compression: "gzip"
  backup: true
  backup_retention: 30  # days
```

### Cloud Storage

```yaml
# AWS S3 storage
storage:
  type: "s3"
  bucket: "my-scrapeuncle-data"
  region: "us-east-1"
  access_key: "${AWS_ACCESS_KEY}"
  secret_key: "${AWS_SECRET_KEY}"
  prefix: "data/"
  encryption: "AES256"
```

## Monitoring Configuration

### Logging

```yaml
# Logging settings
logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  file: "logs/scrapeuncle.log"
  max_size: "10MB"
  backup_count: 5
  console: true
```

### Metrics

```yaml
# Metrics collection
metrics:
  enabled: true
  backend: "prometheus"
  port: 9090
  interval: 60  # seconds
  
  # Custom metrics
  custom:
    - name: "collection_success_rate"
      type: "gauge"
    - name: "processing_time"
      type: "histogram"
```

## Security Configuration

### Authentication

```yaml
# Security settings
security:
  # API authentication
  api_auth:
    enabled: true
    type: "jwt"
    secret: "${JWT_SECRET}"
    expires_in: 3600  # seconds
  
  # Database encryption
  encryption:
    enabled: true
    algorithm: "AES-256-GCM"
    key: "${ENCRYPTION_KEY}"
```

### Rate Limiting

```yaml
# Rate limiting
rate_limiting:
  enabled: true
  default_limit: 100  # requests per minute
  burst_limit: 200
  
  # Per-endpoint limits
  endpoints:
    "/api/collect": 50
    "/api/process": 30
    "/api/export": 10
```

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost/db"

# API Keys
SCRAPEUNCLE_API_KEY="your-api-key"
API_TOKEN="your-api-token"

# AWS (if using S3)
AWS_ACCESS_KEY="your-access-key"
AWS_SECRET_KEY="your-secret-key"

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"
```

### Optional Variables

```bash
# Logging
SCRAPEUNCLE_LOG_LEVEL="INFO"
SCRAPEUNCLE_LOG_FILE="logs/app.log"

# Performance
SCRAPEUNCLE_MAX_WORKERS="4"
SCRAPEUNCLE_BATCH_SIZE="1000"

# Network
SCRAPEUNCLE_TIMEOUT="30"
SCRAPEUNCLE_RETRIES="3"
```

## Configuration Validation

ScrapeUncle validates configuration files and reports errors:

```bash
# Validate configuration
scrapeuncle config validate --file config.yaml

# Check for missing environment variables
scrapeuncle config check-env --file config.yaml
```

## Configuration Templates

ScrapeUncle provides configuration templates for common use cases:

```bash
# Generate web scraping config
scrapeuncle config generate --template web-scraping --output config.yaml

# Generate API integration config
scrapeuncle config generate --template api-integration --output config.yaml

# Generate database config
scrapeuncle config generate --template database --output config.yaml
``` 
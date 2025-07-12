# CLI Reference

ScrapeUncle provides a powerful command-line interface for data collection and management.

## Basic Commands

### Installation
```bash
pip install scrapeuncle
```

### Version Check
```bash
scrapeuncle --version
```

### Help
```bash
scrapeuncle --help
scrapeuncle <command> --help
```

## Collection Commands

### Basic Collection
```bash
# Collect from a single URL
scrapeuncle collect --url "https://example.com"

# Collect from multiple URLs
scrapeuncle collect --urls "url1.txt"

# Use a specific collector
scrapeuncle collect --collector web --url "https://example.com"
```

### Advanced Collection
```bash
# Set output format
scrapeuncle collect --url "https://example.com" --output json

# Set output file
scrapeuncle collect --url "https://example.com" --output-file "data.json"

# Use configuration file
scrapeuncle collect --config "config.yaml" --url "https://example.com"
```

## Pipeline Commands

### Run Pipeline
```bash
# Run a pipeline from file
scrapeuncle pipeline run --file "pipeline.yaml"

# Run pipeline with custom config
scrapeuncle pipeline run --file "pipeline.yaml" --config "config.yaml"
```

### Validate Pipeline
```bash
# Validate pipeline configuration
scrapeuncle pipeline validate --file "pipeline.yaml"
```

## Storage Commands

### Database Operations
```bash
# Initialize database
scrapeuncle db init --url "postgresql://user:pass@localhost/db"

# Create tables
scrapeuncle db create-tables --config "config.yaml"

# Export data
scrapeuncle db export --table "products" --format csv --output "products.csv"
```

### File Operations
```bash
# Convert between formats
scrapeuncle convert --input "data.json" --output "data.csv" --format csv

# Merge files
scrapeuncle merge --files "file1.json,file2.json" --output "merged.json"
```

## Configuration Commands

### Generate Configuration
```bash
# Generate default config
scrapeuncle config generate --output "config.yaml"

# Generate config from template
scrapeuncle config generate --template web-scraping --output "config.yaml"
```

### Validate Configuration
```bash
# Validate config file
scrapeuncle config validate --file "config.yaml"
```

## Monitoring Commands

### Status Check
```bash
# Check system status
scrapeuncle status

# Check collector status
scrapeuncle status collectors

# Check storage status
scrapeuncle status storage
```

### Logs
```bash
# View logs
scrapeuncle logs

# Follow logs in real-time
scrapeuncle logs --follow

# Filter logs by level
scrapeuncle logs --level error
```

## Global Options

```bash
# Verbose output
scrapeuncle --verbose <command>

# Quiet mode
scrapeuncle --quiet <command>

# Debug mode
scrapeuncle --debug <command>

# Custom config file
scrapeuncle --config "custom-config.yaml" <command>
```

## Environment Variables

```bash
# Set API key
export SCRAPEUNCLE_API_KEY="your-api-key"

# Set database URL
export SCRAPEUNCLE_DATABASE_URL="postgresql://user:pass@localhost/db"

# Set log level
export SCRAPEUNCLE_LOG_LEVEL="INFO"
``` 
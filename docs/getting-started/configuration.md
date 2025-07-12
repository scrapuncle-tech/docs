# Configuration

ScrapeUncle can be configured through various methods to suit your specific needs.

## Configuration Files

ScrapeUncle supports multiple configuration file formats:

- **YAML** (recommended): `config.yaml`
- **JSON**: `config.json`
- **TOML**: `config.toml`

## Environment Variables

You can also configure ScrapeUncle using environment variables:

```bash
export SCRAPEUNCLE_API_KEY="your-api-key"
export SCRAPEUNCLE_DATABASE_URL="postgresql://user:pass@localhost/db"
export SCRAPEUNCLE_LOG_LEVEL="INFO"
```

## Basic Configuration Example

```yaml
# config.yaml
api:
  key: ${SCRAPEUNCLE_API_KEY}
  base_url: "https://api.example.com"

database:
  url: ${SCRAPEUNCLE_DATABASE_URL}
  pool_size: 10

logging:
  level: INFO
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
``` 
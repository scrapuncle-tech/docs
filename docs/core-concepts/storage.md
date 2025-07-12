# Storage

Storage in ScrapeUncle refers to how and where your collected data is saved and managed.

## Storage Options

ScrapeUncle supports multiple storage backends to suit different use cases:

### Database Storage
- **PostgreSQL**: For production applications
- **MySQL**: For web applications
- **SQLite**: For development and small projects
- **MongoDB**: For document-based data

### File Storage
- **JSON**: Human-readable format
- **CSV**: For spreadsheet applications
- **Parquet**: For big data analytics
- **Excel**: For business users

### Cloud Storage
- **AWS S3**: For scalable cloud storage
- **Google Cloud Storage**: For Google Cloud Platform
- **Azure Blob Storage**: For Microsoft Azure

## Storage Configuration

```yaml
# config.yaml
storage:
  type: "postgresql"
  connection:
    host: "localhost"
    port: 5432
    database: "scrapeuncle"
    username: "user"
    password: "pass"
  
  # Alternative: File storage
  # type: "json"
  # path: "./data"
```

## Data Models

ScrapeUncle automatically creates database schemas based on your data structure:

```python
from scrapeuncle import Storage

# Configure storage
storage = Storage("postgresql://user:pass@localhost/db")

# Save data (schema created automatically)
storage.save("products", data)

# Query data
products = storage.query("products", {"category": "electronics"})
``` 
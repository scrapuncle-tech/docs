# API Reference

Complete reference for the ScrapeUncle Python API.

## Core Classes

### Collector

The base class for all data collectors.

```python
from scrapeuncle import Collector

class Collector:
    def __init__(self, config=None):
        """Initialize collector with optional configuration"""
        
    def collect(self, source):
        """Collect data from a source"""
        
    def add_field(self, name, selector):
        """Add a field to extract"""
        
    def set_rate_limit(self, requests_per_second):
        """Set rate limiting for requests"""
```

### WebCollector

Specialized collector for web scraping.

```python
from scrapeuncle import WebCollector

class WebCollector(Collector):
    def __init__(self, config=None):
        """Initialize web collector"""
        
    def set_user_agent(self, user_agent):
        """Set custom user agent"""
        
    def set_proxy(self, proxy_url):
        """Set proxy for requests"""
        
    def set_wait_time(self, seconds):
        """Set wait time between requests"""
        
    def enable_javascript(self, enabled=True):
        """Enable JavaScript rendering"""
```

### APICollector

Collector for API endpoints.

```python
from scrapeuncle import APICollector

class APICollector(Collector):
    def __init__(self, base_url=None, config=None):
        """Initialize API collector"""
        
    def set_auth(self, auth_type, token):
        """Set authentication"""
        
    def set_base_url(self, url):
        """Set base URL for API requests"""
        
    def get(self, endpoint, params=None):
        """Make GET request"""
        
    def post(self, endpoint, data=None):
        """Make POST request"""
```

## Pipeline Classes

### Pipeline

Main pipeline class for data processing workflows.

```python
from scrapeuncle import Pipeline

class Pipeline:
    def __init__(self, config=None):
        """Initialize pipeline"""
        
    def add_step(self, step):
        """Add a processing step"""
        
    def run(self, data):
        """Run the pipeline on data"""
        
    def validate(self):
        """Validate pipeline configuration"""
```

### DataProcessor

Process and transform data.

```python
from scrapeuncle import DataProcessor

class DataProcessor:
    def __init__(self):
        """Initialize data processor"""
        
    def add_cleaner(self, field, function):
        """Add data cleaning function"""
        
    def add_transformer(self, field, function):
        """Add data transformation function"""
        
    def add_validator(self, field, function):
        """Add data validation function"""
        
    def process(self, data):
        """Process data through all functions"""
```

## Storage Classes

### Storage

Base storage class for data persistence.

```python
from scrapeuncle import Storage

class Storage:
    def __init__(self, connection_string=None, config=None):
        """Initialize storage"""
        
    def save(self, table, data):
        """Save data to storage"""
        
    def load(self, table, query=None):
        """Load data from storage"""
        
    def delete(self, table, query):
        """Delete data from storage"""
        
    def update(self, table, data, query):
        """Update data in storage"""
```

### DatabaseStorage

Database-specific storage implementation.

```python
from scrapeuncle import DatabaseStorage

class DatabaseStorage(Storage):
    def __init__(self, connection_string, config=None):
        """Initialize database storage"""
        
    def create_table(self, table, schema):
        """Create table with schema"""
        
    def execute_query(self, query, params=None):
        """Execute SQL query"""
        
    def get_connection(self):
        """Get database connection"""
```

## Configuration

### Config

Configuration management class.

```python
from scrapeuncle import Config

class Config:
    def __init__(self, config_file=None):
        """Initialize configuration"""
        
    def load(self, file_path):
        """Load configuration from file"""
        
    def save(self, file_path):
        """Save configuration to file"""
        
    def get(self, key, default=None):
        """Get configuration value"""
        
    def set(self, key, value):
        """Set configuration value"""
```

## Exceptions

### ScrapeUncleError

Base exception for all ScrapeUncle errors.

```python
class ScrapeUncleError(Exception):
    """Base exception for ScrapeUncle"""
    pass
```

### CollectionError

Raised when data collection fails.

```python
class CollectionError(ScrapeUncleError):
    """Raised when collection fails"""
    pass
```

### ValidationError

Raised when data validation fails.

```python
class ValidationError(ScrapeUncleError):
    """Raised when validation fails"""
    pass
```

### StorageError

Raised when storage operations fail.

```python
class StorageError(ScrapeUncleError):
    """Raised when storage operations fail"""
    pass
```

## Utility Functions

### Data Utilities

```python
from scrapeuncle.utils import clean_text, parse_date, extract_numbers

# Clean text data
clean_text("  Hello World  ")  # Returns "Hello World"

# Parse date strings
parse_date("2023-01-15")  # Returns datetime object

# Extract numbers from text
extract_numbers("Price: $123.45")  # Returns 123.45
```

### Network Utilities

```python
from scrapeuncle.utils import check_url, get_robots_txt

# Check if URL is accessible
check_url("https://example.com")  # Returns True/False

# Get robots.txt content
get_robots_txt("https://example.com")  # Returns robots.txt content
``` 
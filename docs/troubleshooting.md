# Troubleshooting

Common issues and solutions for ScrapeUncle.

## Installation Issues

### Python Version Problems

**Problem**: `ModuleNotFoundError` or compatibility issues

**Solution**: Ensure you're using Python 3.8 or higher

```bash
python --version
# Should show Python 3.8.x or higher

# If using an older version, upgrade Python
```

### Package Installation Failures

**Problem**: `pip install scrapeuncle` fails

**Solution**: Try these steps:

```bash
# Upgrade pip first
pip install --upgrade pip

# Install with verbose output
pip install -v scrapeuncle

# If still failing, try with --user flag
pip install --user scrapeuncle
```

## Collection Issues

### Connection Timeout

**Problem**: `ConnectionTimeout` errors

**Solution**: Increase timeout settings

```python
from scrapeuncle import WebCollector

collector = WebCollector()
collector.set_timeout(60)  # Increase to 60 seconds
```

### Rate Limiting

**Problem**: Getting blocked or receiving 429 errors

**Solution**: Implement proper rate limiting

```python
collector = WebCollector()
collector.set_rate_limit(1)  # 1 request per second
collector.set_wait_time(2)   # Wait 2 seconds between requests
```

### Dynamic Content Not Loading

**Problem**: JavaScript content not appearing

**Solution**: Use SPA collector or increase wait time

```python
from scrapeuncle import SPACollector

# Use SPA collector for JavaScript-heavy sites
collector = SPACollector()
collector.set_wait_time(5)  # Wait 5 seconds for content to load
```

## Data Processing Issues

### Data Validation Failures

**Problem**: Validation errors in data processing

**Solution**: Check your validation rules

```python
from scrapeuncle import DataValidator

validator = DataValidator()

# Add more flexible validation rules
validator.add_rule("price", lambda x: x >= 0, "Price must be non-negative")
validator.add_rule("email", lambda x: "@" in str(x) if x else True, "Invalid email")
```

### Data Type Conversion Errors

**Problem**: Errors converting data types

**Solution**: Add error handling to transformations

```python
def safe_float_conversion(value):
    """Safely convert value to float"""
    try:
        return float(str(value).replace("$", "").replace(",", ""))
    except (ValueError, TypeError):
        return None

processor.add_cleaner("price", safe_float_conversion)
```

## Storage Issues

### Database Connection Problems

**Problem**: Cannot connect to database

**Solution**: Check connection settings

```python
# Verify connection string format
connection_string = "postgresql://username:password@host:port/database"

# Test connection
from scrapeuncle import Storage
try:
    storage = Storage(connection_string)
    storage.test_connection()
except Exception as e:
    print(f"Connection failed: {e}")
```

### File Permission Errors

**Problem**: Cannot write to file storage

**Solution**: Check file permissions

```bash
# Check directory permissions
ls -la /path/to/storage/directory

# Fix permissions if needed
chmod 755 /path/to/storage/directory
```

## Performance Issues

### Slow Collection

**Problem**: Data collection is very slow

**Solution**: Optimize your configuration

```python
# Use concurrent collection
from scrapeuncle import ConcurrentCollector

collector = ConcurrentCollector(max_workers=4)

# Use batch processing
pipeline.set_batch_size(100)
```

### Memory Issues

**Problem**: High memory usage

**Solution**: Process data in smaller batches

```python
# Reduce batch size
pipeline.set_batch_size(50)

# Use streaming for large datasets
storage.enable_streaming(True)
```

## Authentication Issues

### API Key Problems

**Problem**: API authentication failing

**Solution**: Verify API credentials

```python
# Check environment variables
import os
print(f"API Key: {os.getenv('SCRAPEUNCLE_API_KEY')}")

# Test API connection
collector = APICollector()
collector.test_connection()
```

### Session Expiration

**Problem**: Sessions expiring during long runs

**Solution**: Implement session refresh

```python
# Auto-refresh sessions
collector.set_auto_refresh(True)
collector.set_refresh_interval(3600)  # Refresh every hour
```

## Network Issues

### Proxy Problems

**Problem**: Proxy connection failing

**Solution**: Test proxy configuration

```python
# Test proxy
collector.set_proxy("http://proxy.example.com:8080")
collector.test_proxy()

# Use proxy rotation
collector.set_proxy_rotation([
    "http://proxy1.example.com:8080",
    "http://proxy2.example.com:8080"
])
```

### SSL Certificate Issues

**Problem**: SSL verification errors

**Solution**: Handle SSL issues

```python
# Disable SSL verification (use with caution)
collector.set_verify_ssl(False)

# Or specify custom certificate
collector.set_ssl_cert("path/to/certificate.pem")
```

## Debugging Tips

### Enable Debug Logging

```python
import logging

# Set debug level
logging.basicConfig(level=logging.DEBUG)

# Or use ScrapeUncle's logging
from scrapeuncle import set_log_level
set_log_level("DEBUG")
```

### Test Individual Components

```python
# Test collector separately
collector = WebCollector()
test_data = collector.scrape("https://httpbin.org/html")
print(f"Test successful: {len(test_data)} fields collected")

# Test processor separately
processor = DataProcessor()
processed_data = processor.process(test_data)
print(f"Processing successful: {processed_data}")
```

### Use Dry Run Mode

```python
# Enable dry run to test without making requests
collector.set_dry_run(True)
data = collector.scrape("https://example.com")
print("Dry run completed - no actual requests made")
```

## Getting Help

### Check Documentation

- Review the [API Reference](/docs/reference/api)
- Check [Configuration Options](/docs/reference/config-options)
- Read [Examples](/docs/examples/ecommerce)

### Enable Verbose Output

```bash
# CLI verbose mode
scrapeuncle --verbose collect --url "https://example.com"

# Python verbose mode
import logging
logging.basicConfig(level=logging.INFO)
```

### Common Error Codes

- `401`: Authentication failed
- `403`: Access forbidden
- `404`: Resource not found
- `429`: Rate limit exceeded
- `500`: Server error
- `503`: Service unavailable

### Contact Support

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/scrapuncle-tech/scrapeuncle/issues)
2. Create a new issue with detailed error information
3. Include your configuration and error logs
4. Provide a minimal reproduction example 
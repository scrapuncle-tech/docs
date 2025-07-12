# Web Scraping Guide

This guide will walk you through the process of scraping data from websites using ScrapeUncle.

## Getting Started with Web Scraping

Web scraping involves extracting data from websites. ScrapeUncle makes this process simple and reliable.

### Basic Web Scraping

```python
from scrapeuncle import WebCollector

# Create a collector
collector = WebCollector()

# Define the data you want to extract
collector.add_field("title", "h1")
collector.add_field("price", ".price")
collector.add_field("description", ".description")

# Scrape a single page
data = collector.scrape("https://example.com/product")
```

### Scraping Multiple Pages

```python
# Scrape a list of products
urls = [
    "https://example.com/product1",
    "https://example.com/product2",
    "https://example.com/product3"
]

results = []
for url in urls:
    data = collector.scrape(url)
    results.append(data)
```

## Advanced Techniques

### Handling Dynamic Content

For websites that load content dynamically:

```python
from scrapeuncle import SPACollector

# Use SPA collector for JavaScript-heavy sites
collector = SPACollector()
collector.set_wait_time(3)  # Wait for content to load
data = collector.scrape("https://spa.example.com")
```

### Rate Limiting

Be respectful to websites by adding delays:

```python
collector = WebCollector()
collector.set_rate_limit(1)  # 1 request per second
```

### User Agents

Set custom user agents to avoid detection:

```python
collector = WebCollector()
collector.set_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
```

## Best Practices

1. **Respect robots.txt**: Check if scraping is allowed
2. **Use rate limiting**: Don't overwhelm servers
3. **Handle errors gracefully**: Implement retry logic
4. **Validate data**: Ensure extracted data is correct
5. **Monitor performance**: Track scraping success rates 
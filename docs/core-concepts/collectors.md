# Collectors

Collectors are the core components of ScrapeUncle that handle the actual data extraction from various sources.

## What are Collectors?

Collectors are specialized modules that know how to extract data from specific types of sources:

- **Web Collectors**: Extract data from websites using HTTP requests
- **API Collectors**: Fetch data from REST APIs and web services
- **Database Collectors**: Read data from databases
- **File Collectors**: Parse data from various file formats

## Basic Collector Example

```python
from scrapeuncle import WebCollector

# Create a web collector
collector = WebCollector()

# Define what data to extract
collector.add_field("title", "h1")
collector.add_field("description", "meta[name='description']")
collector.add_field("price", ".price")

# Extract data
data = collector.scrape("https://example.com/product")
```

## Collector Types

### Web Collectors
- **HTMLCollector**: For static HTML pages
- **SPACollector**: For Single Page Applications
- **RSSCollector**: For RSS feeds

### API Collectors
- **RESTCollector**: For REST APIs
- **GraphQLCollector**: For GraphQL APIs
- **SOAPCollector**: For SOAP services 
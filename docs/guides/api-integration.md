# API Integration Guide

Learn how to integrate ScrapeUncle with external APIs to enhance your data collection capabilities.

## Working with APIs

APIs provide structured access to data and are often more reliable than web scraping. ScrapeUncle makes API integration straightforward.

### Basic API Integration

```python
from scrapeuncle import APICollector

# Create an API collector
collector = APICollector()

# Configure authentication
collector.set_auth("Bearer", "your-api-token")

# Make API requests
data = collector.get("https://api.example.com/products")
```

### REST API Example

```python
# Configure REST API collector
collector = APICollector()
collector.set_base_url("https://api.example.com")
collector.set_auth("Bearer", "your-token")

# GET request
products = collector.get("/products")

# POST request
new_product = collector.post("/products", {
    "name": "New Product",
    "price": 99.99
})

# PUT request
collector.put("/products/123", {"price": 89.99})

# DELETE request
collector.delete("/products/123")
```

### GraphQL Integration

```python
from scrapeuncle import GraphQLCollector

# Create GraphQL collector
collector = GraphQLCollector("https://api.example.com/graphql")

# Define query
query = """
query GetProducts($category: String!) {
  products(category: $category) {
    id
    name
    price
    description
  }
}
"""

# Execute query
variables = {"category": "electronics"}
data = collector.query(query, variables)
```

## Authentication Methods

### API Keys
```python
collector.set_auth("X-API-Key", "your-api-key")
```

### Bearer Tokens
```python
collector.set_auth("Bearer", "your-bearer-token")
```

### Basic Auth
```python
collector.set_basic_auth("username", "password")
```

### OAuth 2.0
```python
collector.set_oauth2(
    client_id="your-client-id",
    client_secret="your-client-secret",
    token_url="https://auth.example.com/token"
)
```

## Error Handling

```python
try:
    data = collector.get("/api/endpoint")
except APIError as e:
    if e.status_code == 401:
        # Handle authentication error
        collector.refresh_token()
    elif e.status_code == 429:
        # Handle rate limiting
        time.sleep(e.retry_after)
```

## Best Practices

1. **Use environment variables** for sensitive data
2. **Implement retry logic** for transient failures
3. **Cache responses** when appropriate
4. **Monitor API usage** to stay within limits
5. **Handle rate limiting** gracefully 
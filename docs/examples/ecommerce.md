# E-commerce Example

Learn how to use ScrapeUncle for scraping e-commerce websites and collecting product data.

## Amazon Product Scraping

This example shows how to scrape product information from Amazon.

### Basic Product Scraping

```python
from scrapeuncle import WebCollector, Pipeline, DataProcessor

# Create web collector
collector = WebCollector()

# Define product fields to extract
collector.add_field("title", "h1#productTitle")
collector.add_field("price", "span.a-price-whole")
collector.add_field("rating", "span.a-icon-alt")
collector.add_field("reviews_count", "span#acrCustomerReviewText")
collector.add_field("availability", "span#availability")

# Set rate limiting to be respectful
collector.set_rate_limit(1)  # 1 request per second

# Create data processor
processor = DataProcessor()
processor.add_cleaner("price", lambda x: float(x.replace(",", "")))
processor.add_cleaner("rating", lambda x: float(x.split()[0]))
processor.add_cleaner("reviews_count", lambda x: int(x.split()[0].replace(",", "")))

# Create pipeline
pipeline = Pipeline()
pipeline.add_step(collector)
pipeline.add_step(processor)

# Scrape product
product_url = "https://www.amazon.com/product-page"
data = pipeline.run(product_url)
```

### Scraping Multiple Products

```python
# List of product URLs
product_urls = [
    "https://www.amazon.com/product1",
    "https://www.amazon.com/product2",
    "https://www.amazon.com/product3"
]

# Scrape all products
results = []
for url in product_urls:
    try:
        data = pipeline.run(url)
        results.append(data)
    except Exception as e:
        print(f"Failed to scrape {url}: {e}")
```

## eBay Auction Scraping

Scrape auction data from eBay.

```python
from scrapeuncle import WebCollector

# Create collector for eBay
collector = WebCollector()

# Define auction fields
collector.add_field("title", "h1.x-item-title__mainTitle")
collector.add_field("current_price", "span.x-price-primary")
collector.add_field("bids", "span.x-bid-count")
collector.add_field("time_left", "span.x-time-left")
collector.add_field("seller", "span.x-seller-name")

# Handle dynamic content
collector.set_wait_time(3)  # Wait for JavaScript to load

# Scrape auction
auction_url = "https://www.ebay.com/itm/auction-page"
data = collector.scrape(auction_url)
```

## Shopify Store Scraping

Scrape products from Shopify-powered stores.

```python
# Shopify collector
collector = WebCollector()

# Common Shopify selectors
collector.add_field("title", "h1.product-single__title")
collector.add_field("price", "span.price__regular")
collector.add_field("description", "div.product-single__description")
collector.add_field("variants", "select.product-form__select option")
collector.add_field("images", "img.product__image")

# Scrape Shopify product
shopify_url = "https://store.example.com/products/product-name"
data = collector.scrape(shopify_url)
```

## Price Monitoring Pipeline

Create a pipeline for monitoring price changes.

```python
from scrapeuncle import Pipeline, WebCollector, DataProcessor, Storage
import schedule
import time

# Create components
collector = WebCollector()
collector.add_field("title", "h1")
collector.add_field("price", ".price")
collector.add_field("timestamp", lambda: time.time())

processor = DataProcessor()
processor.add_cleaner("price", lambda x: float(x.replace("$", "").replace(",", "")))

storage = Storage("postgresql://user:pass@localhost/prices")

# Create pipeline
pipeline = Pipeline()
pipeline.add_step(collector)
pipeline.add_step(processor)
pipeline.add_step(storage)

def monitor_prices():
    """Monitor prices for tracked products"""
    urls = [
        "https://example.com/product1",
        "https://example.com/product2"
    ]
    
    for url in urls:
        try:
            data = pipeline.run(url)
            print(f"Collected price data for {data['title']}: ${data['price']}")
        except Exception as e:
            print(f"Failed to monitor {url}: {e}")

# Schedule monitoring every hour
schedule.every().hour.do(monitor_prices)

# Run monitoring
while True:
    schedule.run_pending()
    time.sleep(60)
```

## Data Analysis Example

Analyze collected e-commerce data.

```python
import pandas as pd
from scrapeuncle import Storage

# Load data from storage
storage = Storage("postgresql://user:pass@localhost/prices")
data = storage.load("products")

# Convert to DataFrame
df = pd.DataFrame(data)

# Analyze price trends
price_analysis = df.groupby('title')['price'].agg(['mean', 'min', 'max', 'std'])
print("Price Analysis:")
print(price_analysis)

# Find best deals
best_deals = df[df['price'] == df.groupby('title')['price'].transform('min')]
print("\nBest Deals:")
print(best_deals[['title', 'price', 'url']])

# Price change detection
price_changes = df.groupby('title')['price'].diff()
significant_changes = df[abs(price_changes) > 10]  # $10+ changes
print("\nSignificant Price Changes:")
print(significant_changes[['title', 'price', 'timestamp']])
```

## Best Practices for E-commerce Scraping

1. **Respect robots.txt**: Always check if scraping is allowed
2. **Use rate limiting**: Don't overwhelm servers
3. **Handle dynamic content**: Use appropriate wait times for JavaScript
4. **Monitor for changes**: Websites update their structure frequently
5. **Store historical data**: Track price changes over time
6. **Handle errors gracefully**: Implement retry logic
7. **Use proxies**: Rotate IP addresses for large-scale scraping
8. **Validate data**: Ensure extracted prices and details are correct 
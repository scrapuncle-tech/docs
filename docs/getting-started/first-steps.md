# First Steps

Welcome to ScrapeUncle! This guide will help you get started with your first data collection project.

## Quick Start

1. **Install ScrapeUncle** (if you haven't already):
   ```bash
   pip install scrapeuncle
   ```

2. **Create a simple collector**:
   ```python
   from scrapeuncle import Collector
   
   collector = Collector()
   data = collector.scrape("https://example.com")
   print(data)
   ```

3. **Run your first collection**:
   ```bash
   scrapeuncle collect --url "https://example.com"
   ```

## Next Steps

- Read the [Core Concepts](/docs/core-concepts/collectors) to understand how ScrapeUncle works
- Check out the [Examples](/docs/examples/ecommerce) for practical use cases
- Explore the [API Reference](/docs/reference/api) for detailed documentation 
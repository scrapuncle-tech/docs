# Data Processing Guide

Learn how to process, clean, and transform data using ScrapeUncle's powerful data processing capabilities.

## Data Processing Overview

Data processing is a crucial step in any data collection pipeline. ScrapeUncle provides tools to clean, transform, and validate your data before storage.

### Basic Data Cleaning

```python
from scrapeuncle import DataProcessor

# Create a data processor
processor = DataProcessor()

# Clean text data
processor.add_cleaner("title", lambda x: x.strip().title())
processor.add_cleaner("price", lambda x: float(x.replace("$", "").replace(",", "")))

# Process data
raw_data = {"title": "  hello world  ", "price": "$1,234.56"}
clean_data = processor.process(raw_data)
```

### Data Transformation

```python
# Transform data types
processor.add_transformer("date", lambda x: parse_date(x))
processor.add_transformer("category", lambda x: x.lower())

# Add computed fields
processor.add_computed_field("price_usd", lambda row: row["price"] * 1.1)
processor.add_computed_field("is_expensive", lambda row: row["price"] > 100)
```

### Data Validation

```python
from scrapeuncle import DataValidator

# Create validator
validator = DataValidator()

# Add validation rules
validator.add_rule("price", lambda x: x > 0, "Price must be positive")
validator.add_rule("email", lambda x: "@" in x, "Invalid email format")
validator.add_rule("title", lambda x: len(x) > 0, "Title cannot be empty")

# Validate data
try:
    validator.validate(data)
except ValidationError as e:
    print(f"Validation failed: {e}")
```

## Advanced Processing

### Batch Processing

```python
# Process multiple records
processor = DataProcessor()
processor.add_cleaner("name", lambda x: x.strip().title())

# Process in batches
batch_data = [
    {"name": "  john doe  ", "age": "25"},
    {"name": "  jane smith  ", "age": "30"}
]

processed_batch = processor.process_batch(batch_data)
```

### Custom Processing Functions

```python
def clean_phone_number(phone):
    """Remove all non-digit characters from phone number"""
    return ''.join(filter(str.isdigit, phone))

def normalize_address(address):
    """Standardize address format"""
    # Add your address normalization logic here
    return address.upper().replace("STREET", "ST")

# Use custom functions
processor.add_cleaner("phone", clean_phone_number)
processor.add_cleaner("address", normalize_address)
```

## Data Quality Metrics

```python
from scrapeuncle import DataQualityAnalyzer

# Analyze data quality
analyzer = DataQualityAnalyzer()
quality_report = analyzer.analyze(data)

print(f"Completeness: {quality_report.completeness}")
print(f"Accuracy: {quality_report.accuracy}")
print(f"Consistency: {quality_report.consistency}")
```

## Best Practices

1. **Clean data early**: Process data as soon as it's collected
2. **Validate inputs**: Check data quality before processing
3. **Use consistent formats**: Standardize data formats across sources
4. **Handle missing data**: Decide how to treat null/empty values
5. **Document transformations**: Keep track of all data changes
6. **Test processing logic**: Verify transformations work correctly 
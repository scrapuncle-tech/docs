# Pipelines

Pipelines in ScrapeUncle allow you to create complex data processing workflows by chaining multiple operations together.

## What are Pipelines?

Pipelines are sequences of data processing steps that transform raw data into the desired format. Each step in a pipeline can:

- **Filter** data based on conditions
- **Transform** data using functions
- **Enrich** data by adding new fields
- **Validate** data for quality assurance
- **Store** data in various formats

## Pipeline Example

```python
from scrapeuncle import Pipeline, WebCollector, DataTransformer

# Create a pipeline
pipeline = Pipeline()

# Add a collector
collector = WebCollector()
pipeline.add_step(collector)

# Add data transformation
transformer = DataTransformer()
transformer.add_rule("price", lambda x: float(x.replace("$", "")))
transformer.add_rule("date", lambda x: parse_date(x))
pipeline.add_step(transformer)

# Add data validation
validator = DataValidator()
validator.add_rule("price", lambda x: x > 0)
pipeline.add_step(validator)

# Run the pipeline
results = pipeline.run("https://example.com/products")
```

## Pipeline Components

### Collectors
- Extract raw data from sources

### Transformers
- Clean and format data
- Convert data types
- Apply business logic

### Validators
- Ensure data quality
- Check for required fields
- Validate data formats

### Storers
- Save data to databases
- Export to files
- Send to APIs 
# Social Media Example

Learn how to use ScrapeUncle for collecting data from social media platforms.

## Twitter Data Collection

Collect tweets and user information from Twitter.

### Basic Tweet Scraping

```python
from scrapeuncle import WebCollector, DataProcessor

# Create collector for Twitter
collector = WebCollector()

# Define tweet fields to extract
collector.add_field("text", "div[data-testid='tweetText']")
collector.add_field("username", "div[data-testid='User-Name'] a")
collector.add_field("timestamp", "time")
collector.add_field("likes", "div[data-testid='like'] span")
collector.add_field("retweets", "div[data-testid='retweet'] span")
collector.add_field("replies", "div[data-testid='reply'] span")

# Set appropriate rate limiting
collector.set_rate_limit(0.5)  # 1 request every 2 seconds

# Create data processor
processor = DataProcessor()
processor.add_cleaner("likes", lambda x: int(x.replace(",", "")) if x else 0)
processor.add_cleaner("retweets", lambda x: int(x.replace(",", "")) if x else 0)
processor.add_cleaner("replies", lambda x: int(x.replace(",", "")) if x else 0)

# Scrape tweet
tweet_url = "https://twitter.com/user/status/123456789"
data = collector.scrape(tweet_url)
processed_data = processor.process(data)
```

### User Profile Scraping

```python
# Define user profile fields
collector.add_field("display_name", "div[data-testid='UserName'] span")
collector.add_field("bio", "div[data-testid='UserDescription']")
collector.add_field("followers", "a[href*='/followers'] span")
collector.add_field("following", "a[href*='/following'] span")
collector.add_field("tweets_count", "a[href*='/status'] span")

# Scrape user profile
profile_url = "https://twitter.com/username"
profile_data = collector.scrape(profile_url)
```

## Instagram Data Collection

Collect posts and user data from Instagram.

### Post Data Scraping

```python
# Instagram collector
collector = WebCollector()

# Define post fields
collector.add_field("caption", "div[data-testid='post-caption']")
collector.add_field("likes", "section span")
collector.add_field("comments", "ul li span")
collector.add_field("timestamp", "time")
collector.add_field("location", "a[href*='/locations/']")

# Handle Instagram's dynamic loading
collector.set_wait_time(5)  # Wait for content to load

# Scrape Instagram post
post_url = "https://www.instagram.com/p/post-id/"
data = collector.scrape(post_url)
```

### Hashtag Search

```python
# Search for posts with specific hashtag
hashtag = "python"
search_url = f"https://www.instagram.com/explore/tags/{hashtag}/"

# Define search result fields
collector.add_field("post_urls", "a[href*='/p/']")
collector.add_field("hashtag", "h1")

# Collect hashtag data
hashtag_data = collector.scrape(search_url)
```

## LinkedIn Data Collection

Collect professional data from LinkedIn.

### Company Profile Scraping

```python
# LinkedIn collector
collector = WebCollector()

# Define company fields
collector.add_field("name", "h1.org-top-card-summary__title")
collector.add_field("industry", "dd.org-about-company-module__industry")
collector.add_field("size", "dd.org-about-company-module__company-staff-count")
collector.add_field("description", "p.org-about-us-organization-description__text")
collector.add_field("website", "a.org-about-us-company-module__website")

# Scrape company profile
company_url = "https://www.linkedin.com/company/company-name"
company_data = collector.scrape(company_url)
```

### Job Posting Scraping

```python
# Define job posting fields
collector.add_field("title", "h1.job-details-jobs-unified-top-card__job-title")
collector.add_field("company", "a.job-details-jobs-unified-top-card__company-name")
collector.add_field("location", "span.job-details-jobs-unified-top-card__bullet")
collector.add_field("description", "div.job-description")
collector.add_field("posted_date", "span.job-details-jobs-unified-top-card__posted-date")

# Scrape job posting
job_url = "https://www.linkedin.com/jobs/view/job-id"
job_data = collector.scrape(job_url)
```

## Reddit Data Collection

Collect posts and comments from Reddit.

### Subreddit Scraping

```python
# Reddit collector
collector = WebCollector()

# Define post fields
collector.add_field("title", "h3._eYtD2XCVieq6emjKBH3m")
collector.add_field("author", "a._2tbHP6ZydRpjI44J3syuqC")
collector.add_field("score", "div._1rZYMD_4xY3gRcSS3p-RDQ")
collector.add_field("comments_count", "span.FHCV02u6Cp2zYL0fhQPsO")
collector.add_field("subreddit", "a._3ryJoIoycVkA88fy5qYTtc")

# Scrape subreddit
subreddit_url = "https://www.reddit.com/r/Python/"
data = collector.scrape(subreddit_url)
```

### Comment Thread Scraping

```python
# Define comment fields
collector.add_field("comment_text", "div._1zPvgKHteTOub9dKkvuOlG")
collector.add_field("comment_author", "a._2tbHP6ZydRpjI44J3syuqC")
collector.add_field("comment_score", "span._1rZYMD_4xY3gRcSS3p-RDQ")
collector.add_field("comment_time", "a._3jOxDPIQ0KaOWpzvToxW3o")

# Scrape comment thread
thread_url = "https://www.reddit.com/r/Python/comments/post-id/"
comments_data = collector.scrape(thread_url)
```

## Sentiment Analysis Pipeline

Create a pipeline for analyzing social media sentiment.

```python
from scrapeuncle import Pipeline, WebCollector, DataProcessor
from textblob import TextBlob

# Create components
collector = WebCollector()
collector.add_field("text", "div[data-testid='tweetText']")
collector.add_field("timestamp", "time")

# Create sentiment analyzer
def analyze_sentiment(text):
    """Analyze sentiment of text"""
    blob = TextBlob(text)
    return {
        'polarity': blob.sentiment.polarity,
        'subjectivity': blob.sentiment.subjectivity,
        'sentiment': 'positive' if blob.sentiment.polarity > 0 else 'negative' if blob.sentiment.polarity < 0 else 'neutral'
    }

processor = DataProcessor()
processor.add_transformer("sentiment", lambda x: analyze_sentiment(x) if x else None)

# Create pipeline
pipeline = Pipeline()
pipeline.add_step(collector)
pipeline.add_step(processor)

# Analyze sentiment of tweets
tweet_urls = [
    "https://twitter.com/user/status/123",
    "https://twitter.com/user/status/456"
]

sentiment_results = []
for url in tweet_urls:
    data = pipeline.run(url)
    sentiment_results.append(data)
```

## Social Media Monitoring

Create a monitoring system for social media mentions.

```python
import schedule
import time
from scrapeuncle import Pipeline, WebCollector, Storage

# Create monitoring pipeline
collector = WebCollector()
collector.add_field("text", "div[data-testid='tweetText']")
collector.add_field("username", "div[data-testid='User-Name'] a")
collector.add_field("timestamp", "time")

storage = Storage("postgresql://user:pass@localhost/social_media")

pipeline = Pipeline()
pipeline.add_step(collector)
pipeline.add_step(storage)

def monitor_mentions():
    """Monitor social media for brand mentions"""
    keywords = ["scrapeuncle", "data scraping", "web scraping"]
    
    for keyword in keywords:
        search_url = f"https://twitter.com/search?q={keyword}"
        try:
            data = pipeline.run(search_url)
            print(f"Found {len(data)} mentions of '{keyword}'")
        except Exception as e:
            print(f"Failed to monitor '{keyword}': {e}")

# Schedule monitoring every 15 minutes
schedule.every(15).minutes.do(monitor_mentions)

# Run monitoring
while True:
    schedule.run_pending()
    time.sleep(60)
```

## Best Practices for Social Media Scraping

1. **Respect rate limits**: Social media platforms have strict rate limiting
2. **Use appropriate delays**: Don't overwhelm servers
3. **Handle authentication**: Some platforms require login
4. **Monitor for changes**: Social media sites update frequently
5. **Respect privacy**: Only collect publicly available data
6. **Handle dynamic content**: Use appropriate wait times
7. **Store data responsibly**: Follow data protection regulations
8. **Monitor for blocks**: Implement IP rotation if needed 
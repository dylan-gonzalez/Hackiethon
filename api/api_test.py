import os
from dotenv import load_dotenv
import requests

from newsapi import NewsApiClient

load_dotenv()

NEWS_API_KEY_SID = os.getenv('NEWS_API_KEY_SID')

# # Init
# newsapi = NewsApiClient(api_key=NEWS_API_KEY_SID)

# # /v2/top-headlines
# top_headlines = newsapi.get_top_headlines(q='bitcoin',
#                                           sources='bbc-news,the-verge',
#                                           category='business',
#                                           language='en',
#                                           country='us')

# # /v2/everything
# all_articles = newsapi.get_everything(q='bitcoin',
#                                       sources='bbc-news,the-verge',
#                                       domains='bbc.co.uk,techcrunch.com',
#                                       from_param='2017-12-01',
#                                       to='2017-12-12',
#                                       language='en',
#                                       sort_by='relevancy',
#                                       page=2)

# # /v2/sources
# sources = newsapi.get_sources()

r = requests.get(f'https://newsapi.org/v2/top-headlines?q=suez&apiKey={NEWS_API_KEY_SID}')
print(r.json()['articles'][0]['description'])

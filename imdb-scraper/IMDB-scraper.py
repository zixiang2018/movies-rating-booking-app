import requests
import json

from pymongo import MongoClient
from bs4 import BeautifulSoup
from decouple import config



client = MongoClient(config('MONGODB_CONNECTION_URL'))
actor_db = client.movieAppData.actors
movie_db = client.movieAppData.movies

class Movie:
    def __init__(self, title, year, rating, thumbnail_url, movie_url, actors):
        self.title = title
        self.rating = rating
        self.thumbnail_url = thumbnail_url
        self.actors = actors
class Actor:
    def __init__(self, name, url):
      self.name = name
      self.url = url

URL = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

result = soup.find("tbody", {"class":"lister-list"}).findAll('tr')
count = 0
for tag in result:
    title = tag.find("td",{"class":"titleColumn"}).a.text
    movie_year = "" if tag.find("td",{"class":"titleColumn"}).span == None else tag.find("td",{"class":"titleColumn"}).span.text
    rating = "Nil" if tag.find("td",{"class":"ratingColumn imdbRating"}).strong == None else tag.find("td",{"class":"ratingColumn imdbRating"}).strong['title']
    thumbnail_url = tag.find("td",{"class":"posterColumn"}).img['src']

    movie_url = "https://www.imdb.com" + tag.find("td",{"class":"titleColumn"}).a['href']
    # Scrape and get the actors of the current link
    movie_page = requests.get(movie_url)
    movie_soup = BeautifulSoup(movie_page.content, 'html.parser')
    actors = [i.text for i in movie_soup.findAll("div",{"class":"credit_summary_item"})[2].findAll("a")]
    actors = actors[0:len(actors)-1] # Remove the last index because it always is "See the full cast"
    actor_urls = ["https://www.imdb.com" + i["href"] for i in movie_soup.findAll("div",{"class":"credit_summary_item"})[2].findAll("a")]
    actors_list = []
    for i in range(len(actors)):
        actor = Actor(actors[i], actor_urls[i])
        # Add into mongo
        actor_db.insert_one(actor.__dict__)

    # Create the movie object 
    movie = Movie(title, movie_year, rating, thumbnail_url, movie_url, actors)
    # Add into mongo
    movie_db.insert_one(movie.__dict__)


    
    count += 1
    print(count)
#     print(json.dumps(m.__dict__))
#     print(json.dumps(actor.__dict__))

print("Complete!")
    
    


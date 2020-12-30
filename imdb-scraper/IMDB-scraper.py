import requests
import json

from pymongo import MongoClient
from bs4 import BeautifulSoup
from decouple import config



client = MongoClient(config('MONGODB_CONNECTION_URL'))
actor_db = client.movieAppData.actors
movie_db = client.movieAppData.movies

class Movie:
    def __init__(self, title, year, rating, num_of_ratings, thumbnail_url, movie_url, actors):
        self.title = title
        self.rating = rating
        self.thumbnail_url = thumbnail_url
        self.actors = actors
        self.num_of_ratings = num_of_ratings
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
    raw_rating = "Nil" if tag.find("td",{"class":"ratingColumn imdbRating"}).strong == None else tag.find("td",{"class":"ratingColumn imdbRating"}).strong['title']
    num_of_ratings = 0
    rating = 0
    if raw_rating != "Nil":
        split_rating = raw_rating.split(" ")
        num_of_ratings = split_rating[3]
        rating = split_rating[0]
    print(rating)
    print(type(rating))
        
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
    
    movie = Movie(title, movie_year, float(rating),  int(num_of_ratings.replace(",","")), thumbnail_url, movie_url, actors)
    # Add into mongo
    movie_db.insert_one(movie.__dict__)

    
    count += 1
    print(count)
#     print(json.dumps(m.__dict__))
#     print(json.dumps(actor.__dict__))

print("Complete!")
    
    


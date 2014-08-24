# offline-news-api

Simple RESTful API that allows you to get news either item by item or as an array of items.

## Install and run

```
git clone git@github.com:matthew-andrews/offline-news-api.git
cd offline-news-api
npm install
node index.js
```

## Documentation

### GET /stories - get all news stories

```
curl https://offline-news-api.herokuapp.com/stories
```

### GET /stories/:id - get a specific news stories by its identifier

```
curl https://offline-news-api.herokuapp.com/stories/http://blogs.ft.com/tech-blog/?p=248891
```

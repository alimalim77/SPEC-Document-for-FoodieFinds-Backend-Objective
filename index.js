const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');
let db;

(async () => {
  db = await open({
    filename: './sequelizertask/database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.use(cors());

// Exercise 1: Get All Restaurants
const fetchAllRestaurants = async () => {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
};

app.get('/restaurants', async (req, res) => {
  let results = await fetchAllRestaurants();
  res.status(200).json(results);
});

// Exercise 2: Get Restaurant by ID
const fetchRestaurantById = async (id) => {
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let response = await db.get(query, [id]);
  return { restaurant: response };
};

app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchRestaurantById(id);
  res.status(200).json(results);
});

// Exercise 3: Get Restaurants by Cuisine
const fetchRestaurantsByCuisine = async (cuisine) => {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
};

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  let results = await fetchRestaurantsByCuisine(cuisine);
  res.status(200).json(results);
});

// Exercise 4: Get Restaurants by Filter
const fetchRestaurantsByFilter = async (isVeg, hasOutdoorSeating, isLuxury) => {
  let query = `SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?`;
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
};

app.get('/restaurants/filter', async (req, res) => {
  let { isVeg, hasOutdoorSeating, isLuxury } = req.query;
  let results = await fetchRestaurantsByFilter(
    isVeg,
    hasOutdoorSeating,
    isLuxury
  );
  res.status(200).json(results);
});

// Exercise 5: Get Restaurants Sorted by Rating
const fetchRestaurantsSortedByRating = async () => {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
};

app.get('/restaurants/sort-by-rating', async (req, res) => {
  let results = await fetchRestaurantsSortedByRating();
  res.status(200).json(results);
});

// Exercise 6: Get All Dishes
const fetchAllDishes = async () => {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
};

app.get('/dishes', async (req, res) => {
  let results = await fetchAllDishes();
  res.status(200).json(results);
});

// Exercise 7: Get Dish by ID
const fetchDishById = async (id) => {
  let query = 'SELECT * FROM dishes WHERE id = ?';
  let response = await db.get(query, [id]);
  return { dish: response };
};

app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchDishById(id);
  res.status(200).json(results);
});

// Exercise 8: Get Dishes by Filter
const fetchDishesByFilter = async (isVeg) => {
  let query = 'SELECT * FROM dishes WHERE isVeg = ?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
};

app.get('/dishes/filter', async (req, res) => {
  let { isVeg } = req.query;
  let results = await fetchDishesByFilter(isVeg);
  res.status(200).json(results);
});

// Exercise 9: Get Dishes Sorted by Price
const fetchDishesSortedByPrice = async () => {
  let query = 'SELECT * FROM dishes ORDER BY price ASC';
  let response = await db.all(query, []);
  return { dishes: response };
};

app.get('/dishes/sort-by-price', async (req, res) => {
  let results = await fetchDishesSortedByPrice();
  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

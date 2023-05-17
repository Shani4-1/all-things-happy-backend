DROP DATABASE IF EXISTS events_dev;
CREATE DATABASE events_dev;

\c events_dev;


--SONG TABLES
CREATE TABLE song_genres (
    id SERIAL PRIMARY KEY,
    genre_type TEXT NOT NULL
);

Create TABLE songs (
    id SERIAL PRIMARY KEY,
    genre_id INT NOT NULL REFERENCES song_genres (id),
    title TEXT NOT NULL,
    song_url TEXT NOT NULL,
    artist TEXT NOT NULL,
    length TEXT
);

CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    song_id INT NOT NULL REFERENCES songs (id),
    song_genre_id INT NOT NULL REFERENCES song_genres (id)
);

--QUOTE TABLES
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories (id),
    quotee TEXT NOT NULL,
    quote TEXT NOT NULL
);


CREATE TABLE quote_list (
    id SERIAL PRIMARY KEY,
    quote_id INT NOT NULL REFERENCES quotes (id),
    category_id INT NOT NULL REFERENCES categories (id)
);

--RECIPE TABLES
CREATE TABLE recipe_details (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    instructions TEXT NOT NULL,
    servings INT NOT NULL,
    calories INT 
);

CREATE TABLE measure (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    recipe_details_id INT NOT NULL REFERENCES recipe_details (id),
    ingredient_id INT NOT NULL REFERENCES ingredient (id),
    measure_id INT REFERENCES measure (id),
    amount INT
);

CREATE TABLE event_menu (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL REFERENCES recipes (id)
);

--EVENT TABLES
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    playlist_id INT NOT NULL REFERENCES playlist (id),
    event_menu_id INT NOT NULL REFERENCES event_menu (id),
    quote_list_id INT NOT NULL REFERENCES quote_list (id),
    event_type TEXT NOT NULL
);
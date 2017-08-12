BEGIN;

DROP TABLE IF EXISTS users, review_items, reviews CASCADE;

CREATE TABLE users (
  id INTEGER PRIMARY KEY
);

CREATE TABLE review_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) NOT NULL,
  owner INTEGER REFERENCES users(id),
  current_score REAL NOT NULL
);

CREATE TABLE reviews (
  review_item INTEGER REFERENCES review_items(id),
  score REAL NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

COMMIT;

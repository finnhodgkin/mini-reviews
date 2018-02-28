BEGIN;

DROP TABLE IF EXISTS users, review_items, reviews CASCADE;

CREATE TABLE users (
  id INTEGER PRIMARY KEY
);

CREATE TABLE review_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  owner INTEGER REFERENCES users(id),
  current_score REAL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  review_item INTEGER REFERENCES review_items(id),
  score REAL NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (id) VALUES (22300773), (23232), (23214), (23242);
INSERT INTO review_items (name, owner) VALUES ('test1', 22300773);
INSERT INTO reviews (review_item, score, user_id) VALUES
(1, 7, 23232), (1, 2, 23214), (1, 9, 23242), (1, 3, 22300773);

COMMIT;

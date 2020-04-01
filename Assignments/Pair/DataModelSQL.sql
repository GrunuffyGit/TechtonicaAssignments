 -- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(30),
--     email VARCHAR(30),
--     created TIMESTAMP,
--     UNIQUE(username)
-- );

-- CREATE TABLE photo(
--     id SERIAL PRIMARY KEY,
--     photoURL VARCHAR(30),
--     created TIMESTAMP,
--     createdBy INT REFERENCES users (id)
-- );

-- CREATE TABLE photoliked(
--     photo_id SERIAL REFERENCES photo (id),
--     liked_by SERIAL REFERENCES users (id),
--     photo_liked_timestamp TIMESTAMP
-- );

-- INSERT INTO users (username, email, created) VALUES ('TestUser1', 'example1@email.com', '2020-02-05');
-- INSERT INTO users (username, email, created) VALUES ('TestUser2', 'example1@email.com', '2020-02-05');
-- INSERT INTO users (username, email, created) VALUES ('TestUser3', 'example1@email.com', '2020-02-05');

-- INSERT INTO photo (photoURL, created, createdBy) VALUES ('url1.com', '2020-02-06', 1);
-- INSERT INTO photo (photoURL, created, createdBy) VALUES ('url2.com', '2020-02-06', 1);
-- INSERT INTO photo (photoURL, created, createdBy) VALUES ('url3.com', '2020-02-06', 2);

-- INSERT INTO photoliked (photo_id, liked_by, photo_liked_timestamp) VALUES (1, 1, '2020-02-08');
-- INSERT INTO photoliked (photo_id, liked_by, photo_liked_timestamp) VALUES (2, 1, '2020-02-08');
-- INSERT INTO photoliked (photo_id, liked_by, photo_liked_timestamp) VALUES (3, 2, '2020-02-08');
-- INSERT INTO photoliked (photo_id, liked_by, photo_liked_timestamp) VALUES (3, 3, '2020-02-08');

-- Find all the photos of one user (given their username)
SELECT * FROM photo WHERE createdby = (SELECT id FROM users WHERE username = 'TestUser1');
SELECT username AS USERS, photo.id AS PHOTO_ID FROM users JOIN photo ON users.id = photo.createdBy WHERE username = 'TestUser1';
-- Find all the photos that one user Hearted
SELECT * FROM photoliked WHERE liked_by = 1;
-- Find all the Hearts for a given photo (given its primary key)
SELECT * FROM photoliked WHERE photo_id = 3;

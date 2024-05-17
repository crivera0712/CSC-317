CREATE TABLE users (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(100) NOT NULL,
`password` VARCHAR (255) NOT NULL,
phone_number VARCHAR (15),
created TIMESTAMP NOT NULL DEFAULT NOW()
);
INSERT INTO users (email, password)
VALUES
('jit@jit.com', 'jit');
CREATE DATABASE IF NOT EXISTS la_guarida_petshop /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE la_guarida_petshop;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password CHAR(60) NOT NULL,
  avatar VARCHAR(100) NOT NULL DEFAULT 'avatar1.png',
  isadmin TINYINT(4) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE categories (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT,
  category_id INT(11) NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(100) NOT NULL,
  rating INT(11) NOT NULL,
  status VARCHAR(20) NOT NULL,
  stock INT(11) NOT NULL,
  PRIMARY KEY (id),
  KEY category_id (category_id),
  CONSTRAINT fkproducts_category_id FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT fkorders_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE purchases (
  id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  product_id INT(11) NOT NULL,
  quantity INT(11) NOT NULL,
  PRIMARY KEY (id),
  KEY order_id (order_id),
  KEY product_id (product_id),
  CONSTRAINT fkpurchases_order_id FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT fkpurchases_product_id FOREIGN KEY (product_id) REFERENCES products (id)
);
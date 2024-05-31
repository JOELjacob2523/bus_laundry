/* This is for MySQL */
CREATE TABLE users (
  user_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  age VARCHAR(255) NULL,
  address1 VARCHAR(255) NULL,
  address2 VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  state VARCHAR(255) NULL,
  zip_code VARCHAR(255) NULL,
  token TEXT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE payments (
  paymentId BIGINT NOT NULL AUTO_INCREMENT,
  description VARCHAR(255),
  perCase VARCHAR (255) NULL,
  price VARCHAR (255) NULL,
  vendorId BIGINT,
  FOREIGN KEY(vendorId) REFERENCES vendors(vendorId),
  PRIMARY KEY (productId)
);

CREATE TABLE vendors (
  vendorId BIGINT NOT NULL AUTO_INCREMENT,
  vendorname VARCHAR (255) NULL,
  companyname VARCHAR (255) NULL,
  vendoremail VARCHAR (255) NULL,
  phone VARCHAR (255) NULL,
  token TEXT NULL,
  PRIMARY KEY (vendorId)
);

CREATE TABLE orders (
  orderId BIGINT NOT NULL AUTO_INCREMENT,
  date DATE NULL,
  totalboxes VARCHAR(255) NULL,
  totalprice VARCHAR (255) NULL,
  token TEXT NULL,
  vendorId BIGINT,
  FOREIGN KEY(vendorId) REFERENCES vendors(vendorId),
  PRIMARY KEY (orderId)
);

CREATE TABLE orderitems (
  orderitemsId BIGINT NOT NULL AUTO_INCREMENT,
  amount VARCHAR (255) NULL,
  productdesc VARCHAR (255) NULL,
  qty VARCHAR (255) NULL,
  price VARCHAR (255) NULL,
  totalrowprice VARCHAR (255) NULL,
  date DATETIME NULL,
  vendorId BIGINT,
  orderId BIGINT,
  FOREIGN KEY(orderId) REFERENCES orders(orderId),
  FOREIGN KEY(vendorId) REFERENCES vendors(vendorId),
  PRIMARY KEY (orderitemsId)
);
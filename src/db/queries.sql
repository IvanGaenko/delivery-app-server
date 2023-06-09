CREATE TABLE coupons (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	discount VARCHAR(5) NOT NULL,
	code VARCHAR(20) NOT NULL,
	value DECIMAL NOT NULL
);

INSERT INTO coupons (name,discount,code,value) VALUES ('Coupon 1','50%','nebuchadnezzar',0.5);
INSERT INTO coupons (name,discount,code,value) VALUES ('Coupon 2','10%','thereisnospoon',0.1);
INSERT INTO coupons (name,discount,code,value) VALUES ('Coupon 3','20%','iseedeadpeople',0.2);

CREATE TABLE dealers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL);

INSERT INTO dealers (name) VALUES ('US Burger');
INSERT INTO dealers (name) VALUES ('Mexican Burrito');
INSERT INTO dealers (name) VALUES ('Caucasian Kebab');

CREATE TABLE location (
	id SERIAL PRIMARY KEY,
	lat DECIMAL NOT NULL,
	lng DECIMAL NOT NULL,
	street_number VARCHAR(100) NOT NULL,
	route VARCHAR(255) NOT NULL,
	locality VARCHAR(255) NOT NULL,
	icon TEXT,
	dealerid INT
);

INSERT INTO location (lat,lng,street_number,route,locality,icon,dealerid) VALUES (49.99051,36.28957,'44-Б','вулиця Академіка Павлова','Харків','https://img.icons8.com/color/48/hamburger.png',1);
INSERT INTO location (lat,lng,street_number,route,locality,icon,dealerid) VALUES (49.99937,36.23222,'25','вулиця Сумська','Харків','https://img.icons8.com/emoji/48/taco-emoji.png',2);
INSERT INTO location (lat,lng,street_number,route,locality,icon,dealerid) VALUES (50.00617,36.23575,'10А','проспект Незалежності','Харків','https://img.icons8.com/color/48/kebab.png',3);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	dealerid INT NOT NULL,
	name VARCHAR(255) NOT NULL,
	dealer VARCHAR(255) NOT NULL,
	price INT NOT NULL,
	image TEXT
);

INSERT INTO products (dealerid,name,dealer,price,image) VALUES (1,'Burger Small','US Burger',10,'"https://www.eatthis.com/wp-content/uploads/sites/4/2022/04/burger-fries.jpg"');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (1,'Burger Medium','US Burger',15,'https://www.allrecipes.com/thmb/L_u2fRh8wajEopvlqXVQaHBW7jg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (1,'Burger Large','US Burger',20,'https://www.foodandwine.com/thmb/_hz1-1jxHmNJxNLZxIjlOs2QQ3E=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (1,'Burger Max','US Burger',25,'https://www.seriouseats.com/thmb/0AmF51MdZsKiTmL8vXMbLchEcnY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (2,'Burrito Small','Mexican Burrito',12,'https://images.immediate.co.uk/production/volatile/sites/2/2023/02/Beef-burrito-df843b7.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (2,'Burrito Medium','Mexican Burrito',17,'https://images.ricardocuisine.com/services/recipes/496x670_9380.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (2,'Burrito Large','Mexican Burrito',22,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Burrito.JPG/800px-Burrito.JPG');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (2,'Burrito Max','Mexican Burrito',27,'https://i.obozrevatel.com/food/recipemain/2019/1/4/1484243327-77039744.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (3,'Kebab Small','Caucasian Kebab',12,'https://shuba.life/static/content/thumbs/740x493/2/d8/bzu4pa---c740x493x50px50p-c740x493x50px50p-up--bd53b007a059f39b34aeeeca7bef1d82.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (3,'Kebab Medium','Caucasian Kebab',17,'https://www.wellseasonedstudio.com/wp-content/uploads/2021/06/Beef-kebab-skewers-on-a-plate.jpg');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (3,'Kebab Large','Caucasian Kebab',22,'"https://brandfood.net/wp-content/uploads/2021/08/kebab-iz-govyadiny-1.jpeg"');
INSERT INTO products (dealerid,name,dealer,price,image) VALUES (3,'Kebab Max','Caucasian Kebab',27,'https://img.freepik.com/premium-photo/assorted-caucasian-shashlik-skewers-kebabs_219193-2775.jpg');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL
);

ALTER TABLE location ADD FOREIGN KEY (dealerid) REFERENCES dealers (id);
ALTER TABLE orders ADD FOREIGN KEY (userid) REFERENCES users (id);
ALTER TABLE orders ADD FOREIGN KEY (couponid) REFERENCES coupons (id);
ALTER TABLE ordersproducts ADD FOREIGN KEY (orderid) REFERENCES orders (id);
ALTER TABLE ordersproducts ADD FOREIGN KEY (productid) REFERENCES products (id);
ALTER TABLE products ADD FOREIGN KEY (dealerid) REFERENCES dealers (id);
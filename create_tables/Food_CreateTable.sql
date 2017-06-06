DROP TABLE IF EXISTS Food;

CREATE TABLE Food (
	id int AUTO_INCREMENT,
	foodchain varchar(100),
	name varchar(100),
	category varchar(100),
	calories int,
	cff int,
	fat int,
	sfat int,
	tfat int,
	cholesterol int,
	sodium int,
	carbs int,
	fiber int,
	sugar int,
	protein int,
	vitA int,
	vitC int,
	calcium int,
	iron int,
	PRIMARY KEY (id)
);
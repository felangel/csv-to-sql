DROP TABLE IF EXISTS Analytics;

CREATE TABLE Analytics (
	id int AUTO_INCREMENT,
	page varchar(100) NOT NULL,
    action varchar(100) NOT NULL,
    object varchar(100) NOT NULL,    
	os varchar(100 NOT NULL),
	version varchar(100) NOT NULL,
    model varchar(100) NOT NULL,
    failure_reason varchar(100),
    time_stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
	PRIMARY KEY (id)
);
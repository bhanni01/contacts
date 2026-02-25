CREATE DATABASE contactlist;
CREATE TABLE contacts(
    cid SERIAL PRIMARY KEY, 
    contactname VARCHAR(255),
    phonenumber VARCHAR(10) NOT NULL
)
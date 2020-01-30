/*CREATE DATABASE database_links;

USE database_links;

/* Users table */
CREATE TABLE users(
    id INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

alter table users 
    add primary key (id);

alter table users
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe users;

/* Links table*/
CREATE TABLE links(
    id int NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description text,
    user_id int,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);

alter table links 
    add primary key (id);
    
alter table links
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe links;

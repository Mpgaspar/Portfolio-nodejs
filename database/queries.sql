CREATE DATABASE database_links;

USE database_links;
show tables;
select * from links;


/* Users Table */
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

/* About Table */
CREATE TABLE about(
    id int NOT NULL,
    title VARCHAR(150) NOT NULL,
    description text 
);

alter table about 
    add primary key (id);
    
alter table about
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe about;

insert into about (id, title, description) 
values (1, 'Full Stack Web Developer', 'I entered in the world of technology taking several programming courses focused on the web.
 In the last years, I graduated and worked as an orthopedic doctor,
 specialized in knee surgery, and always seek to improve myself through continuous learning.');

/* Techs Table */
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

/* Skills Table */
CREATE TABLE skills(
    id int NOT NULL,
    title VARCHAR(150) NOT NULL,
    description text,
    created_at timestamp not null default current_timestamp
);

alter table skills 
    add primary key (id);
    
alter table skills
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe skills;

/* Experience Table */
CREATE TABLE experience(
    id int NOT NULL,
    title VARCHAR(150) NOT NULL,
    description text
);

alter table experience 
    add primary key (id);
    
alter table experience
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe experience;

/* Contact Table */
CREATE TABLE contact(
    id int NOT NULL,
    fullname VARCHAR(150) NOT NULL,
    email varchar(150) not null
);

alter table contact 
    add primary key (id);
    
alter table contact
    modify id  INT not null  auto_increment, auto_increment= 2;
    
describe contact;


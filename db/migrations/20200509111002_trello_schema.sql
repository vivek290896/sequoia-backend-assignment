-- migrate:up

create table if not exists users (
      id bigint AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(45) NOT NULL,
      type VARCHAR(45) NOT NULL,
      email  VARCHAR(45) NOT NULL,
      password VARCHAR(45)
);

create table if not exists tasks(
     id bigint AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(45) NOT NULL,
     status VARCHAR(45) NOT NULL,
     description VARCHAR(45) NOT NULL,
     project_id int NOT NULL,
     assignee_email VARCHAR(45) NOT NULL,
     assigner_email VARCHAR(45) NOT NULL,
     due_date DATETIME NOT NULL
);

create table if not exists projects(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);
-- migrate:down


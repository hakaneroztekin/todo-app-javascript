--How to set up:
--For win10, install mysql community edt (google "dev mysql download")
--Open MySQL Command Line Client, and enter the password you've created during installation
--then copy, paste the lines below (right clicking in the MySQL client will paste the content)
--after creating the db, select todo with "SELECT todo;"
-- additional useful commands:
-- SHOW DATABASES;     shows existing databases
-- SHOW TABLES;     shows existing tables
-- DESCRIBE tasks;  shows details of the tasks table

CREATE DATABASE IF NOT EXISTS todo DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(64) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    creation_date DATETIME NOT NULL DEFAULT NOW(),
    last_update DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW()
);
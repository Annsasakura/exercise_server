CREATE DATABASE IF NOT EXISTS users_zoe;

USE users_zoe;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
 
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`)
);


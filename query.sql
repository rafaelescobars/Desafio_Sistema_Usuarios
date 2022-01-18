----Cambiarse a base postgres
\c postgres;

-- Create a new database called 'softlife'
CREATE DATABASE softlife;

--Conexión base library
\c softlife;

--Encoding UTF8
SET client_encoding TO 'UTF8';

--Crear Tablas
CREATE TABLE usuarios(
  email VARCHAR(50),
  password VARCHAR(50)
);
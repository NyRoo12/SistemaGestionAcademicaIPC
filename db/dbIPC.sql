-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestionasignaturasipc
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asignaturasdestino`
--

DROP TABLE IF EXISTS `asignaturasdestino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturasdestino` (
  `codigo_destino` varchar(30) NOT NULL,
  `carrera` varchar(50) DEFAULT NULL,
  `codigo_IPC` varchar(30) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `regimen` varchar(50) DEFAULT NULL,
  `creditos` int DEFAULT NULL,
  `horas` int DEFAULT NULL,
  PRIMARY KEY (`codigo_destino`),
  KEY `codigo_IPC` (`codigo_IPC`),
  CONSTRAINT `asignaturasdestino_ibfk_1` FOREIGN KEY (`codigo_IPC`) REFERENCES `asignaturasipc` (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturasdestino`
--

LOCK TABLES `asignaturasdestino` WRITE;
/*!40000 ALTER TABLE `asignaturasdestino` DISABLE KEYS */;
INSERT INTO `asignaturasdestino` VALUES ('DEST001','Ingeniería Civil Informática','IPC003','Introducción a la Programación','Semestral',6,120),('DEST002','Ingeniería Comercial','IPC004','Fundamentos de Economía','Semestral',5,90),('DEST003','Ingeniería Civil Industrial','IPC001','Cálculo Diferencial','Semestral',6,120),('DEST004','Ingeniería Civil en Computación','IPC003','Programación Avanzada','Semestral',7,140),('DEST005','Ingeniería en Biotecnología','IPC005','Química para Ingenieros','Semestral',5,100),('DEST006','Ingeniería Civil Informática','IPC001','Matemáticas Avanzadas','Semestral',6,120),('DEST007','Ingeniería Comercial','IPC003','Taller de Programación','Semestral',4,80),('DEST008','Ingeniería Civil Industrial','IPC005','Laboratorio de Química','Semestral',4,90),('DEST009','Ingeniería Civil en Computación','IPC002','Fundamentos de Física','Semestral',6,120),('DEST010','Ingeniería en Biotecnología','IPC003','Bioprogramación','Semestral',6,130);
/*!40000 ALTER TABLE `asignaturasdestino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturasipc`
--

DROP TABLE IF EXISTS `asignaturasipc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturasipc` (
  `codigo_IPC` varchar(30) NOT NULL,
  `nombre_IPC` varchar(50) DEFAULT NULL,
  `regimen_IPC` varchar(50) DEFAULT NULL,
  `creditos_IPC` int DEFAULT NULL,
  `horas_IPC` int DEFAULT NULL,
  PRIMARY KEY (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturasipc`
--

LOCK TABLES `asignaturasipc` WRITE;
/*!40000 ALTER TABLE `asignaturasipc` DISABLE KEYS */;
INSERT INTO `asignaturasipc` VALUES ('IPC001','Matemáticas I','Semestral',6,120),('IPC002','Física I','Semestral',5,100),('IPC003','Programación I','Semestral',7,140),('IPC004','Economía General','Semestral',4,80),('IPC005','Química General','Semestral',5,110);
/*!40000 ALTER TABLE `asignaturasipc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `nombre` varchar(100) DEFAULT NULL,
  `rut` varchar(20) NOT NULL,
  `carreraDestino` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES ('Sofía Álvarez','11122233-4','Ingeniería en Biotecnología'),('Ana Martínez','12345678-9','Ingeniería Civil Informática'),('Javiera Rojas','12378945-6','Ingeniería Civil Industrial'),('Pedro González','87654321-0','Ingeniería Civil en Computación'),('Carlos López','98765432-1','Ingeniería Comercial');
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialacademico`
--

DROP TABLE IF EXISTS `historialacademico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialacademico` (
  `rut_estudiante` varchar(20) NOT NULL,
  `codigo_IPC` varchar(30) NOT NULL,
  `nota` float DEFAULT NULL,
  `ano` int NOT NULL,
  `semestre` varchar(30) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`rut_estudiante`,`codigo_IPC`,`ano`,`semestre`),
  KEY `codigo_IPC` (`codigo_IPC`),
  CONSTRAINT `historialacademico_ibfk_1` FOREIGN KEY (`rut_estudiante`) REFERENCES `estudiante` (`rut`),
  CONSTRAINT `historialacademico_ibfk_2` FOREIGN KEY (`codigo_IPC`) REFERENCES `asignaturasipc` (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialacademico`
--

LOCK TABLES `historialacademico` WRITE;
/*!40000 ALTER TABLE `historialacademico` DISABLE KEYS */;
INSERT INTO `historialacademico` VALUES ('11122233-4','IPC001',7,2022,'Primero',1),('11122233-4','IPC002',6.7,2023,'Segundo',1),('11122233-4','IPC004',5.9,2023,'Primero',1),('11122233-4','IPC005',7,2023,'Primero',1),('12345678-9','IPC001',6,2023,'Primero',1),('12345678-9','IPC002',5.8,2023,'Segundo',1),('12345678-9','IPC003',6.5,2022,'Primero',1),('12345678-9','IPC004',5.3,2023,'Primero',1),('12378945-6','IPC001',6.9,2023,'Segundo',1),('12378945-6','IPC002',6.8,2023,'Primero',1),('12378945-6','IPC003',5.7,2022,'Segundo',1),('12378945-6','IPC005',6,2023,'Primero',1),('87654321-0','IPC002',5.4,2023,'Primero',1),('87654321-0','IPC003',4.9,2022,'Primero',0),('87654321-0','IPC004',6.1,2023,'Primero',1),('87654321-0','IPC005',5,2022,'Segundo',1),('98765432-1','IPC001',6.2,2022,'Primero',1),('98765432-1','IPC003',5.9,2023,'Primero',1),('98765432-1','IPC004',5.5,2022,'Segundo',1),('98765432-1','IPC005',4.8,2023,'Segundo',0);
/*!40000 ALTER TABLE `historialacademico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `hashed_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('$2a$10$T4UacOIe2waJthyhw3oEeOd.Fe.AFYRnGtG.qpOK41KS9O7WtwlWm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 17:15:45

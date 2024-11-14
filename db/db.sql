CREATE DATABASE  IF NOT EXISTS `GestionAsignaturasIPC` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `GestionAsignaturasIPC`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: GestionAsignaturasIPC
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `asignaturasEquivalentes`
--

DROP TABLE IF EXISTS `asignaturasEquivalentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturasEquivalentes` (
  `codigo_destino` varchar(30) NOT NULL,
  `carrera` varchar(50) DEFAULT NULL,
  `codigo_IPC` varchar(30) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `regimen` varchar(50) DEFAULT NULL,
  `creditos` int DEFAULT NULL,
  `horas` int DEFAULT NULL,
  PRIMARY KEY (`codigo_destino`),
  KEY `codigo_IPC` (`codigo_IPC`),
  CONSTRAINT `asignaturasEquivalentes_ibfk_1` FOREIGN KEY (`codigo_IPC`) REFERENCES `asignaturasIPC` (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturasEquivalentes`
--

LOCK TABLES `asignaturasEquivalentes` WRITE;
/*!40000 ALTER TABLE `asignaturasEquivalentes` DISABLE KEYS */;
INSERT INTO `asignaturasEquivalentes` VALUES ('ACUS070','Ingeniería Civil Acústica','IOCC005','Taller de Introducción a la Acústica','Semestral',NULL,NULL),('ACUS075','Ingeniería Civil Acústica','IOCC038','Taller de Sonido','Semestral',NULL,NULL),('BAIN032','Ingeniería Civil Industrial','BAIN069','Química General','Semestral',NULL,NULL),('BAIN034','Ingeniería Civil Industrial','BAIN067','Geometría','Semestral',NULL,NULL),('BAIN058','Ingeniería Civil Industrial','BAIN079','Comprensión del Inglés','Semestral',NULL,NULL),('BAIN063','Ingeniería Civil Industrial','BAIN071','Comunicación en Español','Semestral',NULL,NULL),('BAIN068','Ingeniería Civil Industrial','BAIN073','Algebra e Introducción al Calculo','Semestral',NULL,NULL),('BAIN072','Ingeniería Civil Industrial','BAIN071','Comunicación Profesional','Semestral',NULL,NULL),('BAIN076','Ingeniería Civil Industrial','BAIN073','Álgebra Lineal','Semestral',NULL,NULL),('BAIN078','Ingeniería Civil Industrial','BAIN075','Calculo en IR','Semestral',NULL,NULL),('BAIN088','Ingeniería Civil Industrial','BAIN077','Física Mecánica I','Semestral',NULL,NULL),('BAIN095','Ingeniería Civil Industrial','BAIN081','Ecuaciones Diferenciales','Semestral',NULL,NULL),('BAIN100','Ingeniería Civil Industrial','BAIN077','Física Mecánica II','Semestral',NULL,NULL),('ELEB065','Ingeniería Civil Electrónica','IOCC005','Taller de Ingeniería Electrónica: Ingeniería Básica','Semestral',NULL,NULL),('ELEB070','Ingeniería Civil Electrónica','IOCC038','Taller de Ingeniería Electrónica: Tecnologías','Semestral',NULL,NULL),('ICIV057','Ingeniería Civil Industrial','IOCC005','Introducción a la Ingeniería Industrial','Semestral',NULL,NULL),('ICNA060','Ingeniería Civil Naval','IOCC005','Taller de Ingeniería Naval','Semestral',NULL,NULL),('ICNA070','Ingeniería Civil Naval','IOCC038','Taller de Tecnología Naval','Semestral',NULL,NULL),('IDMI055','Ingeniería Civil Mecánica','IOCC038','Taller de Ingeniería II','Semestral',NULL,NULL),('IMPT060','Ingeniería Civil Mecánica','IOCC005','Taller de Ingeniería I','Semestral',NULL,NULL),('INFO063','Ingeniería civil en Informática','INFO058','Introducción a la Programación','Semestral',NULL,NULL),('INFO065','Ingeniería Civil Industrial','INFO058','Introducción a la Programación','Semestral',NULL,NULL),('INFO073','Ingeniería civil en Informática','IOCC005','Taller de Ingeniería: Introducción a la Profesión','Semestral',NULL,NULL),('INFO083','Ingeniería civil en Informática','IOCC038','Taller de Ingeniería: Programación Aplicada','Semestral',NULL,NULL),('INIS085','Ingeniería Civil Industrial','IOCC038','Taller de TIC','Semestral',NULL,NULL),('IOCC070','Ingeniería en Construcción','IOCC005','Taller de Introducción a la Construcción','Semestral',NULL,NULL),('IOCC072','Ingeniería Civil en Obras Civiles','IOCC005','Taller de Introducción a la Ingeniería Civil','Semestral',NULL,NULL),('IOCC075','Ingeniería en Construcción','IOCC038','Taller de Materiales de Construcción','Semestral',NULL,NULL),('IOCC079','Ingeniería Civil en Obras Civiles','IOCC038','Taller de Geometría Descriptiva','Semestral',NULL,NULL);
/*!40000 ALTER TABLE `asignaturasEquivalentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturasIPC`
--

DROP TABLE IF EXISTS `asignaturasIPC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturasIPC` (
  `codigo_IPC` varchar(30) NOT NULL,
  `nombre_IPC` varchar(100) DEFAULT NULL,
  `semestre_IPC` varchar(50) DEFAULT NULL,
  `regimen_IPC` varchar(50) DEFAULT NULL,
  `creditos_IPC` int DEFAULT NULL,
  `horas_IPC` int DEFAULT NULL,
  PRIMARY KEY (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturasIPC`
--

LOCK TABLES `asignaturasIPC` WRITE;
/*!40000 ALTER TABLE `asignaturasIPC` DISABLE KEYS */;
INSERT INTO `asignaturasIPC` VALUES ('ACUS050','MUSISONOLOGÍA','','Semestral',NULL,NULL),('ACUS080','LENGUAJE Y ENTRENAMIENTO AUDITIVO MUSICAL BÁSICO','','Semestral',NULL,NULL),('ACUS085','TALLER DE INTRODUCCIÓN AL AUDIO PROFESIONAL','','Semestral',NULL,NULL),('ACUS088','LENGUAJE Y ENTRENAMIENTO AUDITIVO MUSICAL','','Semestral',NULL,NULL),('ACUS090','TALLER DE SONIDO CREATIVO','','Semestral',NULL,NULL),('ACUS092','TALLER DE ACÚSTICA','','Semestral',NULL,NULL),('BAIN065','ÁLGEBRA PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN067','GEOMETRÍA PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN069','QUÍMICA PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN071','COMUNICACIÓN IDIOMA ESPAÑOL','','Semestral',NULL,NULL),('BAIN073','ÁLGEBRA LINEAL PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN075','CÁLCULO EN UNA VARIABLE','','Semestral',NULL,NULL),('BAIN077','FÍSICA: MECÁNICA','','Semestral',NULL,NULL),('BAIN079','COMUNICACIÓN IDIOMA INGLÉS','','Semestral',NULL,NULL),('BAIN081','ECUACIONES DIFERENCIALES PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN083','CÁLCULO EN VARIAS VARIABLES','','Semestral',NULL,NULL),('BAIN084','INGLES COMUNICACIONAL BÁSICO','','Semestral',NULL,NULL),('BAIN085','FÍSICA: ONDAS Y ELECTROMAGNETISMO','','Semestral',NULL,NULL),('BAIN087','MÉTODOS NUMÉRICOS PARA INGENIERÍA','','Semestral',NULL,NULL),('BAIN089','FÍSICA: FLUIDOS Y TERMODINÁMICA','','Semestral',NULL,NULL),('BAIN091','ESTADÍSTICA Y PROBABILIDADES PARA INGENIERÍA','','Semestral',NULL,NULL),('CAEV050','RESILIENCIA EN UN MUNDO CAMBIANTE','','Semestral',NULL,NULL),('CITI099','GEOLOGÍA GENERAL','','Semestral',NULL,NULL),('DYRE000','ACONDICIONAMIENTO FÍSICO GENERAL','','Semestral',NULL,NULL),('DYRE003','BÁSQUETBOL','','Semestral',NULL,NULL),('DYRE004','FÚTBOL','','Semestral',NULL,NULL),('DYRE027','AUTOCUIDADO Y VIDA ACTIVA','','Semestral',NULL,NULL),('DYRE070','EDUCACIÓN FÍSICA Y SALUD','','Semestral',NULL,NULL),('ELEB075','CIRCUITOS ELÉCTRICOS EN CORRIENTE CONTINUA','','Semestral',NULL,NULL),('ELEB080','TALLER DE INGENIERÍA ELECTRÓNICA: EFICIENCIA ENERGÉTICA','','Semestral',NULL,NULL),('ELEB085','CIRCUITOS ELÉCTRICOS EN CORRIENTE ALTERNA','','Semestral',NULL,NULL),('ELEB088','TRATAMIENTO MATEMÁTICOS DE SEÑALES','','Semestral',NULL,NULL),('ELEB090','TALLER DE DISEÑO EN INGENIERÍA ELECTRÓNICA: PROYECTO ELECTRÓNICO','','Semestral',NULL,NULL),('ESOC100','PRÁCTICA DEL OBRERO','','Semestral',NULL,NULL),('ICIV079','TALLER DE CREATIVIDAD E INNOVACIÓN','','Semestral',NULL,NULL),('ICIV083','TEORIA ORGANIZACIONAL','','Semestral',NULL,NULL),('ICIV087','TALLER DE EMPRENDIMIENTO','','Semestral',NULL,NULL),('ICIV097','ESTADISTICA Y PROBABILIDADES','','Semestral',NULL,NULL),('ICIV127','INFERENCIA ESTADISTICA','','Semestral',NULL,NULL),('ICNA075','TALLER DE DISEÑO NAVAL','','Semestral',NULL,NULL),('ICNA080','HIDROSTÁTICA DE LA NAVE','','Semestral',NULL,NULL),('ICNA086','TALLER DE CIENCIAS DE LOS MATERIALES','','Semestral',NULL,NULL),('IIME004','EFICIENCIA ENERGETICA','','Semestral',NULL,NULL),('IIME006','METROLOGÍA','','Semestral',NULL,NULL),('IIME057','TALLER DE DISEÑO EN INGENIERÍA','','Semestral',NULL,NULL),('IIME065','TALLER DE INGENIERÍA III','','Semestral',NULL,NULL),('IIME070','CIENCIAS DE LOS MATERIALES','','Semestral',NULL,NULL),('IIME079','MECÁNICA GENERAL','','Semestral',NULL,NULL),('IIME080','MÁQUINAS Y HERRAMIENTAS','','Semestral',NULL,NULL),('IIME082','MÉTODOS GRÁFICOS PARA CONSTRUCCIÓN','','Semestral',NULL,NULL),('IIME084','DIBUJO DE INGENIERÍA','','Semestral',NULL,NULL),('INFO058','PROGRAMACIÓN','','Semestral',NULL,NULL),('INFO081','PROGRAMACIÓN','','Semestral',NULL,NULL),('INFO085','ESTRUCTURA DE DATOS Y ALGORITMOS','','Semestral',NULL,NULL),('INFO088','TALLER DE INGENIERÍA: ESTRUCTURA DE DATOS Y ALGORITMOS','','Semestral',NULL,NULL),('INFO090','PROGRAMACIÓN ORIENTADA A OBJETO','','Semestral',NULL,NULL),('INFO099','ESTRUCTURAS DISCRETAS','','Semestral',NULL,NULL),('INFO104','TALLER DE CONSTRUCCIÓN DE SOFTWARE','','Semestral',NULL,NULL),('INFO108','TALLER DE PROGRAMACIÓN','','Semestral',NULL,NULL),('IOCC005','TALLER DE INGENIERÍA I','','Semestral',NULL,NULL),('IOCC024','INTRODUCCIÓN A LA METEOROLOGÍA Y CLIMATOLOGÍA','','Semestral',NULL,NULL),('IOCC038','TALLER DE INGENIERÍA II','','Semestral',NULL,NULL),('IOCC077','INTRODUCCIÓN A LA TECNOLOGÍA DEL HORMIGÓN','','Semestral',NULL,NULL),('IOCC080','TALLER DE PROCESOS CONSTRUCTIVOS','','Semestral',NULL,NULL),('IOCC085','MECÁNICA RACIONAL','','Semestral',NULL,NULL),('IOCC088','TALLER DE URBANIZACIÓN','','Semestral',NULL,NULL),('IOCC093','MATERIALES DE INGENIERÍA CIVIL','','Semestral',NULL,NULL),('IOCC104','TALLER DE DIBUJO EN INGENIERÍA','','Semestral',NULL,NULL),('IOCC109','MECÁNICA RACIONAL ESTÁTICA','','Semestral',NULL,NULL),('IOCC119','TALLER DE INTRODUCCIÓN A LOS PROCESOS CONSTRUCTIVOS','','Semestral',NULL,NULL),('PCSU050','RESILIENCIA EN UN MUNDO CAMBIANTE','','Semestral',NULL,NULL);
/*!40000 ALTER TABLE `asignaturasIPC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `nombre` varchar(100) DEFAULT NULL,
  `rut` varchar(20) NOT NULL,
  `carreraDestino` varchar(50) DEFAULT NULL,
  `ano` int DEFAULT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES ('Rodrigo Silva','00011122-3','Ingeniería en Construcción',2023),('Isidora Medina','11122233-4','Ingeniería Civil Mecánica',2023),('Claudia Gómez','11125233-7','Ingeniería en Construcción',2023),('Valentina Pérez','12365478-9','Ingeniería Civil en Informática',2023),('Ignacio Fuentes','22232344-5','Ingeniería Civil en Informática',2023),('Luis Herrera','23456789-0','Ingeniería Naval',2023),('Francisco García','25233344-5','Ingeniería Civil Acústica',2023),('Cristina Espinoza','33244455-6','Ingeniería Civil Acústica',2023),('Fernando Rivas','33344455-6','Ingeniería Civil Mecánica',2023),('Camila Soto','34567890-1','Ingeniería Civil Electrónica',2023),('Felipe Carrasco','44455366-7','Ingeniería Civil Industrial',2023),('Jorge Núñez','44455566-7','Ingeniería Civil en Informática',2023),('Martina Castro','55516677-8','Ingeniería Civil Acústica',2023),('Paula Vega','55566177-8','Ingeniería Civil en Obras Civiles',2023),('Daniel Morales','66677788-9','Ingeniería Civil Industrial',2023),('Antonia Ortiz','77788899-0','Ingeniería Civil en Obras Civiles',2023),('Diego Ramírez','87654321-2','Ingeniería Civil en Obras Civiles',2023),('Sebastián Vargas','88899900-1','Ingeniería Civil Electrónica',2023),('María Fernández','98765432-1','Ingeniería Civil Industrial',2023),('Gabriela Figueroa','99900011-2','Ingeniería Naval',2023);
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialAcademico`
--

DROP TABLE IF EXISTS `historialAcademico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialAcademico` (
  `rut_estudiante` varchar(20) NOT NULL,
  `codigo_IPC` varchar(30) NOT NULL,
  `nota` float DEFAULT NULL,
  `ano` int NOT NULL,
  `semestre` varchar(30) NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`rut_estudiante`,`codigo_IPC`,`ano`,`semestre`),
  KEY `codigo_IPC` (`codigo_IPC`),
  CONSTRAINT `historialAcademico_ibfk_1` FOREIGN KEY (`rut_estudiante`) REFERENCES `estudiantes` (`rut`),
  CONSTRAINT `historialAcademico_ibfk_2` FOREIGN KEY (`codigo_IPC`) REFERENCES `asignaturasIPC` (`codigo_IPC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialAcademico`
--

LOCK TABLES `historialAcademico` WRITE;
/*!40000 ALTER TABLE `historialAcademico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialAcademico` ENABLE KEYS */;
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

-- Dump completed on 2024-11-05 14:32:08

CREATE DATABASE  IF NOT EXISTS `qhoto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qhoto`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: qhoto-db.c2k2xt6qu8x0.ap-northeast-2.rds.amazonaws.com    Database: qhoto
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `active_daily`
--

DROP TABLE IF EXISTS `active_daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_daily` (
  `active_daily_id` bigint NOT NULL AUTO_INCREMENT,
  `daily_quest_date` date NOT NULL,
  `daily_quest_status` varchar(255) NOT NULL,
  `quest_id` bigint NOT NULL,
  PRIMARY KEY (`active_daily_id`),
  KEY `FK9q1k3a4miplw7ng8096y96xji` (`quest_id`),
  CONSTRAINT `FK9q1k3a4miplw7ng8096y96xji` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_daily`
--

LOCK TABLES `active_daily` WRITE;
/*!40000 ALTER TABLE `active_daily` DISABLE KEYS */;
INSERT INTO `active_daily` VALUES (1,'2022-10-02','D',1),(2,'2022-10-02','D',2),(3,'2022-10-02','D',3),(4,'2022-10-03','D',10),(5,'2022-10-03','D',11),(6,'2022-10-03','D',12),(7,'2022-10-04','D',19),(8,'2022-10-04','D',20),(9,'2022-10-04','D',21),(10,'2022-10-05','D',25),(11,'2022-10-05','D',26),(12,'2022-10-05','D',27),(13,'2022-10-06','D',28),(14,'2022-10-06','D',29),(15,'2022-10-06','D',30),(16,'2022-10-07','D',1),(17,'2022-10-07','D',2),(18,'2022-10-07','D',3),(19,'2022-10-08','D',10),(20,'2022-10-08','D',11),(21,'2022-10-08','D',12),(22,'2022-10-09','D',19),(23,'2022-10-09','D',20),(24,'2022-10-09','D',21),(25,'2022-10-10','D',25),(26,'2022-10-10','D',26),(27,'2022-10-10','D',27),(28,'2022-10-11','D',28),(29,'2022-10-11','D',29),(30,'2022-10-11','D',30),(31,'2022-10-12','D',1),(32,'2022-10-12','D',2),(33,'2022-10-12','D',3),(34,'2022-10-13','D',10),(35,'2022-10-13','D',11),(36,'2022-10-13','D',12),(37,'2022-10-14','D',19),(38,'2022-10-14','D',20),(39,'2022-10-14','D',21),(40,'2022-10-15','D',25),(41,'2022-10-15','D',26),(42,'2022-10-15','D',27),(43,'2022-10-16','D',28),(44,'2022-10-16','D',29),(45,'2022-10-16','D',30),(46,'2022-10-17','D',1),(47,'2022-10-17','D',2),(48,'2022-10-17','D',3),(49,'2022-10-18','D',10),(50,'2022-10-18','D',11),(51,'2022-10-18','D',12),(52,'2022-10-19','D',19),(53,'2022-10-19','D',20),(54,'2022-10-19','D',21),(55,'2022-10-20','D',25),(56,'2022-10-20','D',26),(57,'2022-10-20','D',27),(58,'2022-10-21','D',28),(59,'2022-10-21','D',29),(60,'2022-10-21','D',30),(61,'2022-10-22','D',1),(62,'2022-10-22','D',2),(63,'2022-10-22','D',3),(64,'2022-10-23','D',10),(65,'2022-10-23','D',11),(66,'2022-10-23','D',12),(67,'2022-10-24','D',19),(68,'2022-10-24','D',20),(69,'2022-10-24','D',21),(70,'2022-10-25','D',25),(71,'2022-10-25','D',26),(72,'2022-10-25','D',27),(73,'2022-10-26','D',28),(74,'2022-10-26','D',29),(75,'2022-10-26','D',30),(76,'2022-10-27','D',1),(77,'2022-10-27','D',2),(78,'2022-10-27','D',3),(79,'2022-10-28','D',10),(80,'2022-10-28','D',11),(81,'2022-10-28','D',12),(82,'2022-10-29','D',19),(83,'2022-10-29','D',20),(84,'2022-10-29','D',21),(85,'2022-10-30','D',25),(86,'2022-10-30','D',26),(87,'2022-10-30','D',27),(88,'2022-10-31','D',28),(89,'2022-10-31','D',29),(90,'2022-10-31','D',30),(91,'2022-11-01','D',1),(92,'2022-11-01','D',2),(93,'2022-11-01','D',3),(94,'2022-11-02','D',10),(95,'2022-11-02','D',11),(96,'2022-11-02','D',12),(97,'2022-11-03','D',19),(98,'2022-11-03','D',20),(99,'2022-11-03','D',21),(100,'2022-11-04','D',25),(101,'2022-11-04','D',26),(102,'2022-11-04','D',27),(103,'2022-11-05','D',28),(104,'2022-11-05','D',29),(105,'2022-11-05','D',30),(106,'2022-11-06','D',1),(107,'2022-11-06','D',2),(108,'2022-11-06','D',3),(109,'2022-11-07','D',10),(110,'2022-11-07','D',11),(111,'2022-11-07','D',12),(112,'2022-11-08','D',19),(113,'2022-11-08','D',20),(114,'2022-11-08','D',21),(115,'2022-11-09','D',25),(116,'2022-11-09','D',26),(117,'2022-11-09','D',27),(118,'2022-11-10','D',28),(119,'2022-11-10','D',29),(120,'2022-11-10','D',30),(121,'2022-11-11','D',1),(122,'2022-11-11','D',2),(123,'2022-11-11','D',3),(124,'2022-11-12','D',10),(125,'2022-11-12','D',11),(126,'2022-11-12','D',12),(127,'2022-11-13','D',19),(128,'2022-11-13','D',20),(129,'2022-11-13','D',21),(130,'2022-11-14','D',25),(131,'2022-11-14','D',26),(132,'2022-11-14','D',27),(133,'2022-11-15','D',28),(134,'2022-11-15','D',29),(135,'2022-11-15','D',30),(136,'2022-11-16','D',1),(137,'2022-11-16','D',3),(138,'2022-11-16','D',30),(139,'2022-11-17','D',1),(140,'2022-11-17','D',10),(141,'2022-11-17','D',30),(142,'2022-11-18','D',19),(143,'2022-11-18','D',20),(144,'2022-11-18','D',21),(145,'2022-11-19','D',25),(146,'2022-11-19','D',26),(147,'2022-11-19','D',27),(148,'2022-11-20','A',28),(149,'2022-11-20','A',29),(150,'2022-11-20','A',30),(151,'2022-11-21','D',1),(152,'2022-11-21','D',2),(153,'2022-11-21','D',3);
/*!40000 ALTER TABLE `active_daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_monthly`
--

DROP TABLE IF EXISTS `active_monthly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_monthly` (
  `active_monthly_id` bigint NOT NULL AUTO_INCREMENT,
  `monthly_quest_date` date NOT NULL,
  `monthly_quest_status` varchar(255) NOT NULL,
  `quest_id` bigint NOT NULL,
  PRIMARY KEY (`active_monthly_id`),
  KEY `FKkm5ludi3gh3mt2omg1f7utp1o` (`quest_id`),
  CONSTRAINT `FKkm5ludi3gh3mt2omg1f7utp1o` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_monthly`
--

LOCK TABLES `active_monthly` WRITE;
/*!40000 ALTER TABLE `active_monthly` DISABLE KEYS */;
INSERT INTO `active_monthly` VALUES (1,'2022-10-01','D',16),(2,'2022-10-01','D',17),(3,'2022-10-01','D',18),(4,'2022-11-01','A',7),(5,'2022-11-01','A',8),(6,'2022-11-01','A',9);
/*!40000 ALTER TABLE `active_monthly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_weekly`
--

DROP TABLE IF EXISTS `active_weekly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_weekly` (
  `active_weekly_id` bigint NOT NULL AUTO_INCREMENT,
  `weekly_quest_date` date NOT NULL,
  `weekly_quest_status` varchar(255) NOT NULL,
  `quest_id` bigint NOT NULL,
  PRIMARY KEY (`active_weekly_id`),
  KEY `FKt3yp1vwvytgjf1j5j9ghc4nft` (`quest_id`),
  CONSTRAINT `FKt3yp1vwvytgjf1j5j9ghc4nft` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_weekly`
--

LOCK TABLES `active_weekly` WRITE;
/*!40000 ALTER TABLE `active_weekly` DISABLE KEYS */;
INSERT INTO `active_weekly` VALUES (1,'2022-10-03','D',22),(2,'2022-10-03','D',23),(3,'2022-10-03','D',24),(4,'2022-10-10','D',4),(5,'2022-10-10','D',5),(6,'2022-10-10','D',6),(7,'2022-10-17','D',13),(8,'2022-10-17','D',14),(9,'2022-10-17','D',15),(10,'2022-10-24','D',22),(11,'2022-10-24','D',23),(12,'2022-10-24','D',24),(13,'2022-10-31','D',4),(14,'2022-10-31','D',5),(15,'2022-10-31','D',6),(16,'2022-11-07','D',13),(17,'2022-11-07','D',14),(18,'2022-11-07','D',15),(19,'2022-11-14','A',5),(20,'2022-11-14','A',15),(21,'2022-11-14','A',24),(22,'2022-11-21','D',4),(23,'2022-11-21','D',5),(24,'2022-11-21','D',6);
/*!40000 ALTER TABLE `active_weekly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `comment_context` varchar(255) NOT NULL,
  `comment_status` varchar(255) NOT NULL,
  `comment_time` datetime NOT NULL,
  `feed_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKmq57ocw5jrw8rd2lot1g8t0v2` (`feed_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmq57ocw5jrw8rd2lot1g8t0v2` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (67,'고양이 너무 이쁘죠ㅜㅜ','U','2022-11-12 00:34:59',46,44),(68,'Is it work?','U','2022-11-14 14:59:57',59,46),(69,'safasl;djksjl;fjlasjdlfjasldjflsdjlfjaskdfjl;sfjklasjdfkl;jklsjflajdfjal;sdjfklsjdfl;kldjaf;jsdljfl;sdjfklsjfdjlkfajsdkfjalsdjfkajsdl;fjsl;fjsldfjlasdjklfjalsdjaasajlafalfafffdskldlfdf','U','2022-11-14 15:26:43',59,46),(70,'normal','U','2022-11-14 15:33:10',59,46),(71,'dfadfadsf','U','2022-11-14 17:23:12',46,40),(72,'     ','U','2022-11-14 17:23:20',46,40),(73,'       ','U','2022-11-14 17:23:23',46,40),(74,'      ','U','2022-11-14 17:23:28',46,40),(75,'    ','U','2022-11-14 17:27:26',46,40),(76,'ㅁㄴㅇㄹㅁㄴㅇㄹㅇㅁㄴㄹ','U','2022-11-14 17:28:33',51,40),(77,'sdafasdfsadf','U','2022-11-15 13:33:43',63,40),(78,'adsfasdfasdf','U','2022-11-15 13:33:47',63,40),(79,'new comment','U','2022-11-15 15:45:09',67,64),(80,'comment 2','U','2022-11-15 15:46:31',67,64),(81,'옆에 친구분 씹존잘이시네여','U','2022-11-15 17:01:08',62,46),(82,'good boy','U','2022-11-16 09:16:25',48,64),(83,'    ','U','2022-11-18 11:14:01',103,40),(84,'is comment okay?','U','2022-11-19 23:16:57',94,46),(85,'comment text','U','2022-11-19 23:17:11',94,46),(86,'asdl;kfjasl;fjklsajdflkasjdlkfjasl;fjasl;jflkasdjlfajs;lfkjsfjd;lfjla;sdjf;asjdklfjlajdslkfjasklfjl;ksadjfl;asjdlfjlaskdjflas;jdflkajsdfkljkals;jdfklasdfjasd;fja;sdflkjjljfl','U','2022-11-19 23:17:38',94,46),(87,'hello','U','2022-11-20 16:17:48',106,46),(89,'와 진짜 맛있게 먹는다','U','2022-10-30 18:10:40',141,40),(90,'킹받네...','U','2022-10-30 18:30:40',141,41),(91,';;;;;','U','2022-10-30 18:31:42',141,43),(92,'안본 눈 삽니다..','U','2022-10-30 19:10:11',141,44),(93,'먹잘알 영준..','U','2022-10-30 19:30:12',141,47),(94,'치킨사줘','U','2022-10-30 19:32:33',141,48),(95,'뭘 모르네 치킨은 교촌이지','U','2022-10-30 19:33:40',141,64),(96,'뭘 모르네 치킨은 BHC지','U','2022-10-30 19:40:33',141,74),(97,'뭘 모르네 치킨은 BBQ지','U','2022-10-30 19:41:32',141,75),(98,'뭘 모르네 치킨은 푸라닭이지','U','2022-10-30 19:42:11',141,76),(99,'뭘 모르네 치킨은 깐부지','U','2022-10-30 19:43:12',141,77),(100,'우린 깐부잖어~','U','2022-10-30 19:45:22',141,78),(101,'싸피','U','2022-10-30 19:48:19',141,79),(102,'hi','U','2022-11-21 03:23:37',106,43);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exp`
--

DROP TABLE IF EXISTS `exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exp` (
  `exp_id` bigint NOT NULL AUTO_INCREMENT,
  `exp_point` int NOT NULL,
  `type_code` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`exp_id`),
  KEY `FKj3ny0l41ekysk4iqur3k20wuy` (`type_code`),
  KEY `FK5g0eyksvr1mmmk7hk4ccct5oy` (`user_id`),
  CONSTRAINT `FK5g0eyksvr1mmmk7hk4ccct5oy` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKj3ny0l41ekysk4iqur3k20wuy` FOREIGN KEY (`type_code`) REFERENCES `quest_type` (`type_code`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exp`
--

LOCK TABLES `exp` WRITE;
/*!40000 ALTER TABLE `exp` DISABLE KEYS */;
INSERT INTO `exp` VALUES (216,40,'C',40),(217,90,'D',40),(218,100,'E',40),(219,10,'H',40),(220,0,'S',40),(221,0,'C',41),(222,90,'D',41),(223,70,'E',41),(224,10,'H',41),(225,30,'S',41),(231,10,'C',43),(232,30,'D',43),(233,120,'E',43),(234,40,'H',43),(235,0,'S',43),(236,30,'C',44),(237,30,'D',44),(238,100,'E',44),(239,10,'H',44),(240,30,'S',44),(246,80,'C',46),(247,150,'D',46),(248,200,'E',46),(249,130,'H',46),(250,330,'S',46),(251,0,'C',47),(252,0,'D',47),(253,0,'E',47),(254,0,'H',47),(255,0,'S',47),(256,0,'C',48),(257,30,'D',48),(258,0,'E',48),(259,10,'H',48),(260,0,'S',48),(271,0,'C',64),(272,60,'D',64),(273,0,'E',64),(274,0,'H',64),(275,0,'S',64),(321,0,'C',74),(322,30,'D',74),(323,0,'E',74),(324,0,'H',74),(325,0,'S',74),(326,0,'C',75),(327,30,'D',75),(328,0,'E',75),(329,0,'H',75),(330,0,'S',75),(331,0,'C',76),(332,30,'D',76),(333,0,'E',76),(334,0,'H',76),(335,0,'S',76),(336,0,'C',77),(337,30,'D',77),(338,0,'E',77),(339,0,'H',77),(340,0,'S',77),(341,0,'C',78),(342,30,'D',78),(343,0,'E',78),(344,0,'H',78),(345,0,'S',78),(346,0,'C',79),(347,0,'D',79),(348,100,'E',79),(349,0,'H',79),(350,0,'S',79),(351,0,'C',80),(352,30,'D',80),(353,0,'E',80),(354,0,'H',80),(355,0,'S',80);
/*!40000 ALTER TABLE `exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exp_grade`
--

DROP TABLE IF EXISTS `exp_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exp_grade` (
  `exp_grade_id` bigint NOT NULL AUTO_INCREMENT,
  `boundary_point` int NOT NULL,
  `grade_name` varchar(255) NOT NULL,
  PRIMARY KEY (`exp_grade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exp_grade`
--

LOCK TABLES `exp_grade` WRITE;
/*!40000 ALTER TABLE `exp_grade` DISABLE KEYS */;
INSERT INTO `exp_grade` VALUES (1,5000,'purple'),(2,2500,'navy'),(3,1000,'blue'),(4,500,'green'),(5,200,'yellow'),(6,50,'orange'),(7,0,'red');
/*!40000 ALTER TABLE `exp_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feed_id` bigint NOT NULL AUTO_INCREMENT,
  `quest_dfficulty` int NOT NULL,
  `quest_duration` varchar(255) NOT NULL,
  `feed_image` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `quest_score` int NOT NULL,
  `feed_status` varchar(255) NOT NULL,
  `feed_time` datetime NOT NULL,
  `type_code` varchar(255) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `active_daily_id` bigint DEFAULT NULL,
  `active_monthly_id` bigint DEFAULT NULL,
  `active_weekly_id` bigint DEFAULT NULL,
  `quest_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `quest_name` varchar(255) NOT NULL,
  `feed_type` varchar(255) NOT NULL,
  PRIMARY KEY (`feed_id`),
  KEY `FK1rx52iuobxn768yveomtqndlb` (`quest_id`),
  KEY `FKeupe1ba7u2e7sr6r3fa4dhdo7` (`user_id`),
  KEY `FKmoavgejbe1pbjuts3yf7ovfu3` (`active_daily_id`),
  KEY `FKbbuyx1lx4vtxhm72d0qt3un4e` (`active_monthly_id`),
  KEY `FK39jfre02embkvmkv6wmshuc8b` (`active_weekly_id`),
  CONSTRAINT `FK1rx52iuobxn768yveomtqndlb` FOREIGN KEY (`quest_id`) REFERENCES `quest` (`quest_id`),
  CONSTRAINT `FK39jfre02embkvmkv6wmshuc8b` FOREIGN KEY (`active_weekly_id`) REFERENCES `active_weekly` (`active_weekly_id`),
  CONSTRAINT `FKbbuyx1lx4vtxhm72d0qt3un4e` FOREIGN KEY (`active_monthly_id`) REFERENCES `active_monthly` (`active_monthly_id`),
  CONSTRAINT `FKeupe1ba7u2e7sr6r3fa4dhdo7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKidxoi3ut1j1yy6y36f5vd0l1f` FOREIGN KEY (`active_monthly_id`) REFERENCES `active_daily` (`active_daily_id`),
  CONSTRAINT `FKmoavgejbe1pbjuts3yf7ovfu3` FOREIGN KEY (`active_daily_id`) REFERENCES `active_daily` (`active_daily_id`),
  CONSTRAINT `FKqusd53s41tsi1rcxu6cibox50` FOREIGN KEY (`active_weekly_id`) REFERENCES `active_daily` (`active_daily_id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (46,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ksh3967@naver.com/고양이_사진_퀘스트_D.jpg','멀티캠퍼스',30,'U','2022-11-11 23:16:30','D','일상',121,NULL,NULL,1,44,'고양이<br>사진찍기','I'),(47,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ksh3967@naver.com/무지개색_사진_퀘스트_W.jpg','멀티캠퍼스',30,'U','2022-11-11 23:20:34','C','색깔 및 모양',NULL,NULL,16,13,44,'빨주노초파남보<br>모아두고 찍기','I'),(48,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ksh3967@naver.com/플로깅_사진_퀘스트_M.jpeg','멀티캠퍼스',100,'U','2022-11-11 23:24:50','E','환경',NULL,4,NULL,7,44,'플로깅하기','I'),(49,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/accent680@naver.com/형진_고양이_D.jpg','멀티캠퍼스',30,'U','2022-11-11 23:29:03','D','일상',121,NULL,NULL,1,40,'고양이<br>사진찍기','I'),(50,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/영준_고양이_D.jfif','멀티캠퍼스',30,'U','2022-11-11 23:30:33','D','일상',121,NULL,NULL,1,46,'고양이<br>사진찍기','I'),(51,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jkimlow@naver.com/rn_image_picker_lib_temp_3c60c93c-7eda-432c-a6e7-d0bfb3e94f3e.jpg','멀티캠퍼스',30,'U','2022-11-11 23:36:23','D','일상',121,NULL,NULL,1,43,'고양이<br>사진찍기','I'),(52,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_42223595-9db5-401a-b2fe-95731c06c90c.jpg','멀티캠퍼스',30,'U','2022-11-11 23:53:50','D','일상',121,NULL,NULL,1,41,'고양이<br>사진찍기','I'),(53,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/video/input/accent680@naver.com/rn_image_picker_lib_temp_2efc6e5c-1240-470d-8242-c757c0755524.mp4','멀티캠퍼스',30,'U','2022-11-11 23:58:32','C','색깔 및 모양',NULL,NULL,16,13,40,'빨주노초파남보<br>모아두고 찍기','V'),(56,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306%40naver.com/%EB%AC%B4%EC%A7%80%EA%B0%9C.jpg','멀티캠퍼스',30,'U','2022-11-14 03:12:26','C','색깔 및 모양',NULL,NULL,16,13,46,'빨주노초파남보<br>모아두고 찍기','I'),(57,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_365299d4-69f5-4f20-a8c3-0be9a12783f5.jpg','멀티캠퍼스',10,'U','2022-11-14 09:20:08','H','건강',130,NULL,NULL,25,41,'아침먹기','I'),(59,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/video/input/ksh3967@naver.com/rn_image_picker_lib_temp_89ddeb02-99e3-47fb-a956-9d6bbbb99ee5.mp4','멀티캠퍼스',30,'U','2022-11-14 10:24:56','S','이색',132,NULL,NULL,27,44,'날아가는<br>비둘기 찍기','V'),(60,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/mstkang@gmail.com/rn_image_picker_lib_temp_7cba8982-ebbc-4e1a-9de8-e733b949e103.jpg','멀티캠퍼스',10,'U','2022-11-14 10:42:02','H','건강',130,NULL,NULL,25,48,'아침먹기','I'),(61,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/mstkang@gmail.com/rn_image_picker_lib_temp_176e29a3-b97d-4a41-b3f4-df553c16ba77.jpg','멀티캠퍼스',30,'U','2022-11-14 10:52:14','D','일상',NULL,NULL,19,22,48,'스스로 최대한<br>꾸며보기','I'),(62,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ksh3967@naver.com/rn_image_picker_lib_temp_b662b222-ba6d-4f02-9fc7-c375a0aab1da.jpg','멀티캠퍼스',10,'U','2022-11-15 10:46:40','H','건강',133,NULL,NULL,28,44,'10분 산책하기','I'),(63,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/accent680@naver.com/rn_image_picker_lib_temp_9d6928a2-ad73-4665-9d94-b94c84606284.jpg','멀티캠퍼스',10,'U','2022-11-15 12:58:18','H','건강',133,NULL,NULL,28,40,'10분 산책하기','I'),(64,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/video/input/accent680@naver.com/rn_image_picker_lib_temp_765c5aae-7ded-4f0a-be52-49e3d12da46e.mp4','멀티캠퍼스',30,'U','2022-11-15 13:01:02','D','일상',NULL,NULL,19,22,40,'스스로 최대한<br>꾸며보기','V'),(65,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/accent680@naver.com/rn_image_picker_lib_temp_d9337caa-504f-461b-a546-daaf42cf03cc.jpg','멀티캠퍼스',30,'U','2022-11-15 14:25:51','D','일상',1,NULL,NULL,1,40,'고양이<br>사진찍기','I'),(66,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_cf55ebc3-3ac0-44c2-b833-f9a699d88071.jpg','멀티캠퍼스',30,'U','2022-11-15 14:32:40','D','일상',1,NULL,NULL,1,41,'고양이<br>사진찍기','I'),(67,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/audrb96%40naver.com/%EA%B3%A0%EA%B3%A0%EB%83%A5%EC%9D%B4.png','멀티캠퍼스',30,'U','2022-11-15 15:28:30','D','일상',1,NULL,NULL,1,64,'고양이<br>사진찍기','I'),(69,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_42e9f8b1-c03d-4b7a-a01a-9811424b076e.jpg','멀티캠퍼스',30,'U','2022-11-16 15:20:41','D','일상',136,NULL,NULL,1,41,'고양이<br>사진찍기','I'),(72,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/audrb96%40naver.com/%EA%B3%A0%EA%B3%A0%EB%83%A5%EC%9D%B4.png','멀티캠퍼스',30,'U','2022-11-17 10:34:58','D','일상',139,NULL,NULL,1,64,'고양이<br>사진찍기','I'),(73,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/alstjd5255%40naver.com/%EA%B3%A0%EC%96%91%EC%9D%B4%ED%94%BC%EA%B7%9C%EC%96%B4.jpg','멀티캠퍼스',30,'U','2022-11-17 10:39:45','D','일상',139,NULL,NULL,1,74,'고양이<br>사진찍기','I'),(74,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/hsw9703%40nate.com/%EA%B3%A0%EB%83%A5%EC%9D%B42.jpg','멀티캠퍼스',30,'U','2022-11-17 10:45:26','D','일상',139,NULL,NULL,1,75,'고양이<br>사진찍기','I'),(75,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/zaq3102%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B46.jpg','멀티캠퍼스',30,'U','2022-11-17 10:48:30','D','일상',139,NULL,NULL,1,76,'고양이<br>사진찍기','I'),(76,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/yung5487%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B44.jpg','멀티캠퍼스',30,'U','2022-11-17 10:53:36','D','일상',139,NULL,NULL,1,77,'고양이<br>사진찍기','I'),(77,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jeongyy98%40gmail.com/%EA%B3%A0%EB%83%A5%EC%9D%B45.jpg','멀티캠퍼스',30,'U','2022-11-17 10:59:20','D','일상',139,NULL,NULL,1,78,'고양이<br>사진찍기','I'),(78,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jasminema%40naver.com/%ED%94%8C%EB%A1%9C%EA%B9%852.jpg','멀티캠퍼스',100,'U','2022-11-17 11:05:39','E','환경',NULL,4,NULL,7,79,'30분 플로깅하기','I'),(79,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/migon99%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B43.jpg','멀티캠퍼스',30,'U','2022-11-17 11:08:42','D','일상',139,NULL,NULL,1,80,'고양이<br>사진찍기','I'),(80,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/migon99%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B43.jpg','멀티캠퍼스',30,'U','2022-11-21 06:11:55','D','일상',151,NULL,NULL,1,74,'고양이<br>사진찍기','I'),(81,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/hsw9703%40nate.com/%EB%B9%A8%EA%B0%84%EC%83%89%EC%B0%8D%EA%B8%B01.jpg','멀티캠퍼스',10,'U','2022-11-21 06:30:55','C','색깔 및 모양',152,NULL,NULL,2,75,'빨간색 찍기','I'),(82,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/zaq3102%40naver.com/%ED%85%80%EB%B8%94%EB%9F%AC%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.jpeg','멀티캠퍼스',20,'U','2022-11-21 06:30:42','E','환경',153,NULL,NULL,3,76,'일회용품<br>사용하지 않기','I'),(83,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/yung5487%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B44.jpg','멀티캠퍼스',30,'U','2022-11-21 06:31:15','D','일상',151,NULL,NULL,1,77,'고양이<br>사진찍기','I'),(84,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jeongyy98%40gmail.com/%EB%B9%A8%EA%B0%84%EC%83%89%EC%B0%8D%EA%B8%B02.jfif','멀티캠퍼스',10,'U','2022-11-21 06:31:22','C','색깔 및 모양',152,NULL,NULL,2,78,'빨간색 찍기','I'),(85,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jasminema%40naver.com/%EC%9D%BC%ED%9A%8C%EC%9A%A9%ED%92%88%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80%EC%95%8A%EA%B8%B02.jfif','멀티캠퍼스',20,'U','2022-11-21 06:38:11','E','환경',153,NULL,NULL,3,79,'일회용품<br>사용하지 않기','I'),(86,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/migon99%40naver.com/%EA%B3%A0%EB%83%A5%EC%9D%B43.jpg','멀티캠퍼스',30,'U','2022-11-21 06:55:33','D','일상',151,NULL,NULL,1,80,'고양이<br>사진찍기','I'),(87,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/migon99%40naver.com/%EA%BD%83%EC%84%A0%EB%AC%BC.jpg','멀티캠퍼스',70,'U','2022-11-21 06:22:38','S','이색',NULL,NULL,22,4,74,'주변 사람들에게<br>꽃선물하기','I'),(88,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/hsw9703%40nate.com/%EB%8B%AC%EB%A6%AC%EA%B8%B0.png','멀티캠퍼스',30,'U','2022-11-21 06:11:57','H','건강',NULL,NULL,23,5,75,'3km 달리기','I'),(89,2,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/zaq3102%40naver.com/%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%99.jpg','멀티캠퍼스',50,'U','2022-11-21 06:39:55','D','일상',NULL,NULL,24,6,76,'봉사활동','I'),(90,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/yung5487%40naver.com/%EA%BD%83%EC%84%A0%EB%AC%BC2.jfif','멀티캠퍼스',70,'U','2022-11-21 06:38:48','S','이색',NULL,NULL,22,4,77,'주변 사람들에게<br>꽃선물하기','I'),(91,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jeongyy98%40gmail.com/%EB%8B%AC%EB%A6%AC%EA%B8%B02.jpg','멀티캠퍼스',30,'U','2022-11-21 06:33:22','H','건강',NULL,NULL,23,5,78,'3km 달리기','I'),(92,2,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jasminema%40naver.com/%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%992.jpg','멀티캠퍼스',50,'U','2022-11-21 06:35:33','D','일상',NULL,NULL,24,6,79,'봉사활동','I'),(93,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/migon99%40naver.com/%EA%BD%83%EC%84%A0%EB%AC%BC3.jpg','멀티캠퍼스',70,'U','2022-11-21 06:34:42','S','이색',NULL,NULL,22,4,80,'주변 사람들에게<br>꽃선물하기','I'),(94,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%853.jpg','멀티캠퍼스',100,'U','2022-11-21 06:33:33','E','환경',NULL,4,NULL,7,74,'30분 플로깅하기','I'),(95,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8512.jpg','멀티캠퍼스',100,'U','2022-11-21 06:23:44','E','환경',NULL,4,NULL,7,75,'30분 플로깅하기','I'),(96,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%93%B1%EC%82%B0%ED%95%98%EA%B8%B0.jpg','멀티캠퍼스',120,'U','2022-11-21 06:22:42','H','건강',NULL,6,NULL,9,76,'등산하기','I'),(97,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8513.jpg','멀티캠퍼스',100,'U','2022-11-21 06:11:55','E','환경',NULL,4,NULL,7,77,'30분 플로깅하기','I'),(98,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8547.jpg','멀티캠퍼스',120,'U','2022-11-21 06:09:55','H','건강',NULL,6,NULL,9,78,'등산하기','I'),(99,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%93%B1%EC%82%B0%ED%95%98%EA%B8%B03.jpg','멀티캠퍼스',120,'U','2022-11-21 06:07:55','H','건강',NULL,6,NULL,9,79,'등산하기','I'),(100,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8514.jpg','멀티캠퍼스',100,'U','2022-11-21 06:03:55','E','환경',NULL,4,NULL,7,80,'30분 플로깅하기','I'),(102,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jkimlow@naver.com/rn_image_picker_lib_temp_bf29577d-7ef5-4c33-9a47-a254a4ccb117.jpg','멀티캠퍼스',10,'U','2022-11-18 10:52:24','C','색깔 및 모양',142,NULL,NULL,19,43,'별모양 찍기','I'),(103,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/accent680@naver.com/rn_image_picker_lib_temp_a1ac817f-8a97-4f5a-a6a7-edd3ccb8dbb0.jpg','멀티캠퍼스',10,'U','2022-11-18 11:12:31','C','색깔 및 모양',142,NULL,NULL,19,40,'별모양 찍기','I'),(104,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_403d468c-c23c-4d68-9c66-f0813c36cd2c.jpg','멀티캠퍼스',70,'U','2022-11-18 16:32:45','E','환경',NULL,NULL,20,15,41,'필요 없는 물건<br>물물 교환 하기','I'),(105,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jkimlow@naver.com/rn_image_picker_lib_temp_c36a1e71-4f68-490c-a197-0a80236f717b.jpg','멀티캠퍼스',30,'U','2022-11-19 00:06:26','H','건강',NULL,NULL,19,5,43,'3km 달리기','I'),(106,3,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/rn_image_picker_lib_temp_6916733d-b54f-4226-8c71-80f17251fcff.jpg','멀티캠퍼스',150,'U','2022-11-19 00:10:49','S','이색',NULL,5,NULL,8,46,'브라질리언 왁싱하기','I'),(107,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/ygeum2@naver.com/rn_image_picker_lib_temp_b81c5c98-2fe5-4e6c-8e66-6f839c63a961.jpg','멀티캠퍼스',30,'U','2022-11-19 17:50:12','S','이색',147,NULL,NULL,27,41,'날아가는<br>비둘기 찍기','I'),(108,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jkimlow@naver.com/rn_image_picker_lib_temp_bd520071-80e8-4736-bd68-b61835c968cb.jpg','멀티캠퍼스',10,'U','2022-11-19 22:25:59','H','건강',145,NULL,NULL,25,43,'아침먹기','I'),(110,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/audrb96%40naver.com/%EA%B3%A0%EC%96%91%EC%9D%B41.jpg','멀티캠퍼스',30,'U','2022-11-21 06:19:55','D','일상',151,NULL,NULL,1,64,'고양이<br>사진찍기','I'),(111,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/mstkang%40gmail.com/%EB%B9%A8%EA%B0%84%EC%83%891.jpg','멀티캠퍼스',10,'U','2022-11-21 06:17:40','C','색깔 및 모양',152,NULL,NULL,2,48,'빨간색 찍기','I'),(112,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EC%9E%AC%ED%99%9C%EC%9A%A91.jpg','멀티캠퍼스',20,'U','2022-11-21 06:17:25','E','환경',153,NULL,NULL,3,40,'일회용품<br>사용하지 않기','I'),(114,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%B9%A8%EA%B0%84%EC%83%892.jpeg','멀티캠퍼스',10,'U','2022-11-21 06:35:42','C','색깔 및 모양',152,NULL,NULL,2,43,'빨간색 찍기','I'),(115,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EC%9E%AC%ED%99%9C%EC%9A%A92.jpg','멀티캠퍼스',20,'U','2022-11-21 06:35:33','E','환경',153,NULL,NULL,3,44,'일회용품<br>사용하지 않기','I'),(117,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%B9%A8%EA%B0%84%EC%83%893.jpg','멀티캠퍼스',10,'U','2022-11-21 06:44:22','C','색깔 및 모양',152,NULL,NULL,2,47,'빨간색 찍기','I'),(118,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EA%BD%83%EC%84%A0%EB%AC%BC1.jpg','멀티캠퍼스',70,'U','2022-11-21 06:32:33','S','이색',NULL,NULL,22,4,64,'주변 사람들에게<br>꽃선물하기','I'),(119,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/3km%EB%8B%AC%EB%A6%AC%EA%B8%B01.jpeg','멀티캠퍼스',30,'U','2022-11-21 06:29:11','H','건강',NULL,NULL,23,5,48,'3km 달리기','I'),(120,2,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%99%EC%82%AC%EC%A7%841.png','멀티캠퍼스',50,'U','2022-11-21 06:28:22','D','일상',NULL,NULL,24,6,40,'봉사활동','I'),(121,3,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EA%BD%83%EC%84%A0%EB%AC%BC2.jfif','멀티캠퍼스',70,'U','2022-11-21 06:22:11','S','이색',NULL,NULL,22,4,41,'주변 사람들에게<br>꽃선물하기','I'),(122,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/3km%EB%8B%AC%EB%A6%AC%EA%B8%B02.jpg','멀티캠퍼스',30,'U','2022-11-21 06:19:22','H','건강',NULL,NULL,23,5,43,'3km 달리기','I'),(123,2,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%B4%89%EC%82%AC%ED%99%9C%EB%8F%99%EC%82%AC%EC%A7%842.jpg','멀티캠퍼스',50,'U','2022-11-21 06:18:55','D','일상',NULL,NULL,24,6,44,'봉사활동','I'),(125,1,'W','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/3km%EB%8B%AC%EB%A6%AC%EA%B8%B03.jpg','멀티캠퍼스',30,'U','2022-11-21 06:17:52','H','건강',NULL,NULL,23,5,47,'3km 달리기','I'),(127,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%857.jpg','멀티캠퍼스',100,'U','2022-11-21 06:15:22','E','환경',NULL,4,NULL,7,64,'30분 플로깅하기','I'),(128,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%858.jpg','멀티캠퍼스',100,'U','2022-11-21 06:12:42','E','환경',NULL,4,NULL,7,48,'30분 플로깅하기','I'),(129,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%93%B1%EC%82%B0%ED%95%98%EA%B8%B07.jpg','멀티캠퍼스',120,'U','2022-11-21 06:11:23','H','건강',NULL,6,NULL,9,40,'등산하기','I'),(130,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8515.jpg','멀티캠퍼스',100,'U','2022-11-21 06:09:22','E','환경',NULL,4,NULL,7,41,'30분 플로깅하기','I'),(131,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%93%B1%EC%82%B0%ED%95%98%EA%B8%B08.jpg','멀티캠퍼스',120,'U','2022-11-21 06:08:11','H','건강',NULL,6,NULL,9,43,'등산하기','I'),(132,2,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%EB%93%B1%EC%82%B0%ED%95%98%EA%B8%B09.jpg','멀티캠퍼스',120,'U','2022-11-21 06:07:11','H','건강',NULL,6,NULL,9,44,'등산하기','I'),(134,1,'M','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/presentation/%ED%94%8C%EB%A1%9C%EA%B9%8511.jpg','멀티캠퍼스',100,'U','2022-11-21 06:05:11','E','환경',NULL,4,NULL,7,47,'30분 플로깅하기','I'),(136,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jkimlow@naver.com/rn_image_picker_lib_temp_2074d845-3d1f-4152-be38-3839d03d848a.jpg','멀티캠퍼스',20,'U','2022-11-21 01:30:58','E','환경',149,NULL,NULL,29,43,'손수건 들고다니기','I'),(139,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/산책.jpg','멀캠',10,'U','2022-11-05 01:59:32','H','건강',103,NULL,NULL,28,46,'10분 산책하기','I'),(140,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/고양이7.jpg','멀캠',30,'U','2022-11-06 02:01:26','D','일상',106,NULL,NULL,1,46,'고양이<br>사진찍기','I'),(141,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/아침먹기_20221030.jpg','역삼역 KFC',10,'U','2022-10-30 18:05:34','H','건강',85,NULL,NULL,25,46,'아침먹기','I'),(142,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/비타민.jpg','멀캠',10,'U','2022-11-07 02:07:04','H','건강',109,NULL,NULL,10,46,'종합비타민<br>챙겨먹기','I'),(143,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/별모양.jpg','멀캠',10,'U','2022-11-08 02:09:14','C','색깔 및 모양',112,NULL,NULL,19,46,'별모양 찍기','I'),(144,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/손수건20221031.png','백화점',20,'U','2022-10-31 18:09:53','E','환경',89,NULL,NULL,29,46,'손수건 들고다니기','I'),(145,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/산책2.jpg','멀캠',10,'U','2022-11-10 18:10:25','H','건강',118,NULL,NULL,28,46,'10분 산책하기','I'),(146,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/비타민2.jpg','멀캠',10,'U','2022-11-12 18:12:37','H','건강',124,NULL,NULL,10,46,'종합비타민<br>챙겨먹기','I'),(147,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/텀블러20221101.png','역삼역 카페 ',20,'U','2022-11-01 15:15:14','E','환경',93,NULL,NULL,3,46,'일회용품<br>사용하지 않기','I'),(148,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/아침먹기.jpg','멀캠',10,'U','2022-11-14 02:18:15','H','건강',130,NULL,NULL,25,46,'아침먹기','I'),(149,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/용기20221102.png','멀티캠퍼스 ',20,'U','2022-11-02 19:19:13','E','환경',95,NULL,NULL,11,46,'가게에 용기 들고가서<br>테이크아웃','I'),(151,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/날아가는비둘기1114.png','멀티캠퍼스 ',30,'U','2022-11-14 18:38:57','S','이색',132,NULL,NULL,27,46,'날아가는<br>비둘기 찍기','I'),(152,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/셀카찍기1115.png','멀티캠퍼스 ',30,'U','2022-11-15 19:48:00','C','색깔 및 모양',135,NULL,NULL,30,46,'같은 색 옷 입은<br>사람과 셀카 찍기','I'),(153,3,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/고양이20221115.png','멀티캠퍼스 ',30,'U','2022-11-16 16:50:14','D','일상',136,NULL,NULL,1,46,'고양이<br>사진찍기','I'),(154,1,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/별모양찍기.png','멀티캠퍼스 ',10,'U','2022-11-08 16:52:27','C','색깔 및 모양',112,NULL,NULL,19,46,'별모양 찍기','I'),(155,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/쓰레기줍기.png','멀티캠퍼스 ',20,'U','2022-10-25 16:54:05','E','환경',71,NULL,NULL,26,46,'출근하면서<br>쓰레기 줍기','I'),(156,2,'D','https://dxg5pxu9dqf6e.cloudfront.net/feed/image/jjoon0306@naver.com/쓰레기줍기.png','멀티캠퍼스 ',20,'U','2022-11-19 18:01:43','E','환경',146,NULL,NULL,26,46,'출근하면서<br>쓰레기 줍기','I');
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_like`
--

DROP TABLE IF EXISTS `feed_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_like` (
  `user_id` bigint NOT NULL,
  `feed_id` bigint NOT NULL,
  PRIMARY KEY (`feed_id`,`user_id`),
  KEY `FKie3wsosw5w1vclgev0ofclm5b` (`user_id`),
  CONSTRAINT `FKgurobtyio3jh1vn4n8tmqt842` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`),
  CONSTRAINT `FKie3wsosw5w1vclgev0ofclm5b` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_like`
--

LOCK TABLES `feed_like` WRITE;
/*!40000 ALTER TABLE `feed_like` DISABLE KEYS */;
INSERT INTO `feed_like` VALUES (40,62),(40,63),(40,102),(40,103),(40,141),(41,61),(41,64),(41,141),(43,136),(43,141),(44,59),(44,141),(46,59),(46,62),(46,96),(46,103),(46,105),(46,127),(47,141),(48,46),(48,52),(48,141),(64,141),(74,141),(75,141),(76,141),(77,141),(78,141),(79,141);
/*!40000 ALTER TABLE `feed_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `follower` bigint NOT NULL,
  `followee` bigint NOT NULL,
  PRIMARY KEY (`followee`,`follower`),
  KEY `FKc1uod3lwa3mvq794g5o2cpjxx` (`follower`),
  CONSTRAINT `FKc1uod3lwa3mvq794g5o2cpjxx` FOREIGN KEY (`follower`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKlhrcqdugrme4jgldv9r5up98c` FOREIGN KEY (`followee`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (40,41),(40,43),(40,44),(40,46),(40,64),(41,40),(41,48),(43,40),(43,46),(44,40),(44,46),(44,64),(46,40),(46,43),(46,44),(46,47),(46,64),(46,75),(46,76),(46,77),(46,78),(46,79),(46,80),(47,46),(48,41),(64,40),(64,44),(64,46),(75,46),(76,46),(77,46),(78,46),(79,46),(80,46);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_request` (
  `friend_request_id` bigint NOT NULL AUTO_INCREMENT,
  `request_status` varchar(255) NOT NULL,
  `request_time` datetime NOT NULL,
  `request_user` bigint NOT NULL,
  `response_user` bigint NOT NULL,
  PRIMARY KEY (`friend_request_id`),
  KEY `FKc7debp9nun8avcjkst8fwgae` (`request_user`),
  KEY `FK5c2q8thu16uxktesgc7cdimh7` (`response_user`),
  CONSTRAINT `FK5c2q8thu16uxktesgc7cdimh7` FOREIGN KEY (`response_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKc7debp9nun8avcjkst8fwgae` FOREIGN KEY (`request_user`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_request`
--

LOCK TABLES `friend_request` WRITE;
/*!40000 ALTER TABLE `friend_request` DISABLE KEYS */;
INSERT INTO `friend_request` VALUES (70,'F','2022-11-11 23:13:47',44,46),(71,'F','2022-11-11 23:13:47',46,44),(80,'F','2022-11-11 23:41:21',40,44),(81,'F','2022-11-11 23:41:21',44,40),(82,'F','2022-11-14 08:46:16',40,43),(83,'F','2022-11-14 08:46:16',43,40),(88,'F','2022-11-14 11:07:34',41,48),(114,'F','2022-11-15 14:11:07',46,40),(115,'F','2022-11-15 14:11:07',40,46),(116,'F','2022-11-15 15:27:40',64,44),(117,'F','2022-11-15 15:27:40',44,64),(118,'F','2022-11-15 15:27:55',64,46),(119,'F','2022-11-15 15:27:55',46,64),(120,'F','2022-11-16 11:46:35',64,40),(121,'F','2022-11-16 11:46:35',40,64),(126,'D','2022-11-16 13:59:57',41,43),(127,'D','2022-11-16 13:59:57',43,41),(142,'G','2022-11-16 14:36:33',44,41),(143,'R','2022-11-16 14:36:33',41,44),(154,'F','2022-11-17 09:40:08',46,75),(155,'F','2022-11-17 09:40:08',75,46),(156,'F','2022-11-17 09:40:08',46,76),(157,'F','2022-11-17 09:40:08',76,46),(158,'F','2022-11-17 09:40:08',46,77),(159,'F','2022-11-17 09:40:08',77,46),(160,'F','2022-11-17 09:40:08',46,78),(161,'F','2022-11-17 09:40:08',78,46),(162,'F','2022-11-17 09:40:08',46,79),(163,'F','2022-11-17 09:40:08',79,46),(164,'F','2022-11-17 09:40:08',46,80),(165,'F','2022-11-17 09:40:08',80,46),(176,'G','2022-11-18 15:01:53',41,40),(177,'R','2022-11-18 15:01:53',40,41),(180,'F','2022-11-19 14:27:31',46,43),(181,'F','2022-11-19 14:27:31',43,46),(182,'F','2022-11-19 14:27:31',46,47),(183,'F','2022-11-19 14:27:31',47,46),(184,'F','2022-11-17 09:40:08',48,41);
/*!40000 ALTER TABLE `friend_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest`
--

DROP TABLE IF EXISTS `quest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quest` (
  `quest_id` bigint NOT NULL AUTO_INCREMENT,
  `quest_difficulty` int NOT NULL,
  `quest_duration` varchar(255) NOT NULL,
  `quest_name` varchar(255) NOT NULL,
  `quest_score` int NOT NULL,
  `quest_status` varchar(255) NOT NULL,
  `type_code` varchar(255) NOT NULL,
  PRIMARY KEY (`quest_id`),
  KEY `FK4jv2nln08ed6pcpq5bc5ptlf` (`type_code`),
  CONSTRAINT `FK4jv2nln08ed6pcpq5bc5ptlf` FOREIGN KEY (`type_code`) REFERENCES `quest_type` (`type_code`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest`
--

LOCK TABLES `quest` WRITE;
/*!40000 ALTER TABLE `quest` DISABLE KEYS */;
INSERT INTO `quest` VALUES (1,3,'D','고양이<br>사진찍기',30,'A','D'),(2,1,'D','빨간색 찍기',10,'A','C'),(3,2,'D','일회용품<br>사용하지 않기',20,'A','E'),(4,3,'W','주변 사람들에게<br>꽃선물하기',70,'A','S'),(5,1,'W','3km 달리기',30,'A','H'),(6,2,'W','봉사활동',50,'A','D'),(7,1,'M','30분 플로깅하기',100,'A','E'),(8,3,'M','브라질리언 왁싱하기',150,'A','S'),(9,2,'M','등산하기',120,'A','H'),(10,1,'D','종합비타민<br>챙겨먹기',10,'A','H'),(11,2,'D','가게에 용기 들고가서<br>테이크아웃',20,'A','E'),(12,3,'D','그랜절 인증',30,'A','S'),(13,1,'W','빨주노초파남보<br>모아두고 찍기',30,'A','C'),(14,2,'W','친구 흰머리 뽑아주기',50,'A','D'),(15,3,'W','필요 없는 물건<br>물물 교환 하기',70,'A','E'),(16,1,'M','민속극 보러가기',100,'A','S'),(17,2,'M','나무심기',120,'A','E'),(18,3,'M','즉흥 바다여행가서<br>예쁜 색깔 찍기',150,'A','C'),(19,1,'D','별모양 찍기',10,'A','C'),(20,2,'D','맨손으로 밥먹기',20,'A','S'),(21,3,'D','메일함 비우기',30,'A','E'),(22,1,'W','스스로 최대한<br>꾸며보기',30,'A','D'),(23,2,'W','친구랑 헬스장 가기',50,'A','H'),(24,3,'W','친구 세족식 해주기',70,'A','S'),(25,1,'D','아침먹기',10,'A','H'),(26,2,'D','출근하면서<br>쓰레기 줍기',20,'A','E'),(27,3,'D','날아가는<br>비둘기 찍기',30,'A','S'),(28,1,'D','10분 산책하기',10,'A','H'),(29,2,'D','손수건 들고다니기',20,'A','E'),(30,3,'D','같은 색 옷 입은<br>사람과 셀카 찍기',30,'A','C');
/*!40000 ALTER TABLE `quest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest_type`
--

DROP TABLE IF EXISTS `quest_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quest_type` (
  `type_code` varchar(255) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest_type`
--

LOCK TABLES `quest_type` WRITE;
/*!40000 ALTER TABLE `quest_type` DISABLE KEYS */;
INSERT INTO `quest_type` VALUES ('C','색깔 및 모양'),('D','일상'),('E','환경'),('H','건강'),('S','이색');
/*!40000 ALTER TABLE `quest_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `auth_provider` varchar(255) DEFAULT NULL,
  `contact_agree` bit(1) NOT NULL,
  `contact_agree_date` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `join_date` date NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `profile_open` bit(1) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `user_description` varchar(255) DEFAULT NULL,
  `exp_grade` varchar(255) NOT NULL,
  `total_exp` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (75,'KAKAO',_binary '','2022-11-17','asdf3@nate.com','https://k.kakaocdn.net/dn/CJj1o/btrPuHpqDoo/vWMxxVgtO1kCBHBXsVoVM1/img_640x640.jpg','2022-11-17','SANGWOO','ONIONBR34D','01021231842',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJRaG90byIsImlhdCI6MTY2ODY0OTMzOSwiZXhwIjoxNjk3Njc5NzM5fQ.yXSdf7EULDJSaNTU_IBc9LZpQmpmg3tteQGo5OeqgNlyrTTbmOl_PlemtttRbtoq6h1UbJnhDFHzsROmPS_GcQ',NULL,'red',30),(77,'KAKAO',_binary '','2022-11-17','yung22317@naver.com','https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg','2022-11-17','younghyun','j_dragon','01012345678',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJRaG90byIsImlhdCI6MTY2ODY0OTkzMywiZXhwIjoxNjk3NjgwMzMzfQ.UooeimhTMagkHZRXYulNgVFz8raCFHzv36n00Boh-9vSBUuAtJMl9hwtXc73qW3H2xqlSY2mcKqekrjEJwNS7w',NULL,'red',30),(80,'KAKAO',_binary '','2022-11-17','zaq3102@naver.com','https://k.kakaocdn.net/dn/Lcnqg/btrpSksEBkB/o0COvbxIk0tW1UhDm26M70/img_640x640.jpg','2022-11-17','BONOBONO','BONOBONO','01012345679',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJRaG90byIsImlhdCI6MTY2ODY1MDg0MCwiZXhwIjoxNjk3NjgxMjQwfQ.ItnThOJwik5WDODrOLrZ6mEFHeQ-fprvtg9tq441RrQID6sZJFGseiFA0e-E9tyEp2hXzoEC6Jmewunj1MQjlw',NULL,'red',30);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_user_id` bigint NOT NULL,
  `roles` varchar(255) NOT NULL,
  KEY `FKkv46dn3qakjvsk7ra33nd5sns` (`user_user_id`),
  CONSTRAINT `FKkv46dn3qakjvsk7ra33nd5sns` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (40,'USER'),(41,'USER'),(43,'USER'),(44,'USER'),(46,'USER'),(47,'USER'),(48,'USER'),(64,'USER'),(74,'USER'),(75,'USER'),(76,'USER'),(77,'USER'),(78,'USER'),(79,'USER'),(80,'USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  4:41:49

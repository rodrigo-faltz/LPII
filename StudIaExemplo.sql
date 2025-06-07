-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: jarvisapp
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int NOT NULL,
  `user_id` int NOT NULL,
  `image_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_subject_id` (`subject_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,1,1,NULL),(19,1,1,NULL),(56,1,28,NULL),(57,1,28,NULL),(58,10,28,NULL),(59,4,28,NULL),(60,11,28,NULL),(64,12,28,NULL),(71,10,32,NULL),(72,1,33,NULL),(73,2,33,NULL);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `chat_id` int NOT NULL,
  `author_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (88,'Olá! Bem-vindo ao chat sobre Matemática. Como posso ajudar você hoje?',56,0,'2025-05-25 21:30:10'),(89,'x^2-6+8',56,28,'2025-05-25 21:31:57'),(90,'A expressão que você forneceu é x² - 6 + 8. Podemos simplificá-la da seguinte forma:\n\nx² - 6 + 8 = x² + 2\n\nEssa é uma expressão quadrática simplificada. Se você tiver alguma dúvida sobre ela, como calcular o valor de x para um determinado resultado, ou precisar de mais informações, pode perguntar!',56,0,'2025-05-25 21:32:01'),(91,'Como resolvo x',56,28,'2025-05-25 21:32:31'),(92,'Para resolver x na expressão x² + 2 = 0, você precisa isolar o ‘x’. Aqui estão os passos:\n\n1.  **Subtraia 2 de ambos os lados da equação:**\n    x² + 2 - 2 = 0 - 2\n    x² = -2\n\n2.  **Extraia a raiz quadrada de ambos os lados:**\n    x = ±√(-2)\n\n3.  **Simplifique usando a unidade imaginária \'i\':**\n    Lembre-se que a raiz quadrada de um número negativo é um número imaginário. A unidade imaginária é definida como √(-1) e é representada por \'i\'.\n\n    x = ±√(-1)√2\n    x = ±i√2\n\nPortanto, as soluções para x são x = i√2 e x = -i√2.\n\nVocê gostaria de saber mais sobre números imaginários ou o que significam essas soluções?',56,0,'2025-05-25 21:32:40'),(93,'Olá! Bem-vindo ao chat sobre Matemática. Como posso ajudar você hoje?',57,0,'2025-05-30 15:42:00'),(94,'Me de pitagoras',57,28,'2025-05-30 15:42:08'),(95,'Com prazer! A relação de Pitágoras é um dos conceitos fundamentais da geometria euclidiana. Vou te explicar de forma clara e objetiva:\n\n**O que é a relação de Pitágoras?**\n\nA relação de Pitágoras é uma fórmula matemática que relaciona os lados de um triângulo retângulo. Um triângulo retângulo é aquele que possui um ângulo de 90 graus (ângulo reto).\n\n**Os lados do triângulo retângulo:**\n\n*   **Hipotenusa (c):** É o lado oposto ao ângulo reto. É sempre o lado mais longo do triângulo.\n*   **Catetos (a e b):** São os dois lados que formam o ângulo reto.\n\n**A Fórmula:**\n\nA relação de Pitágoras é expressa pela seguinte fórmula:\n\n**a² + b² = c²**\n\nOnde:\n\n*   a e b são os comprimentos dos catetos.\n*   c é o comprimento da hipotenusa.\n\n**Em palavras:** O quadrado da hipotenusa é igual à soma dos quadrados dos catetos.\n\n**Exemplo:**\n\nImagine um triângulo retângulo com catetos de 3 cm e 4 cm. Para encontrar a hipotenusa, usamos a fórmula:\n\n*   3² + 4² = c²\n*   9 + 16 = c²\n*   25 = c²\n*   c = √25 = 5 cm\n\nPortanto, a hipotenusa desse triângulo mede 5 cm.\n\n**Para que serve?**\n\nA relação de Pitágoras é utilizada para calcular o comprimento de um dos lados de um triângulo retângulo, conhecendo os outros dois lados. É amplamente utilizada em diversas áreas, como arquitetura, engenharia e física.\n\nGostaria de saber mais sobre algum aspecto específico da relação de Pitágoras, como:\n\n*   A Teorema de Pitágoras\n*   A aplicação do teorema em diferentes problemas\n*   A história da descoberta do teorema?',57,0,'2025-05-30 15:42:18'),(96,'Olá! Bem-vindo ao chat sobre Geografia. Como posso ajudar você hoje?',58,0,'2025-05-30 15:42:53'),(97,'O que eh uma placa tectonica',58,28,'2025-05-30 15:43:02'),(98,'Uma placa tectônica é um fragmento da litosfera da Terra – a camada mais externa da Terra – que flui sobre a astenosfera (uma camada mais plástica e quente abaixo). Imagine um quebra-cabeça gigante que compõe a superfície da Terra. Essas placas são como peças que se movem, interagindo umas com as outras de diversas maneiras.\n\n**Principais características:**\n\n*   **Composição:** São formadas por crosta oceânica (mais densa) e crosta continental (menos densa).\n*   **Movimento:** As placas se movem a velocidades que variam de poucos centímetros até dezenas de centímetros por ano, devido às correntes de convecção no manto terrestre.\n*   **Tipos de interação:**\n    *   **Convergente:** As placas colidem, podendo formar montanhas (como a Cordilheira do Himalaia) ou causar terremotos e vulcões.\n    *   **Divergente:** As placas se afastam, permitindo a formação de nova crosta oceânica (como no meio do Atlântico).\n    *   **Transformante:** As placas deslizam horizontalmente umas em relação às outras, causando terremotos.\n\nSe tiver mais alguma dúvida sobre placas tectônicas ou como elas afetam o nosso planeta, pode perguntar!',58,0,'2025-05-30 15:43:06'),(99,'Olá! Bem-vindo ao chat sobre Literatura. Como posso ajudar você hoje?',59,0,'2025-05-30 16:02:17'),(100,'1+1',57,28,'2025-05-30 16:03:55'),(101,'2.\n\nSimplesmente! Se você adiciona 1 a 1, o resultado é sempre 2. ?',57,0,'2025-05-30 16:03:58'),(102,'Olá! Bem-vindo ao chat sobre Filosofia. Como posso ajudar você hoje?',60,0,'2025-05-30 16:04:38'),(103,'Quem foi Freud',60,28,'2025-05-30 16:05:29'),(104,'Sigmund Freud (1856-1939) foi um neurologista austríaco e o fundador da psicanálise, uma das escolas de pensamento mais influentes do século XX. Suas teorias revolucionaram a compreensão da mente humana, focando em aspectos como:\n\n*   **Inconsciente:** Freud acreditava que grande parte de nossa vida mental, incluindo desejos, medos e memórias reprimidas, opera fora da nossa consciência.\n*   **Sonhos:** Interpretava os sonhos como manifestações do inconsciente, revelando desejos e conflitos internos.\n*   **Desenvolvimento Psicossexual:** Propôs que a personalidade se desenvolve em estágios (oral, anal, fálico, latente e genital), cada um marcado por zonas erógenas e desafios específicos.\n*   **Mecanismos de Defesa:** Identificou mecanismos como a repressão, a projeção e a racionalização que a mente utiliza para lidar com conflitos e ansiedades.\n*   **Psioanálise:** Desenvolveu um método terapêutico baseado na livre associação, interpretação dos sonhos e análise da transferência para ajudar os pacientes a compreenderem e superarem seus problemas emocionais.\n\nApesar de algumas de suas teorias serem controversas e terem sido substituídas por novas descobertas na neurociência, o trabalho de Freud teve um impacto profundo na psicologia, na literatura, na arte e na cultura em geral.\n\nVocê tem alguma pergunta específica sobre a vida ou as teorias de Freud que gostaria de fazer?',60,0,'2025-05-30 16:05:34'),(112,'Vc ja fez o L?',58,32,'2025-05-30 16:29:08'),(113,'Como uma inteligência artificial, eu não tenho experiências pessoais, portanto, não \"faço\" nada no sentido humano. Não \"faço o L\" nem tenho outras experiências. Minha função é processar informações e responder às suas perguntas. \n\nEspero que tenha percebido a diferença! ? Se tiver alguma pergunta sobre Geografia ou qualquer outra matéria, pode continuar.',58,0,'2025-05-30 16:29:09'),(114,'Olá! Bem-vindo ao chat sobre Sociologia. Como posso ajudar você hoje?',64,0,'2025-05-30 16:42:24'),(115,'Me fale sociologos famosos',64,28,'2025-05-30 16:42:30'),(116,'Com prazer! A sociologia tem uma rica história e diversos pensadores influenciaram o desenvolvimento da área. Aqui estão alguns sociólogos famosos e suas principais contribuições:\n\n*   **Auguste Comte (1798-1857):** Considerado o \"pai da sociologia\", Comte propôs o positivismo, defendendo que a sociologia deveria se basear na observação científica e na busca por leis sociais.\n*   **Émile Durkheim (1858-1917):** Durkheim é um dos nomes mais importantes da sociologia. Ele investigou conceitos como a solidariedade social, o anomia (ausência de normas) e o estudo dos suicídios, buscando entender a ordem social e os fatores que a influenciam.\n*   **Karl Marx (1818-1883):** Marx é conhecido por sua análise do capitalismo, da luta de classes e da crítica às estruturas sociais. Sua obra \"O Capital\" é fundamental para a compreensão das relações de poder e das desigualdades sociais.\n*   **Max Weber (1864-1920):** Weber investigou conceitos como a racionalização, a burocracia e a ética protestante. Ele desenvolveu o conceito de \"tipo ideal\" como ferramenta metodológica para a análise social.\n*   **Harriet Martineau (1802-1876):** Pioneira na sociologia, Martineau estudou a relação entre cultura e sociedade, e analisou temas como a desigualdade de gênero e a escravidão.\n*   **Talcott Parsons (1902-1979):** Parsons desenvolveu a \"Teoria da Ação Social\", que enfatiza a importância das interações sociais na construção do conhecimento e da realidade.\n\nEsses são apenas alguns dos sociólogos mais conhecidos. Cada um deles contribuiu de forma significativa para o desenvolvimento da sociologia e para a nossa compreensão da sociedade.\n\nGostaria de saber mais sobre algum desses sociólogos em particular, ou talvez que tipo de informação sobre sociologia te interessa?',64,0,'2025-05-30 16:42:37'),(120,'ACHO',60,32,'2025-05-30 16:54:38'),(121,'Entendo. Parece que você está apenas expressando uma reação. Sem problemas! Se tiver alguma dúvida ou quiser conversar sobre algo específico de Filosofia, me diga. ?',60,0,'2025-05-30 16:54:39'),(163,'Olá! Bem-vindo ao chat sobre Geografia. Como posso ajudar você hoje?',71,0,'2025-05-31 08:56:46'),(164,'O que eh nitrato de sodio',71,32,'2025-05-31 08:56:56'),(165,'O nitrato de sódio (NaNO₃) é um composto químico inorgânico formado por sódio e nitrogênio. Ele possui diversas aplicações, sendo um importante fertilizante agrícola, pois fornece nitrogênio às plantas, essencial para o crescimento. Além disso, é utilizado em alimentos como realçador de sabor, em fotografia e em algumas aplicações industriais.\n\nGostaria de saber mais sobre algum aspecto específico do nitrato de sódio, como suas propriedades, usos ou impactos ambientais?',71,0,'2025-05-31 08:56:57'),(166,'Olá! Bem-vindo ao chat sobre Matemática. Como posso ajudar você hoje?',72,0,'2025-05-31 12:07:26'),(167,'34-2',72,33,'2025-05-31 12:07:34'),(168,'34 - 2 = 32. \n\nPosso ajudar com mais alguma questão de matemática?',72,0,'2025-05-31 12:07:37'),(169,'O que eh uma cateto',72,33,'2025-05-31 12:07:55'),(170,'Em trigonometria, um cateto é um dos lados de um triângulo retângulo que não é o hipotenusa.\n\nEm um triângulo retângulo, a hipotenusa é o lado oposto ao ângulo reto (ângulo de 90 graus) e é o lado mais longo. Os outros dois lados são chamados de catetos.\n\nPosso ajudar com mais alguma coisa relacionada a catetos ou a trigonometria em geral?',72,0,'2025-05-31 12:07:56'),(171,'Olá! Bem-vindo ao chat sobre História. Como posso ajudar você hoje?',73,0,'2025-06-06 22:58:42'),(172,'Quem ganhou a segunda guerra mundial',73,33,'2025-06-06 22:58:52'),(173,'A Segunda Guerra Mundial foi ganha pelos Aliados. Os principais membros dos Aliados foram:\n\n*   **Reino Unido**\n*   **Estados Unidos**\n*   **União Soviética**\n*   **Reino Unido**\n*   **França**\n\nA vitória aliada consolidou o fim da hegemonia nazista e marcou o início de uma nova ordem mundial.',73,0,'2025-06-06 22:59:07');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_subject_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Matemática','Álgebra, geometria, trigonometria, estatística, probabilidade e funções, preparando para raciocínio lógico','https://www.estudaqui.com/wp-content/uploads/2021/08/matematica-basica-e1641847228647.jpg'),(2,'História','Do velho ao novo continente','https://static.planejativo.com/uploads/images/2023/04/UOOzrPKgH8j4V1Fg.png'),(3,'Língua Portuguesa','Estudo da gramática, interpretação de textos, literatura brasileira e portuguesa, produção textual (redação)','https://www.fundacaotelefonicavivo.org.br/wp-content/uploads/2021/05/lingua-portuguesa-1200px-facebook.jpg'),(4,'Literatura','Análise de obras literárias, movimentos literários (como Romantismo, Modernismo), e autores clássicos','https://s5.static.brasilescola.uol.com.br/be/2022/07/livros-antigos.jpg'),(5,'Inglês','Desenvolvimento de habilidades de leitura, escrita, escuta e conversação em inglês','https://jornal.usp.br/wp-content/uploads/2023/07/20230711_00_lingua_inglesa_ingles.jpg'),(6,'Espanhol','Desenvolvimento de habilidades de leitura, escrita, escuta e conversação em espanhol','https://maiscursoslivres.com.br/cursos/espanhol-para-iniciantes.webp'),(7,'Biologia','Estudo da vida (células, ecossistemas, genética, evolução, anatomia humana)','https://pt.quizur.com/_image?href=https://img.quizur.com/f/img62671dd36d0b24.74866400.jpg?lastEdited=1650925034&w=600&h=600&f=webp'),(8,'Física','Leis da natureza (mecânica, termodinâmica, óptica, eletricidade, física moderna)','https://s1.significados.com/foto/fisica-og.jpg'),(9,'Química','Elementos químicos, reações, tabela periódica, química orgânica e ambiental','https://plataforma.hexag.online/imagemsite/708/quimica-estudo.jpg'),(10,'Geografia','Espaço geográfico, clima, globalização, geopolítica, cartografia e questões ambientais','https://humanidades.com/wp-content/uploads/2017/07/geografia-1-e1571191539294-800x416.jpg'),(11,'Filosofia','Pensamento crítico, grandes filósofos (Sócrates, Kant, Nietzsche), ética e política','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYUqRqYdsXcUpTgfqnwi4x1r6XOcl3Yk2ng&s'),(12,'Sociologia','Estudo da sociedade, instituições sociais, desigualdade, movimentos sociais e cultura','https://s5.static.brasilescola.uol.com.br/img/2019/10/sociologia.jpg');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','$2b$10$nj89E2/gIfeVARECieBoaeM8ksrK1MIftzbNOZDcY3JQZg.uAxxtq','test@example.com','2025-04-29 03:51:42'),(2,'newuser','$2b$10$twv2s0iyyGn8nxCsEPzmuupqJV1qhRMbCAKts9Ybm3rneJdIHuyVu','new@example.com','2025-04-29 14:58:41'),(8,'kuezyns1i4','$2b$10$UkXUdzMBBZoZqCoSMWZlN.lvD1vPJH1UJ0jTAyU9QdK.fB8pdPwaG','testrmtdg3mexb@example.com','2025-04-29 18:04:29'),(9,'pc0or9f4r5','$2b$10$4lmz2ZkelKFzPYIBUFn4sun8zEQ0EhQNElXurS7xE7c/0SxXBY2UG','testjaoiin4xkh@example.com','2025-04-29 18:11:59'),(10,'nu3k3owzmi','$2b$10$QCFsS96PBfpCbig6o2tYbObADP9DzhhyHrp.JPlPUPPrRw0lMVyri','testctnn8zfll8@example.com','2025-04-29 19:25:48'),(11,'y3so7mttsp','$2b$10$h3JYJU8dnCrRpIXnOdYWse2b4ALdnQTThTzvWc23mTvGQSvZrnCsq','testfenyi9m23h@example.com','2025-04-29 23:49:25'),(12,'ka5kzsv7m3','$2b$10$CmhEnh99Fo/xkuuxmhLoweorhkWRJk2e.iL3dbFF7kSpYOnSp07GO','testkj2g3in4d5@example.com','2025-04-29 23:56:11'),(13,'8l0sgh1r8q','$2b$10$RuHnKuUHGVlvi1GQ1OI1U.hX51SvgxixIU6Tr7Sv/z8Sc7hPTPnTG','testdqd41pw3n2@example.com','2025-04-29 23:57:59'),(14,'Rodrigo Faltz','$2b$10$ETMBJlwpOJh.sy4dXSpmZ.kr03OO.63efuAqSZYYfwS5q.WNb1khC','rodrigo.faltz@outlook.com','2025-04-30 00:47:02'),(15,'teste','$2b$10$PxfY2Pv2dFX8mWzbYlTx2uwDy0yMEBNdVt8kkfq08IlKRHskWU2ny','teste@teste.com','2025-04-30 03:09:45'),(24,'Rodrigo Fernandes Faltz','$2b$10$w1WUv078NXVYodsoFD/97ewMCrjlOl1F.ArXJueor.xFYhkVR3Gi6','21.01660-7@maua.br','2025-05-06 18:53:10'),(28,'teste123','$2b$10$SqXDkZ9jbG7DyOx6BvCvY.0t8KAkUPA7McSPpt2NP0rWSJDccjWA6','teste@teste.com.br','2025-05-16 14:00:14'),(32,'Andre Xavier','$2b$10$mynDq.dij.lzfhfqtD3DL.SXJ2svuaU/o0ajDjIMfccJ/HyBU3.Um','AndreXavier@gmail.com','2025-05-30 19:06:58'),(33,'Andre','$2b$10$4V01lmyrMPLceEc.m0M6au02aMaHgLzU6tcmLXWrEBcZ1kGOSyPn6','AndreXavier2@gmail.com','2025-05-31 15:07:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-07  0:00:10

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 27 mei 2026 om 12:59
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `festival_artists`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `acts`
--

CREATE TABLE `acts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `full_text` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `acts`
--

INSERT INTO `acts` (`id`, `name`, `short_description`, `full_text`, `image_url`) VALUES
(1, 'Armin van Buuren', 'trance icon', 'Five-time “World’s No. 1 DJ” and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.', 'artist-images/armin_van_buuren.png'),
(2, 'Martin Garrix', 'EDM superstar', 'Broke through as a teenager with “Animals,” Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.', 'artist-images/martin_garrix.png'),
(3, 'Kensington', 'indie rock anthems', 'Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like “Streets” and “Riddles” showcase their knack for arena-ready hooks and emotionally charged lyricism.', 'artist-images/kensington.png'),
(4, 'Within Temptation', 'symphonic metal pioneers', 'Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think “Ice Queen,” “Mother Earth”) translate into dramatic, visually stunning festival performances.', 'artist-images/within_temptation.png'),
(5, 'De Staat', 'experimental rock innovators', 'Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like “Witch Doctor” and “Down Town” highlight their genre-bending approach and infectious energy.', 'artist-images/de_staat.png'),
(6, 'Chef’Special', 'genre-blending funk-pop', 'A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like “Amigo” and “In Your Arms” makes for joyous, dance-floor-friendly live shows.', 'artist-images/chef_special.png'),
(7, 'Navarone', 'hard-hitting rock four-piece', 'Utrecht’s hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they’re tailor-made for late-night main stages.', 'artist-images/navarone.png'),
(8, 'Dotan', 'folk-pop singer-songwriter', 'Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on “Home”) have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.', 'artist-images/dotan.png'),
(9, 'Eefje de Visser', 'atmospheric indie-pop', 'Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on “Ongeveer”) create a dreamlike vibe perfect for twilight festival slots.', 'artist-images/eefje_de_visser.png'),
(10, 'Froukje', 'candid pop songwriter', 'Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she’s become a voice of her generation—ideal for mid-day festival stages.', 'artist-images/froukje.png'),
(11, 'Spinvis', 'Poetic lo-fi surrealist in pop form.', 'Erik de Jong performs under the moniker Spinvis, crafting poetic, collage-like songs that blend spoken-word snippets, lo-fi electronics and wistful pop. Since his debut album in 2002—recorded in his attic—he’s become a fixture of Dutch indie, renowned for narratives that feel both intimate and surreal. His live shows turn everyday observations into shared, dreamlike experiences.', 'artist-images/spinvis.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `act_videos`
--

CREATE TABLE `act_videos` (
  `id` int(11) NOT NULL,
  `act_id` int(11) DEFAULT NULL,
  `video_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `act_videos`
--

INSERT INTO `act_videos` (`id`, `act_id`, `video_url`) VALUES
(1, 1, 'https://www.youtube.com/watch?v=TxvpctgU_s8'),
(2, 2, 'https://www.youtube.com/watch?v=Zv1QV6lrc_Y'),
(3, 3, 'https://www.youtube.com/watch?v=IH77eOyV95o'),
(4, 4, 'https://www.youtube.com/watch?v=iQVei5C2N4E'),
(5, 5, 'https://www.youtube.com/watch?v=0ttGgIQpAUc'),
(6, 6, 'https://www.youtube.com/watch?v=l3jRIr44lss'),
(7, 7, 'https://www.youtube.com/watch?v=EvLpaCSnc4k'),
(8, 8, 'https://www.youtube.com/watch?v=FZEuqzW16Nw'),
(9, 9, 'https://www.youtube.com/watch?v=6IlLJNmLDMg'),
(10, 10, 'https://www.youtube.com/watch?v=g4PlReX9e-E'),
(11, 11, 'https://www.youtube.com/watch?v=F3ZTrGWSLf4');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `acts`
--
ALTER TABLE `acts`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `act_videos`
--
ALTER TABLE `act_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `act_id` (`act_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `acts`
--
ALTER TABLE `acts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT voor een tabel `act_videos`
--
ALTER TABLE `act_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `act_videos`
--
ALTER TABLE `act_videos`
  ADD CONSTRAINT `act_videos_ibfk_1` FOREIGN KEY (`act_id`) REFERENCES `acts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220509.53f11afcaa
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2022 at 09:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(5, 'tontarnxpz', 'aiitontanz2@gmail.com', '$2b$12$MTt3T.up2MJjhnNoGzw3ZekXNiWAraQIgink8U1SIOEH2R6yLhHIe'),
(6, 'ttxpz', 'aiitontanz3@gmail.com', '$2b$12$yi7JC86ZY2pJ0/oaC8mOeubfpm2LyOWXNS4g.zA1Mal3UHORN/4SS'),
(7, 'ttxpz2', 'aiitontanz4@gmail.com', '$2b$12$snFFzo9jJJ3SQqoMyBTwkefiOidIILwTPHAFxRFdAjhRyxB0NQK2e'),
(8, 'ttxpz3', 'aiitontanz5@gmail.com', '$2b$12$TOPcZxqnVXWzchTLm/CuiOqOXkzwBbXUpHz4LuN/Cbqr5DyKff.Hi'),
(10, 'tontarnxpz55', 'aiitontanz6@gmail.com', '$2b$12$wpZiqcCQAEEvLUe7sIiNMOq37Yc9tUy8MI4UFImTfB/ov2wKSCmE2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




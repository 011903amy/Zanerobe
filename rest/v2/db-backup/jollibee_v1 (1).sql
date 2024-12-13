-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 11, 2024 at 08:56 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jollibee_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `jollibee_category`
--

CREATE TABLE `jollibee_category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_image` varchar(20) NOT NULL,
  `category_title` varchar(30) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jollibee_category`
--

INSERT INTO `jollibee_category` (`category_aid`, `category_is_active`, `category_image`, `category_title`, `category_datetime`, `category_created`) VALUES
(5, 1, 'nav-chickenjoy.webp', 'Chicken Joy', '2024-12-11 15:25:05', 2024),
(6, 1, 'nav-burger.webp', 'Burger', '2024-12-11 15:03:35', 2024),
(7, 1, 'nav-spaghetti.webp', 'Spaghetti', '2024-12-11 15:03:43', 2024),
(8, 1, 'steak-1.webp', 'Burger Steak', '2024-12-11 15:24:03', 2024),
(9, 1, 'nav-palabok.webp', 'Palabok', '2024-12-11 15:11:17', 2024),
(10, 1, 'nav-value-meal.webp', 'Value Meal', '2024-12-11 15:12:23', 2024),
(11, 1, 'nav-desserts.webp', 'Desserts', '2024-12-11 15:12:52', 2024),
(12, 1, 'nav-sides.webp', 'Sides', '2024-12-11 15:12:59', 2024);

-- --------------------------------------------------------

--
-- Table structure for table `jollibee_food`
--

CREATE TABLE `jollibee_food` (
  `food_aid` int(11) NOT NULL,
  `food_is_active` tinyint(1) NOT NULL,
  `food_image` varchar(20) NOT NULL,
  `food_title` varchar(30) NOT NULL,
  `food_price` int(20) NOT NULL,
  `food_category_id` int(11) NOT NULL,
  `food_datetime` varchar(30) NOT NULL,
  `food_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jollibee_food`
--

INSERT INTO `jollibee_food` (`food_aid`, `food_is_active`, `food_image`, `food_title`, `food_price`, `food_category_id`, `food_datetime`, `food_created`) VALUES
(20, 1, 'burger-1.webp', 'Yumburger', 50, 6, '2024-12-11 15:34:24', 2024),
(21, 1, 'burger-2.webp', 'Yumburger w/ fries', 150, 6, '2024-12-11 15:35:26', 2024),
(22, 1, 'burger-3.webp', 'Yumcheesy burger', 79, 6, '2024-12-11 15:35:53', 2024),
(23, 1, 'chicken-1.webp', '2pc Chicken Joy', 180, 5, '2024-12-11 15:36:32', 2024),
(24, 1, 'chicken-2.webp', '3pcs Chicken Joy', 270, 5, '2024-12-11 15:37:08', 2024),
(25, 1, 'chicken-3.webp', '6pcs Chicken Bucket w/ 2pcs Fr', 470, 5, '2024-12-11 15:37:31', 2024),
(26, 1, 'dessert-1.webp', 'Mango Pie', 69, 11, '2024-12-11 15:38:01', 2024),
(27, 1, 'dessert-2.webp', 'Ube Pie', 69, 11, '2024-12-11 15:38:19', 2024),
(28, 1, 'dessert-3.webp', 'Peach Mango Pie', 69, 11, '2024-12-11 15:38:44', 2024),
(29, 1, 'palabok-1.webp', 'Palabok', 200, 9, '2024-12-11 15:39:11', 2024),
(30, 1, 'palabok-2.webp', 'Palabok w/ drinks', 220, 9, '2024-12-11 15:39:35', 2024),
(31, 1, 'palabok-3.webp', 'Palabok Family Pan', 320, 9, '2024-12-11 15:40:03', 2024),
(32, 1, 'sides-1.webp', 'Regular Fries', 45, 12, '2024-12-11 15:40:41', 2024),
(33, 1, 'sides-2.webp', 'Mashed Potato', 30, 12, '2024-12-11 15:41:01', 2024),
(34, 1, 'sides-3.webp', 'White Rice', 50, 12, '2024-12-11 15:41:19', 2024),
(35, 1, 'spag-1.webp', 'Jolly Spaghetti', 98, 7, '2024-12-11 15:41:49', 2024),
(36, 1, 'spag-2.webp', 'Jolly Spaghetti w/ Chicken Joy', 120, 7, '2024-12-11 15:42:21', 2024),
(37, 1, 'spag-3.webp', 'Jolly Spaghetti Family Pan', 410, 7, '2024-12-11 15:42:55', 2024),
(38, 1, 'steak-1.webp', '3pcs Burger Steak', 75, 8, '2024-12-11 15:43:23', 2024),
(39, 1, 'steak-2.webp', '6pcs Burger Steak', 240, 8, '2024-12-11 15:43:48', 2024),
(40, 1, 'steak-3.webp', '6pcs Burger Steak 6pcs Chicken', 240, 8, '2024-12-11 15:44:26', 2024),
(41, 1, 'value-meal-1.webp', 'The Standard Value Meal', 270, 10, '2024-12-11 15:45:02', 2024),
(42, 1, 'value-meal-2.webp', '3pc Chicken Sandwich', 270, 10, '2024-12-11 15:45:56', 2024),
(43, 1, 'value-meal-3.webp', '2pcs ChickenJjoy Burger Steak ', 270, 10, '2024-12-11 15:47:05', 2024);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jollibee_category`
--
ALTER TABLE `jollibee_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `jollibee_food`
--
ALTER TABLE `jollibee_food`
  ADD PRIMARY KEY (`food_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jollibee_category`
--
ALTER TABLE `jollibee_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `jollibee_food`
--
ALTER TABLE `jollibee_food`
  MODIFY `food_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

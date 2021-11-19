-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2021 at 04:48 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gracenote_android`
--

-- --------------------------------------------------------

--
-- Table structure for table `aid`
--

CREATE TABLE `aid` (
  `aid_id` int(8) NOT NULL,
  `aid_head` varchar(100) DEFAULT NULL,
  `aid_body` text,
  `aid_location` varchar(100) DEFAULT NULL,
  `aid_datetime` varchar(100) DEFAULT NULL,
  `aid_state` enum('เปิด','ปิด') NOT NULL DEFAULT 'เปิด',
  `member_id` int(8) NOT NULL,
  `aid_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aid`
--

INSERT INTO `aid` (`aid_id`, `aid_head`, `aid_body`, `aid_location`, `aid_datetime`, `aid_state`, `member_id`, `aid_timestamp`) VALUES
(1, 'ยกกล่องหนังสือ', 'ต้องการคนประมาณ 2 คน มาช่วยยกกล่องหนังสือ 18 กล่อง จากชั้นล่างขึ้นไปชั้น 7', 'ตึกอนุบาล', '2021-11-19T04:45:00.000Z', 'เปิด', 1, '2021-11-19 15:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `aid_sub`
--

CREATE TABLE `aid_sub` (
  `sub_id` int(8) NOT NULL,
  `aid_id` int(8) NOT NULL,
  `member_id` int(8) NOT NULL,
  `sub_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aid_sub`
--

INSERT INTO `aid_sub` (`sub_id`, `aid_id`, `member_id`, `sub_timestamp`) VALUES
(2, 1, 2, '2021-11-19 15:43:54');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(8) NOT NULL,
  `comment_detail` text,
  `member_id` int(8) NOT NULL,
  `social_id` int(8) NOT NULL,
  `comment_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `comment_detail`, `member_id`, `social_id`, `comment_timestamp`) VALUES
(1, 'Good', 1, 1, '2021-11-19 15:33:06');

-- --------------------------------------------------------

--
-- Table structure for table `grace`
--

CREATE TABLE `grace` (
  `grace_id` int(8) NOT NULL,
  `grace_time` varchar(100) DEFAULT NULL,
  `grace_date` datetime DEFAULT NULL,
  `grace_detail` text,
  `grace_agency` varchar(100) DEFAULT NULL,
  `grace_img` text,
  `grace_check` enum('รอการอนุมัติ','ผ่าน','ไม่ผ่าน') NOT NULL DEFAULT 'รอการอนุมัติ',
  `member_id` int(8) NOT NULL,
  `grace_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grace`
--

INSERT INTO `grace` (`grace_id`, `grace_time`, `grace_date`, `grace_detail`, `grace_agency`, `grace_img`, `grace_check`, `member_id`, `grace_timestamp`) VALUES
(1, '06:00', '2020-12-25 15:27:00', 'ไปบริจาคเลือด', 'สภากาชาดไทย', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A29%3A07.538Z?alt=media&token=2be1ff1b-3a81-4915-bead-471dbd1b711b', 'ผ่าน', 1, '2021-11-19 15:29:09');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(8) NOT NULL,
  `member_user` varchar(100) NOT NULL,
  `member_password` varchar(100) NOT NULL,
  `member_fname` varchar(100) DEFAULT NULL,
  `member_lname` varchar(100) DEFAULT NULL,
  `member_class` varchar(100) DEFAULT NULL,
  `member_no` varchar(100) DEFAULT NULL,
  `member_dob` datetime DEFAULT NULL,
  `member_address` text,
  `member_img` text,
  `member_level` enum('student','teacher') NOT NULL DEFAULT 'student',
  `member_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `member_user`, `member_password`, `member_fname`, `member_lname`, `member_class`, `member_no`, `member_dob`, `member_address`, `member_img`, `member_level`, `member_timestamp`) VALUES
(1, '62070215', '1234', 'อคิราภ์', 'สีแสนยง', '6/1', '19', '2000-09-23 15:37:00', '113/606 ซอยปทุมวัน 15 ถนนปทุมวัน เขตปทุมวัน ปทุมธานี 10220', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A21%3A58.591Z?alt=media&token=0efe3dcd-d6de-4a6d-b1b1-efd71a4929f2', 'teacher', '2021-11-19 15:22:01'),
(2, '62070139', '1234', 'พิชญะ', 'สิงห์มีสรี', '5/7', '23', '2000-11-29 08:44:09', '423/318 ซอยบางบัว ถนนบางบัว เขตบาง กรุงเทพฯ 10250', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A43%3A12.210Z?alt=media&token=90164c05-6336-435a-9139-115daeee29e1', 'student', '2021-11-19 15:43:16');

-- --------------------------------------------------------

--
-- Table structure for table `social`
--

CREATE TABLE `social` (
  `social_id` int(8) NOT NULL,
  `social_detail` text,
  `social_img` text,
  `member_id` int(8) NOT NULL,
  `social_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `social`
--

INSERT INTO `social` (`social_id`, `social_detail`, `social_img`, `member_id`, `social_timestamp`) VALUES
(1, 'นายอคิราภ์ สีแสนยง ได้ทำความดีโดยการไปบริจาคเลือด ขอชื่มชมในความกล้าหาญ', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A29%3A07.538Z?alt=media&token=2be1ff1b-3a81-4915-bead-471dbd1b711b', 1, '2021-11-19 15:32:47');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(8) NOT NULL,
  `status_type` enum('like','love') NOT NULL,
  `member_id` int(8) NOT NULL,
  `social_id` int(8) NOT NULL,
  `status_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_type`, `member_id`, `social_id`, `status_timestamp`) VALUES
(5, 'love', 1, 1, '2021-11-19 15:36:06'),
(6, 'love', 2, 1, '2021-11-19 15:43:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aid`
--
ALTER TABLE `aid`
  ADD PRIMARY KEY (`aid_id`);

--
-- Indexes for table `aid_sub`
--
ALTER TABLE `aid_sub`
  ADD PRIMARY KEY (`sub_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `grace`
--
ALTER TABLE `grace`
  ADD PRIMARY KEY (`grace_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `social`
--
ALTER TABLE `social`
  ADD PRIMARY KEY (`social_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aid`
--
ALTER TABLE `aid`
  MODIFY `aid_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `aid_sub`
--
ALTER TABLE `aid_sub`
  MODIFY `sub_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `grace`
--
ALTER TABLE `grace`
  MODIFY `grace_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `social`
--
ALTER TABLE `social`
  MODIFY `social_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

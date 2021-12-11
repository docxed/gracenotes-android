-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2021 at 03:54 PM
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
(1, 'ยกกล่องหนังสือ', 'ต้องการคนประมาณ 2 คน มาช่วยยกกล่องหนังสือ 18 กล่อง จากชั้นล่างขึ้นไปชั้น 7', 'ตึกอนุบาล', '2021-11-19T04:45:00.000Z', 'เปิด', 1, '2021-11-19 15:34:47'),
(2, 'ยกกล่องกระเป๋า', 'ยกกล่องที่บรรจุกระเป๋านักเรียนไปที่ตึก ม.ต้นชั้น1', 'ห้องเก็บของ หลังโรงเรียน', '2021-11-22T12:18:43.920Z', 'เปิด', 4, '2021-11-20 12:21:57'),
(4, 'จัดเก็บอุปกรณ์ทำสวน', 'ช่วยเหลือในการจัดเก็บอุปกรณ์ทำสวนเข้าห้องเก็บของทิิศตะวันตก', 'สวนไม้หน้าตึก ม.ต้น', '2021-11-24T07:50:24.456Z', 'ปิด', 3, '2021-11-20 13:53:21'),
(5, 'ยกของจาชั้น5', 'ยกอุปกรณ์คอมพิวเตอร์', 'ตึกม.ปลาย', '2021-12-13T16:35:04.215Z', 'เปิด', 3, '2021-12-11 14:36:07');

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
(2, 1, 2, '2021-11-19 15:43:54'),
(5, 1, 3, '2021-11-20 11:13:15'),
(6, 1, 4, '2021-11-20 12:25:23'),
(14, 2, 6, '2021-11-20 13:47:55'),
(15, 4, 5, '2021-11-20 13:54:16'),
(16, 4, 2, '2021-11-20 13:54:37');

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
(2, 'Excellent', 3, 1, '2021-11-20 11:01:12'),
(3, 'WOW', 6, 1, '2021-11-20 13:31:44'),
(4, 'คนดีจริง', 3, 3, '2021-11-20 13:42:53'),
(5, 'ช่วยได้เยอะ', 3, 2, '2021-11-20 13:43:32'),
(6, 'ขยันดีจริง', 4, 3, '2021-11-20 13:45:18'),
(7, 'ทำตัวมีประโยชน์มาก', 6, 3, '2021-11-20 13:47:28'),
(8, 'เยี่ยม', 2, 2, '2021-11-20 13:54:54'),
(10, 'Good', 3, 5, '2021-11-24 03:30:49');

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
(1, '06:00', '2020-12-25 15:27:00', 'ไปบริจาคเลือด', 'สภากาชาดไทย', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A29%3A07.538Z?alt=media&token=2be1ff1b-3a81-4915-bead-471dbd1b711b', 'ผ่าน', 1, '2021-11-19 15:29:09'),
(2, '10:20', '2021-11-20 11:01:32', 'กวาดห้องเรียนตอนเย็น', 'โรงเรียน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T11%3A05%3A32.310Z?alt=media&token=41b1af86-b03c-42e6-aff7-60c2d117955b', 'รอการอนุมัติ', 3, '2021-11-20 11:05:35'),
(4, '15:20', '2021-11-18 11:07:13', 'เก็บขยะที่สนามเด็กเล่น', 'โรงเรียน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T11%3A11%3A33.636Z?alt=media&token=368bc5f0-d6bc-47a5-bb2e-95ff75c5c8e0', 'รอการอนุมัติ', 3, '2021-11-20 11:11:37'),
(5, '15:23', '2021-11-17 12:13:38', 'ถูพื้นตรงทาง Hallway', 'โรงเรียน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T12%3A18%3A22.019Z?alt=media&token=2b5945dd-3bc7-4004-8618-2a4fb0c291c8', 'ผ่าน', 4, '2021-11-20 12:18:24'),
(8, '01:30', '2021-11-15 12:55:55', 'เก็บอุปกรณ์วิชาพละหลังเลิกเรียน', 'โรงเรียน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T13%3A18%3A21.390Z?alt=media&token=18735721-073a-425d-a92c-9445700f4e4e', 'ผ่าน', 5, '2021-11-20 13:18:24'),
(11, '01:20', '2021-12-09 14:31:01', 'เก็บขยะทีสนามกีฬา', 'โรงเรียน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-12-11T14%3A31%3A49.869Z?alt=media&token=1b14c44d-e9b9-4909-bb88-a8a630fde329', 'ผ่าน', 3, '2021-12-11 14:31:54');

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
(1, '62070215', '1234', 'อคิราภ์', 'สีแสนยง', '6/1', '12', '2000-09-23 08:37:00', '113/606 ซอยปทุมวัน 15 ถนนปทุมวัน เขตปทุมวัน ปทุมธานี 10220', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A21%3A58.591Z?alt=media&token=0efe3dcd-d6de-4a6d-b1b1-efd71a4929f2', 'teacher', '2021-11-19 15:22:01'),
(2, '62070139', '1234', 'พิชญะ', 'สิงห์มีสรี', '5/7', '23', '2000-11-29 08:44:09', '423/318 ซอยบางบัว ถนนบางบัว เขตบาง กรุงเทพฯ 10250', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A43%3A12.210Z?alt=media&token=90164c05-6336-435a-9139-115daeee29e1', 'student', '2021-11-19 15:43:16'),
(3, '62070168', '1234', 'วิชยุตม์', '้ทวิชัยยุทธ', '6/3', '28', '2000-07-01 03:53:51', 'สมุทรปราการ ถนนเทพารักษ์', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T10%3A59%3A48.326Z?alt=media&token=553d56fa-2f83-49b9-bc5f-b058a9103667', 'student', '2021-11-20 10:59:52'),
(4, '62074153', '1234', 'สิทธานต์', 'อมรรัตน์', '6/4', '36', '2001-11-20 11:53:23', 'กรุงเทพ์ อำเภอคลองสาน', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T12%3A12%3A02.928Z?alt=media&token=adb5a712-6539-4bb1-a87f-94aa6ee51f1b', 'student', '2021-11-20 12:12:06'),
(5, '62074154', '1234', 'พิทักษ์', 'สัมพันธวงศ์', '6/3', '29', '2002-11-08 12:32:04', 'สมุทรปราการ อำเภอเมือง ถนนเทพารักษ์', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T12%3A35%3A41.865Z?alt=media&token=d4caa48d-6367-4074-9ce7-684566b124bb', 'student', '2021-11-20 12:35:44'),
(6, '62074155', '1234', 'สมิทธ', 'รัตนากร', '6/5', '38', '2002-09-12 13:21:04', 'กรุงเทพฯ อำเภอจตุจักร', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T13%3A26%3A54.265Z?alt=media&token=8fb376ef-b698-43ec-80dc-11d257b7fb1a', 'student', '2021-11-20 13:26:57'),
(7, '62070188', '1234', 'สิริวง', 'สามิตธี', '6/2', '25', '2021-11-10 14:28:18', 'จ.สมุทรปราการ อำเภอเมือง ถนนเทพารักษ์', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-12-11T14%3A29%3A45.679Z?alt=media&token=ae6c86d4-b14d-4089-a8c8-534111a5027c', 'student', '2021-12-11 14:29:50');

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
(1, 'นายอคิราภ์ สีแสนยง ได้ทำความดีโดยการไปบริจาคเลือด ขอชื่มชมในความกล้าหาญ', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-19T15%3A29%3A07.538Z?alt=media&token=2be1ff1b-3a81-4915-bead-471dbd1b711b', 1, '2021-11-19 15:32:47'),
(2, 'นายพิทักษ์ สัมพันธวงศ์ ได้ช่วยเก็บอุปกรณ์กีฬาแบ่งเบาภาระครูพละ', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T13%3A18%3A21.390Z?alt=media&token=18735721-073a-425d-a92c-9445700f4e4e', 1, '2021-11-20 13:35:35'),
(3, 'นายสมิทธ รัตนากร ได้ช่วยเหลือภารโรงในการทำควาสะอาดห้องนำ้ที่ชั้น2 ตึก ม.ปลาย', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T13%3A30%3A18.208Z?alt=media&token=8f18c348-52b6-47a6-ba64-7808855ddba7', 1, '2021-11-20 13:40:47'),
(5, 'ช่วยงานการโรง', 'https://firebasestorage.googleapis.com/v0/b/gracenotes-2381f.appspot.com/o/2021-11-20T12%3A38%3A40.466Z?alt=media&token=c8e0262c-f7c6-46e8-b798-5a07e2617a21', 1, '2021-11-21 15:20:10');

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
(6, 'love', 2, 1, '2021-11-19 15:43:29'),
(11, 'like', 3, 1, '2021-11-20 11:01:26'),
(14, 'like', 1, 2, '2021-11-20 13:37:16'),
(15, 'like', 1, 3, '2021-11-20 13:40:54'),
(16, 'love', 3, 3, '2021-11-20 13:42:55'),
(17, 'like', 3, 2, '2021-11-20 13:43:02'),
(18, 'love', 4, 3, '2021-11-20 13:44:54'),
(19, 'love', 4, 2, '2021-11-20 13:45:30'),
(20, 'love', 6, 3, '2021-11-20 13:46:30'),
(21, 'like', 6, 2, '2021-11-20 13:47:37'),
(23, 'love', 6, 1, '2021-11-20 13:47:45'),
(24, 'like', 2, 2, '2021-11-20 13:54:48'),
(31, 'love', 1, 6, '2021-11-24 03:36:24'),
(39, 'like', 1, 7, '2021-12-10 07:13:53'),
(42, 'love', 1, 5, '2021-12-11 14:08:51'),
(44, 'like', 3, 5, '2021-12-11 14:30:42'),
(45, 'like', 1, 8, '2021-12-11 14:39:16');

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
  MODIFY `aid_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `aid_sub`
--
ALTER TABLE `aid_sub`
  MODIFY `sub_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `grace`
--
ALTER TABLE `grace`
  MODIFY `grace_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `social`
--
ALTER TABLE `social`
  MODIFY `social_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

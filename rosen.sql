-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2022 a las 05:48:27
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rosen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cerradoras`
--

CREATE TABLE `cerradoras` (
  `ID` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` varchar(100) NOT NULL,
  `Equipo` varchar(100) NOT NULL,
  `v1` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cerradoras`
--

INSERT INTO `cerradoras` (`ID`, `Fecha`, `Hora`, `Equipo`, `v1`) VALUES
(1, '2022-04-15', '09:12:53', '10002824', '1'),
(2, '2022-04-15', '09:14:59', '10002824', '0'),
(5, '2022-04-15', '09:17:02', '10002824', '1'),
(6, '2022-04-15', '09:19:50', '10002824', '0'),
(7, '2022-04-15', '09:24:51', '10002824', '1'),
(8, '2022-04-15', '09:24:51\r\n', '10002824', '0'),
(9, '2022-04-15', '09:24:57\r\n', '10002824\r\n', '1'),
(10, '2022-04-15', '09:25:03\r\n', '10002824\r\n', '0'),
(11, '2022-04-15', '09:29:03\r\n', '10002824\r\n', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cerradoras`
--
ALTER TABLE `cerradoras`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cerradoras`
--
ALTER TABLE `cerradoras`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

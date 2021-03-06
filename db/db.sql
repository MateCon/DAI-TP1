USE [master]
GO
/****** Object:  Database [DAI-Personajes]    Script Date: 17/05/2022 9:00:45 ******/
CREATE DATABASE [DAI-Personajes]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DAI-Personajes', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DAI-Personajes_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DAI-Personajes] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DAI-Personajes].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ARITHABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DAI-Personajes] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DAI-Personajes] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DAI-Personajes] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DAI-Personajes] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECOVERY FULL 
GO
ALTER DATABASE [DAI-Personajes] SET  MULTI_USER 
GO
ALTER DATABASE [DAI-Personajes] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DAI-Personajes] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DAI-Personajes] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DAI-Personajes] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DAI-Personajes', N'ON'
GO
ALTER DATABASE [DAI-Personajes] SET QUERY_STORE = OFF
GO
USE [DAI-Personajes]
GO
/****** Object:  User [alumno]    Script Date: 17/05/2022 9:00:45 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[edad] [int] NOT NULL,
	[peso] [int] NOT NULL,
	[historia] [varchar](600) NOT NULL,
	[imagen] [varchar](255) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXSerie]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXSerie](
	[personajeID] [int] NULL,
	[serieID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Serie]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Serie](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[imagen] [varchar](255) NULL,
	[titulo] [varchar](255) NULL,
	[fechaCreacion] [date] NULL,
	[calificacion] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[createPersonaje]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createPersonaje]
	@nombre varchar(255),
	@imagen varchar(255),
	@edad int,
	@peso int,
	@historia varchar(600)
AS
BEGIN
	INSERT INTO Personaje (nombre, imagen, edad, peso, historia)
	VALUES (@nombre, @imagen, @edad, @peso, @historia);
END
GO
/****** Object:  StoredProcedure [dbo].[createSerie]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createSerie]
	@imagen varchar(255),
	@titulo varchar(255),
	@fechaCreacion date,
	@calificacion int
AS
BEGIN
	INSERT INTO Serie(imagen, titulo, fechaCreacion, calificacion)
	VALUES (@imagen, @titulo, @fechaCreacion, @calificacion);
END
GO
/****** Object:  StoredProcedure [dbo].[deletePersonajeById]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deletePersonajeById]
	@id int
AS
BEGIN
	DELETE FROM Personaje
	WHERE id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[deleteSerieById]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteSerieById]
	@id int
AS
BEGIN
	DELETE FROM Serie
	WHERE id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[getAllPersonajes]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllPersonajes]
AS
BEGIN
	SELECT imagen, nombre, id FROM Personaje;
END
GO
/****** Object:  StoredProcedure [dbo].[getAllSeries]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllSeries]
AS
BEGIN
	SELECT * FROM Serie;
END
GO
/****** Object:  StoredProcedure [dbo].[getPersonajeById]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPersonajeById]
	@id int
AS
BEGIN
	SELECT * FROM Personaje
	WHERE id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[getPersonajesFromSeries]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[getPersonajesFromSeries]
	@id int
AS
BEGIN
	SELECT Personaje.nombre from Serie
	INNER JOIN PersonajeXSerie ON PersonajeXSerie.serieID = Serie.id
	INNER JOIN Personaje ON PersonajeXSerie.personajeID = Personaje.id;
END
GO
/****** Object:  StoredProcedure [dbo].[getSerieById]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getSerieById]
	@id int
AS
BEGIN
	SELECT *
	FROM Serie
	WHERE Serie.id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[updatePersonaje]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updatePersonaje]
	@id int,
	@nombre varchar(255),
	@imagen varchar(255),
	@edad int,
	@peso int,
	@historia varchar(600)
AS
BEGIN
	UPDATE Personaje
	SET nombre = @nombre, imagen = @imagen, edad = @edad, peso = @peso, historia = @historia
	WHERE id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[updateSerie]    Script Date: 17/05/2022 9:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateSerie]
	@id int,
	@imagen varchar(255),
	@titulo varchar(255),
	@fechaCreacion date,
	@calificacion int
AS
BEGIN
	UPDATE Serie
	SET imagen = @imagen, titulo = @titulo, fechaCreacion = @fechaCreacion, calificacion = @calificacion
	WHERE id = @id;
END
GO
USE [master]
GO
ALTER DATABASE [DAI-Personajes] SET  READ_WRITE 
GO

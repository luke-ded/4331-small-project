create database COP4331;

use COP4331;


CREATE TABLE `COP4331`.`Contacts`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
    `UserID` INT NOT NULL DEFAULT '0' ,
     PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

ALTER TABLE Contacts 
    -> DROP COLUMN UserID;

ALTER TABLE Contacts
    -> ADD LoginName varchar(50);

ALTER TABLE Contacts
    -> ADD LoginPassword varchar(50);

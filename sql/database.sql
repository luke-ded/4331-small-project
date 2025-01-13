create database COP4331;

use COP4331;


CREATE TABLE `COP4331`.`Contacts`
(
    `UserID` INT NOT NULL AUTO_INCREMENT ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
     PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE 'COP4331'.'Users' (
    
    `UserID` INT NOT NULL AUTO_INCREMENT ,
    `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
     PRIMARY KEY (`ID`)
) ENGINE = InnoDB;


    

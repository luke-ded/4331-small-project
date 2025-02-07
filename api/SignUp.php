<?php //SignUp.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	$username = $inData["loginName"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "James98", "password", "COP4331"); //change this if needed
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
	    //Find the user in the table Users based on the given Username and Password, where both should be string values
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("ss", $username, $password);
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc() )
		{
		    //if user exists, send an error message
		    returnWithErrorWithId("User Already Exists");
		}
		else
		{
		    //if it is entirely a new user, add the user to the database
		    $stmt = $conn->prepare("INSERT INTO Users (Login,Password) VALUES(?,?)");
		    $stmt->bind_param("ss", $username, $password);
		    $stmt->execute();

			//getting the newly made ID
		    $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password=?");
		    $stmt->bind_param("ss", $username, $password);
		    $stmt->execute();
			
			//if the newly made ID is found
			$result = $stmt->get_result();
			if( $row = $result->fetch_assoc() )
			{
				//return id
				returnWithInfo('"id":"'.$row["ID"].'"');
			}
			else
			{
				returnWithError("Newly Made ID Not Found");
			}
		}

		$stmt->close();
		$conn->close();
	}
	
?>

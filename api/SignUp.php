<?php

	$inData = getRequestInfo();
	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "root", "&&C0P##4331##Pr0ject&&s", "COP4331"); //change this if needed
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
	    //Find the user in the table Users based on the given Username and Password, where both should be string values
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Username=? AND Password=?");
		$stmt->bind_param("ss", $inData["username"], $inData["password"]);
		$stmt->execute();
		

		if( $row = $result->fetch_assoc()  )
		{
		    //if user exists, send an error message
			returnWithError("User Already Exists");
		}
		else
		{
		    //if it is entirely a new user, add the user to the database
			$stmt = $conn->prepare("INSERST INTO Users (Username,Password) VALUES(?,?)");
		    $stmt->bind_param("ssss", $username, $password);
		    $stmt->execute();
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>

<?php //Login.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	$userName = $inData["loginName"];
	$password = $inData["password"];
	
	$id = 0;

	$conn = new mysqli("localhost", "James98", "password", "COP4331"); //change this if needed
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
	    //Find the user in the table Users based on the given Username and Password, where both should be string values
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("ss", $userName, $password);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
		    //if user exists, send that information to the developer on the front end
			returnWithInfo( ('"id":"' . $row['ID'] . '"') );
		}
		else
		{
			returnWithErrorWithId("No Records Found");
		}

		$stmt->close();
		$conn->close();
	}
	
?>

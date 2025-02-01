<?php //AddContact.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$fname = $inData["firstName"];
	$lname = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = new mysqli("localhost", "James98", "password", "COP4331"); //change this if needed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE UserId=? AND FirstName=? AND LastName=? AND Phone=? AND Email=?");
		$stmt->bind_param("issss", $userId, $fname, $lname, $phone, $email);
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc() )
		{
			returnWithError("Contact Already Exists");
		}
		else
		{
			$stmt = $conn->prepare("INSERT INTO Contacts (UserId,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
			$stmt->bind_param("issss", $userId, $fname, $lname, $phone, $email);
			$stmt->execute();
			returnWithError("");
		}
		
		$stmt->close();
		$conn->close();
	}
	
?>


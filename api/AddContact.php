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
		$stmt = $conn->prepare("INSERT INTO Contacts (UserId,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $userId, $fname, $lname, $phone, $email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}
	
?>


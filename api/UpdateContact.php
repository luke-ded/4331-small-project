<?php //UpdateContact.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$contactId = $inData["contactId"];
	$fname = $inData["firstName"];
	$lname = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = new mysqli("localhost", "root", "&&C0P##4331##Pr0ject&&s", "COP4331"); //change this if needed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET (FirstName,LastName,Phone,Email) VALUES(?,?,?,?) WHERE UserId=? AND ID=?");
		$stmt->bind_param("ssssii", $fname, $lname, $phone, $email, $userId, $contactId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}
	
?>

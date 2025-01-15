<?php //DeleteContact.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$contactId = $inData["contactId"];

	$conn = new mysqli("localhost", "root", "&&C0P##4331##Pr0ject&&s", "COP4331"); //change this if needed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID=? AND ID=?");
		$stmt->bind_param("ii", $userId, $contactId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}
	
?>

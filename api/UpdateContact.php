<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$contactId = $inData["contactId"];
	$updatedCol = $inData["updateColName"];
	$updatedColVal = $inData["updateColVal"];

	$conn = new mysqli("localhost", "UserName", "Password", "DataBase-Name"); //change this if needed
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET $updatedCol=? WHERE UserId=? AND ContactId=?");
		$stmt->bind_param("sii", $updatedColVal, $userId, $contactId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
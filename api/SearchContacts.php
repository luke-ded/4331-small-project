<?php //SearchContacts.php
    
    include_once 'UtilFunctions.php';
    
	$inData = getRequestInfo();
	$userId = $inData["userId"];
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "root", "&&C0P##4331##Pr0ject&&s", "COP4331"); //change this if needed
	if ($conn->connect_error) 
	{
		returnWithErrorWithId( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Phone LIKE ? OR Email LIKE ?) AND UserId=?");
		$searchColVal = $inData["search"] . "%";
		$stmt->bind_param("ssssi", $searchColVal, $searchColVal, $searchColVal, $searchColVal, $userId);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"ContactId":"'. $row["ID"] .'", "FirstName":"' . $row["FirstName"] . '", "LastName":"'. $row["LastName"] .'", "Phone":"'. $row["Phone"] .'", "Email":"'. $row["Email"] .'"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithErrorWithId( "No Records Found" );
		}
		else
		{
			returnWithInfo( ('"results":[' . $searchResults . ']') );
		}
		
		$stmt->close();
		$conn->close();
	}
	
?>

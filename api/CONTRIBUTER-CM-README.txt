These are notes on the source code for the API. 

All PHP files have a variable called $conn. The value of this variable is a constructor whose parameters I have yet to determine. The person managing the database will need to change the name of "DataBase-Name". As for UserName and Password, I will consult the professor about this and ask him what values should be in there.

All file names indicate what they do. AddContact.php is for adding contacts, login.php is for logging in, and so on.

For SearchContacts.php, I decided to not restrict the user to only having the option of searching by firstName, but instead any fields that matched what they are looking for, including First Name, Last Name, Email, and Phone Number. 

For UpdateContact.php, I plan to work on that further, since I do not know what information will be sent through the JSON file. 

New notes will be added when possible if not discussed during our meetings.


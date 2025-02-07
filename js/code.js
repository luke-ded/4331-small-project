const urlBase = 'http://projectpoosd.xyz/api';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let symbol = false;
let number = false;

let symbols = new Set(['!', '@', '#', '$', '%', '^', '&', '*']);
let numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = userName = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	if ((login.length == 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "**Both Username and Password are Empty!**";
		return;
	} else if ((login.length != 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "**Password is Empty!**";
		return;
	} else if ((login.length == 0) && (password.length != 0)){
		document.getElementById("loginResult").innerHTML = "**Username is Empty!**";
		return;
	}
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {loginName:login,password:password};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "search.html";

				document.getElementById("userName") = userName;
			}
			//else
			//document.getElementById("loginResult").innerHTML = "status = " + this.status + ", readyState = " + this.readyState;
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignup()
{	
	userId = 0;
	/* firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value; */
	let login = userName = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	if ((login.length == 0) && (password.length == 0)) {
		document.getElementById("message").innerHTML = "**Both fields are Empty!**";
		document.getElementById("symbolResult").innerHTML = "";
		document.getElementById("numResult").innerHTML = ""; 
		document.getElementById("lenResult").innerHTML = "";
		return;
	} else if ((login.length != 0) && (password.length == 0)) {
		document.getElementById("message").innerHTML = "**Password is Empty!**";
		document.getElementById("symbolResult").innerHTML = "";
		document.getElementById("numResult").innerHTML = ""; 
		document.getElementById("lenResult").innerHTML = "";
		return;
	} else if ((login.length == 0) && (password.length != 0)){
		document.getElementById("message").innerHTML = "**Username is Empty!**";
		document.getElementById("symbolResult").innerHTML = "";
		document.getElementById("numResult").innerHTML = ""; 
		document.getElementById("lenResult").innerHTML = "";
		return;
	}

	if(!validatePassword())
	{
		setPassInst();
		return;
	}
	else if(document.getElementById("loginPassword").value != document.getElementById("loginPassword2").value)
	{
		document.getElementById("message").innerHTML = "**Passwords do not match!**";
		document.getElementById("symbolResult").innerHTML = "";
		document.getElementById("numResult").innerHTML = "";
		document.getElementById("lenResult").innerHTML = "";

		return;
	}
		

	document.getElementById("message").innerHTML = "";
	document.getElementById("symbolResult").innerHTML = "";
	document.getElementById("numResult").innerHTML = "";
	document.getElementById("lenResult").innerHTML = "";

	let tmp = {loginName:login,password:password,/*firstName:firstName,lastName:lastName*/};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/SignUp.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("message").innerHTML = "User already exists.";
					return;
				}
		
/* 				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName; */

				saveCookie();
	
				window.location.href = "search.html";

				document.getElementById("userName") = userName;
			}
			//else
				//document.getElementById("message").innerHTML = "status = " + this.status + ", readyState = " + this.readyState;
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("message").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",userName=" + userName + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userName")
		{
			userName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = userName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{	
	let firstName = document.getElementById("firstNameText").value;
	let lastName = document.getElementById("lastNameText").value;
	let phone = document.getElementById("phoneText").value;
	let email = document.getElementById("emailText").value;
	userId = 0;
	document.getElementById("contactAddResult").innerHTML = "";

	if (!(firstName.length != 0 && lastName.length != 0 && phone.length != 0 && email.length != 0)){
		document.getElementById("contactAddResult").innerHTML = "**One or more fields are missing!**";

		return;
	}

	
	if(!validatePhone(phone))
	{
		document.getElementById("contactAddResult").innerHTML = "**Invalid phone number!**";

		return;
	}

	if(!validateEmail(email))
	{
		document.getElementById("contactAddResult").innerHTML = "**Invalid email!**";

		return;
	}

	let tmp = {firstName:firstName, lastName:lastName, phone:phone, email:email,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);


		firstName = document.getElementById("firstNameText").value = "";
		lastName = document.getElementById("lastNameText").value = "";
		phone = document.getElementById("phoneText").value = "";
		email = document.getElementById("emailText").value = "";
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}



function removeContact(contactId, position)
{

	let modal = document.getElementById("RMmodal");

	modal.style.display = "block"

	document.getElementById("delconfirm").onclick = function() //the confirm button is pressed
	{
		modal.style.display = "none";
		
		let Index = position;
		let data = document.getElementById("SearchTable").rows.item(Index).innerHTML;
		let tmp = {userId:userId, contactId: contactId};
		let jsonPayload = JSON.stringify( tmp );
		
		let url = urlBase + '/DeleteContact.' + extension;
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					document.getElementById("SearchTable").deleteRow(Index);
					
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("searchText").innerHTML = err.message;
		}
	};

	document.getElementById("delcancel").onclick = function()
	{
		modal.style.display = "none";
	};
}

function editContact(c, ID)
{
	let modal = document.getElementById("Emodal");

	modal.style.display = "block"

	let contactData = c.getAttribute("data-contact");
	let contactObj = JSON.parse(contactData);

	//prepopulate fields
	let updatedFirstName = document.getElementById("editfirstNameText").value = contactObj.FirstName;
	let updatedLastName =document.getElementById("editlastNameText").value = contactObj.LastName;
	let updatedPhone = document.getElementById("editphoneText").value = contactObj.Phone;
	let updatedEmail = document.getElementById("editemailText").value = contactObj.Email;

	// "contactAddResult" will need to be replaced by something else
	document.getElementById("editconfirm").onclick = function()
	{
		updatedFirstName = document.getElementById("editfirstNameText").value;
		updatedLastName = document.getElementById("editlastNameText").value;
		updatedPhone = document.getElementById("editphoneText").value;
		updatedEmail = document.getElementById("editemailText").value;

		if (!(updatedFirstName.length != 0 && updatedLastName.length != 0 && updatedPhone.length != 0 && updatedEmail.length != 0)){

			if (updatedFirstName.length == 0){
				document.getElementById("editfirstNameText").value = "First Name is Empty";
			}

			if (updatedLastName.length == 0){
				document.getElementById("editfirstNameText").value = "Last Name is Empty";
			}

			if (updatedPhone.length == 0) {
				document.getElementById("editfirstNameText").value = "Phone Number is Empty";
			}

			if (updatedEmail.length == 0){
				document.getElementById("editfirstNameText").value = "Email is Empty";
			}
			return;
		}

		if(!validatePhone(updatedPhone))
		{
			document.getElementById("contactAddResult").innerHTML = "**Invalid phone number!**";

			return;
		}

		if(!validateEmail(updatedEmail))
		{
			document.getElementById("contactAddResult").innerHTML = "**Invalid email!**";

			return;
		}

		//console.log("Updated values:" + ID);

		let tmp = {userId:userId, contactId: ID, firstName:updatedFirstName, lastName:updatedLastName, phone:updatedPhone, email:updatedEmail};
		let jsonPayload = JSON.stringify( tmp );
		
		let url = urlBase + '/UpdateContact.' + extension;
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					document.getElementById(`name-${ID}`).innerText = `${updatedFirstName} ${updatedLastName}`;
					document.getElementById(`email-${ID}`).innerText = `${updatedEmail}`;
					document.getElementById(`phone-${ID}`).innerText = `${updatedPhone}`;

					modal.style.display = "none";

					if (updatedFirstName == contactObj.FirstName){
						document.getElementById("searchText").value = updatedFirstName;
					} else if (updatedLastName == contactObj.LastName){
						document.getElementById("searchText").value = updatedLastName;
					} else if (updatedPhone == contactObj.Phone){
						document.getElementById("searchText").value = updatedPhone;
					} else if (updatedEmail == contactObj.Email){
						document.getElementById("searchText").value = updatedEmail;
					} else {
						document.getElementById("searchText").value = updatedFirstName;
					}
					searchContact();
				}
			};
			xhr.send(jsonPayload);

			

			console.log(document.getElementById("editfirstNameText").value);
			console.log(document.getElementById("editlastNameText").value);
			console.log(document.getElementById("editphoneText").value);
			console.log(document.getElementById("editemailText").value);
		}
		catch(err)
		{
			document.getElementById("searchText").innerHTML = err.message;
		}
	};

	document.getElementById("editcancel").onclick = function()
	{
		modal.style.display = "none";
	};
}



function searchContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("SearchTable").innerHTML = "";
	
	if (srch.length == 0){
		document.getElementById("SearchTable").innerHTML = "**No information provided!**";
		return;
	}

	
	let contactList = "";


	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4  && this.status == 200) 
			{
				let tableData = "";
				let jsonObject = JSON.parse( xhr.responseText );

				
				if(jsonObject.error == "No Records Found"){
					document.getElementById("noResultsDiv").classList.remove("hidden");
					document.getElementById("tableDiv").classList.add("hidden");
					
				} else{
					document.getElementById("tableDiv").classList.remove("hidden");
					document.getElementById("noResultsDiv").classList.add("hidden");
					
					
	
				}
				
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{	

					let x = jsonObject.results[i].ContactId;

					let teamChoice = parseInt(jsonObject.results[i].Phone) % 32;
					teamChoice = teamChoice + 1;
					//NFL Team
					tableData += `<tr><td> <img src="../images/${teamChoice}.png" alt="NFLTeam" width="40" height="30"></td>`
					//name
     					tableData += `<td id = "name-${x}"> ${jsonObject.results[i].FirstName} ${jsonObject.results[i].LastName} </td>`
					//Email
					tableData += `<td id = "email-${x}"> ${jsonObject.results[i].Email} </td>`
					//Phone
					tableData += `<td id = "phone-${x}"> ${jsonObject.results[i].Phone} </td>`
					//Managing Players
					tableData += `<td> <button type="button" id="edit" data-contact='${JSON.stringify(jsonObject.results[i])}' onclick="editContact(this, ${x});"> Edit </button> <button type="button" id="remove" onclick="removeContact(${x}, ${i});"> Delete </button></td></tr>`

     			
				}
				
				document.getElementById("SearchTable").innerHTML=tableData;
				
			} 
		};
		xhr.send(jsonPayload);

		document.getElementById("searchText").value = "";
	}
	catch(err)
	{
		document.getElementById("SearchTable").innerHTML = err.message;
	}
	
}

function validatePassword()
{
	var passwordInput = document.getElementById("loginPassword").value;
	
	symbol = number = false;

	for(let i = 0; i < passwordInput.length; i++)
	{
		if(symbols.has(passwordInput[i]))
		{
			symbol = true;
		}
		else if(numbers.has(passwordInput[i]))
		{
			number = true;
		}
		if(symbol && number) break;
	}

	
	if(symbol)
		document.getElementById("symbolResult").style.color = "rgb(51, 232, 20)";
	else 
		document.getElementById("symbolResult").style.color = "rgb(219,171,37)";

	if(number) 
		document.getElementById("numResult").style.color = "rgb(51, 232, 20)";
	else 
		document.getElementById("numResult").style.color = "rgb(219,171,37)";

	if(passwordInput.length > 7) 
		document.getElementById("lenResult").style.color = "rgb(51, 232, 20)";
	else 
		document.getElementById("lenResult").style.color = "rgb(219,171,37)";


	return symbol && number && passwordInput.length > 7;
}


function validateEmail(email)
{
  const ret = String(email)
	.toLowerCase()
	.match(
	  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	return Boolean( ret );
}

function validatePhone(phone)
{
  const ret = String(phone)
	.toLowerCase()
	// via https://shorturl.at/KQZ2g
	.match(
		/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
	);
	return Boolean( ret );
}

function setPassInst()
{
	document.getElementById("message").innerHTML = "Password must contain: <br>";
	document.getElementById("symbolResult").innerHTML = "1 Special Character: !@#$%&*<br>";
	document.getElementById("numResult").innerHTML = "1 Number: 0123456789<br>"; 
	document.getElementById("lenResult").innerHTML = "Length of at least 8<br>";
}

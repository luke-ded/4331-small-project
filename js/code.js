const urlBase = 'http://165.227.67.110/api/'; // Change this to real url
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let symbol = false;
let number = false;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = userName = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	if ((login.length == 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "Both fields are Empty!";
		return;
	} else if ((login.length != 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "Password is Empty!";
		return;
	} else if ((login.length == 0) && (password.length != 0)){
		document.getElementById("loginResult").innerHTML = "Username is Empty!";
		return;
	}
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {loginName:login,loginPassword:password};
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
			}
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
	
	
	
	if(!validatePassword())
		return;

	if ((login.length == 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "Both fields are Empty!";
		return;
	} else if ((login.length != 0) && (password.length == 0)) {
		document.getElementById("loginResult").innerHTML = "Password is Empty!";
		return;
	} else if ((login.length == 0) && (password.length != 0)){
		document.getElementById("loginResult").innerHTML = "Username is Empty!";
		return;
	}

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {loginName:login,loginPassword:password,/*firstName:firstName,lastName:lastName*/};
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
					document.getElementById("loginResult").innerHTML = "User already exists.";
					return;
				}
		
/* 				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName; */

				saveCookie();
	
				window.location.href = "search.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
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
	// Change this line to text collection lines like below
	let firstName = document.getElementById("firstNameText").value;
	let lastName = document.getElementById("lastNameText").value;
	let phone = document.getElementById("phoneText").value;
	let email = document.getElementById("emailText").value;
	document.getElementById("contactAddResult").innerHTML = "";

	if(!validatePhone(phone))
	{
		document.getElementById("contactAddResult").innerHTML = "Invalid phone number.";

		return;
	}

	if(!validateEmail(email))
	{
		document.getElementById("contactAddResult").innerHTML = "Invalid email.";

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
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
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
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function validatePassword()
{
	var passwordInput = document.getElementById("loginPassword");
	var symbols = new Set(['!', '@', '#', '$', '%', '^', '&', '*']);
	var numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

	symbol = number = false;

	for(let i = 0; i < passwordInput.value.length; i++)
	{
		if(symbols.has(passwordInput.value[i]))
		{
			symbol = true;
		}
		else if(numbers.has(passwordInput.value[i]))
		{
			number = true;
		}
		if(symbol && number) break;
	}

	let retval = symbol && number && passwordInput.value.length > 7;
	if(!retval)
		document.getElementById("loginResult").style.color = "#df1e24";

	return retval;	
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

// Send the data back to background page
function SetValue(k, v) {
	chrome.extension.sendMessage({method: "setLocalStorage", key: k, value:v}, function(response) {});
}


function main(){
	// Send message to background page to request saved data
	chrome.extension.sendMessage({method: "getLocalStorage", key: "username"}, function(response) {
	  localStorage["username"] = response.data;
	});

	chrome.extension.sendMessage({method: "getLocalStorage", key: "password"}, function(response) {
	  localStorage["password"] = response.data;
	});



	chrome.extension.sendMessage({method: "getLocalStorage", key: "logincount"}, function(response) {
	  localStorage["logincount"] = response.data;
	});

	var username = localStorage["username"];
	var password = localStorage["password"];

	// Test the save result and outcome in login page
	if(username != 'undefined' && password != 'undefined' && username!== "" && password !== "")
	{
		if(document.getElementById('status') == null)
		{
			$('#username').val(username);
			$('#password').val(password);
			$('input[name = "submit"]').click();
			localStorage["logincount"]++;
			SetValue("logincount", localStorage["logincount"]);
		}
	}
}

main();
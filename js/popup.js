$(function(){	
	function main(){

		$("#setting").click(function() {
			chrome.tabs.create({url: "options.html"});
		});


		// check if the cookie exists
		chrome.cookies.getAll({name: "CASTGC"}, function(cookies){
			// if the cookie does not exist, promt the user to log in first.		
			if (cookies.length == 0){
				hideButtons();
				chrome.tabs.create({url: "https://cas.bucknell.edu/cas/login"});
			}
			else{
				showButtons();
				showBmailUnread();
			}
		});
	}


	function hideButtons(){
		$("div.container").addClass("hide");
		$("div.alert").removeClass("hide");
	};

	function showButtons(){
		$("div#sign-in").addClass("hide");

		$("#bmail").click(function() {
			chrome.tabs.create({url: "http://mail.bucknell.edu"});
			localStorage["bmailcount"]++;
		});

		$("#myBucknell").click(function() {
			chrome.tabs.create({url: "http://my.bucknell.edu"});
			localStorage["mybucknellcount"]++;
		});
		$("#library").click(function() {
			chrome.tabs.create({url: "http://library.bucknell.edu/"});
			localStorage["librarycount"]++;
		});
		$("#moodle").click(function() {
			chrome.tabs.create({url: "http://moodle.bucknell.edu/"});
			localStorage["moodlecount"]++;
		});
		$("#innetwork").click(function() {
			chrome.tabs.create({url: "https://getinvolved.bucknell.edu/"});
			localStorage["innetworkcount"]++;
		});

		$("#log-out").click(function() {
			removeCookie();
			hideButtons();
		});

		$("#search").click(function() {
			var search = $("#searchtext").val().replace(" ", "+");
	
			var link = "https://google.bucknell.edu/search?q=" 
				 + search 
				 +"&x=-978&y=-107&client=default_frontend&output=xml_no_dtd&proxystylesheet=default_frontend&sort=date%3AD%3AL%3Ad1&entqr=3&entsp=a&oe=UTF-8&ie=UTF-8&ud=1";
			  	chrome.tabs.create({url: link});
		});

		$('#searchtext').keypress(function(e){
			if(e.keyCode==13)
			$('#search').click();
		});

		// suppress the default one I don't why it will fire the first button
	$(document).keypress(function(event){
			if (event.which == '13') {
				event.preventDefault();
			}
		});
	};

	function showBmailUnread(){
		try{
			$.ajax({
				url: "https://mail.google.com/mail/feed/atom",
				dataType: "xml",
				error: showError,
				success: showUnread
				//if we need to pass user name and password for authentication, we can add username and password fields. But we are assuming that the user has the cookies already.
				//username: "",
				//password: "",
			});
		}
		catch (err){
			console.log(err);
		}
	};

	function showUnread(data, status, jqXHR){
		unread = $(data).find("fullcount").first().text();
		if (unread > 0){
			$("button span.badge").text(unread);
		}
	};

	function showError(){
		console.log('Ajax unsuccessful. You might want to log in to Bmail first.');
	};

	function removeCookie(){
		chrome.cookies.getAll({name: "CASTGC"}, function(cookies){
			// remove cookie from cas
			chrome.cookies.remove({url: "https://cas.bucknell.edu/cas/login", name: "CASTGC"}, function(d){
				console.log(d);
			});
			// remove cookie from Moodle
			chrome.cookies.remove({url: "https://moodle.bucknell.edu", name: "MoodleSession"}, function(d){
				console.log(d);
			});
			// perhaps also need to romove cookie from myBucknell and inNetwork
		});
	};

	main();
});






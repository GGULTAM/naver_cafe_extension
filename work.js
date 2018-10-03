function eliminate_user(){
	var userlist = [];
	var userstring;
	var toggle;

	//console.log('eliminateUser');
	chrome.storage.sync.get('toggle', function (result) {
	    toggle = result.toggle;
	    if (toggle == false) return;
		chrome.storage.sync.get('userlist', function (result) {
			//setTimeout(undefined, 20);
			console.log('getUserList');
			if (result.userlist == undefined) return;
	    	userstring = result.userlist;
			userlist = userstring.split('|');
			let page = document.getElementById('userDiv');
			for (let user of userlist) {
				if (user != ''){
				$('tr:has(a[onclick*="' + user + '"])', top.cafe_main.document).css('visibility', 'hidden');	
				$('li:has(a[href*="' + user + '"])', top.cafe_main.document).css('visibility', 'hidden');	
				}
			}
		});
	  });	
}

function frame_loaded(){
	eliminate_user();
}

window.onload = function() {
    document.querySelector("#cafe_main").addEventListener("load", frame_loaded);
    eliminate_user();
}
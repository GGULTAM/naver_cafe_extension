// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var toggle = true;
chrome.storage.sync.get("toggle", function (result) {
    if (result.toggle != undefined) toggle = result.toggle;
    if (toggle){
    chrome.browserAction.setIcon({path: "images/on.png"});
    }
    else{
    chrome.browserAction.setIcon({path: "images/off.png"});
    }
  });

chrome.browserAction.onClicked.addListener(function(tab) {
  	toggle = !toggle;
    console.log('toggle : ' + toggle);
  	if(toggle){
	    chrome.browserAction.setIcon({path: "images/on.png"});
  	}
  	else{
	    chrome.browserAction.setIcon({path: "images/off.png"});
  	}
    chrome.storage.sync.set({'toggle': toggle}, function(){
      console.log('toggle changed : ' + toggle);
    });
});
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var userlist = [];
var userstring = '';

function save_user(){
  var uid =  document.getElementById("userID").value;
  var flag = 0;
  userstring = ''
  if (uid.trim() == '') return;
  for (var i = 0; i < userlist.length; i++){
    if (userlist[i] == uid){
      flag = 1;
    } else {
      userstring = userstring + userlist[i]
      if (i != userlist.length - 1) userstring = userstring + '|'
    }
  }
  if (flag == 0){
    userlist.push(uid);
    if (userstring == '') userstring = uid;
    else userstring = userstring + '|' + uid
  }
  chrome.storage.sync.set({'userlist': userstring}, function(){
    //alert('Complete!');
    load_user();
  });
}

function load_user(){
  chrome.storage.sync.get('userlist', function (result) {
    if (result.userlist == undefined) return;
    userstring = result.userlist
    if (userstring != ''){
      userlist = userstring.split('|');
      let page = document.getElementById('userDiv');
      page.innerHTML = '';
      for (let user of userlist) {
        if (user != ''){
          let parag = document.createElement('p');
          parag.innerHTML = user;
          page.appendChild(parag);
        }
      }
    }
  });
}
let button = document.getElementById('submit')
button.addEventListener('click', save_user);
load_user();

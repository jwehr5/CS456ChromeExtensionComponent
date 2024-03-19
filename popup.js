import { getActiveTabURL } from "./utils.js";

/*
document.addEventListener('DOMContentLoaded', function () {
  // (Inside the click listener)
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, { file: "content.js" }, function (data) {
          // Data is an array of values, in case it was executed in multiple tabs/frames
          //download(data[0], "download.html", "text/html");
          document.getElementById("links").textContent = data[0];
      });
  });
});
*/




//Function for changing the content between the list of links and the path of travel
const changeContent = ( tabSection)=> {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  console.log("Here in change content");
  document.getElementById(tabSection).style.display = "block";
  //evt.currentTarget.className += " active";

};


/*
  Function which will run when the mouse hovers over a link.
*/
 const addRedBox = async (evt) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "background.js" }, function (data) {
      console.log("Test 1");
      console.log(evt);

      chrome.tabs.sendMessage(tabs[0].id, evt);
        // Data is an array of values, in case it was executed in multiple tabs/frames
        //download(data[0], "download.html", "text/html");
        //document.getElementById("links").textContent = data[0];
        //document.getElementById("links").style.border = "2px solid red";
    });
});

};


/*
  Function which will run when the mouse unhovers from a link.
*/ 
const removeRedBox = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: "background.js"}, function (data) {
      console.log("Test 2");

      chrome.tabs.sendMessage(tabs[0].id, "removeBox");

      //document.getElementById("links").style.border = "";
    });
});

};




document.addEventListener("DOMContentLoaded", () => {
  // null here defaults to active tab of current window
  /**
   * Find all the links by searching for all the a elements.
   * Add them to the list in the chrome extension.
   */
  chrome.tabs.executeScript(null, {
    code: `
        Array.from(document.querySelectorAll('a')).map(a => a.href);
    `
  }, response => {
    const pageData = response[0];
    console.log(pageData[0]);
    if (!pageData) {
      console.log("Could not get data from page.");
      return;
    }
    
    let listOfLinks = document.getElementById("links");

    
    for(let i = 0; i < pageData.length; i++){
      let a = document.createElement('a');
      let listItem = document.createElement('li');
      a.textContent = pageData[i];
      a.setAttribute('href', pageData[i]);
      listItem.appendChild(a);

      //Add event listeners for each link for when the mouse hovers over it and when it unhovers.
      listItem.addEventListener("mouseover", () => {addRedBox(pageData[i])});
      listItem.addEventListener("mouseout", removeRedBox);
      listOfLinks.appendChild(listItem);
      document.createElement('br');
    }

    

  });

document.getElementById("LinksButton").addEventListener('click', () => {changeContent('ListOfLinks')});
document.getElementById("PathOfTravelButton").addEventListener('click',  () => {changeContent('PathOfTravel')});
});



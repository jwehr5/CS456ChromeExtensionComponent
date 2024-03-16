( () =>{

    console.log("I'm running");


    chrome.runtime.onMessage.addListener(function (message, sender, response){
        console.log("Message is "+ message);

        /*
            If the message isn't "removeBox" then put a box over the link that was hovered. The message in this case will be the link.
            Find which a element has the corresponding link and put a box over it.
        */ 
        if(message != "removeBox"){
            var links = document.querySelectorAll('a');
            console.log(links.length);
            for(var i = 0; i < links.length; i++){
                
                var currentElement = links[i];
                if(currentElement.href == message){
                    console.log(currentElement.href);
                    currentElement.style.border = "2px solid red";
                }
            }

        }else{
            var links = document.querySelectorAll('a');
            for(var i = 0; i < links.length; i++){
                links[i].style.border = "";
            }
        }

       
    });

})();

/*chrome.runtime.sendMessage({greeting: "hello i come from content"}, function(response) {
    console.log(response.farewell);
  });
  //document.getElementById("links").style.border = "2px solid red";
  DOMtoString(document); // This will be the last executed statement

  function DOMtoString(document_root) {
      console.log(document_root.body.innerText);
      
      return document_root.body.innerText;
  }

*/
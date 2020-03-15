console.log("started logging in tracker content.js script");
console.log(items);

var targetNode;
// Select the node that will be observed for mutations
if(items.length == 1) {
    targetNode = items[0];
}
if(items.length == 2) {
    targetNode = items[1];
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {    
    console.log(`message: ${msg.beskjed}`);
    sendResponse({
        response: "received"
    });
    console.log(msg.beskjed);
    console.log(document.getElementById('translation-element'));
    document.getElementById('translation-element').innerHTML = msg.beskjed;
});


// Options for the observer (which mutations to observe)
const config = {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false
};

var cmp = '';
// The ID of the extension we want to talk to.                    
var translatorExtensionId = "gpfpplgblhkoljklpplfhpjkhemonpgc";
        
//// Start a long-running conversation:
var port = chrome.runtime.connect(translatorExtensionId);

var full_text_subtitle = '';

// Callback function to execute when mutations are observed
function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
      switch(mutation.type) {
        case 'childList':
          /* One or more children have been added to and/or removed
             from the tree; see mutation.addedNodes and
             mutation.removedNodes */

             console.log('A child node has been added or removed.');

             if (!document.getElementById('translation-element')) {
                 let translationElement = document.createElement('div');
                 translationElement.setAttribute("id", "translation-element");
                 targetNode.parentNode.append(translationElement);

                 if (targetNode.innerText != '') {                    
                    if (full_text_subtitle.toUpperCase() !== targetNode.innerText.toUpperCase()) {
                        console.log(targetNode.innerText);

                        port.postMessage({
                            no: targetNode.innerText
                        });

                        full_text_subtitle = targetNode.innerText;
                    }
                 } 
 
             } else {
                 if (targetNode.innerText != '') {                    
                    if (full_text_subtitle.toUpperCase() !== targetNode.innerText.toUpperCase()) {
                        console.log(targetNode.innerText);

                        port.postMessage({
                            no: targetNode.innerText
                        });

                        full_text_subtitle = targetNode.innerText;
                    }
                 }
             }
             break;
      }
    });
  }

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();
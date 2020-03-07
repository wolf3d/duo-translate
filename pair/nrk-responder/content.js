console.log("started logging in responder content.js script");
console.log(items);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {    
    console.log(`message: ${msg.beskjed}`);
    sendResponse({
        response: "received"
    });
    document.getElementById('source').value = msg.beskjed;
});
      

// Select the node that will be observed for mutations
const targetNode = items[0];

// The ID of the extension we want to talk to.                 
// tracker extension id   
var translatorExtensionId = "bkbhmoenlfibhnfakjbcbcaghegapgkd";

//// Start a long-running conversation:
var port = chrome.runtime.connect(translatorExtensionId);

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };
var cmp = '';
// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            if (cmp != targetNode.innerText && targetNode.innerText.indexOf("....") == -1) {
                cmp = targetNode.innerText;
                console.log('innerText:' + cmp);
                port.postMessage({
                    en: cmp
                });   
            }            
        }
        if (mutation.type === 'subtree') {
            console.log('subtree.');
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// // Later, you can stop observing
// //observer.disconnect();
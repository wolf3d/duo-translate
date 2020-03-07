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
var translatorExtensionId = "kdlkelkplehlgnjmadcfpdacgdpgeapa";
        
//// Start a long-running conversation:
var port = chrome.runtime.connect(translatorExtensionId);

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');

            //console.log(targetNode.parentNode.children);
            if (!document.getElementById('translation-element')) {
                let translationElement = document.createElement('div');
                translationElement.setAttribute("id", "translation-element");
                targetNode.parentNode.append(translationElement);



            } else {
                let tElement = document.getElementById('translation-element');
                let captionItems = document.getElementsByClassName('ludo-captions__line');
                console.log(captionItems.length);
                var full_text_subtitle = '';

                if (captionItems.length > 0) {
                    var first = true;
                    Object.entries(captionItems).map((object) => {
                        //console.log(object[1].innerText);
                        if (first) {
                            full_text_subtitle += object[1].innerText;
                            first = false;
                        } else {
                            full_text_subtitle += ' ' + object[1].innerText;

                            if (cmp != full_text_subtitle) {
                                console.log(full_text_subtitle);
                                port.postMessage({
                                    no: full_text_subtitle
                                });    
                            }
                            cmp = full_text_subtitle;
                            
                            //tElement.textContent = full_text_subtitle;                            
                        }
                    });

                }
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();
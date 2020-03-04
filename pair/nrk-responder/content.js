console.log("started logging in responder content.js script");
console.log(items);

    chrome.runtime.onMessage.addListener(function(beskjed,sender,sendResponse){        
          console.log("beskjed:" + JSON.stringify(beskjed.beskjed));
          document.getElementById('source').value = beskjed.beskjed;
      });
      

      // Select the node that will be observed for mutations
const targetNode = items[0];

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();
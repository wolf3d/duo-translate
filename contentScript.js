console.log("started logging in content script");


//ludo-captions

// Select the node that will be observed for mutations
//getElementsByClassName
//const targetNode = document.getElementById('ludo-captions');

const targetNode = document.getElementsByClassName('ludo-layout')[0];

// // Options for the observer (which mutations to observe)
const  config = { characterData: false, attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    console.log("started logging in callback function");
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');

            targetNode.appendChild( document.createElement('b') );
        }
        // else if (mutation.type === 'attributes') {
        //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
        // }

    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();

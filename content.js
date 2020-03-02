console.log("started logging in content.js script");
console.log(items);


// Select the node that will be observed for mutations
var targetNode = items[1]; //document.getElementById('some-id');

// Options for the observer (which mutations to observe)
const config = {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false
};

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
                        }
                    });
                    console.log(full_text_subtitle);
                    //tElement.textContent = full_text_subtitle;

                    var port = chrome.runtime.connect({
                        name: "knockknock"
                    });
                    port.postMessage({
                        no: full_text_subtitle
                    });
                    port.onMessage.addListener(function(msg) {
                        console.log("msg.en: " + msg.en);
                        tElement.textContent = msg.en;
                    });
                }
            }
        }

        if (mutation.type === 'characterData') {
            console.log('characterData has been changed');
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
trackerSwitchOnButton.onclick = function(element) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: "var items = document.getElementsByClassName('ludo-captions');"
        }, function() {
            chrome.storage.local.get(['responderId'], function(result) {
                console.log("responderId here it is:" + result.responderId);

                chrome.tabs.executeScript(tabs[0].id, {
                        code: "var responderIdv = '" + result.responderId + "';"
                    },
                    function() {
                        chrome.tabs.executeScript(tabs[0].id, {
                            file: 'content.js'
                        });
                    })
            })
        });
    });
};
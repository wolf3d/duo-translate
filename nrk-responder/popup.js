responderSwitchOnButton.onclick = function(element) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: "var items = document.getElementsByClassName('tlid-results-container');"
        }, function() {
            chrome.storage.local.get(['trackerId'], function(result) {
                console.log("trackerId here it is:" + result.trackerId);

                chrome.tabs.executeScript(tabs[0].id, {
                        code: "var trackerIdv = '" + result.trackerId + "';"
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
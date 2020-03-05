chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                  hostEquals: 'translate.google.com'
              },
          })],
          actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
  });
});

// For long-lived connections:
var from_port;

chrome.runtime.onConnectExternal.addListener((port) => {
    console.log(port);
    console.log(`connection attempt from ${port.sender.id}`);
    if (port.sender.origin == "https://tv.nrk.no") {
        from_port = port;
        from_port.onMessage.addListener((message) => {
            console.log(`From ${port.sender.origin}: ${message.no}`);

            chrome.tabs.query({
                title: "Google Translate"
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    beskjed: message.no
                }, function(response) {});
            });
            
        });
    }
});
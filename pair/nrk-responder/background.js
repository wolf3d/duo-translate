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
chrome.runtime.onConnectExternal.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        // See other examples for sample onMessage handlers.
        console.log("msg.no " + msg.no);


        chrome.tabs.query({title: "Google Translate"}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {beskjed: msg.no}, function(response) {

                console.log(tabs[0].id);
                console.log(tabs[0].title);

            });
          });

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id,  {beskjed: msg.no}, function(response) {              
        //     });
        //   });

    });
});
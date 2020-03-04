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
              //console.log("response:"+response.farewell);
            });
          });

        // chrome.runtime.onConnect.addListener(function(port) {
        //     console.assert(port.name == "knockknock");
        //     port.onMessage.addListener(function(msg) {
        //     //   if (msg.joke == "Knock knock")
        //     //     port.postMessage({question: "Who's there?"});
        //     //   else if (msg.answer == "Madame")
        //     //     port.postMessage({question: "Madame who?"});
        //     //   else if (msg.answer == "Madame... Bovary")
        //     //     port.postMessage({question: "I don't get it."});
        //     });
        //     port.postMessage({beskjed: msg.no});
        //   });


    });
});
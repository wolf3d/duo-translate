chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                  hostEquals: 'tv.nrk.no'
              },
          })],
          actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
      console.log("msg.no " + msg.no);
      port.postMessage({
          en: msg.no
      });
  });
});

// For long-lived connections:
var from_port;

chrome.runtime.onConnectExternal.addListener((port) => {
    console.log(port);
    console.log(`connection attempt from ${port.sender.id}`);
    //if (port.sender.origin == "https://translate.google.com") {
        from_port = port;
        from_port.onMessage.addListener((message) => {
            console.log(`From ${port.sender.origin}: ${message.en}`);

            chrome.tabs.query({
                title: "NRK TV*"
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    beskjed: message.en
                }, function(response) {});
            });
            
        });
    //}
});
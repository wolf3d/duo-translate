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
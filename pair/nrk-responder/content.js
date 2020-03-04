// // For long-lived connections:
// chrome.tabs.onConnectExternal.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//         // See other examples for sample onMessage handlers.
//         console.log("msg.no " + msg.no);
//     });
// });

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(request);
//         //sendResponse({farewell: "goodbye"});
//     });

    var port = chrome.runtime.connect({name: "knockknock"});
    //port.postMessage({joke: "Knock knock"});
    port.onMessage.addListener(function(beskjed) {
        console.log(beskjed);
    //   if (msg.question == "Who's there?")
    //     port.postMessage({answer: "Madame"});
    //   else if (msg.question == "Madame who?")
    //     port.postMessage({answer: "Madame... Bovary"});
    });
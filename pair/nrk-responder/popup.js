changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
          code: "var items = document.getElementsByClassName('result-shield-container');"
      }, function() {
          chrome.tabs.executeScript(tabs[0].id, {
              file: 'content.js'
          });
      });

  });
};
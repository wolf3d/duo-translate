// Saves options to chrome.storage
function save_options() {
  var responderId = document.getElementById('responderId').value;
  
  chrome.storage.local.set({
    responderId: responderId    
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores input field value using the preferences
// stored in chrome.storage.
function restore_options() {  
  chrome.storage.local.get({
    responderId: 'gpfpplgblhkoljklpplfhpjkhemobbbb',    
  }, function(items) {
    document.getElementById('responderId').value = items.responderId;    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
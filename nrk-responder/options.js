// Saves options to chrome.storage
function save_options() {
  var trackerId = document.getElementById('trackerId').value;
  
  chrome.storage.local.set({
    trackerId: trackerId    
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
    trackerId: 'gpfpplgblhkoljklpplfhpjkhemobbbb',    
  }, function(items) {
    document.getElementById('trackerId').value = items.trackerId;    
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
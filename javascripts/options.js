var optionsCancel = function() {
  close();
};
var optionsOK = function() {
  var options = {
    hideWholeBillboard: hideWholeBillboardGet()
  }

  chrome.storage.local.set(options, function() {
    if (chrome.runtime.lastError) {
      console.log("optionsOK() chrome.storage.local.set failed:", chrome.runtime.lastError.message);
    }

    close();
  });
};

var hideWholeBillboardGet = function() {
  return document.getElementById("hideWholeBillboard").checked;
};
var hideWholeBillboardSet = function(value) {
  document.getElementById("hideWholeBillboard").checked = value === true;
};

document.getElementById("cancel").addEventListener("click", optionsCancel);
document.getElementById("ok").addEventListener("click", optionsOK);

chrome.management.getSelf(function(info) {
  if (info.installType == "development") {
    document.body.className = "development";
  }
});

chrome.storage.local.get(null, function(options) {
  hideWholeBillboardSet(options.hideWholeBillboard);
});

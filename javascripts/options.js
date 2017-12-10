var background = chrome.extension.getBackgroundPage();

var optionsCancel = function() {
  close();
};
var optionsOK = function() {
  background.blockPreviewsSet(document.getElementById("blockPreviews").checked);
  background.hideBillboardSet(document.getElementById("hideBillboard").checked);
  background.saveOptions(function() { close(); });
};

document.getElementById("cancel").addEventListener("click", optionsCancel);
document.getElementById("ok").addEventListener("click", optionsOK);

chrome.management.getSelf(function(info) {
  if (info.installType == "development") {
    document.body.className = "development";
  }
});

document.getElementById("blockPreviews").checked = background.blockPreviewsGet() === true;
document.getElementById("hideBillboard").checked = background.hideBillboardGet() === true;

var options;
var defaultOptions = {
  blockPreviews: true,
  hideBillboard: false
};

blockPreviewsGet = function() {
  return options.blockPreviews;
};
blockPreviewsSet = function(value) {
  options.blockPreviews = value;
};
hideBillboardGet = function() {
  return options.hideBillboard;
};
hideBillboardSet = function(value) {
  options.hideBillboard = value;
};
saveOptions = function(callback) {
  chrome.storage.local.set(options, function() {
    if (chrome.runtime.lastError) {
      console.log("saveOptions() failed:", chrome.runtime.lastError.message);
    }

    callback();
  });
};

var blockBillboardVideo = function(details) {
  if (options.blockPreviews) {
    for (var i = 0; i < details.requestHeaders.length; i++) {
      if (details.requestHeaders[i].name == "Referer" && details.requestHeaders[i].value.indexOf("/browse") !== -1) {
        return { cancel: true };
      }
    }
  }
};

chrome.storage.local.get(null, function(storage_options) {
  options = Object.assign(defaultOptions, storage_options);
});

chrome.webRequest.onBeforeSendHeaders.addListener(blockBillboardVideo, { urls: ["*://*.nflxvideo.net/*"] }, ["blocking", "requestHeaders"]);

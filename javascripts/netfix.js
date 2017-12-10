function huntForBillboard() {
  var divs = document.evaluate("//div[contains(concat(' ', @class, ' '), ' billboard-row ')]", document);
  var target = divs.iterateNext();

  if (target !== null) {
    target.setAttribute("hidden", "");
    console.log("Netfix: found and hide billboard-row");
  } else {
    setTimeout(huntForBillboard, 500);
  }
}

chrome.storage.local.get(null, function(options) {
  if (options.hideBillboard) {
    huntForBillboard();
    window.addEventListener("popstate", huntForBillboard);
  }
});

function huntForElement(targetClass) {
  var divs = document.evaluate("//div[contains(concat(' ', @class, ' '), ' " + targetClass + " ')]", document);
  var target = divs.iterateNext();

  if (target !== null) {
    target.parentNode.removeChild(target);
    console.log("Netfix: found and removed " + targetClass);
  } else {
    setTimeout(huntForElement, 500);
  }
}

chrome.storage.local.get(null, function(options) {
  var targetClass = options.hideWholeBillboard ? "billboard-row" : "billboard-motion";

  huntForElement(targetClass);

  window.addEventListener("popstate", huntForElement.bind(targetClass));
});

function lookForBillboard() {
  var divs = document.evaluate("//div[contains(concat(' ', @class, ' '), ' billboard-motion ')]", document);
  var billboard = divs.iterateNext();

  if (billboard !== null) {
    billboard.parentNode.removeChild(billboard);
    console.log("Netfix: found and removed billboard");
  } else {
    setTimeout(lookForBillboard, 500);
  }
}

lookForBillboard();

window.addEventListener("popstate", lookForBillboard);

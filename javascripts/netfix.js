function lookForBillboard() {
  var divs = document.evaluate("//div[contains(concat(' ', @class, ' '), ' billboard-motion ')]", document);
  var billboard = divs.iterateNext();

  if (billboard !== null) {
    billboard.parentNode.removeChild(billboard);
  } else {
    setTimeout(lookForBillboard, 500);
  }
}

lookForBillboard();

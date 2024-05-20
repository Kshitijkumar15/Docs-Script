function countRedWords() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var redWordCount = countRedWordsInElement(body);
  Logger.log('Number of words in red color: ' + redWordCount);
}

function countRedWordsInElement(element) {
  var redWordCount = 0;

  if (element.getType() == DocumentApp.ElementType.TEXT) {
    var text = element.getText();
    var words = text.split(/\s+/); // Split text into words

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var foregroundColor = element.getForegroundColor();

      // Check if the word is red
      if (foregroundColor && foregroundColor == '#ff0000') {
        redWordCount++;
      }
    }
  } else {
    // Recursively count red words in child elements
    var numChildren = element.getNumChildren();
    for (var j = 0; j < numChildren; j++) {
      redWordCount += countRedWordsInElement(element.getChild(j));
    }
  }

  return redWordCount;
}

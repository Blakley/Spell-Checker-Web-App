// load dictionary
let path = "https://gist.githubusercontent.com/h3xx/1976236/raw/bbabb412261386673eff521dddbe1dc815373b1d/wiki-100k.txt";
let dictionary = [];
$.get(path, function(data, status) {
    dictionary = data.split("\n").map(v => v.toLowerCase());
    dictionary = dictionary.filter(function (item) {
        return item.indexOf("#") !== 0;
    });    
});

let punctuations = [".", "?", "!", ",", ":", ";", "'"];

// check if input words are in our dictionary
$("#editor").on("keyup", function(e) {
    if (e.keyCode == 32) { // Space key pressed
        var newHTML = "";
        let temp = "";

        $(this).text().replace(/[\s]+/g, " ").trim().split(" ").forEach(function(word) {
            // check if there's an ending punctuation
            temp = word;
            if (punctuations.includes(temp.charAt(temp.length-1)))
                temp = temp.slice(0, -1); 
           
            // check if the word is in the dictionary, change color if it isn't.
            if (dictionary.indexOf(temp.trim().toLowerCase()) > -1)
                newHTML += "<span class='normal'>" + word + "&nbsp;</span>";
            else
                newHTML += "<span class='incorrect'>" + word + "&nbsp;</span>";
        });
        
        $(this).html(newHTML);

        // Set cursor postion to end of text
        var child = $(this).children();
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(child[child.length - 1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.focus();
    }
});

// handle pasted text
$("#editor").bind("paste", function(e) {
    // only execute if editor is empty
    let span = document.querySelector('span');
    let editor = document.getElementById("editor");
    if (editor.contains(span) == false) {
        alert("Press the space key after your text is pasted");
    }
} );
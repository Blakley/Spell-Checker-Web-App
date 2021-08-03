// word dictionary
var word_dictionary = [];

// -----------------------------------------------------------------------------------------------------------------------------

/* check button clicked - check words against dictionary words */
document.getElementById('input-form').onsubmit = function() { 
    var current_input = document.getElementById("input-text-form").value;
    var input_words = current_input.split(' ');

    // compare input words to dictionary words
    for (let i = 0; i < input_words.length; i++) {
        // skip spaces
        if (!/\S/.test(input_words[i])) {
            continue;
        }
        
        // check for a word with a period at the
        var last_character = input_words[i].slice(-1); 
        if (last_character == '.' && last_character == ',') {
            let new_word = input_words[i].slice(0, -1) 
            if (word_dictionary.includes(new_word.toLowerCase())) {
                console.log("word found: " + input_words[i].toLowerCase());
            } 
            else {
                document.getElementById("output-text-form").value += input_words[i].toLowerCase() + '\n'
                
                console.log("word not include: " + input_words[i].toLowerCase());
            }
        }
        else   // check for normal word
        {
            if (word_dictionary.includes(input_words[i].toLowerCase()) && last_character != '.') {
                console.log("word found: " + input_words[i].toLowerCase());
            } 
            else {
                console.log("word not include: " + input_words[i].toLowerCase());
            }
        }
    }

    return false;
};
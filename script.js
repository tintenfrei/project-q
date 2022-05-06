// TODO
// fix the author name issue (through generating the quote cards from the script tag )
// generate the options from here (the script tag)
// make an array of objects like the one below and loop over it to generate the option tags

               


// for(var i = 0, l = options.length; i < l; i++){
//     var option = options[i];
//     selectBox.options.add( new Option(option.language, option.name, option.supports_formality) );
//   }

//  the getTranslations() on option select

const quoteText = document.getElementById('quote-text'),
    quoteTags = document.getElementById('quote-tags'),
    quoteAuthor = document.getElementsByClassName('quote-author'),
    genQuoteBtn = document.getElementById('gen-quote-btn');

    let targetlanguage = "de";

const getTranslations = function(text, language) {
    fetch(`https://api-free.deepl.com/v2/translate?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&text=${text}&target_lang=${language}`)
        .then(response => response.json())
        .then(response => {
        return document.getElementById("targetText").innerHTML = response.translations[0].text;
            })
    };
let options = [];
var selectBox = document.getElementById('languageSelector');

function presentLangOptions() {
    fetch(`https://api-free.deepl.com/v2/languages?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&type=target`)
        .then(response => response.json())
        .then(response => options = response)
        .then(() => {
                        for(let i = 0; i < options.length; i++) {
                            var option = options[i];
                            selectBox.options.add( new Option(option.name) );
                       } 
                    })
        }


presentLangOptions();


function randomQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            quoteText.textContent = data.content;
            quoteTags.textContent = data.tags;
            quoteAuthor.textContent = `-- ${data.author}`;
            return data;
        })
        .then(data => getTranslations(data.content, 'es')); // add a (then) with a default translation 
}

console.log(quoteText.textContent)

randomQuote();

genQuoteBtn.addEventListener('click', () => {
    randomQuote()
});




let select = document.getElementById('languageSelector');


select.addEventListener("change", () => getTranslations(quoteText.textContent, select[select.selectedIndex].value));

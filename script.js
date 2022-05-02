// TODO
// fix the author name issue (through generating the quote cards from the script tag )
// generate the options from here (the script tag)
// make an array of objects like the one below and loop over it to generate the option tags
// let options = [{ value: "de", label: "German" }, { value: "es", label: "Spanish" }]

//  the getTranslations() on option select
call

const quoteText = document.getElementById('quote-text'),
    quoteTags = document.getElementById('quote-tags'),
    quoteAuthor = document.getElementsByClassName('quote-author'),
    genQuoteBtn = document.getElementById('gen-quote-btn');

console.log(quoteAuthor)
let targetlanguage = "de";


const getTranslations = function(text, language) {
    fetch(`https://api-free.deepl.com/v2/translate?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&text=${text}&target_lang=${language}`)
        .then(response => response.json())
        .then(response => {
            return document.getElementById("targetText").innerHTML = response.translations[0].text;
        })
};


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

randomQuote();
genQuoteBtn.addEventListener('click', () => {
    randomQuote()
    getTranslations('Hello World!', 'de');
});

// Trying to make the currently selected language in the drop menu apply to the fetch func below to fill the target language (targetlanguage variable)
// let e = document.getElementById('languageSelector');
// let targetLanguage = e.options[e.selectedIndex].value;
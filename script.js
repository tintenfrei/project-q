// declaring 4 variables to document

const quoteText = document.getElementById('quote-text'),
    quoteTags = document.getElementById('quote-tags'),
    quoteAuthor = document.querySelectorAll('.quote-author'),
    genQuoteBtn = document.getElementById('gen-quote-btn');

    //retrieving and storing the language of the actual user because every user starts with their won language (works on Chrome, Brave and Firefox so far, apparently not yet on Safari)
let userLang = navigator.language || navigator.userLanguage;
let ttext;

// ONLY CREATING AND STORING TRANSLATIONS FUNCTION
// storing in a const the translation api from deepl.com with two parameters: text to be translated (otext) and the target language (language), additionally to the two parameters we are translating
// Quote of the day
const getTranslations = function(otext, language) {
    fetch(`https://api-free.deepl.com/v2/translate?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&text=Quote%20of%20the%20day%20@%20${otext}&target_lang=${language}`)
        .then(response => response.json())
        .then(response => {
            // storing in ttext variable the result fromt the api translation including otext and "Quote of the Day"
            ttext = response.translations[0].text;
        }).then(() => {
            // splitting with split method thaat converts a string into an array; pushing the result into document according to IDs
            document.getElementById("targetText").innerHTML = ttext.split("@")[1];
            document.getElementById("headerForTranslation").innerHTML = ttext.split("@")[0];
        })
};
// CREATING DIFFERENT TARGET LANGUAGES
// creating empty array for the different language options
let options = [];
// declaring the variable that stores the different languages on document
var selectBox = document.getElementById('languageSelector');
// creating function for retrieving possible target languages offered by deepl.com
function presentLangOptions() {
    fetch(`https://api-free.deepl.com/v2/languages?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&type=target`)
        .then(response => response.json())
        // function that sets variable options equal to the received languages as an array
        .then(response => options = response)
        // function with a looping through all languages
        .then(() => {
            for (let i = 0; i < options.length; i++) {
                var option = options[i];
                // variable that stores true if language looped is equal to the default language of user
                let isSelected = (option.language === userLang.toUpperCase()) ? true : false;
                // method that adds new objects into the selectBox array to the dropdown list and checks default language of user
                selectBox.options.add(new Option(option.name, option.language, isSelected, isSelected));
            }
        })
}
// calling the function to retrieve possible languages
presentLangOptions();
// RETRIEVING QUOTES FROM API
function randomQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            quoteText.textContent = data.content;
            quoteTags.textContent = data.tags;
            // we use the author two times with a html class
            quoteAuthor[0].textContent = `-- ${data.author}`;
            quoteAuthor[1].textContent = `-- ${data.author}`;
            return data;
        })
        .then(data => getTranslations(data.content, userLang))
        
}
// calling random quote
randomQuote();
// event handler for getting new quote on document
genQuoteBtn.addEventListener('click', () => {
    randomQuote()
});
// event handler for the languages dropdown to translated
selectBox.addEventListener("change", () => getTranslations(quoteText.textContent, selectBox[selectBox.selectedIndex].value));


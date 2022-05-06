


const quoteText = document.getElementById('quote-text'),
    quoteTags = document.getElementById('quote-tags'),
    quoteAuthor = document.getElementsByClassName('quote-author'),
    genQuoteBtn = document.getElementById('gen-quote-btn');

    let targetlanguage = "de";
    let userLang = navigator.language || navigator.userLanguage; 


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

                            let isSelected = (option.language === userLang.toUpperCase()) ? true : false; 

                            selectBox.options.add( new Option( option.name, option.language, isSelected, isSelected ) );
                          
                       
                       } 
                    })
        .then(selectBox[selectBox.selectedIndex] = 5)
        }

console.log(options)
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
        .then(data => getTranslations(data.content, userLang))
        .then(console.log(selectBox)); // add a (then) with a default translation 
}

console.log(quoteText.textContent)

randomQuote();

genQuoteBtn.addEventListener('click', () => {
    randomQuote()
});



selectBox.addEventListener("change", () => getTranslations(quoteText.textContent, selectBox[selectBox.selectedIndex].value));

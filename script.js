let e = document.getElementById('languageSelector');
let targetLanguage = e.options[e.selectedIndex].value;

let textToDeep = document.getElementById("quote-text").innerHTML;


fetch(`https://api-free.deepl.com/v2/translate?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&text=${textToDeep}&target_lang=${targetLanguage}`)
    .then(response => response.json())
    .then(response => {
        return document.getElementById("targetText").innerHTML = response.translations[0].text;
    })
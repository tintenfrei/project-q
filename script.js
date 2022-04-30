let e = document.getElementById('languageSelector');

function getSelectValue(languageSelector) {
    pick_ = document.getElementById(languageSelector).value;
    localStorage.pick_ = pick_;
    pick_ = localStorage.getItem("pick_");
    location.reload();
}

let textToDeep = document.getElementById("quote-text").innerHTML;


fetch(`https://api-free.deepl.com/v2/translate?auth_key=8b66872d-f900-ca3f-dd80-cda50dfab6f6%3Afx&text=${textToDeep}&target_lang=${getSelectValue}`)
    .then(response => response.json())
    .then(response => {
        return document.getElementById("targetText").innerHTML = response.translations[0].text;
    })
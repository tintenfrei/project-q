let bringQuoteBtn = document.getElementById("quote-btn");

let authorSection = document.getElementById("author");
let quoteSection = document.getElementById("quote");


fetch('https://quote-garden.herokuapp.com/api/v3/quotes')
    .then(response => response.json()) // one liner or no block of code
    .then(quotes => console.log(quotes))
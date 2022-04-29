const quoteText = document.getElementById('quote-text'),
      quoteTags = document.getElementById('quote-tags'),
      quoteAuthor = document.getElementById('quote-author'),
      genQuoteBtn = document.getElementById('gen-quote-btn');


fetch('https://api.quotable.io/random')
    .then(response => response.json()) 
    .then(data => {
        console.log(data.content)
    })
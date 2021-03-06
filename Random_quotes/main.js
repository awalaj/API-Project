let quotesData;
var colors = [
    '#16a085',
    '#27ae60',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#3285a8',
    '#6f53fc'
];
var currentQuote = '',
    currentAuthor = ''

function getQuotes(){
    return $.ajax({
        Headers: {
            Accept: 'application/json'
        },
        url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        success: function (Quotes) {
            if(typeof Quotes == "string"){
                quotesData = JSON.parse(Quotes);
            }
        }
    });
}
function getRandomQuote(){
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]
}
function getQuote(){
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
    
    $('#tumblr-quote').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
            encodeURIComponent(currentAuthor) +
            '&content=' +
            encodeURIComponent(currentQuote) +
            '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );
    $('.quote-text').animate({ opacity: 0}, 500, function(){
        $(this).animate({ opacity: 1}, 500);
        $('#text').html(randomQuote.quote);
    })
    $('.quote-author').animate({ opacity: 0}, 500, function(){
        $(this).animate({ opacity: 1}, 500);
        $('#author').html(randomQuote.author);
    })
}
$(document).ready(function(){
    getQuotes()
    .then(() => {getQuote();});
    $("#new-quote").click(function(){
        getQuote();
        var color = Math.floor(Math.random() * colors.length);
        $('body').css({backgroundColor: colors[color]});
        $('#text').css({color: colors[color]});
        $("#author").css({color: colors[color]});
        $(".button").css({backgroundColor: colors[color]});
    })
})
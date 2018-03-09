console.log('Quotes');

fetchCall();

function fetchCall() {
    fetch('https://random-quote-generator.herokuapp.com/api/quotes/random', {
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById('quote').innerHTML = data.quote;
        document.getElementById('author').textContent = '- ' + data.author;
    });
}

var nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', function (event) {
    fetchCall();
});
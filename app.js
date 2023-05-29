const url = 'https://type.fit/api/quotes';
const quotes = document.querySelector('.quotes');
const clearQuote = document.querySelector('.clear');

const getQuotes = async function () {
  const response = await fetch(url);
  let data = await response.json();
  // console.log(data.slice(0, 10));
  return data;
};

const loadQuotes = async function (value) {
  const data = await getQuotes();
  displayQuotes(data, value);
};

function randomArr(data, value) {
  let chosen = [];
  for (let i = 0; i < value; i++) {
    let rand = Math.floor(Math.random() * data.length);
    chosen.push(data[rand]);
  }
  return chosen;
}

function displayQuotes(data, value) {
  let numOfQuotes = randomArr(data, value);
  const html = numOfQuotes
    .map((quote) => {
      return `
          <div class="quote">
            <p>
            ${quote.text}
          </p>
          <p class="author">--${!quote.author ? 'Unknown' : quote.author}</p>
          </div>
          <hr>

    `;
    })
    .join('');
  quotes.innerHTML = html;
}

const form = document.querySelector('.form');
const num = document.querySelector('.number');
const error = document.querySelector('.error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = +num.value;
  if (!value || value < 1 || value > 10) {
    error.classList.remove('hidden');
    setTimeout(() => {
      error.classList.add('hidden');
    }, 3000);
    return;
  }
  loadQuotes(value);
});
// loadQuotes();

clearQuote.addEventListener('click', () => {
  if (quotes.children.length > 0) {
    quotes.innerHTML = '';
    num.value = '';
  }
});

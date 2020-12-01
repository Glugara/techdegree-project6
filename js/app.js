const quwerty = document.getElementById('qwerty')
const phrase = document.getElementById('phrase')
const start = document.querySelector('.btn__reset')
const overlay = document.getElementById('overlay')
const lives = document.querySelectorAll('.tries img')

// Intialzied
let wrong = 0;

// Phrase Array
const phrases = [
    "I find your lack of faith disturbing",
    "May the force be with you",
    "There is always a bigger fish",
    "I sense much fear in you",
    "Fear is the path to the dark side",
];

// Overlay Hider
start.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Random phrase
const getRandomPhraseArray = (arr) => {
  let randomNumber = Math.floor(Math.random() * phrases.length );
  return phrases[randomNumber];
};

getRandomPhraseArray(phrases);

function addPhraseToDisplay(arr){
  for ( let i = 0; i < arr.length; i++) {
    let liList = document.createElement('li');
    let ulList = document.querySelector('#phrase ul');
    liList.textContent = arr[i];
    ulList.appendChild(liList);
    if (liList.textContent === ' ') {
      liList.className = 'space';
    } else {
      liList.className = 'letter';
    }
  }
}

const phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray)

// Check letter
  function checkLetter(button) {
    let checkLetter = document.querySelectorAll('.letter');
    let match = null;
    for ( let i = 0; i < checkLetter.length; i++) {
      if (checkLetter[i].textContent.toUpperCase() === button.textContent.toUpperCase()) {
        checkLetter[i].classList.add('show');
        match = true;
      }
    }
    return match;
  };

// Keyboard Listener
  qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      e.target.className = 'chosen';
    } if (e.target.className === 'chosen') {
      e.target.disabled = 'true';
      let letterFound = checkLetter(e.target);
      if (letterFound === null) {
        wrong += 1;
        lives[wrong - 1].src = "images/lostHeart.png";
    }
  }
  checkWin();
});

// Win checker
  function checkWin () {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');

    if (letter.length === show.length) {
      overlay.className = 'win';
      document.querySelector('h2').innerHTML = 'May the Force be with you, always.';
      overlay.style.display = 'flex';
    } else if ( wrong >= 5) {
      overlay.className = 'lose';
      document.querySelector('h2').innerHTML = 'The Emperor will show you the true nature of the Force. He is your Master now!';
      overlay.style.display = 'flex';
    }
  };

// Breathing Exercise Logic
let isBreathing = false;

function startBreathing() {
  if (isBreathing) return;
  isBreathing = true;

  const instructions = document.getElementById('breathing-instructions');
  instructions.innerHTML = "Breathe in as the circle expands... Breathe out as it contracts.";

  const circle = document.getElementById('circle');
  circle.style.animation = "breathing 4s infinite";

  setTimeout(() => {
    if (isBreathing) {
      instructions.innerHTML = "Keep following the rhythm: Inhale... Exhale...";
    }
  }, 8000);
}

function stopBreathing() {
  isBreathing = false;

  const instructions = document.getElementById('breathing-instructions');
  instructions.innerHTML = "Exercise stopped. Click 'Start Exercise' to begin again.";

  const circle = document.getElementById('circle');
  circle.style.animation = "none";
}

// Memory Card Game Logic
const memoryGameGrid = document.querySelector('.memory-game-grid');
const completionMessage = document.getElementById('completion-message');
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

// Card values (add pairs)
const cardValues = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍍', '🥝'];

function initializeGame() {
  cards = shuffle([...cardValues, ...cardValues]);
  memoryGameGrid.innerHTML = '';
  matchedCards = 0;
  moves = 0;
  document.getElementById('moves-counter').innerText = `Moves: ${moves}`;

  cards.forEach((value, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.value = value;
    cardDiv.onclick = () => flipCard(cardDiv);
    memoryGameGrid.appendChild(cardDiv);
  });

  completionMessage.style.display = 'none';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card) {
  if (flippedCards.length >= 2) return;

  card.textContent = card.dataset.value;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('moves-counter').innerText = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;

    if (matchedCards === cards.length) {
      completionMessage.style.display = 'block';
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }, 1000);
  }

  flippedCards = [];
}

function resetGame() {
  initializeGame();
}

// Initialize the memory game on page load
initializeGame();

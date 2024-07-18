const images = [
  'assets/1_DCo5LIbgIWrFIOfl3UAMpA.png', 'assets/1_DCo5LIbgIWrFIOfl3UAMpA.png',
  'assets/7bf0ca43c6aee98a3a6433d7a46397ed.jpg', 'assets/7bf0ca43c6aee98a3a6433d7a46397ed.jpg',
  'assets/maxresdefault.jpg', 'assets/maxresdefault.jpg',
  'assets/Sandy_Cheeks.svg.png', 'assets/Sandy_Cheeks.svg.png',
  'assets/SB-Standees-Spong-3_1200x.webp', 'assets/SB-Standees-Spong-3_1200x.webp',
  'assets/SB_Classic_MrK_005_EA-S.webp', 'assets/SB_Classic_MrK_005_EA-S.webp',
  'assets/SB_Classic_Pktn_003_EA-S.webp', 'assets/SB_Classic_Pktn_003_EA-S.webp',
  'assets/SpongeBob_SquarePants_-_Pearl_Krabs_promo_art.webp', 'assets/SpongeBob_SquarePants_-_Pearl_Krabs_promo_art.webp'
]

let flippedCards = []
let matchedCards = 0
let gameStarted = false
let timeoutId

function shuffleImages () {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[images[i], images[j]] = [images[j], images[i]]
  }
}

function createCard (image, index) {
  const card = document.createElement('div')
  card.className = 'card'
  card.dataset.index = index

  const cardInner = document.createElement('div')
  cardInner.className = 'card-inner'

  const cardFront = document.createElement('div')
  cardFront.className = 'card-front'

  const cardBack = document.createElement('div')
  cardBack.className = 'card-back'

  const img = document.createElement('img')
  img.src = image
  img.alt = `Image ${index}`
  cardBack.appendChild(img)

  cardInner.appendChild(cardFront)
  cardInner.appendChild(cardBack)
  card.appendChild(cardInner)

  card.addEventListener('click', handleCardClick)
  return card
}

function handleCardClick (event) {
  const card = event.currentTarget
  const cardInner = card.querySelector('.card-inner')
  const index = parseInt(card.dataset.index)

  if (flippedCards.length === 1 && flippedCards[0] === index) {
    return
  }

  if (flippedCards.length < 2) {
    cardInner.classList.add('flipped')
    flippedCards.push(index)

    if (flippedCards.length === 2) {
      gameStarted = true
      checkMatch()
      startTimer()
    }
  }
}

function checkMatch () {
  const firstCard = flippedCards[0]
  const secondCard = flippedCards[1]

  if (images[firstCard] === images[secondCard]) {
    const firstCardElement = document.querySelector(`[data-index="${firstCard}"]`)
    const secondCardElement = document.querySelector(`[data-index="${secondCard}"]`)
    firstCardElement.classList.add('hidden')
    secondCardElement.classList.add('hidden')
    flippedCards = []
    matchedCards += 2

    if (matchedCards === images.length) {
      showWinMessage()
    }
  } else {
    setTimeout(() => {
      const firstCardElement = document.querySelector(`[data-index="${firstCard}"]`)
      const secondCardElement = document.querySelector(`[data-index="${secondCard}"]`)
      firstCardElement.querySelector('.card-inner').classList.remove('flipped')
      secondCardElement.querySelector('.card-inner').classList.remove('flipped')
      flippedCards = []
    }, 1000)
  }
}

function startTimer () {
  timeoutId = setTimeout(() => {
    const firstCard = flippedCards[0]
    const firstCardElement = document.querySelector(`[data-index="${firstCard}"]`)
    firstCardElement.querySelector('.card-inner').classList.remove('flipped')
    flippedCards = []
  }, 5000)
}

function showWinMessage () {
  const messageDiv = document.getElementById('message')
  messageDiv.textContent = 'Congratulations, you won!'
}

function showLossMessage () {
  const messageDiv = document.getElementById('message')
  messageDiv.textContent = 'Sorry, you lost.'
}

function resetGame () {
  shuffleImages()
  const gameBoard = document.getElementById('game-board')
  gameBoard.innerHTML = ''

  for (let i = 0; i < images.length; i++) {
    const card = createCard(images[i], i)
    gameBoard.appendChild(card)
  }

  flippedCards = []
  matchedCards = 0
  gameStarted = false
  clearTimeout(timeoutId)
  const messageDiv = document.getElementById('message')
  messageDiv.textContent = ''
}

shuffleImages()
const gameBoard = document.getElementById('game-board')
for (let i = 0; i < images.length; i++) {
  const card = createCard(images[i], i)
  gameBoard.appendChild(card)
}

const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', resetGame)

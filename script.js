let text = document.getElementById('text')
let levelCounter = 0
let keyCounter = 0
let monitor = true
let listen = false
let arrayOfMessages = [
  "Welcome to the game! If you the click the button below, you'll be shown the opening paragraph from the Dickens classic, A Tale Of Two Cities. You'll have 90 seconds to type it out. Good luck!",
  'Well done! That was great! If you want to play the second level, just click the button below...',
  "Amazing! This next one is going to be a lot more difficult. Think you're up for it?",
  'Oh dear--not quite! Would you like to try again?',
]
let arrayOfTexts = [
  'It was the best of times, it was the worst of times',
  'Blah blah blah blah',
  'Bloh bloh bloh bloh',
]

function wrapperFunction() {
  text.innerHTML = arrayOfMessages[levelCounter]
  addButton()
}

function createStartButton() {
  let startButton = document.createElement('button')
  startButton.innerHTML = 'START GAME'
  startButton.setAttribute('id', 'startButton')
  startButton.addEventListener('click', startRound)
  return startButton
}

function addButton() {
  let button = createStartButton()
  let div = document.getElementById('myDiv')
  div.appendChild(button)
}

// function anonFunc() {
//   keyPressed(event, textArray)
// }

function textAppear() {
  startButton.remove()
  let text = arrayOfTexts[levelCounter]
  let textArray = text.split('')
  createSpans(textArray)
  window.addEventListener('keydown', function wrapper(event) {
    keyPressed(event, textArray)
  })
}

function createSpans(anArray) {
  for (let i = 0; i < anArray.length; i++) {
    let newSpan = document.createElement('span')
    newSpan.innerHTML = anArray[i]
    newSpan.setAttribute('id', `letter${i}`)
    text.appendChild(newSpan)
  }
}

function startCounting() {
  let i = 10
  let timer = document.getElementById('timer')
  countdown()
  window.myInterval = setInterval(countdown, 1000)

  function countdown() {
    timer.innerHTML = i
    i--
    if (i < 0) {
      clearInterval(myInterval)
      timer.innerHTML = ''
      failGame()
    }
  }
}

function keyPressed(event, array) {
  if (monitor == true) {
    if (event.key == array[keyCounter]) {
      console.log(keyCounter)
      selectedLetter = document.getElementById(`letter${keyCounter}`)
      selectedLetter.style.backgroundColor = 'lightgreen'
      keyCounter++
    }
    if (keyCounter == array.length) {
      clearInterval(myInterval)
      winGame()
    }
  }
}

function startRound() {
  text.innerHTML = ''
  keyCounter = 0
  monitor = true
  textAppear()
  startCounting()
}

function failGame() {
  text.innerHTML = ''
  text.innerHTML = arrayOfMessages[3]
  monitor = false
  addButton()
}

function winGame() {
  if (levelCounter != 6) {
    levelCounter++
    timer.innerHTML = ''
    monitor = false
    clearInterval(myInterval)
    wrapperFunction()
  } else {
    text.innerHTML =
      "Well done! You've beat the all the levels. Now that you've typed the opening paragraph several times, why not check out the full book?"
  }
}

wrapperFunction()

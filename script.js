let winningKeys = {}
let text = document.getElementById('text')
let textArray = []
let levelCounter = 0
let div = document.getElementById('myDiv')
let keyCounter = 0
let monitor = true
let listen = false
let arrayOfMessages = [
  'The aim of this game is simple: type what you see. Click the button below and the text will appear. All you have to do is start typing (case matters!). Finish typing within the time limit to complete the level. Good luck!',
  "Well done! That was great! Fancy another challenge? It'll be the same text, just arranged slightly differently.",
  "Now that was impressive! I think you can close the window now and feel proud of what you've accomplished. On the thr hnd...",
  'Amazing! By the way, how are you with the shift key?',
  'You really are great at this. You have so many skills! But how are you at combining those skills...?',
  'Congratulations! You beat all the levels and have mastered the opening paragraph of A Tale of Two Cities. Why not <span><a href=https://www.gutenberg.org/ebooks/98>check out the whole book?</a></span> Thanks for playing!',
  'Oh dear--not quite! Would you like to try again?',
]
let arrayOfTexts = [
  'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way',
  'way other the direct going all were we ,Heaven to direct going all were we ,us before nothing had we ,us before everything had we ,despair of winter the was it ,hope of spring the was it ,Darkness of season the was it ,Light of season the was it ,incredulity of epoch the was it ,belief of epoch the was it ,foolishness of age the was it ,wisdom of age the was it ,times of worst the was it ,times of best the was It',
  't ws th bst f tms, t ws th wrst f tms, t ws th g f wsdm, t ws th g f flshnss, t ws th pch f blf, t ws th pch f ncrdlty, t ws th ssn f Lght, t ws th ssn f Drknss, t ws th sprng f hpe, t ws th wntr f dspr, w hd vrythng bfr s, w hd nthng bfr s, w wr ll gng drct t Hvn, w wr ll gng drct th thr wy',
  'It was THE BEST OF times, it WAS THE worst of times, it WAS THE AGE OF wisdom, IT was THE AGE OF FOOLISHNESS, IT was the epoch of BELIEF, IT WAS the EPOCH OF INCREDULITY, IT was THE season OF LIGHT, it was THE SEASON of DARKNESS, it WAS the SPRING OF HOPE, IT WAS the winter of despair, WE had everything BEFORE US, WE HAD nothing BEFORE us, we WERE all GOING DIRECT TO HEAVEN, we were all going DIRECT THE other WAY',
  'WY THR TH drct GNG ll wr W ,Hvn t DRCT gng ll WR W ,S bfr nthng hd W ,S BFR VRYTHNG hd w ,DSPR f wintr th ws T ,hpe F sprng th WS T ,Drknss F SSN TH ws t ,LGHT F SSN TH ws t ,NCRDLTY F pch th ws t ,BLF F pch TH WS T ,flshnss F G TH WS t ,WSDM F g th WS T ,tms F WRST TH WS T ,TMS f BST th ws t',
]

function wrapperFunction() {
  text.innerHTML = arrayOfMessages[levelCounter]
  addButton()
}

function createStartButton() {
  let startButton = document.createElement('button')
  if (levelCounter == 3) {
    startButton.innerHTML = 'STRT'
  } else {
    startButton.innerHTML = 'START'
  }
  startButton.setAttribute('id', 'startButton')
  startButton.addEventListener('click', startRound)
  startButton.style.marginTop = '55px'
  startButton.style.padding = '20px 50px'
  startButton.style.fontWeight = 'bold'
  startButton.style.backgroundColor = 'white'
  startButton.style.borderWidth = '3px'
  startButton.style.borderColor = 'black'
  startButton.style.borderRadius = '25px'
  return startButton
}

function addButton() {
  let button = createStartButton()
  div.appendChild(button)
}

function textAppear() {
  startButton.remove()
  let text = arrayOfTexts[levelCounter]
  textArray = text.split('')
  console.log(textArray.length)
  console.log(textArray)
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
  let i = 90
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
    let selectedLetter = document.getElementById(`letter${keyCounter}`)
    if (event.key === selectedLetter.innerHTML) {
      console.log(`Array length: ${array.length}`)
      console.log(event)
      console.log(`Key counter: ${keyCounter}`)
      selectedLetter.style.backgroundColor = 'lightgreen'
      keyCounter++
      console.log(`Key counter after increment: ${keyCounter}`)
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
  text.innerHTML = arrayOfMessages[6]
  monitor = false
  addButton()
}

function winGame() {
  if (levelCounter != 4) {
    console.log(levelCounter)
    levelCounter++
    console.log(levelCounter)
    timer.innerHTML = ''
    monitor = false
    clearInterval(myInterval)
    wrapperFunction()
  } else {
    div.innerHTML = arrayOfMessages[5]
    timer.innerHTML = ''
    monitor = false
  }
}

wrapperFunction()

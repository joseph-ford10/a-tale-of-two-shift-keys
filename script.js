let text = document.getElementById('text')
let levelCounter = 1
let div = document.getElementById('myDiv')
let keyCounter = 0
let monitor = true
let listen = false
let arrayOfMessages = [
  "Welcome! If you the click the button below, you'll be shown the opening paragraph from A Tale Of Two Cities. All you have to do is type it out within 100 seconds. Good luck!",
  "Well done! That was great! Fancy another challenge? It'll be the same text, just arranged slightly differently.",
  'Amazing! By the way, how are you with the shift key?',
  "Now that was impressive! I think you can close the window now and feel proud of what you've accomplished. On the thr hnd...",
  'You really are great at this. You have so many skills! But how are you at combining those skills...?',
  'Congratulations! You beat all the levels and have mastered the opening paragraph of A Tale of Two Cities. Why not <span><a href=https://www.gutenberg.org/ebooks/98>check out the whole book?</a></span> Thanks for playing!',
  'Oh dear--not quite! Would you like to try again?',
]
let arrayOfTexts = [
  'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
  '.only comparison of degree superlative the in ,evil for or good for ,received being its on insisted authorities noisiest its of some that ,period present the like far so was period the ,short in--way other the direct going all were we ,Heaven to direct going all were we ,us before nothing had we ,us before everything had we ,despair of winter the was it ,hope of spring the was it ,Darkness of season the was it ,Light of season the was it ,incredulity of epoch the was it ,belief of epoch the was it ,foolishness of age the was it ,wisdom of age the was it ,times of worst the was it ,times of best the was It',
  'It was THE BEST OF times, it WAS THE worst of times, it WAS THE AGE OF wisdom, IT was THE AGE OF FOOLISHNESS, IT was the epoch of BELIEF, IT WAS the EPOCH OF INCREDULITY, IT was THE season OF LIGHT, it was THE SEASON of DARKNESS, it WAS the SPRING OF HOPE, IT WAS the winter of despair, WE had everything BEFORE US, WE HAD nothing BEFORE us, we WERE all GOING DIRECT TO HEAVEN, we were all going DIRECT THE other WAY--IN short, THE PERIOD was SO far like THE PRESENT period, that SOME of its NOISIEST authorities INSISTED ON its BEING RECEIVED, for GOOD OR FOR EVIL, in the superlative DEGREE OF COMPARISON ONLY.',
  't ws th bst f tms, t ws th wrst f tms, t ws th g f wsdm, t ws th g f flshnss, t ws th pch f blf, t ws th pch f ncrdlty, t ws th ssn f Lght, t ws th ssn f Drknss, t ws th sprng f hpe, t ws th wntr f dspr, w hd vrythng bfr s, w hd nthng bfr s, w wr ll gng drct t Hvn, w wr ll gng drct th thr wy--n shrt, th prd ws s fr lk th prsnt prd, tht sm f ts nsst thrts nsstd n ts bng rcvd, fr gd r fr vl, n th sprltv dgr f cmprsn nly.',
  '.NLY cmprsn f DGR sprltv TH n ,VL fr R gd fr ,rcvd BNG TS N NSSTD thrts NSST ts F sm tht ,prd prsnt th lk fr s WS prd th ,SHRT N--WY THR TH drct GNG ll wr W ,Hvn t DRCT gng ll WR W ,S bfr nthng hd W ,S BFR VRYTHNG hd w ,DSPR f wintr th ws T ,hpe F sprng th WS T ,Drknss F SSN TH ws t ,LGHT F SSN TH ws t ,NCRDLTY F pch th ws t ,BLF F pch TH WS T ,flshnss F G TH WS t ,WSDM F g th WS T ,tms F WRST TH WS T ,TMS f BST th ws t',
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
  return startButton
}

function addButton() {
  let button = createStartButton()
  div.appendChild(button)
}

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
  let i = 100
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
    if (event.key === array[keyCounter]) {
      console.log(event)
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
  text.innerHTML = arrayOfMessages[6]
  monitor = false
  addButton()
}

function winGame() {
  if (levelCounter != 4) {
    levelCounter++
    timer.innerHTML = ''
    monitor = false
    clearInterval(myInterval)
    wrapperFunction()
  } else {
    div.innerHTML = arrayOfMessages[5]
    monitor = false
  }
}

wrapperFunction()

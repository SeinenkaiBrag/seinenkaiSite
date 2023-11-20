// Configurando Canvas

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1530
canvas.height = 250

// Assets
const taikoDrum = new Image ()
taikoDrum.src = "./assets/taiko.png"
const taikoDrumBL = new Image ()
taikoDrumBL.src = "./assets/taikoblueleft.png"
const taikoDrumBR = new Image ()
taikoDrumBR.src = "./assets/taikoblueright.png"
const taikoDrumRL = new Image ()
taikoDrumRL.src = "./assets/taikoredleft.png"
const taikoDrumRR = new Image ()
taikoDrumRR.src = "./assets/taikoredright.png"

const drumDon = new Audio ()
drumDon.src = "./assets/don.mp3"
const drumKat = new Audio ()
drumKat.src = "./assets/kat.mp3"

// Variaveis globais
const activeNotes = [];
const avaiableKeys = ["x", "c", "v", "b"]
const keys = [];
let score = 0;

const scoreWidth = 400;
const clickX = 500;
let frame = 0;



console.log(score);




// funções

function animate(){
  requestAnimationFrame(animate)
  frame++

  // draw
  drawGame()

  // verificar
  verifyGameStatus()

  if(frame%75 ==0){
    let rand = Math.floor(Math.random()*4+1)
    activeNotes.push(new Note(rand))
  }
}

animate()


function drawGame(){
  c.clearRect(0,0,canvas.width,canvas.height)  
  c.fillStyle = "#202020"
  c.fillRect(0,0,canvas.width,canvas.height)

  // click
  c.beginPath();
  c.arc(clickX, canvas.height/2, 50, 0, 2 * Math.PI);
  c.strokeStyle = "#FFF"
  c.stroke();
  c.beginPath();
  c.arc(clickX, canvas.height/2, 80, 0, 2 * Math.PI);
  c.strokeStyle = "#ffffff50"
  if(keys.length != 0)  c.stroke();


  // notes
  for(let i=0; i<activeNotes.length; i++){
    activeNotes[i].draw()
    activeNotes[i].update()
  }

  // score area
  c.fillStyle = "#c62d49d7"
  c.fillRect(0,0,scoreWidth,canvas.height)
  // drum
  let drumPos = {x:200, y:(canvas.height-taikoDrum.height)/2}
  c.drawImage(taikoDrum, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[0])) c.drawImage(taikoDrumBL, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[1])) c.drawImage(taikoDrumRL, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[2])) c.drawImage(taikoDrumRR, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[3])) c.drawImage(taikoDrumBR, drumPos.x, drumPos.y)
  
}

function verifyGameStatus(){
  endXNote()
}


function endXNote(){
  if(activeNotes.length==0) return
  if(activeNotes[0].posX < scoreWidth-activeNotes[0].dia){
    activeNotes.shift()
    updateScore(0)

  }
}


function clickPoint(k){
  if(activeNotes.length==0) return  

  let distX = Math.abs(activeNotes[0].posX - clickX);
  let cKey;
  switch(k){
    case avaiableKeys[0]:
    case avaiableKeys[3]:
      cKey = "blue"
      break;
    case avaiableKeys[1]:
    case avaiableKeys[2]:
      cKey = "red"
  }
  
  if (distX>300) return
  
  if (distX>150){
    activeNotes.shift()
    updateScore(0)
    return
  }

  if (cKey == activeNotes[0].color){
    if (distX>20) {
      updateScore(10)
    }
    else updateScore(20)
  }
  else{
    updateScore(0)
  }

  activeNotes.shift()
}

function updateScore(x){
  score += x

  console.log("score: ", score);
}



// Keyboard
window.addEventListener('keydown', (e) => {
  let k = e.key

  if(keys.includes(k)) return

  switch(k){
    case avaiableKeys[0]:
    case avaiableKeys[3]:
      keys.push(k)
      drumKat.currentTime = 0
      drumKat.play()
      clickPoint(k)
      break;
    case avaiableKeys[1]:
    case avaiableKeys[2]:
      keys.push(k)
      drumDon.currentTime = 0
      drumDon.play()
      clickPoint(k)
  }
})

window.addEventListener('keyup', (e) => {
  let k = e.key

  switch(k){
    case avaiableKeys[0]:
    case avaiableKeys[1]:
    case avaiableKeys[2]:
    case avaiableKeys[3]:
      keys.splice(keys.indexOf(k))  
  }

})


// Mouse
const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('click', (e) => {
  
})

canvas.addEventListener('mousemove', (e) => {
  canvas.style.cursor = ""
  var rect = canvas.getBoundingClientRect()

  mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width
  mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
})

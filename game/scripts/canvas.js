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
const keys = [];
const activeNotes = [];
const scoreWidth = 400



function animate(){
  requestAnimationFrame(animate)

  // draw
  drawGame()

  // verificar
  verifyGameStatus()
}

animate()


function drawGame(){
  c.clearRect(0,0,canvas.width,canvas.height)  
  c.fillStyle = "#202020"
  c.fillRect(0,0,canvas.width,canvas.height)

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
  if(keys.includes("x")) c.drawImage(taikoDrumBL, drumPos.x, drumPos.y)
  if(keys.includes("c")) c.drawImage(taikoDrumRL, drumPos.x, drumPos.y)
  if(keys.includes("b")) c.drawImage(taikoDrumRR, drumPos.x, drumPos.y)
  if(keys.includes("n")) c.drawImage(taikoDrumBR, drumPos.x, drumPos.y)
  
}

function verifyGameStatus(){
  endXNote()
}

function endXNote(){
  for(let i=0; i<activeNotes.length; i++){
    if(activeNotes[i].posX < scoreWidth-activeNotes[i].dia){
      activeNotes.shift()
    }
  }  
}

// Keyboard
window.addEventListener('keydown', (e) => {
  let k = e.key

  if(keys.includes(k)) return

  switch(k){
    case "x":
    case "n":
      keys.push(k)
      drumKat.currentTime = 0
      drumKat.play()
      break;
    case "c":
    case "b":
      keys.push(k)
      drumDon.currentTime = 0
      drumDon.play()
  }

})

window.addEventListener('keyup', (e) => {
  let k = e.key

  switch(k){
    case "x":
    case "c":
    case "b":
    case "n":
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

// Configurando Canvas

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1530
canvas.height = 250

// Imagens
const imageCapi = document.querySelector(".gameCapi")
const imageDanceNinja = document.querySelectorAll(".dance")
const imageDanceTaiko = document.querySelectorAll(".dancinha1")

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

const bgMusic = new Audio ()
bgMusic.src = "./assets/JapaneseMusic.mp3"
bgMusic.volume = .25



// Variaveis globais
const activeNotes = [];
const avaiableKeys = ["c", "x", "v", "b"]
const keys = [];
let score = 0;

const scoreWidth = 400;
const clickX = 500;
let clickPointAnimate = .2;
let pointColor = 0;
let frame = 0;



// funções

function animate(){
  requestAnimationFrame(animate)
  frame++

  bgMusic.play()

  // draw
  drawGame()

  // verificar
  verifyGameStatus()

  // Gerar notas
  if(frame%5 == 0){
    let frameRate = Math.floor(Math.random()*20+20)

    if(frame%frameRate == 0){
      let rand = Math.floor(Math.random()*4+1)
      activeNotes.push(new Note(rand, 5 + score/1500))
    }
  }
}

animate()


function drawGame(){
  c.clearRect(0,0,canvas.width,canvas.height)  
  c.fillStyle = "#202020"
  c.fillRect(0,0,canvas.width,canvas.height)

//click point
  var gradient = c.createRadialGradient(clickX, canvas.height/2, 0, clickX, canvas.height/2, 200);
  gradient.addColorStop(0, '#00000000');
  if(clickPointAnimate < 0.8){
    if(pointColor == 3)gradient.addColorStop(clickPointAnimate, 'green');
    if(pointColor == 2)gradient.addColorStop(clickPointAnimate, 'blue');
    if(pointColor == 1)gradient.addColorStop(clickPointAnimate, 'red');
    if(frame%10)clickPointAnimate = clickPointAnimate + 0.05;
  }


  gradient.addColorStop(clickPointAnimate+.1, '#00000000');
  c.fillStyle = gradient;

  c.beginPath();
  c.arc(clickX, canvas.height/2, 150, 0, 2 * Math.PI);
  c.fill();

// click
  c.beginPath();
  c.arc(clickX, canvas.height/2, 52, 0, 2 * Math.PI);
  c.lineWidth = 2
  c.strokeStyle = "#ffffff60"
  c.fillStyle = "#ffffff30"
  c.stroke();
  if(keys.length != 0) c.fill();

  c.beginPath();
  c.arc(clickX, canvas.height/2, 80, 0, 2 * Math.PI);
  c.strokeStyle = "#ffffff20"
  c.stroke();


// notes
  for(let i=activeNotes.length-1; i>=0; i--){
    activeNotes[i].draw()
    activeNotes[i].update()
  }

// score area
  c.fillStyle = "#d860d870"
  c.fillRect(0,0,scoreWidth,canvas.height)

// score
  c.fillStyle = "#00000050"
  c.beginPath();
  c.roundRect(scoreWidth-350, canvas.height-70, 350, 60, [30, 0, 0, 30]);
  c.fill();

  c.fillStyle = "#fff"
  c.font = "42px arial black";
  c.textAlign = "right";
  c.fillText(score, 242, canvas.height-25);
  c.strokeStyle = "#000"
  c.lineWidth = 3
  c.strokeText(score, 242, canvas.height-25);


// drum
  let drumPos = {x:220, y:(canvas.height-taikoDrum.height)/2}
  c.drawImage(taikoDrum, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[1])) c.drawImage(taikoDrumBL, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[0])) c.drawImage(taikoDrumRL, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[2])) c.drawImage(taikoDrumRR, drumPos.x, drumPos.y)
  if(keys.includes(avaiableKeys[3])) c.drawImage(taikoDrumBR, drumPos.x, drumPos.y)
  
}

function verifyGameStatus(){
  endXNote()
  
  if (score>0) imageDanceNinja[0].style.opacity="1";
  if (score>500){
    imageDanceNinja[1].style.opacity="1";
    imageDanceNinja[2].style.opacity="1";
  }
  if (score>1000){
    imageDanceTaiko[0].style.opacity="1";
    imageDanceTaiko[1].style.opacity="1";
  }
}


function endXNote(){
  if(activeNotes.length==0) return
  if(activeNotes[0].posX < scoreWidth-activeNotes[0].radius/2){
    activeNotes.shift()
    updateScore(0)
  }
}


function clickPoint(k){
  if(activeNotes.length==0) return  

  let distX = Math.abs(activeNotes[0].posX - clickX);
  let cKey = avaiableKeys.indexOf(k)%2;
  
  if (distX>300) return
  
  if (distX>100){
    activeNotes.shift()
    updateScore(0)
    return
  }

  if (cKey == activeNotes[0].value%2){
    imageCapi.classList.toggle("gameCapiClick");
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
  
    if(x == 20) pointColor = 3;
    else if(x == 10) pointColor = 2;
    else pointColor = 1;

  clickPointAnimate = 0;
}



// Keyboard
window.addEventListener('keydown', (e) => {
  let k = e.key
  if(keys.includes(k)) return

  switch(k){
    case avaiableKeys[1]:
    case avaiableKeys[3]:
      keys.push(k)
      drumKat.currentTime = 0
      drumKat.play()
      clickPoint(k)
      break;
    case avaiableKeys[0]:
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

console.log('%cAVISO:', 'color: #FF5733; font-weight: bold; font-size: 30px;');
console.log('%cNem vem tentar mudar os seus pontos e vidas usando console, mó mancada com os coleguinha. ಥ_ಥ', 'font-size: 14px;');
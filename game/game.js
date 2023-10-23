// Base de Cartas

const gameElements = ["fogo", "agua", "neve"];

const cardColors = ["--cAmar", "--cVerd", "--cAzul", "--cRoxo", "--cVerm"];

const gameCards = [
    { power: 2, element: gameElements[0], image: "./assets/cards/f2.jpg" },
    { power: 2, element: gameElements[1], image: "./assets/cards/a2.jpg" },
    { power: 2, element: gameElements[2], image: "./assets/cards/n2.jpg" },
    { power: 4, element: gameElements[0], image: "./assets/cards/f4.jpg" },
    { power: 4, element: gameElements[1], image: "./assets/cards/a4.jpg" },
    { power: 4, element: gameElements[2], image: "./assets/cards/n4.jpg" },
    { power: 6, element: gameElements[0], image: "./assets/cards/f6.jpg" },
    { power: 6, element: gameElements[1], image: "./assets/cards/a6.jpg" },
    { power: 6, element: gameElements[2], image: "./assets/cards/n6.jpg" },
    { power: 8, element: gameElements[0], image: "./assets/cards/f8.jpg" },
    { power: 8, element: gameElements[1], image: "./assets/cards/a8.jpg" },
    { power: 8, element: gameElements[2], image: "./assets/cards/n8.jpg" },
    { power: 10, element: gameElements[0], image: "./assets/cards/f10.jpg" },
    { power: 10, element: gameElements[1], image: "./assets/cards/a10.jpg" },
    { power: 10, element: gameElements[2], image: "./assets/cards/n10.jpg" }
];

gameCards.forEach(card => {
    card.color = cardColors[Math.floor((card.power - 2) / 2)];
});

let id = 1;

gameCards.forEach(card => {
    card.id = id;
    id++
});



// Criação e Analise

// Array para rastrear cartas
const playerHand = [], usedPCards = [], usedCCards = []

const pCardArea = document.querySelectorAll(".pCard")


// Função para escolher randomicamente uma carta
function chooseRandomCard(used) {
  const availableCards = gameCards.filter(card => !used.includes(card));

  const randomIndex = Math.floor(Math.random() * availableCards.length);
  const randomCard = availableCards[randomIndex];

  used.push(randomCard);

  return randomCard;
}

// Função para dar uma nova carta ao jogador
function givePlayerCard() {
  const randomCard = chooseRandomCard(usedPCards);
  playerHand.push(randomCard);

  for(let i=0; i<playerHand.length; i++){
    pCardArea[i].src = playerHand[i].image;
  }
}

// Função para dar uma nova carta ao computador
function giveCompCard(){
  const randomCard = chooseRandomCard(usedCCards);
  return randomCard;
}

// Função para criar a mão do jogador com 4 cartas
function createPlayerHand() {
  for (let i = 0; i < 4; i++) {
    givePlayerCard(playerHand)
  }

  return playerHand;
}

// Comparaçao de resultados
function compareCards(pCard,cCard){
  if (
    (pCard.element === "fogo" && cCard.element === "neve") ||
    (pCard.element === "neve" && cCard.element === "agua") ||
    (pCard.element === "agua" && cCard.element === "fogo")
  ) {
    return "Jogador vence";
  } else if (
    (cCard.element === "fogo" && pCard.element === "neve") ||
    (cCard.element === "neve" && pCard.element === "agua") ||
    (cCard.element === "agua" && pCard.element === "fogo")
  ) {
    return "Oponente vence";
  } else {
    if (pCard.power > cCard.power) return "Jogador vence";
    else if (pCard.power < cCard.power)return "Oponente vence";
    else return "Empate";
  }
}




// Inicio Jogo

// Crie a mão inicial do jogador
createPlayerHand();


// jogador joga um card
function playerChoseCard(card, id){

  const cCard = giveCompCard()
  console.log(cCard)

  const cCardArea = document.querySelector(".cCard")
  cCardArea.src=cCard.image;
  cCardArea.style.right="8%"
  
  pCardArea.forEach(card => {
    card.style.transform = "translateY(200%)"
  })
  card.style.transform = "translateY(-50%)"
  
  console.log(compareCards(playerHand[id], cCard ))

}


// Exiba as cartas na mão do jogador
console.log("Mão do Jogador:");
playerHand.forEach((card, index) => {
  console.log(`Carta ${index + 1}: Poder ${card.power}, Elemento ${card.element}, Cor ${card.color}`);
});

// playerChoseCard();














// Seleciona 4 cartas
// escolhe qual jogar
// move ao meio
// randomizar adversario
// valida quem ganha
// mostrar quem ganhou
// validar pontuacao
// receber outra carta no lugar da carta escolhida

// validar se ha vencedor, se sim finalizar e mostrar sequencia, se nao continuar

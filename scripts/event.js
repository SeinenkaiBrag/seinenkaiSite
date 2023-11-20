let valores = [
  {
    tilt: "Festival Japão",
    img1: "assets/img/headFestJap.jfif",
    img2: "./assets/img/sobFestJap.png",
    text: "O tradicional evento da cultura japonesa realizado pela Associação Nipo da região Bragantina. Que foi fundada a 16 anos atrás. Onde se encontra atrações e comidas típicas japonesas",
    rede: "https://www.instagram.com/festivaljp/"
  },
  {
    tilt: "Undokai",
    img1: "assets/img/headUndo.jpeg ",
    img2: "assets/img/sobUndo.jpg",
    text: "Uma tradicional gincana de esportes realizada pela NIPO de Bragança Paulista. Onde ocorre corridas com obstáculos, o FAMOSO arremesso de Ovo, corrida em equipe e muito mais. Muito embora seja direcionado ao público infantil, existem atividades para todas as idades e ambos os sexos. Todos, sem exceção, recebem prêmios do 1° colocado até o 10° e o mais importante o prêmio de participação.",
    rede: "https://www.instagram.com/p/CvgHnkLJQuv/"
  },
  {
    tilt: "Anime Nipo",
    img1: "./assets/img/headAnimeNipo.jfif",
    img2: "./assets/img/sobAnime.jfif",
    text: "No Anime Nipo você encontrará muita diversão no palco e nos jogos, poderá aproveitar a gastronomia da Nipo e parceiros, visitar diferentes lojinhas e curtir ao máximo com a galera! <br>Continua acompanhando a gente, pois as informações de ingresso serão divulgadas num breve futuro, ok?",
    rede: "https://www.instagram.com/animenipo/"
  },
  {
    tilt: "IBU",
    img1: "./assets/img/headIBU.jpeg",
    img2: "./assets/img/sobIbu.JPG",
    text: "O IBU é um evento de intercâmbio para jovens - também chamado de evento de integração, pois existem outros no Brasil todo. Nesses dias trocaremos experiências, conheceremos pessoas novas e aprenderemos coisas legais que possamos aplicar no nosso cotidiano, como também de certa forma na vida profissional!",
    rede: "https://www.instagram.com/ibubraganca/"
  }
];



const tilt = document.querySelector("header h1");
const imgPe = document.querySelector(".headerIMG");
const tilts = document.querySelector(".sobre-text h3");
const imges = document.querySelector(".sobre-image img");
const textes = document.querySelector(".sobre-text p");
const redes = document.querySelector(".redes a");


const clicke = document.querySelectorAll(".hItm");
var actvOp = 0




clicke.forEach( (it, index ) => {
  it.addEventListener("click", (e) =>{
    actvOp = index       
    changeCont(actvOp);
  })
} )

function changeActv (iOp){
  
  clicke.forEach( (it) => {
    it.classList.remove ("hItmA")
  } )
  
  clicke[iOp].classList.add("hItmA")
}

function changeCont(iOp) {
  imgPe.style.backgroundImage = `url(${valores[iOp].img1})`;
  imges.src = valores[iOp].img2;
  tilt.innerHTML =  valores[iOp].tilt.toUpperCase();
  tilts.innerHTML =  valores[iOp].tilt;
  textes.innerHTML = valores[iOp].text;
  redes.href = valores[iOp].rede;

  changeActv(iOp); 
}
changeCont(0);


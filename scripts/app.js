// navBar scroll

const nav = document.querySelector('nav');

function navScroll(){
    nav.classList.toggle('navScroll', scrollY>0);
}

window.addEventListener('scroll', navScroll);


// navBar Modal

const navModal = document.querySelector('.nav-modal');

function openCloseModal(botao){
    botao.classList.toggle('nav-modal-on');
    if(botao.innerHTML == "x") botao.innerHTML = "=";
    else botao.innerHTML = "x";
    
    navModal.classList.toggle('nav-modal-off');
}

// loadPage

const loadPage = document.querySelector(".loadingPage");

loadPage.style.display = "";
loadPage.style.opacity = "100%";

window.onload = () => {
    loadPage.style.opacity = "0";
    setTimeout(() => loadPage.style.display = "none", 800);
}
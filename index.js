window.onload = function(){
    let lang = "bel";
    localStorage.setItem('lang', lang);
    changeQuote();
}

 const heroButton = document.querySelector(".hero-btn");
 const RuButton = document.querySelector(".ru-lang");
 const BelButton = document.querySelector(".bel-lang");
 const heroQuote = document.querySelector(".hero-quote");
 const heroAuthor = document.querySelector(".hero-author");
 const sound = document.querySelector(".sound");
 const languageBtns = document.querySelector(".change-lang");
 let activeButton = document.querySelector(".active");

async function getQuotesBel() {  
    const quotes = 'lang_belarusian_quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let min = Math.ceil(0);
    let max = Math.floor(304);
    let quotesNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (data[quotesNumber]);
}
async function getQuotesRu() {  
    const quotes = 'lang_rusian_quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let min = Math.ceil(0);
    let max = Math.floor(100);
    let quotesNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return (data[quotesNumber]);
}
let changeQuote = () => {
    const heroQuote = document.querySelector(".hero-quote");
    if(lang == "bel"){
        getQuotesBel();
        getQuotesBel().then(function(result){
        heroAuthor.textContent = `Як казаў ${result.author}`;
        heroQuote.textContent = result.text;
        heroButton.textContent = "Далей";
        BelButton.classList.add("active");
        RuButton.classList.remove("active");
    }); 
    }else if(lang == "ru"){
        getQuotesRu();
        getQuotesRu().then(function(result){
        heroAuthor.textContent = `Как говорил ${result.author}`;
        heroQuote.textContent = result.text;
        heroButton.textContent = "Дальше";
        RuButton.classList.add("active");
        BelButton.classList.remove("active");
    }); 
    }
}
let playSound = () => {
    sound.volume = 0.1;
  if (sound.paused) {
    sound.play();
  } else {
    playSound();
  }
}
let getTranslate = (language) => {
    lang = language;
    localStorage.setItem('lang', lang);
    changeQuote();
    playSound();
}
let getTranslateLang = (event) => {
    let language = event.target.textContent;
    if(event.target.classList.contains("bel-lang")) {
        event.target.classList.toggle("active");
        RuButton.classList.toggle("active");
        getTranslate(language);
    }else if(event.target.classList.contains("ru-lang")){
        event.target.classList.toggle("active");
        BelButton.classList.toggle("active");
        getTranslate(language);
    }
}
let changeClassActive = (className, elementTarget) => {
    elementTarget.classList.add(className);
}
// //////////////////////////LOCAL STORAGE///////////////////////////////////////
let setLocalStorage = () => {
    localStorage.setItem('lang', lang);
  }
let getLocalStorage  = () => {
    if(localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      getTranslate(lang);
    }
}
let changeQuoteAfterClick = () => {
    getLocalStorage();
}
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage)
  heroButton.addEventListener('click', changeQuoteAfterClick);
  languageBtns.addEventListener('click', getTranslateLang);
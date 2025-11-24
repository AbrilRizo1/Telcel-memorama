// Animación de introducción
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    createCards();
  }, 2500);
});

const images = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg"];

function createCards() {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  let cardsArr = [...images, ...images];
  cardsArr.sort(() => Math.random() - 0.5);

  cardsArr.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front" style="background-image:url('${img}')"></div>
    `;
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  });

  resizeCards();
  window.addEventListener('resize', resizeCards);
}

let firstCard = null;
let block = false;

function flipCard(card) {
  if(block || card.classList.contains('flip')) return;
  card.classList.add('flip');

  if(!firstCard) firstCard = card;
  else {
    block = true;
    let img1 = firstCard.querySelector('.card-front').style.backgroundImage;
    let img2 = card.querySelector('.card-front').style.backgroundImage;
    if(img1 === img2){
      firstCard = null;
      block = false;
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flip');
        card.classList.remove('flip');
        firstCard = null;
        block = false;
      }, 900);
    }
  }
}
function resizeCards() {
  const container = document.querySelector('.cards-container');
  const grid = document.querySelector('.grid');
  const cards = document.querySelectorAll('.card');
  if (cards.length === 0) return;

  const total = cards.length;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const cardRatio = 1024 / 819;

  // Determinar número de columnas fijo
  let cols = containerWidth <= 600 ? 2 : 4;
  let rows = Math.ceil(total / cols);

  const maxWidth = containerWidth / cols - 6;
  const maxHeight = containerHeight / rows - 6;

  let cardWidth, cardHeight;

  if (maxWidth / maxHeight > cardRatio) {
    cardHeight = maxHeight;
    cardWidth = cardHeight * cardRatio;
  } else {
    cardWidth = maxWidth;
    cardHeight = cardWidth / cardRatio;
  }

  grid.style.gridTemplateColumns = `repeat(${cols}, ${cardWidth}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cardHeight}px)`;

  cards.forEach(c => {
    c.style.width = `${cardWidth}px`;
    c.style.height = `${cardHeight}px`;
  });
}

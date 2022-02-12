import './styles/all.scss';

const carousel = document.querySelector('.carousel');
const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider__image');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');

const cloneFirstSlide = items[0].cloneNode(true);
const cloneLastSlide = items[items.length-1].cloneNode(true);

sliderContainer.appendChild(cloneFirstSlide);
sliderContainer.insertBefore(cloneLastSlide, items[0]);

const newItems = sliderContainer.children;

let counter = 1;
let width;
// let x1 = null;
// let y1 = null;

function changePosition() {
  sliderContainer.style.transform = 'translate(-' + counter * width + 'px)';
}



function init() {
  width = carousel.offsetWidth;
  cloneFirstSlide.classList.add('firstClone');
  cloneFirstSlide.style.width = width + 'px';
  cloneFirstSlide.style.height = 'auto';
  cloneLastSlide.classList.add('lastClone');
  cloneLastSlide.style.width = width + 'px';
  cloneLastSlide.style.height = 'auto';
  sliderContainer.style.width = width * items.length + 'px';
  items.forEach((item) => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  changePosition();
}

window.addEventListener('resize', init);
init();

function changeTransition() {
  sliderContainer.style.transition = '0.4s ease-in-out';
}



prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  changeTransition();
  counter--;
  changePosition();
});

nextBtn.addEventListener('click', () => {
  if (counter >= newItems.length-1) return;
  changeTransition();
  counter++;
  changePosition();
});




sliderContainer.addEventListener('transitionend', () => {
  sliderContainer.style.transition = 'none';
  if (newItems[counter].classList.contains('lastClone')) {
    counter = newItems.length - 2;
    changePosition();
  }
  if (newItems[counter].classList.contains('firstClone')) {
    counter = newItems.length - counter;
    changePosition();
  }
});


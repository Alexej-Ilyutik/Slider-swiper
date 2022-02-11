import './styles/all.scss';
// import MainComponent from './components/MainComponent'

// const component = MainComponent('My compoent text')

// document.querySelector('body').appendChild(component)

const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider__image');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');

let counter = 1;
let width;
const size = items[0].clientWidth;

function init() {
  width = document.querySelector('.carousel').offsetWidth;
  sliderContainer.style.width = width*items.length + 'px';
  items.forEach((item) => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  changePosition();
}

window.addEventListener('resize', init);
init();

function changePosition(){
   sliderContainer.style.transform = 'translate(-'+counter*width+'px)'
}

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
  if (counter >= items.length - 1) return;
  changeTransition();
  counter++;
  changePosition();
});

sliderContainer.addEventListener('transitionend', () => {
  if (items[counter].id === 'lastClone') {
    sliderContainer.style.transition = 'none';
    counter = items.length - 2;
    changePosition();
  }
  if (items[counter].id === 'firstClone') {
    sliderContainer.style.transition = 'none';
    counter = items.length - counter;
    changePosition();
  }
});

console.log(size);

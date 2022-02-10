import './styles/all.scss'
// import MainComponent from './components/MainComponent'

// const component = MainComponent('My compoent text')

// document.querySelector('body').appendChild(component)

const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider__image');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');

let counter = 1;
const size = items[0].clientWidth;

function changePosition(){
sliderContainer.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

changePosition();

function changeTransition() {
  sliderContainer.style.transition = '0.4s ease-in-out';
}

prevBtn.addEventListener('click', () =>{
  if(counter <= 0) return;
  changeTransition();
  counter--;
  changePosition();
})

nextBtn.addEventListener('click', () => {
   if (counter >= items.length - 1) return;
  changeTransition();
  counter++;
  changePosition();
});


sliderContainer.addEventListener('transitionend', ()=>{
   if(items[counter].id === 'lastClone'){
    sliderContainer.style.transition = "none";
     counter = items.length-2;
     changePosition();
   }
   if (items[counter].id === 'firstClone') {
     sliderContainer.style.transition = 'none';
     counter = items.length - counter;
     changePosition();
   }
})

console.log(size);
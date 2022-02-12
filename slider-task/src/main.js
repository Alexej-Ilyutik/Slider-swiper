import './styles/all.scss';

const carousel = document.querySelector('.carousel');
const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider__image');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');

const cloneFirstSlide = items[0].cloneNode(true);
const cloneLastSlide = items[items.length - 1].cloneNode(true);

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

function previousItem() {
  if (counter <= 0) return;
  changeTransition();
  counter--;
  changePosition();
}

prevBtn.addEventListener('click', previousItem);

function nextItem() {
  if (counter >= newItems.length - 1) return;
  changeTransition();
  counter++;
  changePosition();
}

nextBtn.addEventListener('click', nextItem);

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

function swipeDetect(carousel) {
  let surface = carousel;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 50;
  let restraint = 150;
  let allowedTime = 500;

  function moveImg() {
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          previousItem();
        } else {
          nextItem();
        }
      }
    }
  }

  surface.addEventListener(
    'mousedown',
    function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    'mouseup',
    function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      moveImg();

      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    'touchstart',
    function (e) {
      if (e.target.classList.contains('slider__btn')) {
        if (e.target.classList.contains('slider__prev')) {
          previousItem();
        } else {
          nextItem();
        }
      }
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    'touchend',
    function (e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      moveImg();
      e.preventDefault();
    },
    false
  );
}

swipeDetect(carousel);

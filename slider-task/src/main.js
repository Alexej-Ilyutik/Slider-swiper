import './styles/all.scss';

const carousel = document.querySelector('.carousel');
const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider__image');
const prevBtn = document.querySelector('.slider__prev');
const nextBtn = document.querySelector('.slider__next');
const bullets = document.querySelector('.slider__bullets');

const cloneFirstSlide = items[0].cloneNode(true);
const cloneLastSlide = items[items.length - 1].cloneNode(true);

sliderContainer.appendChild(cloneFirstSlide);
sliderContainer.insertBefore(cloneLastSlide, items[0]);

const newItems = sliderContainer.children;

let counter = 1;
let width;
let offset;


function changePosition(n, x) {
  sliderContainer.style.transform = 'translate(-' + x * width * n + 'px)';
  offset = x * width * n;
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
  changePosition(1, counter);
}

window.addEventListener('resize', init);
window.addEventListener('load', init);
init();

function createBullets() {
  for (let i = 0; i < items.length; i++) {
    let bullet = document.createElement('li');
    bullet.classList.add('bullet');
    bullet.classList.add(i + 1);
    bullets.append(bullet);
  }
}

createBullets();

const bullet = document.querySelectorAll('.bullet');

function changeBullet() {
  bullet.forEach((item) => {
    item.classList.remove('_active');
  });

  if (counter === 0) {
    bullet[items.length - 1].classList.add('_active');
  } else if (counter === 7) {
    bullet[0].classList.add('_active');
  } else {
    bullet[counter - 1].classList.add('_active');
  }
}

changeBullet();

function changeBulletPosition(e) {

  if (e.target.classList.contains('bullet')) {
    bullet.forEach((item) => {
      item.classList.remove('_active');
    });

    changePosition(e.target.classList[1], 1);
    e.target.classList.add('_active');
  
  }
}

bullets.addEventListener('click', changeBulletPosition);


function changeTransition() {
  sliderContainer.style.transition = '0.4s ease-in-out';
}

function previousItem() {
  if (counter <= 0) return;
  changeTransition();
  counter = offset / width;
  counter--;
  changePosition(1, counter);
  changeBullet(); 
}

prevBtn.addEventListener('click', previousItem);

function nextItem() {
    if (counter >= newItems.length - 1) return;
  changeTransition();
  counter = offset / width;
  counter++;
  changePosition(1, counter);
  changeBullet();
}

nextBtn.addEventListener('click', nextItem);

sliderContainer.addEventListener('transitionend', () => {
  sliderContainer.style.transition = 'none';
  if (newItems[counter].classList.contains('lastClone')) {
    counter = newItems.length - 2;
    changePosition(1, counter);
  }
  if (newItems[counter].classList.contains('firstClone')) {
    counter = newItems.length - counter;
    changePosition(1, counter);
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
  );

  surface.addEventListener(
    'touchstart',
    function (e) {
      if (e.target.classList.contains('bullet')) {
        changeBulletPosition(e);
      }
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
  );

  surface.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
    },
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
  );
}

swipeDetect(carousel);

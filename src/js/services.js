import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { observeSwiperAutoplay } from './observer.js';

Swiper.use([Autoplay]);

const servicesSwiperEl = document.querySelector('.services-swiper-container');
const servicesDots = document.querySelectorAll('.services-dot');
const servicesLeftArrow = document.getElementById('servicesLeftArrow');
const servicesRightArrow = document.getElementById('servicesRightArrow');

let servicesSwiper;

servicesSwiper = new Swiper('.services-swiper-container', {
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 25,
  grabCursor: true,
  allowTouchMove: true,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      loop: false,
      spaceBetween: 24,
      initialSlide: 0,
      slidesPerView: 3,
    },
  },
  on: {
    init: () => {
      document
        .querySelector('.services-swiper-container')
        .classList.add('show');
    },
    slideChange: function () {
      updateServicesDots(this.realIndex);
      updateServicesArrows(this);
    },
  },
});

updateServicesArrows(servicesSwiper);

function updateServicesDots(index) {
  servicesDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function updateServicesArrows(swiper) {
  servicesLeftArrow.disabled = swiper.isBeginning;
  servicesRightArrow.disabled = swiper.isEnd;
}

servicesDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    servicesSwiper.slideTo(index);
  });
});

servicesLeftArrow.addEventListener('click', () => {
  servicesSwiper.slidePrev();
});

servicesRightArrow.addEventListener('click', () => {
  servicesSwiper.slideNext();
});

observeSwiperAutoplay(servicesSwiper, servicesSwiperEl);

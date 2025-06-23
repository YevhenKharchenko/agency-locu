import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { observeSwiperAutoplay } from './observer.js';

Swiper.use([Autoplay]);

const testimonialsSwiperEl = document.querySelector(
  '.testimonials-swiper-container'
);
const testimonialsDots = document.querySelectorAll('.testimonials-dot');

let testimonialsSwiper;

testimonialsSwiper = new Swiper('.testimonials-swiper-container', {
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
      spaceBetween: 32,
      initialSlide: 0,
      slidesPerView: 3,
    },
  },
  on: {
    init: () => {
      document
        .querySelector('.testimonials-swiper-container')
        .classList.add('show');
    },
    slideChange: function () {
      updateTestimonialsDots(this.realIndex);
    },
  },
});

function updateTestimonialsDots(index) {
  testimonialsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

testimonialsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    testimonialsSwiper.slideTo(index);
  });
});

observeSwiperAutoplay(testimonialsSwiper, testimonialsSwiperEl);

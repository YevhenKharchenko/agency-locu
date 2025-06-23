import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { observeSwiperAutoplay } from './observer.js';

Swiper.use([Autoplay]);

const reviewsSwiperEl = document.querySelector('.reviews-swiper-container');
const reviewsDots = document.querySelectorAll('.reviews-dot');
const reviewsLeftArrow = document.getElementById('reviewsLeftArrow');
const reviewsRightArrow = document.getElementById('reviewsRightArrow');

let reviewsSwiper;

reviewsSwiper = new Swiper('.reviews-swiper-container', {
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
      spaceBetween: 14,
      initialSlide: 0,
      slidesPerView: 3,
    },
  },
  on: {
    init: () => {
      document.querySelector('.reviews-swiper-container').classList.add('show');
    },
    slideChange: function () {
      updateReviewsDots(this.realIndex);
      updateReviewsArrows(this);
    },
  },
});

updateReviewsArrows(reviewsSwiper);

function updateReviewsDots(index) {
  reviewsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function updateReviewsArrows(swiper) {
  reviewsLeftArrow.disabled = swiper.isBeginning;
  reviewsRightArrow.disabled = swiper.isEnd;
}

reviewsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    reviewsSwiper.slideTo(index);
  });
});

reviewsLeftArrow.addEventListener('click', () => {
  reviewsSwiper.slidePrev();
});

reviewsRightArrow.addEventListener('click', () => {
  reviewsSwiper.slideNext();
});

observeSwiperAutoplay(reviewsSwiper, reviewsSwiperEl);

const documentsSwiper = new Swiper('.slider-documents', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    }, 
  },
});


const reviewSwiper = new Swiper('.frequently-asked-questions__slider-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  centeredSlides: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    }, 
  },
});


const insuranceSwiper = new Swiper(".slider__container", {
    autoHeight: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 500,
    direction: "horizontal",
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    loop: false,
    slidesPerView: 1, 
    effect: "slide",
    spaceBetween: 30,
    }
);


const registrationSteps = document.querySelectorAll('.steps-item');

if (registrationSteps) {
  const steps = Array.from(registrationSteps);
  const stepNumbers = document.querySelectorAll('.steps-item__number');
  
  stepNumbers.forEach(number => {
    number.addEventListener('click', numberHandler);
  });
  insuranceSwiper.on('slideChange', function () {
      steps.forEach(step => step.classList.remove("active"));
      steps[insuranceSwiper.realIndex].classList.add("active");
  });
}

function numberHandler(event) {
  const index = event.target.parentElement.dataset.index;
  insuranceSwiper.slideTo(index);
}
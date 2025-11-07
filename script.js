// ===== declaration variable section =====
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".index");
const slider = document.getElementById("slider");
const indicatorContainer = document.getElementById("indexIndicator");

// create index for image transition
let index = 0;
// declaration to prevent double triggering animation during animation is running
let isTransitioning = false;
// set timing delay to the isTransintioning logic
const timeDelay = 900;
// set the interval time to the autoplay logic
const intervalTime = 6000;
// set interval id to use to stop interval
let interval;

// set first (according to the index which is zero) indicator
// on the first loading
setFisrtActiveIndicator(index);

// set first image on show first (on load)
setFirstSlideToShow(index);

// start autoplay function to run animation at intervals
startAutoPlay();

// ===== add logic to the next button =====
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  // disable ability to click the button
  // during the animation
  isTransitioning = true;
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  upDateSlide(index);
  upDateActiveIndicator(index);
});

// ===== add logic to the previous button =====
prevBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  // disable ability to click the button
  // during the animation
  isTransitioning = true;
  index--;
  if (index < 0) index = slides.length - 1;
  upDateSlide(index);
  upDateActiveIndicator(index);
});

// ===== function update slide =====
function upDateSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("show");

    // restore ability to click on the button
    // by reset isTransitioning to default
  });
  slides[index].classList.add("show");
  setTimeout(() => {
    isTransitioning = false;
  }, timeDelay); // timeDelay (It's set to 900 milliseconds)
}

// ===== function update active indicator =====
function upDateActiveIndicator(index) {
  // put the index argument to the function for updating
  // the indicator (index-indicator)
  const newIndicator = indicators[index];
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  newIndicator.classList.add("active");
}

// ===== add event listener to each indicator =====
indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    if (isTransitioning || i === index) return;
    isTransitioning = true;
    index = i;
    upDateSlide(index);
    upDateActiveIndicator(index);
  });
});

// ===== function for updating indicator active on load =====
function setFisrtActiveIndicator(index) {
  indicators[index].classList.add("active");
}

// ===== function to set the first image to show =====
function setFirstSlideToShow(index) {
  slides[index].classList.add("show");
}

// ===== function move to next slide =====
function moveToNextSlide() {
  isTransitioning = true;
  index++; // set global index according to the logic
  if (index >= slides.length) index = 0;
  upDateSlide(index);
  upDateActiveIndicator(index);
}

// ===== auto play function =====
function startAutoPlay() {
  interval = setInterval(() => {
    moveToNextSlide();
  }, intervalTime); // intervalTime from declaration (set to 3000)
}

// ===== stop auto play function =====
function stopAutoPlay() {
  clearInterval(interval);
}

// ===================================================
// 🚀 add start autoplay & stop autoplay on slider & indicator
// ===================================================
// add start auto play on mouse enter the slider
slider.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

// add stop auto play on mouse leave from the slider
slider.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// add start auto play on mouse enter the slider
indicatorContainer.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

// add stop auto play on mouse leave from the slider
indicatorContainer.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// ===================================================
// 🚀 add start autoplay & stop autoplay on button
// ===================================================

nextBtn.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

nextBtn.addEventListener("mouseleave", () => {
  startAutoPlay();
});

prevBtn.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

prevBtn.addEventListener("mouseleave", () => {
  startAutoPlay();
});

// ===== add transition effect =====
slides.forEach((slide, i) => {
  slide.addEventListener("transitionstart", (e) => {
    if (index !== i) return;
    if (e.propertyName !== "opacity") return;
    slide.classList.add("tf-effect");
  });
});

// ===== remove transition effect =====
slides.forEach((slide, i) => {
  slide.addEventListener("transitionend", (e) => {
    if (index !== i) return;
    if (e.propertyName !== "opacity") return;
    slide.classList.remove("tf-effect");
  });
});

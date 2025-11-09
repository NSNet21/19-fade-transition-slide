# 🌌 Fade Transition Image Slider
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-34A853?style=for-the-badge&logo=google-chrome&logoColor=white)
![FadeTransition](https://img.shields.io/badge/Fade_Transition-Effect-9C27B0?style=for-the-badge&logo=visualstudiocode&logoColor=white)



A **modern image slideshow** built with **HTML, CSS, and JavaScript**, featuring smooth **fade transitions**,
auto-play functionality, and dynamic **indicator controls** with responsive design.

> 🎴 A creative experiment exploring fade-in/fade-out transitions, event handling, and CSS filter effects.

---

## 🌐 Live Demo

👉 **[View on GitHub Pages](https://nsnet21.github.io/19-fade-transition-slide/)**

---

## 🖼️ Preview

### 💻 Desktop

![Preview](assets-preview/preview.jpeg)

### 📱 Mobile

![Mobile Preview](assets-preview/mobile-preview.jpeg)

---

## 🚀 Features

- ✨ **Smooth Fade Transition** — slides change opacity with a soft fading animation.
- 🔁 **Auto-Play Function** — slides automatically loop with a timed interval.
- 🧭 **Manual Navigation** — next/previous buttons and clickable index indicators.
- 🧩 **Transition Lock System** — prevents double-triggering during animations.
- 💫 **Brightness Highlight Effect** — adds a light flash (`.tf-effect`) while transitioning.
- 🖱️ **Hover Interactions** — auto-play pauses when hovering on slider or indicators.
- 📱 **Responsive Layout** — adapts dynamically via `clamp()` for smooth scaling.

---

## 🧰 Built With

| Stack                  | Usage                                          |
| :--------------------- | :--------------------------------------------- |
| **HTML5**              | Structure for slider, controls, and indicators |
| **CSS3**               | Styling, transitions, and responsive layout    |
| **Vanilla JavaScript** | Slide logic, transitions, and autoplay system  |

---

## ⚙️ How It Works

1. Each `.slide` is stacked absolutely in the same container.
2. Only one `.slide.show` is visible at a time using opacity/visibility toggling.
3. JavaScript controls:
   - `index` tracks the current slide.
   - `isTransitioning` prevents overlapping animations.
   - `setInterval()` drives autoplay.
   - Mouse events pause/resume autoplay.
4. Indicators (`.index`) update dynamically to reflect the current active slide.

---

## 💡 Logic Flow (JavaScript Core)

> Main event logic controlling slide updates, transitions, and autoplay timing.

```js
// Click -> Next Button
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  index = (index + 1) % slides.length;
  upDateSlide(index);
  upDateActiveIndicator(index);
});

// Transition Lock
function upDateSlide(index) {
  slides.forEach((slide) => slide.classList.remove("show"));
  slides[index].classList.add("show");
  setTimeout(() => (isTransitioning = false), timeDelay);
}
```

## 🧩 Logic Explanation (Detailed Breakdown)

> This section explains how each function works and why it exists. </br>
> It’s designed for developers who want to understand the core logic and timing synchronization of this fade transition slider.

---

### 🔹 Variable Declarations

```js
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".index");
const slider = document.getElementById("slider");
const indicatorContainer = document.getElementById("indexIndicator");
```

- **nextBtn / prevBtn** — navigation buttons for moving between slides.
- **slides** — NodeList of all slide elements (`.slide`).
- **indicators** — list of dots that represent each slide.
- **slider** — main container (used for hover detection).
- **indicatorContainer** — used to pause autoplay when hovering over the indicators.

---

### 🔹 Index & Transition Control

```js
let index = 0;
let isTransitioning = false;
const timeDelay = 900;
const intervalTime = 6000;
let interval;
```

- **index** — keeps track of the currently active slide.
- **isTransitioning** — prevents double-triggering when a transition is in progress.
- **timeDelay** — determines when the transition lock should be released (sync with CSS transition).
- **intervalTime** — autoplay duration between slide changes.
- **interval** — holds the `setInterval()` ID for pausing and resuming autoplay.

---

### 🔹 Initial Setup on Page Load

```js
setFisrtActiveIndicator(index);
setFirstSlideToShow(index);
startAutoPlay();
```

- **setFisrtActiveIndicator()** — activates the first dot on load.
- **setFirstSlideToShow()** — displays the first slide initially.
- **startAutoPlay()** — starts the automatic slideshow loop.

📍 _These should be executed right after variable declarations — they define the initial visual state._

---

### 🔹 Next / Previous Button Logic

```js
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  index++;
  if (index >= slides.length) index = 0;
  upDateSlide(index);
  upDateActiveIndicator(index);
});
```

- Clicking the next button:
  - Locks input during transition (`isTransitioning` = true).
  - Increases `index` to show the next slide.
  - Loops back to 0 when reaching the end.
  - Updates both the slide and the indicator.

⏲️ _Prevents multiple clicks while the fade transition is still running._

---

### 🔹 Function: `upDateSlide(index)`

```js
function upDateSlide(index) {
  slides.forEach((slide) => slide.classList.remove("show"));
  slides[index].classList.add("show");
  setTimeout(() => {
    isTransitioning = false;
  }, timeDelay);
}
```

- Removes `.show` from all slides.
- Adds `.show` to the current slide to make it visible.
- Unlocks transitions after `timeDelay`.

💡 _Make sure `timeDelay` ≈ CSS transition time (`opacity 2.5s`) for smooth sync._

---

### 🔹 Function: `upDateActiveIndicator(index)`

```js
function upDateActiveIndicator(index) {
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  indicators[index].classList.add("active");
}
```

- Updates the active dot to match the current slide.
- Works for both button navigation and dot clicks.

---

### 🔹 Indicator Click Logic

```js
indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    if (isTransitioning || i === index) return;
    isTransitioning = true;
    index = i;
    upDateSlide(index);
    upDateActiveIndicator(index);
  });
});
```

- Allows users to jump directly to any slide by clicking its dot.
- Skips action if a transition is active or the clicked dot is already active.

---

### 🔹 Autoplay System

```js
function startAutoPlay() {
  interval = setInterval(() => {
    moveToNextSlide();
  }, intervalTime);
}

function stopAutoPlay() {
  clearInterval(interval);
}
```

- `startAutoPlay()` — sets an interval for automatic slide switching.
- `stopAutoPlay()` — clears the interval to pause autoplay.

📍 _Used together with mouse events to control autoplay on hover._

---

### 🔹 Pause & Resume Events

```js
slider.addEventListener("mouseenter", stopAutoPlay);
slider.addEventListener("mouseleave", startAutoPlay);
indicatorContainer.addEventListener("mouseenter", stopAutoPlay);
indicatorContainer.addEventListener("mouseleave", startAutoPlay);
nextBtn.addEventListener("mouseenter", stopAutoPlay);
nextBtn.addEventListener("mouseleave", startAutoPlay);
prevBtn.addEventListener("mouseenter", stopAutoPlay);
prevBtn.addEventListener("mouseleave", startAutoPlay);
```

- Stops autoplay when hovering on the slider, buttons, or indicators.
- Resumes autoplay when the mouse leaves.

_Improves UX — users can pause and focus on a specific image._

---

### 🔹 Transition Effect Listeners

```js
slides.forEach((slide, i) => {
  slide.addEventListener("transitionstart", (e) => {
    if (index !== i || e.propertyName !== "opacity") return;
    slide.classList.add("tf-effect");
  });

  slide.addEventListener("transitionend", (e) => {
    if (index !== i || e.propertyName !== "opacity") return;
    slide.classList.remove("tf-effect");
  });
});
```

- Adds the `.tf-effect` class at the start of an opacity transition → increases brightness.
- Removes it after the transition ends → returns to normal state.
- Uses `propertyName === "opacity"` to ensure only the fade effect triggers it.

---

### 🔹 Summary of the Logic Flow

```text
Page Loads →
  Set first slide & indicator →
  Start autoplay →
    ⤷ Every interval → moveToNextSlide()
       → Update slide + indicator
Click Button or Dot →
  Pause transition if active →
  Change index → Update slide → Update indicator
Hover →
  Stop autoplay
Mouse Leave →
  Resume autoplay
```

---

## 🎨 Design Notes

- Uses dark-mode inspired palette (`rgb(9, 6, 18)`) for cinematic contrast.
- Accent colors (`rgb(173, 71, 197)`) enhance visibility for active indicators.
- `clamp()` ensures elements scale smoothly from 300–450px width.
- Hover glow effect (`box-shadow`) adds visual depth around the slideshow container.

## 📂 Project Structure

```

19-fade-transition-slide/
├── assets-preview/
│ ├── preview.jpeg
│ └── mobile-preview.jpeg
├── images/
│ ├── img1girl.jpg
│ ├── img2girl.jpg
│ └── ... (13 images total)
├── index.html
├── style.css
├── script.js
└── README.md

```

## 🧠 Learning Focus

- Event handling and timing synchronization between JS + CSS transitions.
- Managing animation states (`isTransitioning`) to avoid flickering.
- Applying `visibility` and `opacity` for smooth fade effects.
- Writing modular update functions (`upDateSlide`, `upDateActiveIndicator`).

---

## ✍️ Created By

_[Nate (ネート)](https://github.com//NSNet21)_

> _"A little bit of fire in every pixel."_ 🔥 </br> > _🎨 Front-end Explorer | 💻 UI Engineer | 🧠 Logic Thinker_

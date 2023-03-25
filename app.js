//******** Navbar - fixed scroll ********
const header = document.querySelector("header");
const main = document.querySelector("main");
const headerHeight = document.querySelector("header").offsetHeight;

main.style.top = headerHeight + "px";

let lastScroll = 0;

window.addEventListener("scroll", () => {
  let lastScroll = window.scrollY;

  if (lastScroll > 100) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");
  } else {
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
});

//******** Footer - The year updates to current year ********
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

//******** Slideshow - automatic and manual ********
let slideIndex = 1;
let myTimer;
let slideshowContainer;

window.addEventListener("load", function () {
  showSlides(slideIndex);
  myTimer = setInterval(function () {
    plusSlides(1);
  }, 4000);

  slideshowContainer = document.getElementsByClassName("slideshow-inner")[0];
  slideshowContainer.addEventListener("mouseenter", pause);
  slideshowContainer.addEventListener("mouseleave", resume);
});

// NEXT AND PREVIOUS CONTROL
function plusSlides(n) {
  clearInterval(myTimer);
  if (n < 0) {
    showSlides((slideIndex -= 1));
  } else {
    showSlides((slideIndex += 1));
  }
  if (n === -1) {
    myTimer = setInterval(function () {
      plusSlides(n + 2);
    }, 4000);
  } else {
    myTimer = setInterval(function () {
      plusSlides(n + 1);
    }, 4000);
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n) {
  clearInterval(myTimer);
  myTimer = setInterval(function () {
    plusSlides(n + 1);
  }, 4000);
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
};

resume = () => {
  clearInterval(myTimer);
  myTimer = setInterval(function () {
    plusSlides(slideIndex);
  }, 4000);
};

//********* Dark mode & check **********
const btn = document.querySelector(".darkmodeCheck");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  let theme = "light";
  if (document.body.classList.contains("dark")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});

checkStatus();

function checkStatus() {
  if (currentTheme == "dark") {
    btn.checked = true;
  } else {
    btn.checked = false;
  }
}
//Kod validerat

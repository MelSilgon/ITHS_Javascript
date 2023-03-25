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

const stars = document.getElementById("stars");
const mouseTrail = document.getElementById("mouse-trail");

const totalStars = window.innerWidth < 640 ? 130 : 260;
const starColors = ["cool", "warm", "soft"];

/* Star field */
for (let i = 0; i < totalStars; i += 1) {
  const star = document.createElement("span");
  const size = Math.random() * 2 + 0.7;
  const color = starColors[Math.floor(Math.random() * starColors.length)];

  star.className = `star ${color}`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty("--star-size", `${size}px`);
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${Math.random() * 4 + 3}s`;

  if (Math.random() > 0.78) {
    star.classList.add("big");
  }

  if (Math.random() > 0.94) {
    star.classList.add("bright");
  }

  stars.appendChild(star);
}

/* Cursor glow */
const glow = document.createElement("div");
glow.className = "cursor-glow";

mouseTrail.appendChild(glow);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("pointermove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateGlow() {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  glow.style.left = `${currentX}px`;
  glow.style.top = `${currentY}px`;

  requestAnimationFrame(animateGlow);
}

animateGlow();

// Active navbar section

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop - 160) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }

  });

});

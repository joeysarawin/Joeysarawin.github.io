const stars = document.getElementById("stars");
const mouseTrail = document.getElementById("mouse-trail");

const totalStars = window.innerWidth < 640 ? 130 : 260;
const starColors = ["cool", "warm", "soft"];

const starsContainer =
  document.getElementById("stars");

/* Small stars */

for (let i = 0; i < 260; i++) {

  const star =
    document.createElement("div");

  star.classList.add("star");

  if (Math.random() > 0.94) {
    star.classList.add("large");
  }

  const size =
    Math.random() > 0.94
      ? Math.random() * 4 + 2
      : Math.random() * 2 + 0.6;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top =
    `${Math.random() * 100}%`;

  star.style.left =
    `${Math.random() * 100}%`;

  star.style.setProperty(
    "--twinkle-duration",
    `${Math.random() * 4 + 2}s`
  );

  starsContainer.appendChild(star);
}

/* Shooting stars */

for (let i = 0; i < 6; i++) {

  const shootingStar =
    document.createElement("div");

  shootingStar.classList.add(
    "shooting-star"
  );

  shootingStar.style.top =
    `${Math.random() * 60}%`;

  shootingStar.style.left =
    `${Math.random() * 100}%`;

  shootingStar.style.animationDuration =
    `${Math.random() * 4 + 4}s`;

  shootingStar.style.animationDelay =
    `${Math.random() * 8}s`;

  starsContainer.appendChild(
    shootingStar
  );
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

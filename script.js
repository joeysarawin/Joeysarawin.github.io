const stars = document.getElementById("stars");
const mouseTrail = document.getElementById("mouse-trail");
const totalStars = window.innerWidth < 640 ? 130 : 260;
const starColors = ["cool", "warm", "soft"];
let lastTrailTime = 0;

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

function makeTrailDot(x, y) {
  const dot = document.createElement("span");
  const size = Math.random() * 12 + 8;

  dot.className = "trail-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.setProperty("--trail-size", `${size}px`);

  mouseTrail.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 700);
}

window.addEventListener("pointermove", (event) => {
  const now = Date.now();

  if (now - lastTrailTime > 28) {
    makeTrailDot(event.clientX, event.clientY);
    lastTrailTime = now;
  }
});

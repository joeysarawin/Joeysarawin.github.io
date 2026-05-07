const stars = document.getElementById("stars");
const totalStars = window.innerWidth < 640 ? 130 : 260;
const starColors = ["cool", "warm", "soft"];

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

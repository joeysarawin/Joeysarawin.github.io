const stars = document.getElementById("stars");
const totalStars = window.innerWidth < 640 ? 120 : 230;

for (let i = 0; i < totalStars; i += 1) {
  const star = document.createElement("span");
  const size = Math.random() * 1.8 + 0.8;

  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  if (Math.random() > 0.92) {
    star.classList.add("bright");
  }

  stars.appendChild(star);
}

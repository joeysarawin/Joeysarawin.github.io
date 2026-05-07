const starsContainer = document.getElementById("stars");
const numberOfStars = 160;

for (let i = 0; i < numberOfStars; i += 1) {
  const star = document.createElement("span");
  const size = Math.random() * 2 + 1;

  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  if (Math.random() > 0.9) {
    star.classList.add("bright");
  }

  starsContainer.appendChild(star);
}

/* Stars */

const starsContainer =
  document.getElementById("stars");

const totalStars =
  window.innerWidth < 640
    ? 130
    : 260;

/* Generate stars */

for (let i = 0; i < totalStars; i++) {

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

function createShootingStar() {

  const shootingStar =
    document.createElement("div");

  shootingStar.classList.add("shooting-star");

  // Spawn from the right side
  shootingStar.style.left =
    `${80 + Math.random() * 20}%`;

  // Random height
  shootingStar.style.top =
    `${Math.random() * 60}%`;

  // Random speed
  shootingStar.style.animationDuration =
    `${4 + Math.random() * 3}s`;

  starsContainer.appendChild(shootingStar);

  // Remove after animation
  setTimeout(() => {
    shootingStar.remove();
  }, 7000);
}

// Create one immediately
createShootingStar();

// Create a new one every 3 seconds
setInterval(createShootingStar, 3000);

/* Active navbar section */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );

    });

});

/* Click sparks */

window.addEventListener("click", (event) => {

  for (let i = 0; i < 12; i++) {

    const spark =
      document.createElement("div");

    spark.classList.add(
      "click-spark"
    );

    spark.style.left =
      `${event.clientX}px`;

    spark.style.top =
      `${event.clientY}px`;

    const angle =
      Math.random() * Math.PI * 2;

    const force =
      Math.random() * 1 + 0.4;

    spark.style.setProperty(
      "--x",
      Math.cos(angle) * force
    );

    spark.style.setProperty(
      "--y",
      Math.sin(angle) * force
    );

    document.body.appendChild(
      spark
    );

    setTimeout(() => {
      spark.remove();
    }, 700);

  }

});

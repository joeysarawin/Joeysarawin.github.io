const canvas = document.getElementById("space-scene");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let width = 0;
let height = 0;
let ratio = 1;
let lastTime = 0;
let time = 0;
let stars = [];
let dust = [];
let lanes = [];
let sparks = [];

const palette = {
  violet: "159, 124, 255",
  deepViolet: "88, 54, 176",
  cyan: "99, 230, 255",
  rose: "255, 114, 182",
  gold: "246, 208, 111",
  white: "246, 242, 255"
};

function mulberry(seed) {
  let value = seed;

  return function random() {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function resizeCanvas() {
  ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = Math.max(1, window.innerWidth);
  height = Math.max(1, window.innerHeight);

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  buildScene();
}

function buildScene() {
  const random = mulberry(Math.floor(width * 17 + height * 31));
  const area = width * height;

  stars = Array.from({ length: Math.max(150, Math.floor(area / 5200)) }, () => ({
    x: random() * width,
    y: random() * height,
    size: 0.35 + random() * 1.45,
    alpha: 0.22 + random() * 0.72,
    layer: 0.25 + random() * 1.8,
    phase: random() * Math.PI * 2,
    color: random() > 0.82 ? palette.cyan : palette.white
  }));

  dust = Array.from({ length: Math.max(68, Math.floor(area / 14000)) }, () => ({
    x: random() * width,
    y: random() * height,
    radius: 0.8 + random() * 2.8,
    alpha: 0.04 + random() * 0.12,
    speed: 4 + random() * 18,
    color: random() > 0.72 ? palette.rose : palette.deepViolet
  }));

  lanes = Array.from({ length: Math.max(9, Math.floor(width / 130)) }, (_, index) => ({
    offset: index / Math.max(1, Math.max(9, Math.floor(width / 130)) - 1),
    amplitude: 0.09 + random() * 0.11,
    lift: random() * 120 - 60,
    phase: random() * Math.PI * 2,
    speed: 0.1 + random() * 0.18,
    width: 0.8 + random() * 1.8,
    glow: 24 + random() * 48,
    color: [palette.violet, palette.cyan, palette.rose, palette.gold][index % 4]
  }));

  sparks = Array.from({ length: Math.max(14, Math.floor(width / 80)) }, (_, index) => ({
    lane: index % Math.max(1, lanes.length),
    progress: random(),
    speed: 0.035 + random() * 0.085,
    length: 0.025 + random() * 0.045,
    color: [palette.cyan, palette.rose, palette.gold][index % 3]
  }));
}

function lanePoint(progress, lane, t) {
  const x = -width * 0.1 + progress * width * 1.2;
  const baseY = height * (0.78 - lane.offset * 0.58);
  const waveA = Math.sin(progress * 5.2 + lane.phase + t * lane.speed) * height * lane.amplitude;
  const waveB = Math.sin(progress * 13.6 - lane.phase * 0.7 - t * lane.speed * 1.7) * height * 0.034;
  const arc = -Math.sin(progress * Math.PI) * height * 0.12;

  return {
    x,
    y: baseY + waveA + waveB + arc + lane.lift
  };
}

function drawBase(t) {
  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, "#05020d");
  sky.addColorStop(0.38, "#100622");
  sky.addColorStop(0.68, "#1a0d35");
  sky.addColorStop(1, "#07030f");

  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "screen";

  for (let index = 0; index < 4; index += 1) {
    const color = [palette.deepViolet, palette.rose, palette.cyan, palette.violet][index];
    const y = height * (0.18 + index * 0.2) + Math.sin(t * 0.18 + index * 1.7) * height * 0.045;

    ctx.beginPath();
    ctx.moveTo(-width * 0.2, y);

    for (let step = 0; step <= 10; step += 1) {
      const progress = step / 10;
      const x = -width * 0.2 + progress * width * 1.4;
      const curveY = y + Math.sin(progress * 6 + t * 0.25 + index) * height * 0.055;
      ctx.lineTo(x, curveY);
    }

    ctx.strokeStyle = `rgba(${color}, ${index === 2 ? 0.07 : 0.085})`;
    ctx.lineWidth = height * (0.14 + index * 0.025);
    ctx.lineCap = "round";
    ctx.shadowColor = `rgba(${color}, 0.24)`;
    ctx.shadowBlur = 70;
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
}

function drawStars(t) {
  ctx.globalCompositeOperation = "screen";

  for (const star of stars) {
    const x = (star.x + t * star.layer * 6) % (width + 16);
    const y = (star.y + Math.sin(t * 0.22 + star.phase) * star.layer * 5) % height;
    const alpha = star.alpha * (0.72 + Math.sin(t * 1.8 + star.phase) * 0.22);

    ctx.beginPath();
    ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
    ctx.arc(x - 8, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}

function drawDust(delta) {
  ctx.globalCompositeOperation = "screen";

  for (const mote of dust) {
    mote.x += mote.speed * delta;
    mote.y -= mote.speed * delta * 0.16;

    if (mote.x > width + 12) {
      mote.x = -12;
      mote.y = Math.random() * height;
    }

    if (mote.y < -12) {
      mote.y = height + 12;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(${mote.color}, ${mote.alpha})`;
    ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}

function drawLanes(t) {
  ctx.globalCompositeOperation = "lighter";

  for (const lane of lanes) {
    for (let pass = 0; pass < 2; pass += 1) {
      ctx.beginPath();

      for (let step = 0; step <= 130; step += 1) {
        const progress = step / 130;
        const drift = Math.sin(t * lane.speed + lane.phase) * 0.018;
        const point = lanePoint(progress + drift, lane, t);

        if (step === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }

      ctx.strokeStyle = `rgba(${lane.color}, ${pass === 0 ? 0.12 : 0.46})`;
      ctx.lineWidth = lane.width * (pass === 0 ? 12 : 1.45);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${lane.color}, 0.72)`;
      ctx.shadowBlur = pass === 0 ? lane.glow : 18;
      ctx.stroke();
    }
  }

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
}

function drawSparks(t, delta) {
  ctx.globalCompositeOperation = "lighter";

  for (const spark of sparks) {
    const lane = lanes[spark.lane % lanes.length];
    spark.progress = (spark.progress + spark.speed * delta) % 1;

    const head = lanePoint(spark.progress, lane, t);
    const tail = lanePoint(Math.max(0, spark.progress - spark.length), lane, t);
    const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);

    gradient.addColorStop(0, `rgba(${spark.color}, 0)`);
    gradient.addColorStop(0.72, `rgba(${spark.color}, 0.44)`);
    gradient.addColorStop(1, "rgba(246, 242, 255, 0.9)");

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.15;
    ctx.shadowColor = `rgba(${spark.color}, 0.78)`;
    ctx.shadowBlur = 20;
    ctx.moveTo(tail.x, tail.y);
    ctx.lineTo(head.x, head.y);
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
}

function drawScanlines(t) {
  ctx.globalAlpha = 0.11;
  ctx.strokeStyle = "rgba(246, 242, 255, 0.16)";
  ctx.lineWidth = 1;

  const spacing = 92;
  const offset = (t * 12) % spacing;

  for (let y = -spacing; y < height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(width, y + offset - height * 0.06);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

function drawShade() {
  const shade = ctx.createLinearGradient(0, 0, width, height);
  shade.addColorStop(0, "rgba(5, 2, 13, 0.08)");
  shade.addColorStop(0.48, "rgba(5, 2, 13, 0)");
  shade.addColorStop(1, "rgba(5, 2, 13, 0.48)");

  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
}

function render(frameTime) {
  const elapsed = lastTime ? Math.min((frameTime - lastTime) / 1000, 0.05) : 0.016;
  const motion = reduceMotion.matches ? 0.25 : 1;
  lastTime = frameTime;
  time += elapsed * motion;

  drawBase(time);
  drawStars(time);
  drawDust(elapsed * motion);
  drawLanes(time);
  drawSparks(time, elapsed * motion);
  drawScanlines(time);
  drawShade();

  requestAnimationFrame(render);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
requestAnimationFrame(render);

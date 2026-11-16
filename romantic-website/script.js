// Update these details once to personalize the card and choose your audio file.
const CONFIG = {
  yourName: "Neel",
  partnerName: "Pal",
  birthdayDate: "2026-11-17",
  songTitle: "Tum Se Hi",
  musicPath: "assets/music/tum-se-hi.mp3"
};

// Each tap opens the next little birthday note.
const surprises = [
  {
    eyebrow: "A little thing I want you to know",
    title: "Pal, I see all that you do.",
    message: "I notice the way you keep trying, the kindness you give, and all the little things you carry quietly. When the world feels like too much, bring every messy thought to me. I'll listen, stay close, and face what we can together.",
    button: "There's one more thing"
  },
  {
    eyebrow: "A promise, with love",
    title: "Let me make the hard things lighter.",
    message: "My first instinct is to help solve the things that are weighing on you. I'll ask what you need—a listening ear, a silly distraction, or someone to work it out beside you. Not to take over, but to share the weight the way partners do.",
    button: "Open your birthday wish"
  },
  {
    eyebrow: "My wish for your new year",
    title: "May this year be gentle with your heart.",
    message: "I hope it brings you dreams that make you excited to wake up, laughter that sneaks up on you, and peace that stays. I want to keep giving you reasons to smile—not just today, but in the little everyday moments too.",
    button: "One last surprise"
  },
  {
    eyebrow: "From my whole heart",
    title: "My favorite person. My forever.",
    message: "I never want to hold you back; I want to walk beside you. I'll care for your heart, cheer for your dreams, respect your choices, and choose us with tenderness—again and again. Happy birthday, my Pal. I love you beyond words.",
    button: "Read my birthday wish again"
  }
];

document.querySelectorAll("[data-your-name]").forEach((element) => {
  element.textContent = CONFIG.yourName;
});
document.querySelectorAll("[data-partner-name]").forEach((element) => {
  element.textContent = CONFIG.partnerName;
});
document.title = `Happy Birthday, ${CONFIG.partnerName}!`;

const cardContent = document.getElementById("card-content");
const cardEyebrow = document.getElementById("card-eyebrow");
const cardTitle = document.getElementById("birthday-title");
const cardMessage = document.getElementById("card-message");
const cardSignoff = document.getElementById("card-signoff");
const stepIndicator = document.getElementById("step-indicator");
const nextButton = document.getElementById("next-button");
const balloonLayer = document.getElementById("balloon-layer");
const celebrationHeartLayer = document.getElementById("celebration-heart-layer");
const progressDots = document.querySelectorAll(".progress-dot");
let surpriseIndex = -1;

function updateProgress(activeStep) {
  progressDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index + 1 === activeStep);
    dot.classList.toggle("is-complete", index + 1 < activeStep);
  });
}

function showCover() {
  cardContent.classList.remove("is-note", "is-finale");
  cardEyebrow.textContent = "A little surprise, made just for you";
  cardTitle.innerHTML = `Happy Birthday,<br><em>${CONFIG.partnerName}</em>`;
  cardMessage.textContent = "To the girl who makes every day warmer just by being in it: I hope today returns a little of the joy and comfort you give everyone around you. You deserve all the love in this world—especially today. Happy birthday, my love.";
  cardSignoff.innerHTML = `With all my love, <span>${CONFIG.yourName}</span>`;
  stepIndicator.textContent = "Your surprise is waiting · 1 of 5";
  nextButton.innerHTML = 'Open your first surprise <span aria-hidden="true">→</span>';
  updateProgress(1);
}

function showSurprise(index) {
  const surprise = surprises[index];
  cardContent.classList.add("is-note");
  cardContent.classList.toggle("is-finale", index === surprises.length - 1);
  cardEyebrow.textContent = surprise.eyebrow;
  cardTitle.textContent = surprise.title;
  cardMessage.textContent = surprise.message;
  cardSignoff.innerHTML = `With all my love, <span>${CONFIG.yourName}</span>`;
  stepIndicator.textContent = `A little birthday journey · ${index + 2} of ${surprises.length + 1}`;
  nextButton.innerHTML = index === surprises.length - 1
    ? 'Read my birthday wish again <span aria-hidden="true">↻</span>'
    : `${surprise.button} <span aria-hidden="true">→</span>`;
  updateProgress(index + 2);
}

function releaseBalloons(count) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#e11d48", "#fb7185", "#f9a8d4", "#d4af37", "#881337"];
  for (let index = 0; index < count; index += 1) {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.style.setProperty("--balloon-left", `${Math.random() * 96}%`);
    balloon.style.setProperty("--balloon-size", `${21 + Math.random() * 19}px`);
    balloon.style.setProperty("--balloon-color", colors[Math.floor(Math.random() * colors.length)]);
    balloon.style.setProperty("--balloon-duration", `${4 + Math.random() * 3}s`);
    balloon.style.setProperty("--balloon-drift", `${Math.round(Math.random() * 120 - 60)}px`);
    balloonLayer.appendChild(balloon);
    window.setTimeout(() => balloon.remove(), 7500);
  }

  const sparkle = document.createElement("span");
  sparkle.className = "balloon-sparkle";
  sparkle.textContent = "✦";
  sparkle.style.setProperty("--balloon-left", `${8 + Math.random() * 84}%`);
  balloonLayer.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 2600);

  const hearts = count > 10 ? 12 : 4;
  for (let index = 0; index < hearts; index += 1) {
    const heart = document.createElement("span");
    heart.className = "celebration-heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
    heart.style.setProperty("--heart-left", `${2 + Math.random() * 96}%`);
    heart.style.setProperty("--heart-size", `${14 + Math.random() * 28}px`);
    heart.style.setProperty("--heart-color", colors[Math.floor(Math.random() * colors.length)]);
    heart.style.setProperty("--heart-duration", `${4 + Math.random() * 2}s`);
    heart.style.setProperty("--heart-drift", `${Math.round(Math.random() * 90 - 45)}px`);
    celebrationHeartLayer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 6500);
  }
}

nextButton.addEventListener("click", () => {
  if (surpriseIndex === -1) startMusic();
  nextButton.disabled = true;
  cardContent.classList.add("is-changing");

  window.setTimeout(() => {
    if (surpriseIndex >= surprises.length - 1) {
      surpriseIndex = -1;
      showCover();
    } else {
      surpriseIndex += 1;
      showSurprise(surpriseIndex);
      releaseBalloons(surpriseIndex === surprises.length - 1 ? 20 : 7);
    }

    cardContent.classList.remove("is-changing");
    nextButton.disabled = false;
  }, 200);
});

// The first "open" tap also attempts playback to satisfy browser gesture rules.
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const musicStatus = document.getElementById("music-status");
music.src = CONFIG.musicPath;
musicButton.setAttribute("aria-label", `Play ${CONFIG.songTitle}`);

function setMusicPlaying(isPlaying) {
  musicButton.classList.toggle("is-playing", isPlaying);
  musicButton.setAttribute("aria-pressed", String(isPlaying));
  musicButton.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${CONFIG.songTitle}`);
  musicLabel.textContent = isPlaying ? `${CONFIG.songTitle} · playing` : CONFIG.songTitle;
}

function startMusic() {
  music.play().then(() => {
    setMusicPlaying(true);
    musicStatus.textContent = "";
  }).catch((error) => {
    setMusicPlaying(false);
    musicStatus.textContent = `Add your audio file at ${CONFIG.musicPath} to hear ${CONFIG.songTitle}.`;
    console.error(`Could not play ${CONFIG.songTitle}. Check the audio file at ${CONFIG.musicPath}.`, error);
  });
}

musicButton.addEventListener("click", () => {
  if (music.paused) startMusic();
  else {
    music.pause();
    setMusicPlaying(false);
  }
});
music.addEventListener("pause", () => setMusicPlaying(false));
music.addEventListener("ended", () => setMusicPlaying(false));

const birthdayParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(CONFIG.birthdayDate);
if (birthdayParts) {
  const birthday = new Date(Number(birthdayParts[1]), Number(birthdayParts[2]) - 1, Number(birthdayParts[3]));
  if (!Number.isNaN(birthday.getTime())) {
    document.querySelector(".card-date").textContent = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long"
    }).format(birthday);
  }
}

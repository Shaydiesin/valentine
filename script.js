
// GENERAL LOGIC
const today = new Date();

// CHANGE this to the start of your Valentine week
const startDate = new Date(today.getFullYear(), 1, 9); // Feb 8 (month is 0-based)

const dayNumber =
  Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 3;

document.querySelectorAll(".day").forEach(section => {
  const sectionDay = parseInt(section.dataset.day);

  if (sectionDay === dayNumber) {
    section.classList.add("active");
  } else if (sectionDay < dayNumber) {
    section.classList.add("active");
  } else {
    section.classList.add("locked");
  }
});





//////// ROSE DAY ////////

document.querySelectorAll(".rose-svg").forEach(rose => {
  rose.addEventListener("click", () => {
    rose.classList.toggle("bloom");
  });
});


//////// PROPOSE DAY ////////

const ore = document.getElementById("ore");
const diamond = document.getElementById("diamond");
const ring = document.getElementById("ring");
const ringDiamond = document.getElementById("ringDiamond");
const proposal = document.getElementById("proposal");
const hint = document.getElementById("hint");

let hits = 0;
const maxHits = 4;

/* ---- MINING ---- */
ore.addEventListener("click", () => {
  hits++;

  if (hits === 1) ore.src = "photos/ore_1.png";
  if (hits === 2) ore.src = "photos/ore_2.png";
  if (hits === 3) ore.src = "photos/ore_3.png";

  if (hits === maxHits) {
    setTimeout(() => {
      ore.classList.add("hidden");
      diamond.classList.remove("hidden");
      hint.textContent = "Drag the diamond to the ring 💎";
    }, 200);
  }
});

/* ---- DRAG ---- */
diamond.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "diamond");
});

/* ---- DROP ---- */
ring.addEventListener("dragover", (e) => e.preventDefault());

ring.addEventListener("drop", (e) => {
  e.preventDefault();

  diamond.classList.add("hidden");
  ringDiamond.classList.remove("hidden");

  ring.classList.add("ready", "filled");
  ring.dataset.ready = "true";

  hint.textContent = "Click the ring 💛";
});

/* ---- FINAL CLICK ---- */
ring.addEventListener("click", () => {
  if (ring.dataset.ready !== "true") return;

  ring.classList.add("open");
  proposal.classList.remove("hidden");
});





//////// CHOCOLATE DAY ////////

const grid = document.getElementById("chocolateGrid");
const instruction = document.getElementById("chocoInstruction");


const rows = 6;
const cols = 6;
let eatenCount = 0;
const totalTiles = rows * cols;

// Create chocolate tiles
for (let i = 0; i < totalTiles; i++) {
  const tile = document.createElement("div");
  tile.classList.add("choco-tile");

  // Add C / Y stamp
  const letter = document.createElement("div");
  letter.classList.add("choco-letter");
  letter.textContent = "C  Y";
  tile.appendChild(letter);

  tile.addEventListener("click", () => {
    if (tile.classList.contains("eaten")) return;

    tile.classList.add("eaten");
    eatenCount++;

    if (eatenCount === totalTiles) {
      instruction.textContent = "Nothing sweeter than us ❤️";
    }
  });

  grid.appendChild(tile);
}



//////// TEDDY DAY ////////

const teddy = document.getElementById("teddy");
const buttons = document.querySelectorAll(".teddy-actions button");
const text = document.getElementById("teddy-text");

let step = 0;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    step++;
    btn.disabled = true;

    if (step === 1) teddy.classList.add("warm");
    if (step === 2) teddy.classList.add("comfort");
    if (step === 3) {
      teddy.classList.add("love");
      text.classList.remove("hidden");
    }
  });
});




//////// PROMISE DAY ////////

const redHeart = document.getElementById("red-heart");
const blueHeart = document.getElementById("blue-heart");

const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");

let dragging = false;
let followHeart = null;
let dragEmoji = "";
let exchanges = 0; // track heart exchanges

// Start dragging
function startDrag(e, emoji) {
  dragging = true;
  dragEmoji = emoji;

  followHeart = document.createElement("span");
  followHeart.classList.add("follow-heart");
  followHeart.innerText = emoji;
  document.body.appendChild(followHeart);
}

// Drag start
redHeart.addEventListener("mousedown", (e) => startDrag(e, "❤️"));
blueHeart.addEventListener("mousedown", (e) => startDrag(e, "💙"));

// Move with mouse
document.addEventListener("mousemove", (e) => {
  if (dragging && followHeart) {
    followHeart.style.left = e.clientX + "px";
    followHeart.style.top = e.clientY + "px";
  }
});

// Drop logic
document.addEventListener("mouseup", (e) => {
  if (dragging && followHeart) {
    let targetHeart = null;

    const redRect = redHeart.getBoundingClientRect();
    const blueRect = blueHeart.getBoundingClientRect();

    if (
      e.clientX >= blueRect.left &&
      e.clientX <= blueRect.right &&
      e.clientY >= blueRect.top &&
      e.clientY <= blueRect.bottom &&
      dragEmoji !== "💙"
    ) {
      targetHeart = blueHeart;
    } else if (
      e.clientX >= redRect.left &&
      e.clientX <= redRect.right &&
      e.clientY >= redRect.top &&
      e.clientY <= redRect.bottom &&
      dragEmoji !== "❤️"
    ) {
      targetHeart = redHeart;
    }

    if (targetHeart && dragEmoji) {
      const smallHeart = document.createElement("span");
      smallHeart.classList.add("small-heart");
      smallHeart.innerText = dragEmoji;
      targetHeart.appendChild(smallHeart);

      setTimeout(() => {
        smallHeart.style.transform = "translate(-50%, -50%) scale(1)";
      }, 50);

      // Show lines sequentially
      exchanges++;
      if (exchanges === 1) line2.classList.remove("hidden");
      if (exchanges === 2) line3.classList.remove("hidden");
    }

    // Remove follow heart
    document.body.removeChild(followHeart);
    followHeart = null;
    dragging = false;
    dragEmoji = "";
  }
});

// Click either heart to "bring hearts together" after two exchanges
function heartsTogether() {
  if (exchanges >= 2) {
    redHeart.style.transform = "translateX(90px)";
    blueHeart.style.transform = "translateX(-90px)";
    line4.classList.remove("hidden");
  }
}

redHeart.addEventListener("click", heartsTogether);
blueHeart.addEventListener("click", heartsTogether);




















//////// HUG DAY ////////




const hugContainer = document.querySelector(".hug-container");
const guy = document.getElementById("guy");
const female = document.getElementById("female");
const hand = document.getElementById("hand");
const rope = document.getElementById("rope");
const hugMsg = document.getElementById("hug-msg");

let isPullingHand = false;

// Place hand at right edge of female
const femaleCenterY = female.offsetTop + female.offsetHeight / 2;
const handOriginalX = female.offsetLeft + female.offsetWidth-20;
const handOriginalY = femaleCenterY;

hand.style.left = handOriginalX + "px";
hand.style.top = (handOriginalY - hand.offsetHeight / 2) + "px";

hand.addEventListener("mousedown", () => isPullingHand = true);
document.addEventListener("mouseup", () => isPullingHand = false);

document.addEventListener("mousemove", (e) => {
  if (!isPullingHand) return;

  const containerRect = hugContainer.getBoundingClientRect();

  // Hand position inside container
  const handX = e.clientX - containerRect.left - hand.offsetWidth / 2;
  const handY = e.clientY - containerRect.top - hand.offsetHeight / 2;

  hand.style.left = handX + "px";
  hand.style.top = handY + "px";

  // Hand center coordinates
  const handCenterX = handX + hand.offsetWidth / 2;
  const handCenterY = handY + hand.offsetHeight / 2;

  // Rope from original center to current center
  const dx = handCenterX - handOriginalX;
  const dy = handCenterY - handOriginalY;
  const distance = Math.sqrt(dx*dx + dy*dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  rope.style.width = distance + "px";
  rope.style.left = handOriginalX + "px";
  rope.style.top = handOriginalY + "px";
  rope.style.transform = `rotate(${angle}deg)`;

  // Hug trigger if hand touches guy
  const guyCenterX = guy.offsetLeft + guy.offsetWidth / 2;
  const guyCenterY = guy.offsetTop + guy.offsetHeight / 2;
  const distToGuy = Math.sqrt(Math.pow(handCenterX - guyCenterX, 2) + Math.pow(handCenterY - guyCenterY, 2));

  if(distToGuy < 50){
    hugMsg.classList.remove("hidden");
  }
});


//////// KISS DAY ////////
const kissBtn = document.getElementById("kiss-btn");
const scene = document.getElementById("kiss-scene");

const guyWords = document.querySelectorAll("#guy-bubble span");
const girlWords = document.querySelectorAll("#girl-bubble span");

const guyTranslation = ["Je", "t'aime", "beaucoup"];
const girlTranslation = ["maza tuzyavar", "prem", "aahe"];

let kissCount = 0;

kissBtn.addEventListener("click", () => {
  // Restart animation every click
  scene.classList.remove("kiss-active");
  void scene.offsetWidth; // force reflow
  scene.classList.add("kiss-active");

  // Translate words for first 3 kisses
  if (kissCount < 3) {
    guyWords[kissCount].textContent = guyTranslation[kissCount];
    girlWords[kissCount].textContent = girlTranslation[kissCount];

    guyWords[kissCount].classList.add("change");
    girlWords[kissCount].classList.add("change");

    setTimeout(() => {
      guyWords[kissCount].classList.remove("change");
      girlWords[kissCount].classList.remove("change");
    }, 300);

    kissCount++;
    if (kissCount === 3) {
    document.getElementById("final-line").classList.add("show");
    }
  }
});



//////// Valentines Day ////////

const seal = document.getElementById("seal");
const envelope = document.getElementById("envelope");
const letter = document.querySelector(".letter");
const env_body = envelope.querySelector(".body");
const flap = envelope.querySelector(".flap");

let sealBroken = false;

// Step 1: click heart
seal.addEventListener("click", (e) => {
  e.stopPropagation(); // important
  seal.classList.add("broken");
  sealBroken = true;
});

// Step 2: click envelope
envelope.addEventListener("click", () => {
  if (!sealBroken) return; // must break seal first
  envelope.classList.add("open");
  env_body.style.zIndex = 20;
  letter.style.zIndex=10;
  flap.style.zIndex = 1;
});

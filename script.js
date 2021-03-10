///
const gameContainer = document.querySelector(".game-container");
const eggBoxEl = document.getElementById("eggBox");
const boxContainer = document.querySelector(".box-wrapper");
const frontOfBox = document.querySelector(".b");
const scoreEl = document.querySelector(".score");
const brokenEl = document.querySelector(".brokens");

///
//speed
const speedX = 5;
const speedY = 7;
//angle of box
let rotateX = 0;
let rotateZ = 0;
const acceptanceAngle = 50;
//
const eggArray = [];
const eggColors = [
  "whitesmoke",
  "#F5F5DC",
  "#FFEBCD",
  "#FFE4C4",
  "#F0FFFF",
  "#7FFFD4",
  "#FAEBD7",
  "#F0F8FF",
  "#5F9EA0",
  "#FFF8DC",
  "#8FBC8F",
  "#00BFFF",
  "#F8F8FF",
  "#CD5C5C",
  "#FFFFF0",
  "#D3D3D3",
  "#90EE90",
  "#FFB6C1",
  "#B0C4DE",
  "#FFFFE0",
  "#808000",
  "#AFEEEE",
  "#FFEFD5",
  "#DDA0DD",
  "#C0C0C0",
  "#D2B48C",
  "#FFFF00",
];

let numberOfBrokenEggs = 0;
let eggInBoxPosX = 0;
let eggInBoxPosY = 40;

//
let score = 0;
let brokens = 0;
//
let gameContainerPos = gameContainer.getBoundingClientRect();
window.onresize = () =>
  (gameContainerPos = gameContainer.getBoundingClientRect());

let boxNextX = boxContainer.getBoundingClientRect().left,
  boxNextY = boxContainer.getBoundingClientRect().top;

let directionX, directionY, boxX, boxY;

function checkEggNextPosition(egg, eggEl) {
  //broken egg
  if (egg.top + 20 > gameContainerPos.bottom) {
    egger();
    egg.broken = true;
    brokens++;
    brokenEl.textContent = `MISSED: ${brokens}`;
    numberOfBrokenEggs++;
    const brokenEgg = document.createElement("img");
    brokenEgg.setAttribute("src", "./imgs/broken-egg.png");
    brokenEgg.style.position = "absolute";
    brokenEgg.style.top = `${gameContainerPos.bottom - 20}px`;
    brokenEgg.style.left = eggEl.style.left;
    brokenEgg.style.width = "70px";
    brokenEgg.style.height = "auto";

    eggEl.parentElement.appendChild(brokenEgg);

    eggEl.parentElement.removeChild(eggEl);
    return false;
  }
  if (egg.left < gameContainerPos.left || egg.left > gameContainerPos.right) {
    egg.speedX = -egg.speedX;
    egg.speedX > 0
      ? (eggEl.style.animation = "spinRight 3s linear infinite")
      : (eggEl.style.animation = "spinLeft 3s linear infinite");
    return false;
  }
  if (egg.top < gameContainerPos.top) {
    egg.speedY = -egg.speedY;
    return false;
  }
  //check 0 speeds
  if (egg.speedX === 0) egg.speedX = 5;
  if (egg.speedY === 0) egg.speedY = 3;
  return true;
}

function isCatched(x, y) {
  const { top, left } = boxContainer.getBoundingClientRect();

  if (x > left - 15 && x < left + 85 && y > top - 15 && y < top + 85)
    return true;
  return false;
}

function catched(egg, eggEl) {
  score++;
  scoreEl.textContent = `SCORE : ${score}`;

  //put egg into box
  eggEl.parentElement.removeChild(eggEl);
  frontOfBox.appendChild(eggEl);
  //stop rotation decrease opacity
  eggEl.style.animation = "none";
  //eggEl.style.opacity = "0.3";
  //set new positon for next catcehd egg
  eggEl.style.top = `${eggInBoxPosY}px`;
  eggEl.style.left = `${eggInBoxPosX}px`;
  egg.isRemoved = true;
  eggInBoxPosX += 10;
  if (eggInBoxPosX > 50) {
    eggInBoxPosX = 0;
    eggInBoxPosY -= 10;
  }
  if (eggInBoxPosY < 0) {
    eggInBoxPosY = 40;

    //empty box
    eggArray.forEach(egg => {
      if (egg.isRemoved) {
        const el = document.getElementById(egg.el);
        if (el) el.parentElement.removeChild(el);
      }
    });
  }
  egger();
}

function moveEggs() {
  eggArray.forEach(egg => {
    if (!egg.broken && !egg.isRemoved) {
      egg.left += egg.speedX;
      egg.top += egg.speedY;
      const eggEl = document.getElementById(egg.el);
      if (checkEggNextPosition(egg, eggEl)) {
        eggEl.style.top = `${egg.top}px`;
        eggEl.style.left = `${egg.left}px`;
        ////catched
        if (isCatched(egg.left, egg.top)) catched(egg, eggEl);
      }
    }
  });
}

function moveBoxTo() {
  boxX = boxContainer.getBoundingClientRect().left;
  boxY = boxContainer.getBoundingClientRect().top;
  directionX = boxNextX - boxX;
  directionY = boxNextY - boxY;
  directionX = Math.abs(directionX) > speedX * 10 ? directionX : 0;
  directionY = Math.abs(directionY) > speedY * 10 ? directionY : 0;

  if (directionX) directionX = directionX > 0 ? speedX : -speedX;
  if (directionY) directionY = boxNextY - boxY > 0 ? speedY : -speedY;

  directionX += boxX;
  directionY += boxY;
  let movementCheck = false;
  if (
    directionX > gameContainerPos.left &&
    directionX < gameContainerPos.right - 70
  ) {
    movementCheck = true;
    boxContainer.style.left = `${directionX}px`;
  }
  if (
    directionY > gameContainerPos.top &&
    directionY < gameContainerPos.bottom - 100
  ) {
    movementCheck = true;
    boxContainer.style.top = `${directionY}px`;
  }
  // if (!movementCheck) {
  //   speedX = -speedX;
  //   speedY = -speedY;
  //   directionX++;
  //   directionY++;
  // }
  moveEggs();
  window.requestAnimationFrame(moveBoxTo);
}

const angleChecker = angle => {
  if (Math.abs(angle) > acceptanceAngle)
    angle = angle > 0 ? acceptanceAngle : -acceptanceAngle;
  return angle;
};
document.addEventListener("mousemove", e => {
  boxNextX = e.pageX;
  boxNextY = e.pageY;

  //rotate box towards mouse
  rotateZ = angleChecker(e.pageX - eggBoxEl.getBoundingClientRect().left);
  rotateX = angleChecker(-e.pageY + eggBoxEl.getBoundingClientRect().top);
  rotateX = rotateX > 0 ? rotateX / 2 : rotateX;

  eggBoxEl.style.transform = `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
});

function egger() {
  //console.log("score: ", score, "brokens: ", brokens, "moving eggs: ", eggArray.length-brokens-score);
  //Create egg
  let rndm = Math.random() * 6;
  if (rndm > 5.5 && eggArray.length - brokens - score < 4) egger();

  const eggProperties = {
    color: eggColors[Math.floor(Math.random() * 27)],
    speedX: Math.random() * -6,
    speedY: rndm > 3 ? -rndm : 2,
  };

  const newEgg = document.createElement("i");
  newEgg.classList.add("fas", "fa-egg");
  newEgg.style.position = "absolute";

  newEgg.style.color = eggProperties.color;
  //get random location t start
  let range = 400 + gameContainerPos.width;
  rndm = Math.random() * range;
  if (rndm < 200) {
    eggProperties.left = gameContainerPos.left + 10;
    eggProperties.top = gameContainerPos.top + rndm + 25;
    newEgg.speedX = -newEgg.speedX;
  } else if (rndm < range - 230) {
    eggProperties.left = gameContainerPos.left + rndm - 170;
    eggProperties.top = gameContainerPos.top + 5;
  } else {
    eggProperties.left = gameContainerPos.right - 30;
    eggProperties.top = gameContainerPos.top + rndm - range + 230;
  }

  //eggProperties.left = gameContainerPos.right - 30;
  newEgg.style.left = `${eggProperties.left}px`;

  //eggProperties.top = gameContainerPos.top + 200;
  newEgg.style.top = `${eggProperties.top}px`;

  gameContainer.appendChild(newEgg);
  eggProperties.broken = 0;
  eggArray.push(eggProperties);
  newEgg.id = eggArray.length;
  eggProperties.el = newEgg.id;
  eggProperties.isRemoved = false;
}

// egger();
moveBoxTo();

const btnStart = document.getElementById("start");
btnStart.addEventListener("click", () => {
  btnStart.hidden = true;
  egger();
});

///
const gameContainer = document.querySelector(".game-container");
const eggBoxEl = document.getElementById("eggBox");
const boxContainer = document.querySelector(".box-wrapper");
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
  "rgb(205, 208, 159)",
  "rgb(129, 223, 224)",
  "rgba(81, 81, 81, 0.666)",
  "rgb(96, 49, 41)",
];
let numberOfBrokenEggs = 0;

let score = 0;
//
let gameContainerPos = gameContainer.getBoundingClientRect();
window.onresize = () =>
  (gameContainerPos = gameContainer.getBoundingClientRect());

let boxNextX = boxContainer.getBoundingClientRect().left,
  boxNextY = boxContainer.getBoundingClientRect().top;

let directionX, directionY, boxX, boxY;

function checkEggNextPosition(egg, eggEl) {
  if (egg.top +20 > gameContainerPos.bottom) {
    egg.broken = true;
    numberOfBrokenEggs++;
    const brokenEgg = document.createElement("img");
    brokenEgg.setAttribute("src", "./imgs/broken-egg.png");
    brokenEgg.style.position = "absolute";
    brokenEgg.style.top = `${gameContainerPos.bottom-20}px`;
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
  return true;
}

function moveEggs() {
  eggArray.forEach(egg => {
    if (!egg.broken) {
      egg.left += egg.speedX;
      egg.top += egg.speedY;
      const eggEl = document.getElementById(egg.el);
      if (checkEggNextPosition(egg, eggEl)) {
        eggEl.style.top = `${egg.top}px`;
        eggEl.style.left = `${egg.left}px`;
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
  if (
    directionX > gameContainerPos.left &&
    directionX < gameContainerPos.right - 70
  )
    boxContainer.style.left = `${directionX}px`;
  if (
    directionY > gameContainerPos.top &&
    directionY < gameContainerPos.bottom - 100
  )
    boxContainer.style.top = `${directionY}px`;
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
  let rndm = Math.random() * 8;
  const eggProperties = {
    color: eggColors[Math.floor(rndm - 3)],
    speedX: rndm * -1.5,
    speedY: rndm > 3 ? -rndm*0.8 : rndm*0.8,
  };

  const newEgg = document.createElement("i");
  newEgg.classList.add("fas", "fa-egg");
  newEgg.style.position = "absolute";

  newEgg.style.color = eggProperties.color;

  eggProperties.left = gameContainerPos.right - 30;
  newEgg.style.left = `${eggProperties.left}px`;

  eggProperties.top = gameContainerPos.top + 200;
  newEgg.style.top = `${eggProperties.top}px`;

  gameContainer.appendChild(newEgg);
  eggProperties.broken = 0;
  eggArray.push(eggProperties);
  newEgg.id = eggArray.length;
  eggProperties.el = newEgg.id;
}

egger();
moveBoxTo();

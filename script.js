///
const gameConteiner = document.querySelector(".game-container");
const eggBoxEl = document.getElementById("eggBox");
const boxContainer = document.querySelector(".box-wrapper");
///

//angle of box
let rotateX = 0;
let rotateY = 0;
const acceptanceAngle = 70;
//
let gameContainerPos = gameConteiner.getBoundingClientRect();
window.onresize = () =>
  (gameContainerPos = gameConteiner.getBoundingClientRect());

let boxX, boxY;

let isTimerOn = false;

const angleChecker = angle => {
  if (Math.abs(angle) > acceptanceAngle)
    angle = angle > 0 ? acceptanceAngle : -acceptanceAngle;
  return angle;
};

const posChecker = (x, y) =>
  x > gameContainerPos.left &&
  x < gameContainerPos.right - 70 &&
  y > gameContainerPos.top &&
  y < gameContainerPos.bottom - 70;
function moveBoxTo(x, y) {
  if (!isTimerOn && posChecker(x, y)) {
    isTimerOn = true;
    boxContainer.style.top = `${y}px`;
    boxContainer.style.left = `${x}px`;
    setTimeout(() => {
      isTimerOn = false;
    }, 100);
  }
}

document.addEventListener("mousemove", e => {
  boxX = e.pageX;
  boxY = e.pageY;
  moveBoxTo(e.pageX, e.pageY);

  rotateX = angleChecker(e.pageX - eggBoxEl.getBoundingClientRect().left);
  rotateY = angleChecker(-e.pageY + eggBoxEl.getBoundingClientRect().top) + 20;
  if (rotateY > 0) rotateY = rotateY / 4;
  eggBoxEl.style.transform = `rotateX(${rotateY}deg) rotateZ(${rotateX}deg)`;
});

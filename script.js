///
const gameConteiner = document.querySelector(".game-container");
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
let gameContainerPos = gameConteiner.getBoundingClientRect();
window.onresize = () =>
  (gameContainerPos = gameConteiner.getBoundingClientRect());

let boxNextX = boxContainer.getBoundingClientRect().left,
  boxNextY = boxContainer.getBoundingClientRect().top;

let directionX, directionY, boxX, boxY;

function moveBoxTo() {
  //   if (!isTimerOn && posChecker(x, y)) {
  //     isTimerOn = true;

  //     setTimeout(() => {
  //       isTimerOn = false;
  //     }, 100);
  //
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
moveBoxTo();

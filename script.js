///
const gameConteiner = document.querySelector(".game-container");
const eggBoxEl = document.getElementById("eggBox");
///

//angle of box
let rotateX = 0;
let rotateY = 0;
const acceptanceAngle = 70;

const angleChecker = angle => {
  if (Math.abs(angle) > acceptanceAngle)
    angle = angle > 0 ? acceptanceAngle : -acceptanceAngle;
  return angle;
};
let inc = 0;
gameConteiner.addEventListener("mousemove", e => {
  //console.log(eggBoxEl.getBoundingClientRect().left, e.pageX);

  rotateX = angleChecker(e.pageX - eggBoxEl.getBoundingClientRect().left);

  rotateY = angleChecker(-e.pageY + eggBoxEl.getBoundingClientRect().top) + 20;
  console.log(rotateY);
  if (rotateY > 0) rotateY = rotateY / 4;
  eggBoxEl.style.transform = `rotateX(${rotateY}deg) rotateZ(${rotateX}deg)`;

  
  eggBoxEl.style.top = `${e.pageY}px`;
  eggBoxEl.style.left = `${e.pageX}px`;
});

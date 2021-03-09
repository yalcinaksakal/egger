///
const gameConteiner = document.querySelector(".game-container");
const eggBoxEl = document.getElementById("eggBox");

///

gameConteiner.addEventListener("mousemove", e => {
  eggBoxEl.style.transform = `rotateX(${e.pageY}deg) rotateY(${e.pageX}deg)`;
  console.log(eggBoxEl.getBoundingClientRect().left, e.pageX);
//   eggBoxEl.style.top = `${e.pageY}px`;
//   eggBoxEl.style.left = `${e.pageX}px`;
});

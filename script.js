var cube = document.getElementById("cube");
document.addEventListener("mousemove", e => {
  var transform = `rotateX(${e.pageY}deg) rotateY(${e.pageX}deg)`;
  cube.style.transform = transform;
});

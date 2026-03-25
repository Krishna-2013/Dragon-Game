const music = new Audio("music.mp3");
const gamoOverAudio = new Audio("gameover.mp3");
const dino = document.querySelector(".dino");
const obstacle = document.querySelector(".obstacle");
const start = document.querySelector(".start");
const scoreContainer = document.querySelector(".scoreContainer");
const highScoreContainer = document.querySelector(".highScoreContainer");
let highScore = localStorage.getItem("highScore") || 0;
highScoreContainer.innerText = `High Score: ${highScore}`;
let score = 0;
let hasScoredCurrentPass = false;
let isGameOver = false;

updateScore(score);

document.addEventListener("keydown", (e) => {
  if (isGameOver) {
    return;
  }

  start.style.visibility = "hidden";
  const code = e.code;
  obstacle.classList.add("obstacleAni");
  music.play();
  if (code === "Space" || code === "ArrowUp") {
    dino.classList.add("jump");

    setTimeout(() => {
      dino.classList.remove("jump");
    }, 700);
  } else if (code === "KeyA" || code === "ArrowLeft") {
    const currentLeft = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left"),
      10,
    );
    dino.style.left = currentLeft - 112 + "px";
  } else if (code === "KeyD" || code === "ArrowRight") {
    const currentLeft = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left"),
      10,
    );
    dino.style.left = currentLeft + 112 + "px";
  }
});

setInterval(() => {
  if (isGameOver) {
    return;
  }

  const dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left"),
    10,
  );
  const dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top"),
    10,
  );

  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left"),
    10,
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top"),
    10,
  );

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);
  const dinoRight = dx + dino.offsetWidth;
  const obstacleRight = ox + obstacle.offsetWidth;

  if (offsetX <= 93 && offsetY <= 52) {
    isGameOver = true;
    start.innerText = "Game Over - Reload to play again";
    start.style.visibility = "visible";
    obstacle.classList.remove("obstacleAni");
    music.pause();
    gamoOverAudio.play();
    setTimeout(() => {
      gamoOverAudio.pause();
    }, 1000);
    return;
  }

  if (ox > dinoRight) {
    hasScoredCurrentPass = false;
  }

  if (!hasScoredCurrentPass && obstacleRight < dx) {
    score += 1;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
      highScoreContainer.innerText = `High Score: ${highScore}`;
    }
    hasScoredCurrentPass = true;
    updateScore(score);
    anyDur = parseFloat(
      window
        .getComputedStyle(obstacle, null)
        .getPropertyValue("animation-duration"),
    );
    setTimeout(() => {
      if (anyDur > 3.5) {
        newDur = anyDur - 0.1;
        obstacle.style.animationDuration = `${newDur}s`;
      }

      console.log(anyDur);
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreContainer.textContent = `Score: ${score}`;
}

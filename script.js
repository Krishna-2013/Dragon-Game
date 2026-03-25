const music = new Audio("music.mp3");
const dino = document.querySelector(".dino")
const obstacle = document.querySelector(".obstacle")
const gameOver = document.querySelector(".gameOVer")

document.addEventListener("keydown", (e) => {
    code = e.code
    console.log(code);
    obstacle.classList.add("obstacleAni")
    // music.play();
    if(code === "Space") {
        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 700);
    }
})

setInterval(() => {
    dx = window.getComputedStyle(dino, null).getPropertyValue("left");
    dy = window.getComputedStyle(dino, null).getPropertyValue("top");

    ox = window.getComputedStyle(obstacle, null).getPropertyValue("left");
    oy = window.getComputedStyle(obstacle, null).getPropertyValue("top");
    
    ofsetX = Math.abs(dx-ox);
    ofsetY = Math.abs(dy-oy);

    if(ofsetX < 93 && ofsetY < 52) 
}, 100);

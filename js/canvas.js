const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

class User {
    constructor(x, y, isJump, attack){
        this.x = x;
        this.y = y;
        this.isJump = isJump;
        this.attack = attack;
    }
}

const user = new User(80, 700, false, false);

const setUser = () => {
  ctx.clearRect(0, 0, 3000, 3000)
  ctx.fillStyle = "red";
  ctx.fillRect(user.x, user.y, 100, 100);
  if(user.isJump === true){
    user.y -= 8;
    if(user.y <= 300){
        user.isJump = false;
    }
  }
  if(user.y < 700 && user.isJump === false){
    user.y += 8;
  }  
}

const frameLoop = () => {
  setUser();
  console.log(user.isJump);
  requestAnimationFrame(frameLoop);
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    user.isJump = true;
  }
});


















canvas.addEventListener("click", (e) => {
  console.log(e);
});
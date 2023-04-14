const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

class User {  
    constructor(x, y, isJump, isAttack, keyStack){
        this.x = x;  
        this.y = y; 
        this.isJump = isJump; 
        this.isAttack = isAttack; 
        this.keyStack = keyStack; 
    }
}   

class Fire extends User {
  constructor(x, y, isJump, isAttack, keyStack, fx, isConflict) {
    super(x, y, isAttack);
    this.isJump = isJump;
    this.keyStack = keyStack;
    this.fx = fx;
    this.isConflict = isConflict;
  };
};

class SmallBlock {  
  constructor(x, y){
    this.x = x;
    this.y = y;
  };
};

class BigBlock {
  constructor(x, y, hp){
    this.x = x;
    this.y = y;
    this.hp = hp;
  }
}

let frameCount = 1;

const user = new User(80, 600, false, false, 2);  
const attackList = [];
const smallBlocksList = [];
const bigBlocksList = [];

const getRadian = (d) => {
  return d * (180 / Math.PI);
};

const user1 = new Image();
user1.src = "../img/user01.png";
user1.onload = () => {
  setUser();
};
const user2 = new Image();
user2.src = "../img/user02.png";
user2.onload = () => {
  setUser();
};

const user3 = new Image();
user3.src = "../img/user02.png";
user3.onload = () => {
  setUser();
};


const setUser = () => {
    ctx.drawImage(user1, user.x, user.y, 150, 200);
    if(frameCount % 2 === 0){
      ctx.clearRect(user.x,user.y,150,200);
      ctx.drawImage(user2, user.x, user.y, 150, 200);
    }
    else if(frameCount % 3 === 0){
      ctx.clearRect(user.x, user.y, 150, 200);
      ctx.drawImage(user3, user.x, user.y, 150, 200);
    }
    if (user.isJump === true) {
      user.y -= 8;
      if (user.y <= 300) {
        user.isJump = false;
      }
    }

  if(user.y < 600 && user.isJump === false){ 
    user.y += 8; 
  }
}

const fireBall = new Image();
fireBall.src = '../img/fireball.png';
fireBall.onload = () => {
  setAttack();
};

const setAttack = () => {
  attackList.forEach(item => {
    ctx.beginPath();
    ctx.drawImage(fireBall, item.fx, item.y + 56, 100, 50);
    item.fx += 20;
  })
}


const mushRoom = new Image();
mushRoom.src = "../img/mushroom.png";
mushRoom.onload = () => {
  setBlocks();
};

const setBlocks = () => {
  smallBlocksList.forEach(block => {
    ctx.drawImage(mushRoom, block.x, block.y - 30, 80, 130);
    block.x -= 4;
  });
}

const bigmushRoom = new Image();
bigmushRoom.src = "../img/bigmushroom.png";
bigmushRoom.onload = () => {
  setBigBlocks();
};

const setBigBlocks = () => {
  bigBlocksList.forEach(block => {
    ctx.drawImage(bigmushRoom, block.x, block.y - 30, 300, 450);
    block.x -= 0.3;
    console.log(block.x);
  })
}

let spaceCount = 0;

const frameLoop = () => {  
  ctx.clearRect(0, 0, 3000, 3000); 
  setBigBlocks();
  setBlocks();
  setUser(); 
  setAttack();

  if(user.y >= 600 && spaceCount == 2){
    spaceCount = 0;
  }
  if(frameCount % 300 === 0){
    const blocks = new SmallBlock(1200, 700);
    smallBlocksList.push(blocks);
  }

  if(frameCount % 5000 === 0) {
    const blocks = new BigBlock(1200, 350, 2000);
    bigBlocksList.push(blocks);
  }


  frameCount++;
  requestAnimationFrame(frameLoop); 
};



 
//스페이스키
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!user.isJump && spaceCount < user.keyStack) {
      user.isJump = true; 
      spaceCount++; 
      console.log(spaceCount);
    }
  }
});

//컨트롤 키
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    const fire = new Fire(80, user.y, false, false, 0, 210, false);
    attackList.push(fire);
    console.log(attackList);
  }
});


canvas.addEventListener("click", (e) => {
  console.log(e.offsetX, e.offsetY);
});
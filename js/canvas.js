const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

class User {  //유저 클래스 정의
    constructor(x, y, isJump, isAttack, keyStack){
        this.x = x;  //캔버스 x좌표 값
        this.y = y;  //캔버스
        this.isJump = isJump; //스페이스바 키 다운 여부
        this.isAttack = isAttack; // 컨트롤키 다운 여부.
        this.keyStack = keyStack; //스페이스바 키 몇번눌렀는지 카운트
    }
}    //이게 캔버스 width랑 height를 정의해놓고 css로 건드려놔서 실제 좌표랑 달러. 그래서 아까 클릭이벤트로 좌표값 찍어본거야 ..ㅠㅠ

class Fire extends User {
  constructor(x, y, isJump, isAttack, keyStack, fx, isConflict) {
    super(x,y, isAttack);
    this.isJump = isJump;
    this.keyStack = keyStack;
    this.fx = fx;
    this.isConflict = isConflict;
  };
};

class SmallBlock {  //작은 장애물 
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


const user = new User(80, 605, false, false, 2);  // 유저 인스턴스 생성, (초기 x값, 초기 y값, 점프키 누름 여부, 컨트롤키 누름여부, 스페이스바 키 스택 초기값 == 0)
const attackList = [];
const smallBlocksList = [];
const bigBlocksList = [];

const getRadian = (d) => {
  return (d * 180) / Math.PI;
};

const userImage = new Image();
userImage.src = "../img/user.png";
userImage.onload = () => {
  // 이미지가 로드된 후 실행되는 함수
  setUser();
};

const setUser = () => {
  ctx.clearRect(0, 0, 3000, 3000) // 매 프레임 재귀 돌때마다 캔버스 지움
  ctx.drawImage(userImage, user.x, user.y, 150, 200);

//   ctx.fillStyle = "red";
//   ctx.fillRect(user.x, user.y, 100, 100); // 용용이 히트박스  
    if (user.isJump === true) {
      // 스페이스바키 눌러서 isjump true일 시 점프함. 매 프레임마다 8 픽셀씩 위로 올라감. 한마디로 점프속도
      user.y -= 8;
      if (user.y <= 300) {
        // 만약 용용이 y좌표가 300 이하면 isjump false로 바꿔서 더이상 안올라가게 하는거. 
        user.isJump = false;
      }
    }

  if(user.y < 605 && user.isJump === false){ // 용용이가 땅바닥 위에 있고 isJump 가 false면은 용용이 내려감. 근데 이제 700 이하로 계속 떨어지기 때문에 첫번째 조건에서 걸려서 땅바닥에 착지하면 더이상 안내려가는거양 
    user.y += 8; //여기서 +8을 계속 해주고 있자나
  }
}

const fireBall = new Image();
fireBall.src = '../img/fireball.png';
fireBall.onload = () => {
  // 이미지가 로드된 후 실행되는 함수
  setAttack();
};

const setAttack = () => {
  ctx.fillStyle = "red";
  attackList.forEach(item => {
    ctx.beginPath();
    ctx.drawImage(fireBall, item.fx, item.y + 56, 50, 50);
    // ctx.arc(item.fx, item.y + 56, 15, 0, getRadian(360), false);
    // ctx.fill();
    item.fx += 9;
  })
}

const setBlocks = () => {
  smallBlocksList.forEach(block => {
    ctx.fillStyle = "red";
    ctx.fillRect(block.x, block.y, 80, 130);
    block.x -= 4;
  });
}

const setBigBlocks = () => {
  bigBlocksList.forEach(block => {
    ctx.fillStyle = "blue";
    ctx.fillRect(block.x, block.y, 300, 450);
    block.x -= 0.3;
  })
}

let frameCount = 1;
let spaceCount = 0;

const frameLoop = () => {  //requestAnimationFrame 재귀함수
  setUser(); //용용이 초기세팅.
  setAttack();

  if(user.y >= 605 && spaceCount == 2){
    spaceCount = 0;
  }
  if(frameCount % 300 === 0){
    const blocks = new SmallBlock(1200, 700);
    smallBlocksList.push(blocks);
  }

  if(frameCount % 2000 === 0) {
    const blocks = new BigBlock(1200, 350, 2000);
    bigBlocksList.push(blocks);
  }
  setBlocks();
  setBigBlocks();

  frameCount++;
  requestAnimationFrame(frameLoop); // 프레임 재귀
};



 
//스페이스키
    document.addEventListener("keydown", (e) => {
     if (e.code === "Space") {
       e.preventDefault();
       if (!user.isJump && spaceCount < user.keyStack) {
         user.isJump = true; // 스페이스바 키 누르면 용용이 isJump true
         spaceCount++; // 스페이스바 키 누를때마다 용용이 키스택 증가
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
const playBtn = document.querySelector(".play-button");
const optionsBtn = document.querySelector(".options-button");

const changeTogamePage = () => {
    const canvas = document.querySelector('.canvas');
    const intro = document.querySelector("#intro");
    const game = document.querySelector("#game");
    intro.style.display = "none";
    game.style.display = "block";
    canvas.classList.add('on');
    if (canvas.classList.contains("on")) {
      frameLoop(); //이거 canvas.js에서 frameLoop << (requestAnimationframe 재귀함수) 함수 전역 선언해놔서 가져올수 있는거양 
    }
}

const mouseOver = (e) => {
    let buttonClass = e.target;
    buttonClass.classList.add('on');
}

const mouseOut = (e) =>{
    let buttonClass = e.target;
    buttonClass.classList.remove("on");
}

playBtn.addEventListener("click", changeTogamePage);
playBtn.addEventListener('mouseover', mouseOver);
playBtn.addEventListener('mouseout', mouseOut);

optionsBtn.addEventListener('mouseover', mouseOver);
optionsBtn.addEventListener("mouseout", mouseOut);

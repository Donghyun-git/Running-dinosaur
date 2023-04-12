const playBtn = document.querySelector(".play-button");
const optionsBtn = document.querySelector(".options-button");


const mouseOver = (e) => {
    let buttonClass = e.target;
    buttonClass.classList.add('on');
}

const mouseOut = (e) =>{
    let buttonClass = e.target;
    buttonClass.classList.remove("on");
}

playBtn.addEventListener('mouseover', mouseOver);
playBtn.addEventListener('mouseout', mouseOut);

optionsBtn.addEventListener('mouseover', mouseOver);
optionsBtn.addEventListener("mouseout", mouseOut);

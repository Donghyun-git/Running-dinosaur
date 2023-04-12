const playBtn = document.querySelector(".play-button");
const optionsBtn = document.querySelector(".options-button");


const mouseOver = (e) => {
    let buttonClass = e.target;
    buttonClass.style.color="#000";
    buttonClass.style.boxShadow = "0 0 0 white";
    buttonClass.classList.add('on');
}

const mouseOut = (e) =>{
    let buttonClass = e.target;
    buttonClass.style.color = "#fff";
    buttonClass.style.boxShadow = "4px 4px 1px brown";
    buttonClass.classList.remove("on");
}

playBtn.addEventListener('mouseover', mouseOver);
playBtn.addEventListener('mouseout', mouseOut);

optionsBtn.addEventListener('mouseover', mouseOver);
optionsBtn.addEventListener("mouseout", mouseOut);


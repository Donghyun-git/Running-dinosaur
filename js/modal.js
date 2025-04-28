const optionsModal = document.querySelector('#modal');
const optionsButton = document.querySelector('.options-button');
const closeButton = document.querySelector(".modal-close");



const openModal = () => {
    optionsModal.style.display = "block";
};

optionsButton.addEventListener("click", openModal);



const closeModal = () => {
    optionsModal.style.display = "none";
};

closeButton.addEventListener("click", closeModal);






// make functional select options
const optionMenu = document.querySelector('.select-menu');
const selectBtn = document.querySelector('.select-btn');
const options= document.querySelectorAll('.option');
const sBtn_text = document.querySelector('.sBtn-text');


selectBtn.addEventListener("click", () => {
  optionMenu.classList.toggle("active")
})

options.forEach((option) => {
  option.addEventListener('click', () => {
    cardContainer.innerHTML = "";
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption
    option.classList.add(selectedOption)

    // optionMenu.classList.remove('active')
    // call function to fetch data based on type
    getPokeTypes(selectedOption)
  })
})

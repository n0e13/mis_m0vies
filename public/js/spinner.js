const spinner = document.querySelector(".lds-roller");
const form = document.querySelector(".searchForm")

form.addEventListener("submit", () => {
    spinner.style.display = "inline-block";
})

let editButton = document.querySelector(".edit");
let saveButton = document.querySelector(".save");
let form = document.querySelector("#form");

form.style.display = "none";

editButton.addEventListener("click", () => {
    form.style.display = "block"     
    console.log("clicked");
});

saveButton.addEventListener("click", () => {
    form.display = "none"
});

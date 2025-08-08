import { Item } from "item.js";

const addBtn = document.getElementById("addBtn");

function getUserInput() {
    const title = document.querySelectorAll(".app-from input");
    console.log(title);
}

addBtn.addEventListener(onclick, getUserInput);
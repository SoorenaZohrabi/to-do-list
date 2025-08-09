import { Item } from "./item.js";

const addBtn = document.getElementById("addBtn");
const tabButtons = document.querySelectorAll(".app-tabs .tab .tablinks");

async function logAllItems() {
    const dbRequest = indexedDB.open("ItemDB");

    dbRequest.onsuccess = function () {
        const db = dbRequest.result;
        const tx = db.transaction("items", "readonly");
        const store = tx.objectStore("items");

        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = function () {
            console.log("Stored Items:", getAllRequest.result);
        };

        getAllRequest.onerror = function () {
            console.error("Failed to read items");
        };
    };
}

function getUserInput() {
    const title = document.querySelector(".app-form #text").value;
    const date = document.querySelector(".app-form #date").value;
    const bgColor = document.querySelector(".app-form #bgcolor").value;
    if (title.trim() === "" || date.trim() === "") {
        alert("invalid");
        return;
    }
    const id = (Math.floor(Math.random() * 900000) + 100000).toString();
    const time = date.slice(11, 16);
    const ndate = date.slice(0, 12);
    saveItem(id, title, ndate, bgColor, time);
}

async function saveItem(id, title, date, bgColor, time) {
    const item = new Item(id, "Active", title, date, time, bgColor);
    await item.save();
}

async function renderItemsByStatus(status = "All") {
    const tabContentList = document.querySelector(".tabcontent .tabContentList");
    tabContentList.innerHTML = ""; // Clear previous items

    const db = await Item._openDB();
    const tx = db.transaction("items", "readonly");
    const store = tx.objectStore("items");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = async function () {
        const allItems = getAllRequest.result;

        for (const data of allItems) {
            if (status === "All" || data.status === status) {
                const item = new Item(data.id, data.status, data.title, data.date, data.time, data.bgColor);
                tabContentList.appendChild(item.render());
            }
        }

        db.close();
    };

    getAllRequest.onerror = function () {
        console.error("Failed to read items");
        db.close();
    };
}

window.addEventListener("DOMContentLoaded", () => {
    renderItemsByStatus("All");
});

addBtn.addEventListener('click', getUserInput.bind(this));
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.id === "Compelted" ? "Completed" : button.id;
        renderItemsByStatus(status);
    });
});

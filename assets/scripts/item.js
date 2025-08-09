export class Item {
    constructor(id, status = "Active", title, date, time, bgColor) {
        this._id = id;
        this._status = status;
        this._title = title;
        this._date = date;
        this._time = time;
        this._bgColor = bgColor;
    }

    // Getters
    get id() { return this._id; }
    get status() { return this._status; }
    get title() { return this._title; }
    get date() { return this._date; }
    get time() { return this._time; }
    get bgColor() { return this._bgColor; }

    // Setters
    set id(id) { this._id = id; }
    set status(status) { this._status = status; }
    set title(title) { this._title = title; }
    set date(date) { this._date = date; }
    set time(time) { this._time = time; }
    set bgColor(bgColor) { this._bgColor = bgColor; }

    // 🔧 Internal DB setup
    static async _openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("ItemDB", 1);

            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                db.createObjectStore("items", { keyPath: "id" });
            };

            request.onsuccess = function (event) {
                resolve(event.target.result);
            };

            request.onerror = function (event) {
                reject("Database error: " + event.target.errorCode);
            };
        });
    }

    // 💾 Save this item to IndexedDB
    async save() {
        const db = await Item._openDB();
        const tx = db.transaction("items", "readwrite");
        const store = tx.objectStore("items");

        const data = {
            id: this._id,
            status: this.status,
            title: this._title,
            date: this._date,
            time: this._time,
            bgColor: this._bgColor
        };

        store.put(data);
        await tx.complete;
        db.close();
    }

    // 🔄 Load an item by ID and return an instance
    static async load(id) {
        const db = await Item._openDB();
        const tx = db.transaction("items", "readonly");
        const store = tx.objectStore("items");

        const request = store.get(id);

        return new Promise((resolve, reject) => {
            request.onsuccess = function () {
                const data = request.result;
                db.close();
                if (data) {
                    resolve(new Item(data.id, data.status, data.title, data.date, data.time, data.bgColor));
                } else {
                    resolve(null);
                }
            };

            request.onerror = function () {
                db.close();
                reject("Failed to load item");
            };
        });
    }

    // 🗑️ Delete this item from IndexedDB
    async delete() {
        const db = await Item._openDB();
        const tx = db.transaction("items", "readwrite");
        const store = tx.objectStore("items");

        store.delete(this._id);
        await tx.complete;
        db.close();
    }

    // 🖼️ Render this item as an HTML element
    render() {
        const container = document.createElement("div");
        container.className = "item";
        container.id = this._id;
        container.style.backgroundColor = this._bgColor;

        // Status icon
        const statusIcon = document.createElement("div");
        statusIcon.className = "fas fa-spinner";
        statusIcon.id = this._status;
        container.appendChild(statusIcon);

        // Title
        const titleDiv = document.createElement("div");
        titleDiv.id = "title";
        titleDiv.textContent = this._title;
        container.appendChild(titleDiv);

        // Date
        const dateDiv = document.createElement("div");
        dateDiv.id = "date";
        dateDiv.textContent = this._date;
        container.appendChild(dateDiv);

        // Time
        const timeDiv = document.createElement("div");
        timeDiv.id = "time";
        timeDiv.textContent = this._time;
        container.appendChild(timeDiv);

        // Delete button
        const deleteBtn = document.createElement("div");
        deleteBtn.className = "fas fa-trash-alt";
        deleteBtn.id = "deleteBtn";
        deleteBtn.style.cursor = "pointer";

        // Optional: attach delete functionality
        deleteBtn.addEventListener("click", async () => {
            await this.delete();
            container.remove();
        });

        container.appendChild(deleteBtn);

        return container;
    }

    render() {
        const container = document.createElement("div");
        container.className = "item";
        container.id = this._id;
        container.style.backgroundColor = this._bgColor;

        // 🔄 Status icon with toggle functionality
        const statusIcon = document.createElement("div");
        statusIcon.className = this._status === "Completed" ? "fas fa-check-circle" : "fas fa-spinner";
        statusIcon.id = "statusIcon";
        statusIcon.style.cursor = "pointer";
        statusIcon.title = "Click to toggle status";

        // 🎨 Set icon color based on status
        statusIcon.style.color = this._status === "Completed" ? "green" : "orange";

        statusIcon.addEventListener("click", async () => {
            this.status = this._status === "Completed" ? "Active" : "Completed";
            await this.save();
            const updated = this.render();
            container.replaceWith(updated);
        });

        container.appendChild(statusIcon);

        // Title
        const titleDiv = document.createElement("div");
        titleDiv.id = "title";
        titleDiv.textContent = this._title;
        container.appendChild(titleDiv);

        // Date
        const dateDiv = document.createElement("div");
        dateDiv.id = "date";
        dateDiv.textContent = this._date;
        container.appendChild(dateDiv);

        // Time
        const timeDiv = document.createElement("div");
        timeDiv.id = "time";
        timeDiv.textContent = this._time;
        container.appendChild(timeDiv);

        // 🗑️ Delete button
        const deleteBtn = document.createElement("div");
        deleteBtn.className = "fas fa-trash-alt";
        deleteBtn.id = "deleteBtn";
        deleteBtn.style.cursor = "pointer";

        deleteBtn.addEventListener("click", async () => {
            await this.delete();
            container.remove();
        });

        container.appendChild(deleteBtn);

        return container;
    }
}

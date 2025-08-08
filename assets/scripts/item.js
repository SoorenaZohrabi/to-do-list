export class Item {
    constructor(id, title, date, time, bgColor) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
        this.bgColor = bgColor;
    }

    get id() {
        return this.id;
    }

    get title() {
        return this.title;
    }

    get date() {
        return this.date;
    }

    get time() {
        return this.time;
    }

    get bgColor() {
        return this.bgColor;
    }

    set id(id) {
        this.id = id;
    }

    set title(title) {
        this.title = title;
    }

    set date(date) {
        this.date = date;
    }

    set time(time) {
        this.time = time;
    }

    set bgColor(bgColor) {
        this.bgColor = bgColor;
    }
}
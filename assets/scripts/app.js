const lists = [];

function openCity(evt, prp) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(prp).style.display = "block";
    evt.currentTarget.className += " active";
}

const addLi = (color, title, date) => {
    const newLi = document.createElement("li");
    newLi.className = 'cnt-box';
    newLi.innerHTML = `
    <li class="cnt-box" style="background-color:${color};">
        <i class="fa fa-check-square" style="font-size:2rem;color:green"></i>
        <span class="cnt-box-evt"></span>
        <p id="title">${title}</p>
        <p id="date">${date}</p>
    </li>
    `;
    const ul = document.getElementsByClassName('cnt');
    ul[0].append(newLi);
}

const addLiHandler = () => {
    const titleValue = document.querySelector("input[type=text]").value;
    const dateValue = document.querySelector("input[type=datetime-local]").value;
    const colorValue = document.querySelector("input[type=color]").value;

    const newLi = {
        title: titleValue,
        date: dateValue,
        color: colorValue
    };

    lists.push(newLi);
    console.log(dateValue);

    addLi(
        newLi.color,
        newLi.title,
        newLi.date,
    );
};

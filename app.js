// const taskList = document.getElementById('task-list');
// const addButton = document.getElementById('add-button');
// const sortButton = document.getElementById('sort-button');
// let isAscending = true;

// function createTaskItem() {
//   const li = document.createElement('li');
//   li.innerHTML = `
//     <input type="text" class="task-input">
//     <button class="delete-button">X</button>
//   `;
//   taskList.appendChild(li);

//   const deleteButton = li.querySelector('.delete-button');
//   deleteButton.addEventListener('click', () => {
//     li.remove();
//   });
// }

// addButton.addEventListener('click', createTaskItem);

// sortButton.addEventListener('click', () => {
//   const items = Array.from(taskList.querySelectorAll('li'));
//   items.sort((a, b) => {
//     const textA = a.querySelector('input').value.toUpperCase();
//     const textB = b.querySelector('input').value.toUpperCase();
//     return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
//   });
//   taskList.append(...items);
//   isAscending = !isAscending;
// });

// createTaskItem(); // Создаем первый элемент списка


const btnAdd = document.querySelector(".btn-add");
const inputs = document.querySelector(".inputs");
const inputItems = document.querySelectorAll(".container input");
const btnSort = document.querySelector(".btn-sort__down");
const done = document.getElementById("done");
const btnDones = document.querySelectorAll(".btn-done");
const hints = [document.querySelector(".hint-mobile"), document.querySelector(".hint-desktop")];
const btnDelete = document.querySelectorAll(".btn-delete");

let flag = 1, flagSort = true, id = 1;


btnAdd.addEventListener("click", createInput);
btnSort.addEventListener("click", sort);
btnSort.addEventListener("mouseover", () => hoverEffectSortBtn(true));
btnSort.addEventListener("mouseout", () => hoverEffectSortBtn(false));
btnDones.forEach(item => item.addEventListener("click", dragMobile));

function createInput() {
    const lastInput = inputItems[inputItems.length - 1];
    if (lastInput.value.trim() === "") {
        showPopup("This field is empty");
        return;
    }
    if (flag < 5) {
        flag++;
        id++;
        create();
    } else {
        showPopup("List is full");
    }
}

function create() {
    const html = `<div class="inputs__item draggable" draggable="true" ondragstart="drag(event)" ondragend="dragEnd(event)">
                    <button class="btn-done"><i class="fas fa-plus-square"></i></button>
                    <div class="btn-delete cross"> 🞡 </div>
                    <input type="text" />
                  </div>`;
    inputs.insertAdjacentHTML("beforeend", html);
    updateDeleteButtons();
}

function sort() {
    const dataBaza = Array.from(inputItems).map(input => input.value.trim()).filter(Boolean);
    if (dataBaza.length === 0) create();
    flag = inputItems.length;

    dataBaza.sort(flagSort ? undefined : (a, b) => b.localeCompare(a));
    inputItems.forEach((input, i) => {
        if (input.value.trim()) input.value = dataBaza[i] || '';
    });
    btnSort.src = `img/btn-${flagSort ? 'up' : 'down'}.png`;
    flagSort = !flagSort;
}

function deleteInput() {
    if (flag > 1) {
        this.parentElement.remove();
        flag--;
    }
}

function showPopup(message) {
    const html = `<div class="popup"><span class="popuptext show">${message}</span></div>`;
    inputs.insertAdjacentHTML("beforeend", html);
    setTimeout(() => document.querySelector(".popup").remove(), 1500);
}

function drag(e) {
    e.currentTarget.classList.add("dragging");
}

function dragEnd(e) {
    e.currentTarget.classList.remove("dragging");
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    const draggable = document.querySelector(".dragging");
    if (draggable.querySelector("input").value.trim() && done.children.length < 10) {
        const btn = draggable.querySelector(".btn-delete");
        draggable.querySelector("input").disabled = true;
        btn.removeEventListener("click", deleteInput);
        btn.classList.replace("btn-delete", "btn2-delete");
        btn.addEventListener("click", deleteInput);
        done.appendChild(draggable);
        hints.forEach(hint => hint.remove());
        if (!inputs.children.length) create();
    } else {
        showPopup(done.children.length === 10 ? "List is full" : "This field is empty");
    }
}

function hoverEffectSortBtn(isHover) {
    btnSort.src = `img/btn-${flagSort ? (isHover ? 'down-hover' : 'down') : (isHover ? 'up-hover' : 'up')}.png`;
}

function dragMobile(e) {
    drag(e);
    allowDrop(e);
    drop(e);
    dragEnd(e);
}

function updateDeleteButtons() {
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", deleteInput);
    });
}

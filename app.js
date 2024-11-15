let btndown = document.querySelector(".down");
let blackdown = document.querySelector(".blackdown");
let greyup = document.querySelector(".greyup");
let blackup = document.querySelector(".blackup");
let order = document.querySelector("ol");
let right = document.querySelector(".right");
let left = document.querySelector(".left");
let input = document.querySelector("input");
let inp = document.querySelector(".inp");
let btn = document.querySelector(".cross1");
let btnsort = document.querySelector(".btn-sort");

order.style.display = "none"


right.addEventListener("click", () => {
    let c = input.value.trim();
    if (c != '') {
        order.style.display = "block";
        inp.style.display = "none";
        btn.style.display = "none";
        let lists = document.createElement("li");
        lists.style.marginBottom = "10px";
        lists.className = "lists";
        // lists.textContent = c;
        input.value = '';
        order.appendChild(lists);
        let span = document.createElement("span");
        span.textContent = c;
        lists.appendChild(span);
        let cross = document.createElement("span");
        cross.className = "cross2";
        cross.textContent = "🞡";
        lists.appendChild(cross);

        cross.addEventListener("click", () => {
            order.removeChild(lists);
            if (order.children.length === 0) {
                order.style.display = "none"
                inp.style.display = "flex";
                btn.style.display = "flex";
            }
        });
    }

})
left.addEventListener("click", () => {
    inp.style.display = "flex";
    btn.style.display = "flex";
})

btn.addEventListener("click", () => {
    input.value = '';
});

btndown.addEventListener('mouseenter', () => {
    btndown.classList.add('disnone');
    blackdown.classList.remove('disnone');
    greyup.classList.add('disnone');
})
btndown.addEventListener('mouseleave', () => {
    btndown.classList.remove('disnone');
    blackdown.classList.add('disnone');
})
greyup.addEventListener('mouseover', () => {
    greyup.classList.add('disnone');
    blackup.classList.remove('disnone');
})
blackup.addEventListener('mouseout', () => {
    greyup.classList.remove('disnone');
    blackup.classList.add('disnone');
})
blackdown.addEventListener('click', () => {
    btndown.classList.add('disnone');
    blackdown.classList.add('disnone');
    blackup.classList.remove('disnone');
})
blackup.addEventListener('click', () => {
    blackup.classList.add('disnone');
    btndown.classList.remove('disnone');
})


function sortListAscending() {
    let items = Array.from(order.children);
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    order.textContent = ''; // Clear the list
    items.forEach(item => order.appendChild(item)); // Append sorted items
}


function sortListDescending() {
    let items = Array.from(order.children);
    items.sort((a, b) => b.textContent.localeCompare(a.textContent));
    order.textContent = ''; // Clear the list
    items.forEach(item => order.appendChild(item)); // Append sorted items
}

blackdown.addEventListener('click', () => {
    sortListDescending(); // Z to A
    btndown.classList.add('disnone');
    blackdown.classList.add('disnone');
    blackup.classList.remove('disnone');
});

blackup.addEventListener('click', () => {
    sortListAscending(); //  A to Z
    blackup.classList.add('disnone');
    btndown.classList.remove('disnone');
});

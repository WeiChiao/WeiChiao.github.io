document.querySelector('#edit_btn').setAttribute('hidden', true);
document.querySelector('#save_btn').setAttribute('hidden', true);
document.querySelector('#delete_btn').setAttribute('hidden', true);
document.querySelector('#add_btn').setAttribute('hidden', true);
document.querySelector('#add_todolist').onclick = () => {
    document.querySelector('#add_btn').removeAttribute('hidden');
    document.querySelector('#edit_btn').setAttribute('hidden', 'true');
    document.querySelector('#save_btn').setAttribute('hidden', 'true');
    document.querySelector('#delete_btn').setAttribute('hidden', 'true');
    input_remove_disabled();
}
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const leap_year = (year) => (year % 4 == 0 && year % 100 !== 0) || (year % 400 == 0);
const is_leap_month = (year) => (leap_year(year)) ? 29 : 28;
const calendar = document.querySelector('.calendar');
const el_month = calendar.querySelector('.month');
const new_calendar = (month, year) => {
    const el_date = calendar.querySelector('.date');
    const el_year = calendar.querySelector('.year');
    const dates_in_month = [31, is_leap_month(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    el_date.innerHTML = '';
    const today = new Date();
    if (month == undefined) { month = today.getMonth(); }
    if (year == undefined) { year = today.getFullYear(); }
    const this_month = `${months[month]}`;
    el_month.innerHTML = this_month;
    el_year.innerHTML = year;
    const first_day = new Date(year, month, 1)
    for (let i = 0; i <= dates_in_month[month] + first_day.getDay() - 1; i++) {
        const new_date = document.createElement('div');
        if (i >= first_day.getDay()) {
            new_date.classList.add('choose_date');
            new_date.setAttribute('data-bs-toggle', 'modal');
            new_date.setAttribute('data-bs-target', '#staticBackdrop');
            const day = i - first_day.getDay() + 1;
            const monthFormatted = (month + 1).toString().padStart(2, '0');
            const dayFormatted = day.toString().padStart(2, '0');
            new_date.setAttribute('id', `${year}-${monthFormatted}-${dayFormatted}`);
            new_date.onclick = (event) => {
                if (!event.target.closest('li')) {
                    date_input.value = "";
                    time_input.value = "";
                    todo_input.value = "";
                    place_input.value = "";
                    ColorInput.value = "#563d7c";
                    input_remove_disabled();
                    document.querySelector('#add_btn').removeAttribute('hidden');
                    document.querySelector('#edit_btn').setAttribute('hidden', true);
                    document.querySelector('#save_btn').setAttribute('hidden', true); document.querySelector('#delete_btn').setAttribute('hidden', true);
                }
            };
            new_date.textContent = i - first_day.getDay() + 1;
            new_date.innerHTML += `
            <ul data-id="${new_date.id}"></ul>
            <span></span>
            `
            if (i - first_day.getDay() + 1 === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                new_date.classList.add('today')
            };
        }
        el_date.appendChild(new_date);
    }
}
document.querySelectorAll("li").onclick = () => {
    document.querySelector('#add_btn').setAttribute('hidden', true);
}
const month_list = calendar.querySelector('.month_list');
months.forEach((m, index) => {
    const month_div = document.createElement('div');
    month_div.classList.add("month_div");
    month_div.innerHTML = `<div class="month_name" data_month="${index}">${m}</div>`
    month_div.querySelector("div").onclick = () => {
        month_list.classList.remove("show");
        this_month = index;
        new_calendar(index, this_year);
        renderingTodoList();
    }
    month_list.appendChild(month_div);
})
let isMonthListShow = false;
el_month.onclick = () => {
    if (isMonthListShow) {
        month_list.classList.add('show');
    }
    else {
        month_list.classList.remove('show');
    }
    isMonthListShow = !isMonthListShow;
}
const currDate = new Date();
let this_month = currDate.getMonth();
let this_year = currDate.getFullYear();
new_calendar(this_month, this_year)
const find_now = document.querySelector("#now");
find_now.onclick = () => {
    const currDate = new Date();
    let this_month = currDate.getMonth();
    let this_year = currDate.getFullYear();
    new_calendar(this_month, this_year)
    renderingTodoList();
}
const hb_has_nothing = document.querySelector(".calendar_hb")
hb_has_nothing.onclick = () => {
    alert("只是個裝飾🍔")
}
document.querySelector('#pre_year').onclick = () => {
    this_year -= 1;
    new_calendar(this_month, this_year)
    renderingTodoList();
}
document.querySelector('#nex_year').onclick = () => {
    this_year += 1;
    new_calendar(this_month, this_year)
    renderingTodoList();
}

document.querySelector('#pre_month').onclick = () => {
    this_month -= 1;
    if (this_month < 0) {
        this_month = 11;
        this_year -= 1;
    }
    new_calendar(this_month, this_year)
    renderingTodoList();
}
document.querySelector('#nex_month').onclick = () => {
    this_month += 1;
    if (this_month > 11) {
        this_month = 0;
        this_year += 1;
    }
    new_calendar(this_month, this_year)
    renderingTodoList();
}
const date_input = document.querySelector("#date_input");
const time_input = document.querySelector("#time_input");
const todo_input = document.querySelector("#todo_input");
const place_input = document.querySelector("#place_input");
const ColorInput = document.querySelector("#ColorInput");
const addButton = document.querySelector("#add_btn");
const key = "MyCalendarTodoList";
window.addEventListener("load", function (event) {
    renderingTodoList();
});
addButton.addEventListener("click", function (event) {
    event.preventDefault();
    const { date_Content, todo_Content, time_Content, place_Content, color_Content } = get_input_value();
    const todoItem = {
        id: new Date().valueOf(),
        date: date_Content,
        time: time_Content,
        todo: todo_Content,
        place: place_Content,
        color: color_Content,
    };
    function saveTodoListToStorage(todoList) {
        const json = JSON.stringify(todoList);
        localStorage.setItem(key, json);
    }

    function saveTodoItem(todoItem) {
        const todoList = getTodoListFromStorage() || [];
        todoList.push(todoItem);
        saveTodoListToStorage(todoList);
        renderingTodoList();
    }

    if (!date_input.value) {
        alert("日期為必填");
    };
    if (!todo_input.value.trim()) {
        alert("待辦事項為必填");

    }
    else { saveTodoItem(todoItem); }
    renderingTodoList();
    date_input.value = "";
    time_input.value = "";
    todo_input.value = "";
    place_input.value = "";
    ColorInput.value = "#563d7c";
})
function input_remove_disabled() {
    document.querySelector('#date_input').removeAttribute('disabled');
    document.querySelector('#time_input').removeAttribute('disabled');
    document.querySelector('#todo_input').removeAttribute('disabled');
    document.querySelector('#place_input').removeAttribute('disabled');
    document.querySelector('#ColorInput').removeAttribute('disabled');
}
function saveTodoListToStorage(todoList) {
    const json = JSON.stringify(todoList);
    localStorage.setItem(key, json);
}

function saveTodoItem(todoItem) {
    const todoList = getTodoListFromStorage() || [];
    todoList.push(todoItem);
    saveTodoListToStorage(todoList);
    renderingTodoList();
}
function renderingTodoList() {
    const todoList = getTodoListFromStorage();
    document.querySelectorAll('.choose_date ul').forEach(ul => ul.innerHTML = "");
    todoList.forEach((item) => {
        const divElement = document.querySelector(`.choose_date[id="${item.date}"]`);
        if (!divElement) {
            console.log(`Element with id="${item.date}" not found.`);
            return;
        }
        const ul = divElement.querySelector('ul');
        if (!ul) {
            console.log(`No <ul> element found inside element with id="${item.date}".`);
            return; 事项
        }
        const todoItemHTML = createTodoItemHTML(item);
        const listItem = document.createElement('li');
        listItem.classList.add("todoList_li");
        listItem.setAttribute('id', item.id);
        listItem.setAttribute('data-bs-toggle', 'modal');
        listItem.setAttribute('data-bs-target', '#staticBackdrop');
        listItem.style.borderLeft = `4px solid ${item.color}`;
        listItem.innerHTML = todoItemHTML;
        ul.appendChild(listItem);
        listItem.onclick = (event) => {
            event.stopPropagation();
            document.querySelector('#add_btn').setAttribute('hidden', true);
            const id = listItem.getAttribute('id');
            const todoList = getTodoListFromStorage();
            const todoItem = todoList.find(item => item.id == id);
            document.querySelector('#date_input').value = todoItem.date;
            document.querySelector('#time_input').value = todoItem.time;
            document.querySelector('#todo_input').value = todoItem.todo;
            document.querySelector('#place_input').value = todoItem.place;
            document.querySelector('#ColorInput').value = todoItem.color;

            document.querySelector('#date_input').setAttribute('disabled', 'true');
            document.querySelector('#time_input').setAttribute('disabled', 'true');
            document.querySelector('#todo_input').setAttribute('disabled', 'true');
            document.querySelector('#place_input').setAttribute('disabled', 'true');
            document.querySelector('#ColorInput').setAttribute('disabled', 'true');

            edit_and_delete_btn();

            document.querySelector('#delete_btn').setAttribute('data-id', item.id);
             document.querySelector('#save_btn').setAttribute('data_save', item.id);

        }

    });
}

document.querySelector('#delete_btn').onclick = () => {
    const id = document.querySelector('#delete_btn').getAttribute('data-id');
    remove(id);
};

function remove(id) {
    const todoList = getTodoListFromStorage();
    const todoItemIdx = todoList.findIndex((item) => item.id === id);
    todoList.splice(todoItemIdx, 1);
    saveTodoListToStorage(todoList);
    renderingTodoList();
}

function getTodoListFromStorage() {
    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : [];
}

function createTodoItemHTML(todoItem) {
    const dateList = document.querySelector(`[data-id="${todoItem.date}"]`);
    if (dateList) {
        const time_content = todoItem.time ? `<i class="fa-solid fa-clock"></i>${todoItem.time}` : "";
        const place_Content = todoItem.place ? `<i class="fa-solid fa-location-dot"></i>${todoItem.place}` : ""; 
        return `<div >    
        <div class="time_and_item" > ${time_content}${todoItem.todo} </div> <div class="place_and_icon"> ${place_Content}</div></div>`;
    }
}

const show_alert = true;
document.querySelector('#edit_btn').onclick = () => { 

    document.querySelector('#staticBackdropLabel').textContent = "編輯待辦事項";
    document.querySelector('#add_btn').setAttribute('hidden', true); 
    document.querySelector('#btn-close').removeAttribute("data-bs-dismiss");  
    document.querySelector('#save_btn').removeAttribute('hidden');
    document.querySelector('#edit_btn').setAttribute('hidden', 'true');  
    input_remove_disabled();
    document.querySelector("#btn-close").onclick = () => {
        if (show_alert) {
            alert('請先儲存再關閉!');
        }
    }
}

function save(id) {
    const { date_Content, todo_Content, time_Content, place_Content, color_Content } = get_input_value();
   
    if (!date_Content || !todo_Content) {
        alert("日期和待辦事項為必填");
        return;
    }

   
    const todoList = getTodoListFromStorage();  
    const todoItemIndex = todoList.findIndex((item) => item.id == id);
    
    if (todoItemIndex !== -1) {
        todoList[todoItemIndex] = {
            id: id,
            date: date_Content,
            time: time_Content,
            todo: todo_Content,
            place: place_Content,
            color: color_Content
        };
        saveTodoListToStorage(todoList);
        renderingTodoList();     
    }}


document.querySelector('#save_btn').onclick = () => {
    document.querySelector('#staticBackdropLabel').textContent = "待辦事項";
    document.querySelector('#btn-close').setAttribute('data-bs-dismiss', 'modal');
    document.querySelector("#btn-close").onclick = () => {
        if (!show_alert) {
            alert('請先儲存再關閉!');
        }
    }
    document.querySelector('#add_btn').setAttribute('hidden', true);
    document.querySelector('#date_input').setAttribute('disabled', true);
    document.querySelector('#time_input').setAttribute('disabled', true);
    document.querySelector('#todo_input').setAttribute('disabled', true);
    document.querySelector('#place_input').setAttribute('disabled', true);
    document.querySelector('#ColorInput').setAttribute('disabled', true);
    edit_and_delete_btn();
    document.querySelector('#save_btn').setAttribute('hidden', 'true');
    const data_save_id = document.querySelector('#save_btn').getAttribute('data_save');  
    save(data_save_id);
};
function edit_and_delete_btn() {
    document.querySelector('#edit_btn').removeAttribute('hidden');
    document.querySelector('#delete_btn').removeAttribute('hidden');
}

function get_input_value() {
    const date_Content = date_input.value;
    const time_Content = time_input.value;
    const todo_Content = todo_input.value.trim();
    const place_Content = place_input.value.trim();
    const color_Content = ColorInput.value;
    return { date_Content, todo_Content, time_Content, place_Content, color_Content };
}
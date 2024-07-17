

alert("⚠️⚠️⚠️資料儲存還沒做完!!!!!!!!!!!!!!!!!!")




//月份們

const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']



//判斷閏年    可除400/可除4但不可除100

// const leap_year=(year)=>{
// return(year%4==0&&year%100!==0||year%400==0)
// }
const leap_year = (year) => (year % 4 == 0 && year % 100 !== 0) || (year % 400 == 0);  //可以簡化成這樣


//閏月
// const leap_month=(year)=>{
//     if(leap_year(year))
//     {return 29}
//     else 
//     {return 28}
// }
const is_leap_month = (year) => (leap_year(year)) ? 29 : 28;



//產生年月

const calendar = document.querySelector('.calendar');


const el_month = calendar.querySelector('.month'); //後面也要用 寫在這比較方便


const new_calendar = (month, year) => {

    const el_date = calendar.querySelector('.date');
    // const el_month = calendar.querySelector('.month');
    const el_year = calendar.querySelector('.year');

    const dates_in_month = [31, is_leap_month(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    el_date.innerHTML = '';  //不清空就等著長一堆


    //沒選東西時要標出今天日期

    const today = new Date();
    if (month == undefined) { month = today.getMonth(); }
    if (year == undefined) { year = today.getFullYear(); }

    const this_month = `${months[month]}`;
    el_month.innerHTML = this_month;
    el_year.innerHTML = year;




    // 一個月的第一天
    const first_day = new Date(year, month, 1)

    //第一天的星期+這個月天數-1 = 最後一天
    for (let i = 0; i <= dates_in_month[month] + first_day.getDay() - 1; i++) {

        const new_date = document.createElement('div');


        //找到第一天的落在哪格 i是日期格子索引
        if (i >= first_day.getDay()) {
            new_date.classList.add('choose_date');
            new_date.textContent = i - first_day.getDay() + 1;  //減完後:星期幾的後幾天

            //生出圈圈
            new_date.innerHTML += `
            <span></span>
            `



            // 判斷是不是今天
            if (i - first_day.getDay() + 1 === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {

                new_date.classList.add('today')
            };
        }

        el_date.appendChild(new_date);
    }



}








//月份清單

const month_list = calendar.querySelector('.month_list');

months.forEach((m, index) => {
    const month_div = document.createElement('div');
    month_div.classList.add("month_div");

    //簡化???????????????

    month_div.innerHTML = `
<div class="month_name" data_month="${index}">${m}</div>`


    //在清單裡選月份後
    month_div.querySelector("div").onclick = () => {
        month_list.classList.remove("show");
        this_month.value = index;
        new_calendar(index, this_year.value);


    }
    month_list.appendChild(month_div);


})





//按月份會秀月份,再按一次可以關起來
// const el_month = calendar.querySelector('.month');
let isMonthListShow = false;
el_month.onclick = () => {

    if (isMonthListShow) {
        month_list.classList.add('show');

    }
    else {
        month_list.classList.remove('show');

    }

    //變成相反的結果
    isMonthListShow = !isMonthListShow;
}






//生出現在的時間點

const currDate = new Date();

let this_month = currDate.getMonth();
let this_year = currDate.getFullYear();

new_calendar(this_month, this_year)



//now按鈕
const find_now = document.querySelector("#now");
find_now.onclick = () => {
    // console.log("點到了")
    const currDate = new Date();

    let this_month = currDate.getMonth();
    let this_year = currDate.getFullYear();

    new_calendar(this_month, this_year)


}


const hb_has_nothing = document.querySelector(".calendar_hb")


hb_has_nothing.onclick = () => {
    alert("只是個裝飾🍔")


}





// 控制年分
document.querySelector('.pre_year').onclick = () => {

    this_year -= 1;
    new_calendar(this_month, this_year)


}

document.querySelector('.nex_year').onclick = () => {
    this_year += 1;

    new_calendar(this_month, this_year)


}

//控制月份
document.querySelector('.pre_month').onclick = () => {

    this_month -= 1;
    if (this_month < 0) {
        this_month = 11;
        this_year -= 1;

    }

    new_calendar(this_month, this_year)


}

document.querySelector('.nex_month').onclick = () => {
    this_month += 1;
    if (this_month > 11) {
        this_month = 0;
        this_year += 1;

    }
    new_calendar(this_month, this_year)


}




//todolist

const year_input = document.querySelector("#year_input");
const month_input = document.querySelector("#month_input");
const date_input = document.querySelector("#date_input");
const todo_input = document.querySelector("#todo_input");
const place_input = document.querySelector("#place_input");
const ColorInput = document.querySelector("#ColorInput");
const addButton = document.querySelector("#add_btn");

// localStorage 的 key
const key = "todo";
// 獲取待辦事項列表元素
const todoListGroup = document.querySelector("#todo_list_group");
//<ul id="todo_list_group" class="list-group"></ul>


addButton.addEventListener("click", function (event) {
    event.preventDefault(); // 防止表單提交預設行為

    const year_Content = year_input.value.trim();
    const month_Content = month_input.value.trim();
    const date_Content = date_input.value.trim();
    const todo_Content = todo_input.value.trim();
    const place_Content = place_input.value.trim();

    if (!year_Content || !month_Content || !date_Content || !todo_Content || !place_Content) {
        alert("請填寫所有欄位");
        return;
    }})


    // 儲存待辦事項
    const todoItem = {
        id: new Date().valueOf(), // 生成唯一ID
        year: year_Content,
        month: month_Content,
        date: date_Content,
        content: todo_Content, // 待辦事項內容
        place: place_Content,
        isDone: false, // 是否完成
    };
    saveTodoItem(todoItem); // 儲存待辦事項
    renderingTodoList(); // 重新渲染待辦事項列表



// 當頁面加載完成時，渲染待辦事項列表
window.addEventListener("load", function (event) {
    renderingTodoList();
});


// 渲染待辦事項列表
function renderingTodoList() {
    const todoList = getTodoListFromStorage(); // 從 localStorage 獲取待辦事項列表
    if (!todoList) return; // 如果列表為空則返回
    todoListGroup.innerHTML = ""; // 清空列表
    todoList.forEach((item) => {
        todoListGroup.innerHTML += createTodoItemHTML(item); // 為每個待辦事項生成 HTML 並添加到列表中
    });
}


function getTodoListFromStorage() {
    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : [];
  }

// 生成待辦事項的 HTML
function createTodoItemHTML(todoItem) {
    return `
        <div id="todo_list_group" class="list-group">在${todoItem.place}做${todoItem.content}</div>`;
}


// 處理完成狀態的切換
function isDoneCheck(id) {
    const todoList = getTodoListFromStorage(); // 獲取待辦事項列表
    const todoItem = todoList.find((item) => item.id === id); // 查找對應的待辦事項
    todoItem.isDone = !todoItem.isDone; // 切換完成狀態
    saveTodoListToStorage(todoList); // 儲存更新後的列表
}


// 儲存編輯後的待辦事項
function save(id, el) {
    const todoContent = el.parentElement.querySelector("#todo_input"); // 獲取待辦事項內容輸入框
    const val = todoContent.value.trim(); // 獲取輸入框內容並去除空白
    if (!val) return; // 如果內容為空則返回

    const todoList = getTodoListFromStorage(); // 獲取待辦事項列表
    const todoItem = todoList.find((item) => item.id === id); // 查找對應的待辦事項
    todoItem.content = val; // 更新待辦事項內容
    saveTodoListToStorage(todoList); // 儲存更新後的列表
    renderingTodoList(); // 重新渲染列表
}



// 儲存待辦事項列表到 localStorage
function saveTodoListToStorage(todoList) {
    const json = JSON.stringify(todoList); // 將列表轉換為 JSON 字符串
    localStorage.setItem(key, json); // 儲存到 localStorage
}


// 編輯待辦事項
function edit(id, el) {
    const todoContent = el.parentElement.querySelector("#todo_input"); // 獲取待辦事項內容輸入框
    todoContent.disabled = false; // 啟用輸入框
    const saveBtn = el.parentElement.querySelector(".save-btn"); // 獲取儲存按鈕
    saveBtn.classList.remove("d-none"); // 顯示儲存按鈕
    el.classList.add("d-none"); // 隱藏編輯按鈕
}


// 刪除待辦事項
function remove(id, el) {
    const todoList = getTodoListFromStorage(); // 獲取待辦事項列表
    const todoItemIdx = todoList.findIndex((item) => item.id === id); // 查找對應的待辦事項索引
    todoList.splice(todoItemIdx, 1); // 刪除對應的待辦事項
    saveTodoListToStorage(todoList); // 儲存更新後的列表
    renderingTodoList(); // 重新渲染列表
}



// 儲存新的待辦事項到列表
function saveTodoItem(todoItem) {
    const todoList = getTodoListFromStorage(); // 獲取待辦事項列表
    todoList.push(todoItem); // 添加新的待辦事項
    saveTodoListToStorage(todoList); // 儲存更新後的列表
}


// alert("⚠️⚠️⚠️還沒做把資料加到當天!!!!!!!!!!!!!!!!!!")

document.querySelector('#edit_btn').setAttribute('hidden', true);
document.querySelector('#save_btn').setAttribute('hidden', true);
document.querySelector('#delete_btn').setAttribute('hidden', true);
document.querySelector('#add_btn').setAttribute('hidden', true);


document.querySelector('#add_todolist').onclick = () => {

    document.querySelector('#add_btn').removeAttribute('hidden');
    //保險
    document.querySelector('#edit_btn').setAttribute('hidden', 'true');
    document.querySelector('#save_btn').setAttribute('hidden', 'true');
    document.querySelector('#delete_btn').setAttribute('hidden', 'true');

    document.querySelector('#date_input').removeAttribute('disabled');
    document.querySelector('#time_input').removeAttribute('disabled');
    document.querySelector('#todo_input').removeAttribute('disabled');
    document.querySelector('#place_input').removeAttribute('disabled');
    document.querySelector('#ColorInput').removeAttribute('disabled');


}





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
            new_date.setAttribute('data-bs-toggle', 'modal');
            new_date.setAttribute('data-bs-target', '#staticBackdrop');

            //長內容為日期的id
            const day = i - first_day.getDay() + 1;

            //就是這邊讓代辦事項差點找不到位置放!!!!!
            // new_date.setAttribute('id', `${year}-${month + 1}-${day}`);
            const monthFormatted = (month + 1).toString().padStart(2, '0');
            const dayFormatted = day.toString().padStart(2, '0');
            new_date.setAttribute('id', `${year}-${monthFormatted}-${dayFormatted}`);

            // new_date.onclick = () => {

            //     document.querySelector('#add_btn').removeAttribute('hidden');

            // }

            new_date.onclick = (event) => {
                // 檢查點擊的元素是否是 <li> 或 <li> 的子元素
                if (!event.target.closest('li')) {


    
                    date_input.value = "";
                    time_input.value = "";
                    todo_input.value = "";
                    place_input.value = "";
                    ColorInput.value = "#563d7c"; //預設的
                
              
                
                
                      // 可以編輯了
                      document.querySelector('#date_input').removeAttribute('disabled');
                      document.querySelector('#time_input').removeAttribute('disabled');
                      document.querySelector('#todo_input').removeAttribute('disabled');
                      document.querySelector('#place_input').removeAttribute('disabled');
                      document.querySelector('#ColorInput').removeAttribute('disabled');
                  
                




                    document.querySelector('#add_btn').removeAttribute('hidden');
                    document.querySelector('#edit_btn').setAttribute('hidden',true);
                    document.querySelector('#save_btn').setAttribute('hidden',true);   document.querySelector('#delete_btn').setAttribute('hidden',true);
                }
            };



            new_date.textContent = i - first_day.getDay() + 1;  //減完後:星期幾的後幾天

            //生出圈圈
            new_date.innerHTML += `
            <ul data-id="${new_date.id}"></ul>
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




document.querySelectorAll("li").onclick = () => {


    document.querySelector('#add_btn').setAttribute('hidden', true);

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
        this_month = index;
        new_calendar(index, this_year);

        renderingTodoList();

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
    renderingTodoList();

}


const hb_has_nothing = document.querySelector(".calendar_hb")


hb_has_nothing.onclick = () => {
    alert("只是個裝飾🍔")


}

// document.querySelector("#pre_year").onclick=()=>{
//     renderingTodoList();
//     console.log("wsssssss")
// }
// document.querySelector("#pre_month").onclick=()=>{
//     renderingTodoList();
// }


// document.querySelector("#nex_year").onclick=()=>{
//     renderingTodoList();
// }
// document.querySelector("#nex_month").onclick=()=>{
//     renderingTodoList();
// }



// 控制年分
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

//控制月份
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









//以下是todolist


const date_input = document.querySelector("#date_input");
const time_input = document.querySelector("#time_input");
const todo_input = document.querySelector("#todo_input");
const place_input = document.querySelector("#place_input");
const ColorInput = document.querySelector("#ColorInput");
const addButton = document.querySelector("#add_btn");






// localStorage 的 key
const key = "MyCalendarTodoList";




//統一渲染時機
window.addEventListener("load", function (event) {
    renderingTodoList();
});



addButton.addEventListener("click", function (event) {
    event.preventDefault(); // 取消input工具預設的表單提交

    // console.log("add")

    //要放在裡面才不會存到空空的東西!!!!!!!!!!!
    const date_Content = date_input.value;
    const time_Content = time_input.value;
    const todo_Content = todo_input.value.trim();
    const place_Content = place_input.value.trim();
    const color_Content = ColorInput.value;






    // 拿到待辦事項
    const todoItem = {
        id: new Date().valueOf(), // 生成唯一ID
        date: date_Content,
        time: time_Content,
        todo: todo_Content,
        place: place_Content,
        color: color_Content,

    };


    // console.log("add!")




    function saveTodoListToStorage(todoList) {
        const json = JSON.stringify(todoList);
        localStorage.setItem(key, json);
    }



    // 儲存待辦事項列表到 localStorage
    function saveTodoItem(todoItem) {
        const todoList = getTodoListFromStorage() || [];   //這樣就不用檢查是不是null  
        todoList.push(todoItem);
        saveTodoListToStorage(todoList);
        renderingTodoList();


    }










    if (!date_input.value) {
        alert("日期為必填");
        // return;
    };

    if (!todo_input.value.trim()) {
        alert("待辦事項為必填");
        // return;
    }
    else { saveTodoItem(todoItem); }// 儲存待辦事項




    renderingTodoList();


    date_input.value = "";
    time_input.value = "";
    todo_input.value = "";
    place_input.value = "";
    ColorInput.value = "#563d7c"; //預設的





})






function saveTodoListToStorage(todoList) {
    const json = JSON.stringify(todoList);
    localStorage.setItem(key, json);
}



// 儲存待辦事項列表到 localStorage
function saveTodoItem(todoItem) {
    const todoList = getTodoListFromStorage() || [];   //這樣就不用檢查是不是null  
    todoList.push(todoItem);
    saveTodoListToStorage(todoList);
    renderingTodoList();


}



// 把待辦事項標籤放在頁面上
function renderingTodoList() {



    const todoList = getTodoListFromStorage();

    //清空
    document.querySelectorAll('.choose_date ul').forEach(ul => ul.innerHTML = "");

    // console.log(todoList[0].date);

    // const test = todoList[0].date;





    // const List_tag = document.querySelector(`#list_tag`);




    // List_tag.innerHTML = "";  // 清空原有內容不然會重複加入

    todoList.forEach((item) => {

        // console.log(item)
        // 試試 

        const divElement = document.querySelector(`.choose_date[id="${item.date}"]`);

        // 檢查 divElement 
        if (!divElement) {
            console.log(`Element with id="${item.date}" not found.`);
            return;
        }


        const ul = divElement.querySelector('ul');

        // 檢查 ul 
        if (!ul) {
            console.log(`No <ul> element found inside element with id="${item.date}".`);
            return; 事项
        }

        // 試試 


        const todoItemHTML = createTodoItemHTML(item);

        const listItem = document.createElement('li');
        listItem.classList.add("todoList_li");
        listItem.setAttribute('id', item.id);



        listItem.setAttribute('data-bs-toggle', 'modal');
        listItem.setAttribute('data-bs-target', '#staticBackdrop');


        listItem.style.borderLeft = `4px solid ${item.color}`;


        listItem.innerHTML = todoItemHTML;
        // List_tag.appendChild(listItem);
        ul.appendChild(listItem);




        //點選事項會跳出帶入資料的編輯、儲存、刪除畫面
        listItem.onclick = (event) => {
            event.stopPropagation();    //不要冒泡! 



            document.querySelector('#add_btn').setAttribute('hidden', true);




            // const listItem = event.currentTarget;   //好像不需要用到
            const id = listItem.getAttribute('id'); // 獲取id
            const todoList = getTodoListFromStorage();
            const todoItem = todoList.find(item => item.id == id); // 根據id找待辦事項
            //找到了 放進去
            document.querySelector('#date_input').value = todoItem.date;
            document.querySelector('#time_input').value = todoItem.time;
            document.querySelector('#todo_input').value = todoItem.todo;
            document.querySelector('#place_input').value = todoItem.place;
            document.querySelector('#ColorInput').value = todoItem.color;


            // 還不可以編輯
            document.querySelector('#date_input').setAttribute('disabled', 'true');
            document.querySelector('#time_input').setAttribute('disabled', 'true');
            document.querySelector('#todo_input').setAttribute('disabled', 'true');
            document.querySelector('#place_input').setAttribute('disabled', 'true');
            document.querySelector('#ColorInput').setAttribute('disabled', 'true');


            // console.log(`${item.id} ${id}`)

            //可以選擇編輯或刪除
            document.querySelector('#edit_btn').removeAttribute('hidden');
            document.querySelector('#delete_btn').removeAttribute('hidden');






            //把id也給刪除鍵
            document.querySelector('#delete_btn').setAttribute('data-id', item.id);
            //還有儲存鍵
            document.querySelector('#save_btn').setAttribute('data_save', item.id);

        }

    });
}

// document.querySelector(li).onclick = () => {


//     document.querySelector('#add_btn').setAttribute('hidden', true); 

// }



document.querySelector('#delete_btn').onclick = () => {


    // console.log("刪除")
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



//取出JSON資料
function getTodoListFromStorage() {
    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) : [];
}



// 在HTML長出代辦事項
function createTodoItemHTML(todoItem) {

    const dateList = document.querySelector(`[data-id="${todoItem.date}"]`);



    if (dateList) {
        const time_content = todoItem.time ? `<i class="fa-solid fa-clock"></i>${todoItem.time}` : ""; // 有填時間在放
        const place_Content = todoItem.place ? `<i class="fa-solid fa-location-dot"></i>${todoItem.place}` : ""; // 有填地點在放

        return `<div >    
        <div class="time_and_item" > ${time_content}${todoItem.todo} </div> <div class="place_and_icon"> ${place_Content}</div></div>`;
    }
}


const show_alert = true;
// 編輯按鈕
document.querySelector('#edit_btn').onclick = () => {
    // console.log("edit")

    document.querySelector('#staticBackdropLabel').textContent = "編輯待辦事項";
    document.querySelector('#add_btn').setAttribute('hidden', true);    //保險
    document.querySelector('#btn-close').removeAttribute("data-bs-dismiss");

    //編輯與儲存切換
    document.querySelector('#save_btn').removeAttribute('hidden');
    document.querySelector('#edit_btn').setAttribute('hidden', 'true');

    // 可以編輯了
    document.querySelector('#date_input').removeAttribute('disabled');
    document.querySelector('#time_input').removeAttribute('disabled');
    document.querySelector('#todo_input').removeAttribute('disabled');
    document.querySelector('#place_input').removeAttribute('disabled');
    document.querySelector('#ColorInput').removeAttribute('disabled');





    document.querySelector("#btn-close").onclick = () => {

        if (show_alert) {
            alert('請先儲存再關閉!');
        }


    }
}



//用不到

// document.querySelector('#btn-close').onclick=()=>{



    
//     date_input.value = "";
//     time_input.value = "";
//     todo_input.value = "";
//     place_input.value = "";
//     ColorInput.value = "#563d7c"; //預設的

// // console.log("點點點點")

// document.querySelector('#edit_btn').removeAttribute('hidden');
//     document.querySelector('#save_btn').setAttribute('hidden', 'true');
//     document.querySelector('#delete_btn').setAttribute('hidden', 'true');


//       // 可以編輯了
//       document.querySelector('#date_input').removeAttribute('disabled');
//       document.querySelector('#time_input').removeAttribute('disabled');
//       document.querySelector('#todo_input').removeAttribute('disabled');
//       document.querySelector('#place_input').removeAttribute('disabled');
//       document.querySelector('#ColorInput').removeAttribute('disabled');
  



// }



// 儲存按鈕

function save(id) {



    const date_Content = date_input.value;
    const time_Content = time_input.value;
    const todo_Content = todo_input.value.trim();
    const place_Content = place_input.value.trim();
    const color_Content = ColorInput.value;


    // 檢查必填字段
    if (!date_Content || !todo_Content) {
        alert("日期和待辦事項為必填");
        return;
    }



    // 獲取待辦事項列表並更新
    const todoList = getTodoListFromStorage();

    //
    const todoItemIndex = todoList.findIndex((item) => item.id == id);

    // console.log(todoItemIndex)

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
        // console.log(id)

    }
}











document.querySelector('#save_btn').onclick = () => {
    document.querySelector('#staticBackdropLabel').textContent = "待辦事項";
    document.querySelector('#btn-close').setAttribute('data-bs-dismiss', 'modal');

    document.querySelector("#btn-close").onclick = () => {

        if (!show_alert) {

            alert('請先儲存再關閉!');
        }

    }


    document.querySelector('#add_btn').setAttribute('hidden', true);//保險


    document.querySelector('#date_input').setAttribute('disabled', true);
    document.querySelector('#time_input').setAttribute('disabled', true);
    document.querySelector('#todo_input').setAttribute('disabled', true);
    document.querySelector('#place_input').setAttribute('disabled', true);
    document.querySelector('#ColorInput').setAttribute('disabled', true);


    document.querySelector('#edit_btn').removeAttribute('hidden');
    document.querySelector('#save_btn').setAttribute('hidden', 'true');
    document.querySelector('#delete_btn').removeAttribute('hidden');



    const data_save_id = document.querySelector('#save_btn').getAttribute('data_save');
    // console.log(data_save_id)
    save(data_save_id);


};




// document.querySelector(".container").hidden=true;
$('.container').hide();


let min = 1;
let max = 100;

let randomNumber = generate_RandomNumber();
function generate_RandomNumber() { return Math.floor(Math.random() * (max - min + 1)) + min; }

function resetGame() {
    min = 1;
    max = 100;
    randomNumber = generate_RandomNumber(); // 重新生成數字
    document.getElementById("guess_Input").value = "";
    document.getElementById("message").textContent = "請輸入1到100的數字";
}
const guess_Btn = document.getElementById("guess_Btn");
const guess_Input = document.getElementById("guess_Input");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart_Btn");



guess_Btn.addEventListener("click", function () {
    const player_input = parseInt(guess_Input.value);

    if (isNaN(player_input) || player_input < min || player_input > max) {
        message.textContent = `請輸入${min}到${max}之間的數字`;
        return;
    }

    if (player_input < randomNumber) {
        min = player_input + 1;
        message.textContent = `請輸入${min}到${max}之間的數字`;
    } else if (player_input > randomNumber) {
        max = player_input - 1;
        message.textContent = `請輸入${min}到${max}之間的數字`;
    } else {
        message.textContent = `猜對了！答案是${randomNumber}`
    



    }
});


restart_Btn.addEventListener("click", function () {
    resetGame();
});





document.querySelector("body").onclick=()=>{
    // document.querySelector("#begin_text").hidden=true;
    $('#begin_text').hide().fadeOut();
    $('.container').fadeIn();

    
   
    // document.querySelector(".container").hidden=false;


}
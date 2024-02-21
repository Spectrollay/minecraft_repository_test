// 切换开关
const switchElement = document.getElementById("switch_exp");
const switch_exp_status = document.getElementById("switch_exp_status");
let isOn = false;

// 添加点击事件监听器
switchElement.addEventListener("click", function () {
    isOn = !isOn;
    playSound1();
    switchElement.classList.toggle("on", isOn);
    if (isOn) {
        switch_exp_status.textContent = "开关: 开启";
        console.log("打开开关");
    } else {
        switch_exp_status.textContent = "开关: 关闭";
        console.log("关闭开关");
    }
});
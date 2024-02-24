// 切换开关
const switchElement = document.getElementsByClassName("switch");
const toggleSlider = document.getElementsByClassName("toggle_slider");
const switch_status = document.getElementsByClassName("switch_status");

// 添加点击事件监听器
for (let i = 0; i < switchElement.length; i++) {
    let isOn = switchElement[i].classList.contains("on");
    switchElement[i].addEventListener("click", function () {
        isOn = !isOn;
        playSound1();
        switchElement[i].classList.toggle("on", isOn);
        switchElement[i].classList.toggle("off", !isOn);
        if (isOn) {
            toggleSlider[i].classList.add('toggle_bounce_left');
            toggleSlider[i].classList.remove('toggle_bounce_right');
            switch_status[i].textContent = "开关: 开启";
            console.log("打开开关");
        } else {
            toggleSlider[i].classList.add('toggle_bounce_right');
            toggleSlider[i].classList.remove('toggle_bounce_left');
            switch_status[i].textContent = "开关: 关闭";
            console.log("关闭开关");
        }
    });
}


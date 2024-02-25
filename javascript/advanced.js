// 切换开关
const switchElement = document.getElementsByClassName("switch");
const toggleSlider = document.getElementsByClassName("toggle_slider");

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
            console.log("打开开关", switchElement[i].id);
        } else {
            toggleSlider[i].classList.add('toggle_bounce_right');
            toggleSlider[i].classList.remove('toggle_bounce_left');
            console.log("关闭开关", switchElement[i].id);
        }
    });
}

// 实验性
const switchExp1 = document.getElementById("switch_exp1");
const switchExp2 = document.getElementById("switch_exp2");

switchExp1.addEventListener("click", function () {
    const switch_status_exp1 = document.getElementById("switch_status_exp1");
    let exp1IsOn = switchExp1.classList.contains("on");
    exp1IsOn = !exp1IsOn;
    if (exp1IsOn) {
        switch_status_exp1.textContent = "开关: 关闭";
    } else {
        switch_status_exp1.textContent = "开关: 开启";
    }
});
switchExp2.addEventListener("click", function () {
    const switch_status_exp2 = document.getElementById("switch_status_exp2");
    let exp2IsOn = switchExp2.classList.contains("on");
    exp2IsOn = !exp2IsOn;
    if (exp2IsOn) {
        switch_status_exp2.textContent = "开关: 关闭";
    } else {
        switch_status_exp2.textContent = "开关: 开启";
    }
});
// 自定义Switch开关
class CustomSwitch extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // 获取自定义属性值
        const status = this.getAttribute('status');
        const active = this.getAttribute('active');

        // 设置初始状态和禁用状态
        const isOn = active === 'on';
        const isDisabled = status !== 'enable';

        // 创建开关元素的 HTML 结构
        this.innerHTML = `
            <div class="switch_content">
                <div class="switch ${isDisabled ? 'disabled_switch' : 'normal_switch'} ${isOn ? 'on' : 'off'}">
                    <div class="switch_style left"><img alt="" src="../images/switch_on.png"></div>
                    <div class="switch_style right"><img alt="" src="../images/switch_off.png"></div>
                    <div class="switch_slider can_click"></div>
                </div>
            </div>
        `;

        // 添加点击事件监听器
        const switchElement = this.querySelector(".switch");
        const switchSlider = this.querySelector(".switch_slider");
        let isSwitchOn = switchElement.classList.contains("on");
        let isSwitchDisabled = switchElement.classList.contains("disabled_switch");
        let startX = 0;
        let isDragging = false;

        if (!isSwitchDisabled) {
            switchElement.addEventListener("click", () => {
                isSwitchOn = !isSwitchOn;
                this.updateSwitchState(isSwitchOn);
            });

            switchElement.addEventListener("mousedown", (e) => {
                isDragging = true;
                switchSlider.classList.add('active');
                startX = e.clientX;
            });

            switchElement.addEventListener("touchstart", (e) => {
                isDragging = true;
                switchSlider.classList.add('active');
                startX = e.touches[0].clientX;
            });

            document.addEventListener("mouseup", (e) => {
                if (isDragging) {
                    let elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
                    if (!switchElement.contains(elementAtPoint)) {
                        let currentX = e.clientX;
                        if (currentX - startX > 10) {
                            if (!isSwitchOn) {
                                isSwitchOn = true;
                                this.updateSwitchState(isSwitchOn);
                            }
                        } else if (currentX - startX < -10) {
                            if (isSwitchOn) {
                                isSwitchOn = false;
                                this.updateSwitchState(isSwitchOn);
                            }
                        }
                    }
                }
                isDragging = false;
                setTimeout(() => {
                    switchSlider.classList.remove('active');
                }, 0);
            });

            document.addEventListener("touchend", (e) => {
                if (isDragging) {
                    let currentX = e.changedTouches[0].clientX;
                    if (currentX - startX > 10) {
                        if (!isSwitchOn) {
                            isSwitchOn = true;
                            this.updateSwitchState(isSwitchOn);
                        }
                    } else if (currentX - startX < -10) {
                        if (isSwitchOn) {
                            isSwitchOn = false;
                            this.updateSwitchState(isSwitchOn);
                        }
                    }
                }
                isDragging = false;
                setTimeout(() => {
                    switchSlider.classList.remove('active');
                }, 0);
            });
        }
    }

    updateSwitchState(isOn) {
        playSound1();
        const switchElement = this.querySelector(".switch");
        const switchSlider = this.querySelector(".switch_slider");
        console.log(isOn ? "打开开关" : "关闭开关", this.id);
        switchElement.classList.toggle("on", isOn);
        switchElement.classList.toggle("off", !isOn);
        if (isOn) {
            switchSlider.classList.add('switch_bounce_left');
            switchSlider.classList.remove('switch_bounce_right');
        } else {
            switchSlider.classList.add('switch_bounce_right');
            switchSlider.classList.remove('switch_bounce_left');
        }
        const switchStatus = this.querySelector(".switch_status");
        if(switchStatus) {
            switchStatus.textContent = `Toggle: ${isOn ? 'Open' : 'Close'}`;
        }
    }

}

// 定义 <custom-switch> 自定义元素
customElements.define('custom-switch', CustomSwitch);




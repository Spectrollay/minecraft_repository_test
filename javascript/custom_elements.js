// 自定义Checkbox复选框
class CustomCheckbox extends HTMLElement {
    constructor() {
        super();
        this.render();
        // 点击元素本身执行点击事件
        // this.addEventListener('click', this.toggleCheckbox.bind(this));

        // 点击父元素执行点击事件
        const parentElement = this.parentElement;
        if (parentElement) {
            parentElement.addEventListener('click', this.toggleCheckbox.bind(this));
        }
    }

    render() {
        const active = this.getAttribute('active') || 'off';
        const status = this.getAttribute('status') || 'disabled';

        const isDisabled = status !== 'enabled';
        const isOn = active === 'on';

        this.innerHTML = `
            <div class="custom-checkbox ${isOn ? 'on' : 'off'} ${isDisabled ? 'disabled' : 'enabled'}">
                <img src="../images/check_white.png" alt="" class="checkmark">
            </div>
        `;
    }

    toggleCheckbox() {
        if (this.getAttribute('status') !== 'enabled') {
            return;
        }

        const isChecked = this.getAttribute('active') === 'on';
        playSound1();
        if (isChecked) {
            this.setAttribute('active', 'off');
            console.log("关闭复选框", this.id);
        } else {
            this.setAttribute('active', 'on');
            console.log("打开复选框", this.id);
        }

        this.render();
    }
}

customElements.define('custom-checkbox', CustomCheckbox);


// 自定义Switch开关
class CustomSwitch extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const active = this.getAttribute('active') || 'off';
        const status = this.getAttribute('status') || 'disabled_switch';

        const isDisabled = status !== 'enabled';
        const isOn = active === 'on';

        this.innerHTML = `
            <div class="switch_content">
                <div class="switch ${isOn ? 'on' : 'off'} ${isDisabled ? 'disabled_switch' : 'normal_switch'}">
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

            // 点击父元素执行点击事件
            const parentElement = this.parentElement;
            if (parentElement) {
                parentElement.addEventListener("click", () => {
                    if (!isDragging) {
                        isSwitchOn = !isSwitchOn;
                        this.updateSwitchState(isSwitchOn);
                    }
                });
            }

            // 点击元素本身执行点击事件
            switchElement.addEventListener("click", () => {
                isSwitchOn = !isSwitchOn;
                this.updateSwitchState(isSwitchOn);
            });

            // 拖动事件
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
                setTimeout(() => {
                    isDragging = false;
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
                setTimeout(() => {
                    isDragging = false;
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
        if (switchStatus) {
            switchStatus.textContent = `Toggle: ${isOn ? 'Open' : 'Close'}`;
        }
    }

}

customElements.define('custom-switch', CustomSwitch);


// 自定义按钮
class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const data = this.getAttribute('data') || '';
        const [type, status, size, id, isTip, tip, icon] = data.split('|').map(item => item.trim());
        this.type = type || 'default';
        this.status = status || 'normal';
        this.isTip = isTip === 'true';
        this.tip = tip || '';
        this.icon = icon || '';
        const csize = size || 'middle';
        const cid = id || '';
        const js = this.getAttribute('js') || 'false';
        const text = this.getAttribute('text') || '';

        if (type === "default") {
            if (isTip === "true") {
                this.innerHTML = `
                        <div class="btn_with_tooltip_cont">
                            <button class="btn ${csize}_btn ${status}_btn" id="${cid}">${text}</button>
                            <div class="btn_tooltip">${tip}</div>
                            <img alt="" class="tip_icon" src="../images/${icon}.png"/>
                        </div>
                    `;
            } else {
                this.innerHTML = `
                        <button class="btn ${csize}_btn ${status}_btn" id="${cid}">${text}</button>
                    `;
            }
        } else {
            this.classList.add(type+"_custom_btn");
            this.innerHTML = `
                    <button class="btn ${status}_btn ${type}_btn" id="${cid}">${text}</button>
                `;
        }

        const button = this.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                playSound(button);
            });
            if(this.status !== 'disabled'){
                if (js !== "false") {
                    button.addEventListener('click', () => {
                        eval(js);
                    });
                }
            }
        }
    }
}

customElements.define('custom-button', CustomButton);


// Modal弹窗
function showModal(modal) {
    const overlay = document.getElementById("overlay");
    const frame = document.getElementById(modal);
    overlay.style.display = "block";
    frame.style.display = "block";
}

function hideModal(button) {
    const overlay = document.getElementById("overlay");
    let frameId;
    let currentElement = button.parentElement;

    while (currentElement) {
        if (currentElement.tagName.toLowerCase() === 'modal_area') {
            frameId = currentElement.id;
            break;
        }
        currentElement = currentElement.parentElement;
    }

    const frame = document.getElementById(frameId);
    playSound(button);
    overlay.style.display = "none";
    frame.style.display = "none";
}
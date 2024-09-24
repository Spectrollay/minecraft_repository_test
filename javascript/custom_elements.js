/*
 * Copyright © 2020. Spectrollay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// 自定义按钮
class CustomButton extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    static get observedAttributes() {
        return ['data', 'js', 'text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const data = this.getAttribute('data') || '';
        const [type, status, size, id, isTip, tip, icon] = data.split('|').map(item => item.trim());
        this.status = status || 'normal';
        this.icon = icon || '';
        const ctype = type || 'default';
        const csize = size || 'middle';
        const cid = id || '';
        const cisTip = isTip === true;
        const ctip = tip || '';
        const js = this.getAttribute('js') || 'false';
        const text = this.getAttribute('text') || '';

        if (ctype === "default") {
            if (cisTip === true) {
                this.innerHTML = `
                    <div class="btn_with_tooltip_cont">
                        <button class="btn ${csize}_btn ${status}_btn" id="${cid}">${text}</button>
                        <div class="btn_tooltip">${ctip}</div>
                        <img alt="" class="tip_icon" src="/minecraft_repository_test/images/${icon}.png"/>
                    </div>
                `;
            } else {
                this.innerHTML = `
                    <button class="btn ${csize}_btn ${status}_btn" id="${cid}">${text}</button>
                `;
            }
        } else {
            this.classList.add(ctype + "_custom_btn");
            this.innerHTML = `
                <button class="btn ${status}_btn ${ctype}_btn" id="${cid}">${text}</button>
            `;
        }

        const button = this.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                playSound(button);
            });
            if (this.status !== 'disabled') {
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
                <img alt="" class="checkmark" src="/minecraft_repository_test/images/check_white.png"/>
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
            if (this.classList.contains('neverShowIn15Days')) {
                localStorage.removeItem('(/minecraft_repository_test/)neverShowIn15Days');
            }
        } else {
            this.setAttribute('active', 'on');
            console.log("打开复选框", this.id);
            if (this.classList.contains('neverShowIn15Days')) {
                localStorage.setItem('(/minecraft_repository_test/)neverShowIn15Days', Date.now().toString());
            }
        }

        this.render();
    }
}

customElements.define('custom-checkbox', CustomCheckbox);


// Modal弹窗
function showModal(modal) {
    const overlay = document.getElementById("overlay_" + modal);
    const frame = document.getElementById(modal);
    overlay.style.display = "block";
    frame.style.display = "block";
    frame.focus();
}

function hideModal(button) {
    let frameId;
    let currentElement = button.parentElement;

    while (currentElement) {
        if (currentElement.tagName.toLowerCase() === 'modal_area') {
            frameId = currentElement.id;
            break;
        }
        currentElement = currentElement.parentElement;
    }

    const overlay = document.getElementById("overlay_" + frameId);
    const frame = document.getElementById(frameId);
    playSound(button);
    overlay.style.display = "none";
    frame.style.display = "none";
}


// 自定义Slider滑块
class CustomSlider extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="slider_area">
                <div>Selected: <span class="slider_tooltip">0.00</span></div>
                <div class="slider_content">
                    <div class="slider">
                        <div class="slider_process"></div>
                        <div class="slider_slider"></div>
                        <div class="slider_segment" style="display: none"></div>
                    </div>
                </div>
            </div>
        `;
        this.render();
    }

    render() {
        const content = this.querySelector('.slider_content');
        const tooltip = this.querySelector('.slider_tooltip');
        const slider = this.querySelector('.slider');
        const process = this.querySelector('.slider_process');
        const handle = this.querySelector('.slider_slider');
        const sliderData = JSON.parse(this.getAttribute('data-slider'));
        const minValue = sliderData.minValue;
        const maxValue = sliderData.maxValue;
        const segments = sliderData.segments;
        const initialValue = sliderData.initialValue || minValue;
        const showSegments = this.getAttribute('data-show-segments');
        const customSegments = this.getAttribute('data-custom-segments') === "true";
        const segmentValues = customSegments ? JSON.parse(this.getAttribute('data-segment-values')) : [];
        const isDisabled = this.id.includes('disabled');
        const type = this.getAttribute('type');

        let currentValue = initialValue;
        let isDragging = false;

        function formatValue(value) {
            return Number.isInteger(value) ? value : value.toFixed(2);
        }

        function updateHandle(position) {
            handle.style.left = position + '%';
            process.style.width = position + '%';
        }

        function updateTooltip(position) {
            if (type === 'set') {
                const segmentIndex = Math.round(position / (100 / segments));
                const segmentValue = customSegments ? segmentValues[segmentIndex] : minValue + segmentIndex * (maxValue - minValue) / segments;
                tooltip.textContent = customSegments ? segmentValue : formatValue(segmentValue);
            } else {
                tooltip.textContent = formatValue(calculateValue(position));
            }
        }

        function calculatePosition(value) {
            return (value - minValue) / (maxValue - minValue) * 100;
        }

        function calculateValue(position) {
            return position * (maxValue - minValue) / 100 + minValue;
        }

        function setSliderValue(position) {
            currentValue = position * (maxValue - minValue) / 100 + minValue;
            updateHandle(position);
            updateTooltip(position);
        }

        function snapToSegment(position) {
            const segmentIndex = Math.round(position / (100 / segments));
            const segmentPosition = segmentIndex * (100 / segments);
            currentValue = customSegments ? segmentValues[segmentIndex] : minValue + segmentIndex * (maxValue - minValue) / segments;
            updateHandle(segmentPosition);
            updateTooltip(segmentPosition);
        }

        // 设置初始值并展示
        updateHandle(calculatePosition(initialValue));
        updateTooltip(calculatePosition(initialValue));

        if (type === 'range') {
            // 添加最小值和最大值提示
            if (showSegments === null || showSegments === "true") {
                const minValueLabel = document.createElement('div');
                minValueLabel.classList.add('slider_value_info');
                minValueLabel.textContent = formatValue(minValue);
                minValueLabel.style.position = 'absolute';
                minValueLabel.style.bottom = '-35px';
                slider.appendChild(minValueLabel);

                const minValueLabelWidth = minValueLabel.offsetWidth;
                minValueLabel.style.left = `calc(0% - ${minValueLabelWidth / 2}px)`;

                const maxValueLabel = document.createElement('div');
                maxValueLabel.classList.add('slider_value_info');
                maxValueLabel.textContent = formatValue(maxValue);
                maxValueLabel.style.position = 'absolute';
                maxValueLabel.style.bottom = '-35px';
                slider.appendChild(maxValueLabel);

                const maxValueLabelWidth = maxValueLabel.offsetWidth;
                maxValueLabel.style.left = `calc(100% - ${maxValueLabelWidth / 2}px)`;
            }
        } else if (type === 'set') {
            // 创建分段线和标签
            for (let i = 0; i <= segments; i++) {
                if (i > 0 && i < segments) {
                    const segment = document.createElement('div');
                    segment.classList.add('slider_segment');
                    segment.style.left = `calc(${(i / segments) * 100}% - 1px)`;
                    slider.appendChild(segment);
                }

                if (showSegments === "true") {
                    const segmentValueLabel = document.createElement('div');
                    const segmentValue = customSegments ? segmentValues[i] : minValue + i * (maxValue - minValue) / segments;
                    segmentValueLabel.classList.add('slider_value_info');
                    segmentValueLabel.textContent = customSegments ? segmentValue : formatValue(segmentValue);
                    segmentValueLabel.style.position = 'absolute';
                    segmentValueLabel.style.bottom = '-35px';
                    slider.appendChild(segmentValueLabel);

                    const segmentValueLabelWidth = segmentValueLabel.offsetWidth;
                    segmentValueLabel.style.left = `calc(${(i / segments) * 100}% - ${segmentValueLabelWidth / 2}px)`;
                }
            }
        }

        if (isDisabled) {
            handle.classList.add('disabled_slider');
            slider.classList.add('disabled_slider');
            return;
        }

        const startDrag = (event) => {
            process.style.transition = 'none';
            handle.style.transition = 'none';
            isDragging = true;
            updatePosition(event);
        };

        const stopDrag = (event) => {
            if (isDragging) {
                const position = currentPosition(event);
                if (type === 'set') {
                    snapToSegment(position);
                } else {
                    setSliderValue(position);
                }
            }
            isDragging = false;
            process.style.transition = 'width 100ms linear';
            handle.style.transition = 'left 100ms linear';
        };

        const updatePosition = (event) => {
            if (!isDragging) return;
            event.preventDefault();
            const position = currentPosition(event);
            setSliderValue(position);
        };

        const currentPosition = (event) => {
            const rect = slider.getBoundingClientRect();
            let position;

            if (event.touches && event.touches.length > 0) {
                position = (event.touches[0].clientX - rect.left) / rect.width * 100;
            } else if (event.changedTouches && event.changedTouches.length > 0) {
                position = (event.changedTouches[0].clientX - rect.left) / rect.width * 100;
            } else if (event.clientX !== undefined) {
                position = (event.clientX - rect.left) / rect.width * 100;
            } else {
                position = 0;  // Fallback position
            }

            return Math.max(0, Math.min(position, 100));
        };

        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('touchmove', updatePosition);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        // 点击slider区域移动
        content.addEventListener('click', (event) => {
            const position = currentPosition(event);
            if (type === 'set') {
                snapToSegment(position);
            } else {
                setSliderValue(position);
            }
        });
    }
}

customElements.define('custom-slider', CustomSlider);


// 自定义Switch开关
class CustomSwitch extends HTMLElement {
    constructor() {
        super();
        this.isSwitchOn = false; // 用于存储当前开关的状态
        this.isSwitchDisabled = false; // 用于存储当前开关的禁用状态
        this.startX = 0; // 用于拖动时记录起始位置
        this.isDragging = false; // 用于标识是否正在拖动
        this.render();
    }

    static get observedAttributes() {
        return ['active', 'status'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateRender();
    }

    render() {
        const active = this.getAttribute('active') || 'off';
        const status = this.getAttribute('status') || 'disabled';

        this.isSwitchDisabled = status !== 'enabled';
        this.isSwitchOn = localStorage.getItem('(/minecraft_repository_test/)' + this.id) === 'on' || active === 'on';

        this.innerHTML = `
            <div class="switch_content">
                <div class="switch ${this.isSwitchOn ? 'on' : 'off'} ${this.isSwitchDisabled ? 'disabled_switch' : 'normal_switch'}">
                    <div class="switch_style left"><img alt="" src="/minecraft_repository_test/images/switch_on.png"/></div>
                    <div class="switch_style right"><img alt="" src="/minecraft_repository_test/images/switch_off.png"/></div>
                    <div class="switch_slider can_click"></div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    updateRender() {
        // 获取状态
        this.isSwitchOn = this.getAttribute('active') === 'on';
        this.isSwitchDisabled = this.getAttribute('status') !== 'enabled';

        // 更新元素的类名
        const switchElement = this.querySelector(".switch");
        if (switchElement) {
            switchElement.classList.toggle("on", this.isSwitchOn);
            switchElement.classList.toggle("off", !this.isSwitchOn);
            switchElement.classList.toggle("disabled_switch", this.isSwitchDisabled);
            switchElement.classList.toggle("normal_switch", !this.isSwitchDisabled);
        }
    }

    bindEvents() {
        const switchElement = this.querySelector(".switch");
        const switchSlider = this.querySelector(".switch_slider");

        if (!this.isSwitchDisabled) {
            // 点击和拖动事件
            const handlePointerDown = (e) => {
                this.isDragging = false;
                switchSlider.classList.add('active');
                this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            };

            const handlePointerMove = (e) => {
                e.preventDefault();
                const currentX = e.type === 'mousemove' ? e.clientX : e.changedTouches[0].clientX;
                const distanceMoved = currentX - this.startX;
                this.isDragging = distanceMoved > 10 || distanceMoved < -10;
            };

            const handlePointerUp = (e) => {
                if (this.isDragging) {
                    const currentX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
                    const distanceMoved = currentX - this.startX;
                    if (distanceMoved > 10 && !this.isSwitchOn) {
                        this.isSwitchOn = true;
                        this.updateSwitchState(this.isSwitchOn);
                    } else if (distanceMoved < -10 && this.isSwitchOn) {
                        this.isSwitchOn = false;
                        this.updateSwitchState(this.isSwitchOn);
                    }
                }
                setTimeout(() => {
                    this.isDragging = false;
                    switchSlider.classList.remove('active');
                }, 0);
            };

            const handleClick = () => {
                if (!this.isDragging) {
                    this.isSwitchOn = !this.isSwitchOn;
                    this.updateSwitchState(this.isSwitchOn);
                }
            };

            // 绑定点击和拖动事件
            const parentElement = this.parentElement.parentElement;
            parentElement.addEventListener("click", handleClick);
            switchElement.addEventListener("mousedown", handlePointerDown);
            switchElement.addEventListener("touchstart", handlePointerDown);
            switchElement.addEventListener("mousemove", handlePointerMove);
            switchElement.addEventListener("touchmove", handlePointerMove);
            document.addEventListener("mouseup", handlePointerUp);
            document.addEventListener("touchend", handlePointerUp);
        }
    }

    updateSwitchState(isOn) {
        this.setAttribute('active', isOn ? 'on' : 'off');
        const switchElement = this.querySelector(".switch");
        const switchSlider = this.querySelector(".switch_slider");

        switchElement.classList.toggle("on", isOn);
        switchElement.classList.toggle("off", !isOn);
        console.log(isOn ? "打开开关" : "关闭开关", this.id);
        playSound1();

        if (isOn) {
            switchSlider.classList.add('switch_bounce_left');
            switchSlider.classList.remove('switch_bounce_right');
            localStorage.setItem('(/minecraft_repository_test/)' + this.id, 'on');
        } else {
            switchSlider.classList.add('switch_bounce_right');
            switchSlider.classList.remove('switch_bounce_left');
            localStorage.setItem('(/minecraft_repository_test/)' + this.id, 'off');
        }

        const switchStatus = this.querySelector(".switch_status");
        if (switchStatus) {
            switchStatus.textContent = `Toggle: ${isOn ? 'Open' : 'Close'}`;
        }
    }
}

customElements.define('custom-switch', CustomSwitch);


// 自定义Text Field文本框
class TextField extends HTMLElement {
    constructor() {
        super();
        const containerId = this.parentNode.id;
        this.classList.add(containerId);

        this.initialValue = '41';

        this.inputField = document.createElement('textarea');
        this.inputField.classList.add('input');
        this.appendChild(this.inputField);

        this.hint = document.createElement('div');
        this.hint.classList.add('hint');
        this.hint.textContent = this.getAttribute('hint') || '';
        this.appendChild(this.hint);

        this.status = this.getAttribute('status') === 'disabled' ? 'disabled' : 'enabled';
        if (this.status === 'disabled') {
            this.classList.add('disabled_text_field');
        } else {
            this.classList.remove('disabled_text_field');
        }

        const isSingleLine = this.getAttribute('single-line') || 'true';
        const type = this.getAttribute('type') || 'text';
        if (isSingleLine === 'true') {
            this.inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // 阻止换行
                }
            });
        }

        this.inputField.addEventListener('focus', () => {
            this.hint.style.opacity = '0';
        });

        this.inputField.addEventListener('blur', () => {
            this.updateHint();
        });

        this.isComposing = false;
        this.inputField.addEventListener('compositionstart', () => {
            this.isComposing = true;
        });

        this.inputField.addEventListener('compositionend', (e) => {
            this.isComposing = false;
            const inputValue = this.inputField.value;
            const {isValid, filtered} = this.isValidAndFilterInput(inputValue, type);
            if (!isValid) {
                this.inputField.value = filtered; // 过滤掉非法字符
                // 不保存到localStorage
                return; // 直接返回
            }
            this.saveValueToLocalStorage(); // 有效输入才保存
        });

        this.inputField.addEventListener('beforeinput', (e) => {
            if (!this.isComposing) { // 如果没有使用输入法
                const {isValid} = this.isValidAndFilterInput(e.data, type);
                if (!isValid) {
                    e.preventDefault(); // 阻止非法输入
                }
            }
        });

        this.inputField.addEventListener('input', () => {
            this.updateTextField();
            // 仅在输入有效时保存
            if (this.isValidAndFilterInput(this.inputField.value, type).isValid) {
                this.saveValueToLocalStorage();
            }
        });

        this.inputField.style.height = this.initialValue + 'px'; // 默认值
        this.style.height = this.initialValue + 'px'; // 默认值
        setTimeout(() => {
            this.updateTextField();
            this.loadValueFromLocalStorage();
        }, 100);
    }

    updateTextField() {
        this.updateHint();
        this.autoResize();
        this.updateContainerHeight();
    }

    updateHint() {
        const content = this.inputField.value;
        if (!document.activeElement.isSameNode(this.inputField) && content.length === 0) {
            this.hint.style.opacity = '1'; // 显示提示
        } else {
            this.hint.style.opacity = '0'; // 隐藏提示
        }
    }

    autoResize() {
        this.inputField.style.height = this.initialValue + 'px'; // 默认值
        this.style.height = this.initialValue + 'px'; // 默认值
        this.inputField.style.height = this.inputField.scrollHeight + 'px';
        this.style.height = this.inputField.scrollHeight + 'px';
    }

    updateContainerHeight() {
        const container = this.parentNode;
        container.style.height = this.inputField.scrollHeight + 20 + 'px';
    }

    isValidAndFilterInput(input, type) {
        if (!input) return {isValid: true, filtered: input}; // 如果没有输入，直接返回有效

        let regex;
        let filteredInput;

        switch (type) {
            case 'number':
                regex = /^[0-9]*$/;
                filteredInput = input.replace(/[^0-9]/g, ''); // 过滤非数字字符
                break;
            case 'letter':
                regex = /^[a-zA-Z]*$/;
                filteredInput = input.replace(/[^a-zA-Z]/g, ''); // 过滤非字母字符
                break;
            case 'operator':
                regex = /^[`!@#$%^&*()\-_=+[\]{};':"\\|,.<>\/?~]*$/;
                filteredInput = input.replace(/[^`!@#$%^&*()\-_=+[\]{};':"\\|,.<>\/?~]/g, ''); // 过滤非符号字符
                break;
            case 'base':
                regex = /^[0-9a-zA-Z `!@#$%^&*()\-_=+[\]{};':"\\|,.<>\/?~]*$/;
                filteredInput = input.replace(/[^0-9a-zA-Z `!@#$%^&*()\-_=+[\]{};':"\\|,.<>\/?~]/g, ''); // 过滤非基本字符
                break;
            case 'none':
                return {isValid: false, filtered: ''}; // 不允许任何字符
            default:
                return {isValid: true, filtered: input}; // 默认允许所有字符
        }

        // 返回有效性和过滤后的输入
        return {isValid: regex.test(input), filtered: filteredInput};
    }


    getValue() {
        return this.inputField.value;
    }

    resetValue() {
        this.inputField.value = '';
        this.updateTextField();
        this.saveValueToLocalStorage();
    }

    saveValueToLocalStorage() {
        const storageKey = '(/minecraft_repository_test/)text_field_value';
        const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
        storedData[this.classList[0]] = this.inputField.value; // 保存当前输入框的值
        localStorage.setItem(storageKey, JSON.stringify(storedData)); // 更新localStorage
    }

    loadValueFromLocalStorage() {
        const storageKey = '(/minecraft_repository_test/)text_field_value';
        const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
        if (storedData[this.classList[0]]) {
            this.inputField.value = storedData[this.classList[0]]; // 设置已保存的值
            this.updateTextField(); // 更新输入框显示
        }
    }
}

customElements.define('text-field', TextField);
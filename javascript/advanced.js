// 实验性

// 监视器配置
const observerConfig = {attributes: true, attributeFilter: ['class']};

// 创建一个 MutationObserver 实例，传入一个回调函数
const observer = new MutationObserver(function (mutationsList) {
    // 遍历所有发生变化的 mutation
    for (let mutation of mutationsList) {
        // 检查变化的是哪个元素
        if (mutation.target.id === 'switch_exp1' || mutation.target.id === 'switch_exp2') {
            // 更新状态提示
            const switchExp1 = document.getElementById("switch_exp1");
            const switchExp2 = document.getElementById("switch_exp2");
            const switch_status_exp1 = document.getElementById("switch_status_exp1");
            const switch_status_exp2 = document.getElementById("switch_status_exp2");
            let exp1IsOn = switchExp1.classList.contains("on");
            let exp2IsOn = switchExp2.classList.contains("on");
            switch_status_exp1.textContent = exp1IsOn ? "Toggle: Open" : "Toggle: Close";
            switch_status_exp2.textContent = exp2IsOn ? "Toggle: Open" : "Toggle: Close";
        }
    }
});

// 选择要观察变化的节点
const targetNode1 = document.getElementById('switch_exp1');
const targetNode2 = document.getElementById('switch_exp2');

// 开始观察目标节点
observer.observe(targetNode1, observerConfig);
observer.observe(targetNode2, observerConfig);

// 在页面加载时初始化Slider
window.addEventListener('DOMContentLoaded', function () {
    setupSlider([
        {
            sliderId: 'rangeSlider1',
            handleClass: 'smooth-handle',
            tooltipClass: 'smooth-tooltip',
            minValue: 0,
            maxValue: 100,
            segments: null,
            initialValue: 66.66
        },
        {
            sliderId: 'rangeSlider2',
            handleClass: 'smooth-handle',
            tooltipClass: 'smooth-tooltip',
            minValue: 20,
            maxValue: 60,
            segments: null,
            initialValue: null
        },
        {
            sliderId: 'setSlider1',
            handleClass: 'segmented-handle',
            tooltipClass: 'segmented-tooltip',
            minValue: 0,
            maxValue: 100,
            segments: 5,
            initialValue: null
        },
        {
            sliderId: 'setSlider2',
            handleClass: 'segmented-handle',
            tooltipClass: 'segmented-tooltip',
            minValue: 0,
            maxValue: 100,
            segments: 4,
            initialValue: 75
        }
    ]);
});


// 主代码

// Switch开关函数
const switchElement = document.getElementsByClassName("switch");
const toggleSlider = document.getElementsByClassName("toggle_slider");

// 添加点击事件监听器
for (let i = 0; i < switchElement.length; i++) {
    let isOn = switchElement[i].classList.contains("on");
    let startX = 0;
    let isDragging = false;

    switchElement[i].addEventListener("click", function () {
        isOn = !isOn;
        updateSwitchState(i, isOn);
    });

    switchElement[i].addEventListener("mousedown", function (e) {
        isDragging = true;
        toggleSlider[i].classList.add('active');
        startX = e.clientX;
    });

    switchElement[i].addEventListener("touchstart", function (e) {
        isDragging = true;
        toggleSlider[i].classList.add('active');
        startX = e.touches[0].clientX;
    });

    document.addEventListener("mouseup", function (e) {
        if (isDragging) {
            let currentX = e.clientX;
            if (currentX - startX > 10) {
                if (!isOn) {
                    isOn = true;
                    updateSwitchState(i, isOn);
                }
            } else if (currentX - startX < -10) {
                if (isOn) {
                    isOn = false;
                    updateSwitchState(i, isOn);
                }
            }
        }
        isDragging = false;
        toggleSlider[i].classList.remove('active');
    });

    document.addEventListener("touchend", function (e) {
        if (isDragging) {
            let currentX = e.changedTouches[0].clientX;
            if (currentX - startX > 10) {
                if (!isOn) {
                    isOn = true;
                    updateSwitchState(i, isOn);
                }
            } else if (currentX - startX < -10) {
                if (isOn) {
                    isOn = false;
                    updateSwitchState(i, isOn);
                }
            }
        }
        isDragging = false;
    toggleSlider[i].classList.remove('active');
    });
}

// 更新Switch开关状态函数
function updateSwitchState(index, isOn) {
    playSound1();
    switchElement[index].classList.toggle("on", isOn);
    switchElement[index].classList.toggle("off", !isOn);
    if (isOn) {
        toggleSlider[index].classList.add('toggle_bounce_left');
        toggleSlider[index].classList.remove('toggle_bounce_right');
        console.log("打开开关", switchElement[index].id);
    } else {
        toggleSlider[index].classList.add('toggle_bounce_right');
        toggleSlider[index].classList.remove('toggle_bounce_left');
        console.log("关闭开关", switchElement[index].id);
    }
}


// Slider滑动条函数
function setupSlider(sliderData) {

    sliderData.forEach(function (data) {
        // const content = document.getElementsByClassName('slider_content');
        const slider = document.getElementById(data.sliderId);
        const process = slider.querySelector('.slider-process');
        const handle = slider.querySelector('.' + data.handleClass);
        const tooltip = slider.querySelector('.' + data.tooltipClass);
        const minValue = data.minValue;
        const maxValue = data.maxValue;
        const segments = data.segments;
        const initialValue = data.initialValue || minValue; // 使用初始值或最小值作为默认值
        let currentValue = initialValue;
        let resizing = false;
        // 设置初始值并展示
        const initialPosition = (initialValue - minValue) / (maxValue - minValue) * 100;
        handle.style.left = initialPosition + '%';
        process.style.width = initialPosition + '%';

        if (slider.classList.contains('range_slider')) {
            // 设置平滑的slider

            let isDragging = false;
            tooltip.textContent = initialValue.toFixed(2);

            function updateValueSmoothSlider(posX) {
                const smoothIndex = ((posX) / (slider.offsetWidth - 4));
                currentValue = smoothIndex * (maxValue - minValue) + minValue;
                tooltip.textContent = currentValue.toFixed(2);
            }

            function updateSmoothSlider(e) {
                updateProcessBar(updateSlider(e));
                updateValueSmoothSlider(updateSlider(e));
            }

            function handleDragSmoothSlider(e) {
                if (isDragging) {
                    updateSmoothSlider(e);
                }
            }

            handle.addEventListener('mousedown', function () {
                process.style.transition = 'none';
                handle.style.transition = 'none';
                isDragging = true;
            });

            document.addEventListener('mousemove', handleDragSmoothSlider);

            document.addEventListener('mouseup', function () {
                isDragging = false;
                process.style.transition = 'width 100ms linear';
                handle.style.transition = 'left 100ms linear';
                handle.classList.remove('active');
            });

            handle.addEventListener('touchstart', function () {
                process.style.transition = 'none';
                handle.style.transition = 'none';
                isDragging = true;
            });

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    handleDragSmoothSlider(e.touches[0]); // 使用第一个触摸点的位置
                    e.preventDefault();
                }
            });

            document.addEventListener('touchend', function () {
                isDragging = false;
                process.style.transition = 'width 100ms linear';
                handle.style.transition = 'left 100ms linear';
                handle.classList.remove('active');
            });

            slider.addEventListener('touchstart', function (e) {
                e.preventDefault();
            });

            slider.addEventListener('click', function (e) {
                let posX = e.clientX - slider.getBoundingClientRect().left;
                handle.style.left = posX + 'px';
                updateProcessBar(posX);
                updateValueSmoothSlider(posX);
            });

            // 添加最小值和最大值提示
            const minValueLabel = document.createElement('div');
            minValueLabel.textContent = minValue.toFixed(2);
            minValueLabel.style.position = 'absolute';
            minValueLabel.style.bottom = '-35px';
            slider.appendChild(minValueLabel);

            const minValueLabelWidth = minValueLabel.offsetWidth;
            minValueLabel.style.left = `calc(0% - ${minValueLabelWidth / 2}px)`;

            const maxValueLabel = document.createElement('div');
            maxValueLabel.textContent = maxValue.toFixed(2);
            maxValueLabel.style.position = 'absolute';
            maxValueLabel.style.bottom = '-35px';
            slider.appendChild(maxValueLabel);

            const maxValueLabelWidth = maxValueLabel.offsetWidth;
            maxValueLabel.style.left = `calc(100% - ${maxValueLabelWidth / 2}px)`;

        } else if (slider.classList.contains('set_slider')) {
            // 设置分段的slider

            const segmentWidth = 100 / segments;
            let isDragging = false;
            tooltip.textContent = initialValue.toFixed(2).replace(/\.?0+$/, '');

            function updateValueSegmentSlider(posX) {
                const segmentIndex = Math.round(posX / ((slider.offsetWidth - 4) / segments));
                currentValue = segmentIndex * segmentWidth + minValue;
                tooltip.textContent = currentValue.toFixed(2).replace(/\.?0+$/, '');
                updateProcessBar(posX);
            }

            function updateSegmentSlider(e) {
                let posX = e.clientX - slider.getBoundingClientRect().left;
                updateSlider(e);
                updateProcessBar(posX);
            }

            function handleDragSegmentSlider(e) {
                if (isDragging) {
                    updateSegmentSlider(e);
                }
            }

            function moveEnd() {
                isDragging = false;
                const segmentIndex = Math.round(handle.offsetLeft / ((slider.offsetWidth - 4) / segments));
                const segmentPosition = segmentIndex * ((slider.offsetWidth - 4) / segments);
                handle.style.left = segmentPosition + 'px';
                handle.classList.remove('active');
                updateValueSegmentSlider(segmentPosition);
            }

            handle.addEventListener('mousedown', function () {
                isDragging = true;
            });

            document.addEventListener('mousemove', handleDragSegmentSlider);

            document.addEventListener('mouseup', function () {
                moveEnd();
            });

            handle.addEventListener('touchstart', function () {
                isDragging = true;
            });

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    handleDragSegmentSlider(e.touches[0]); // 使用第一个触摸点的位置
                    e.preventDefault();
                }
            });

            document.addEventListener('touchend', function () {
                moveEnd();
            });

            slider.addEventListener('touchstart', function (e) {
                // handleDragSegmentSlider(e.touches[0]); // 使用第一个触摸点的位置
                e.preventDefault();
            });

            slider.addEventListener('click', function (e) {
                let posX = e.clientX - slider.getBoundingClientRect().left;
                if (posX < 0) {
                    posX = 0;
                } else if (posX > (slider.offsetWidth - 4)) {
                    posX = (slider.offsetWidth - 4);
                }
                const segmentIndex = Math.round(posX / ((slider.offsetWidth - 4) / segments));
                const segmentPosition = segmentIndex * ((slider.offsetWidth - 4) / segments);
                handle.style.left = segmentPosition + 'px';
                updateValueSegmentSlider(segmentPosition);
            });

            // 添加分段处提示数值
            if (segments) {
                for (let i = 0; i < segments + 1; i++) {
                    const segmentValueLabel = document.createElement('div');
                    const segmentValue = minValue + i * (maxValue - minValue) / segments;
                    segmentValueLabel.textContent = segmentValue.toFixed(2).replace(/\.?0+$/, '');
                    segmentValueLabel.style.position = 'absolute';
                    segmentValueLabel.style.bottom = '-35px';
                    slider.appendChild(segmentValueLabel);

                    // 获取标签宽度
                    const labelWidth = segmentValueLabel.offsetWidth;
                    segmentValueLabel.style.left = `calc(${(i / segments) * 100}% - ${labelWidth / 2}px)`;
                }
            }

            // 创建分段线
            if (segments) {
                for (let i = 1; i < segments; i++) {
                    const segment = document.createElement('div');
                    segment.classList.add('slider-segment');
                    segment.style.left = `calc(${segmentWidth * i}% - 1px)`;
                    slider.appendChild(segment);
                }
            }
        }

        function updateSlider(e) {
            let posX = e.clientX - slider.getBoundingClientRect().left;
            handle.classList.add('active');
            if (posX < 0) {
                posX = 0;
            } else if (posX > (slider.offsetWidth - 4)) {
                posX = (slider.offsetWidth - 4);
            }
            handle.style.left = posX + 'px';
            return posX;
        }

        function updateHandle() {
            const rect = slider.getBoundingClientRect();
            const newPosition = (currentValue - minValue) / (maxValue - minValue) * (rect.width - 4);
            handle.style.left = newPosition + 'px';
        }

        function updateProcessBar(posX) {
            process.style.width = posX + 'px';
        }

        window.addEventListener('resize', function () {
            if (!resizing) {
                resizing = true;
                setTimeout(function () {
                    resizing = false;
                }, 0);
                process.style.transition = 'none';
                handle.style.transition = 'none';
                updateHandle();
                updateProcessBar(handle.offsetLeft);
                setTimeout(function () {
                    process.style.transition = 'width 100ms linear';
                    handle.style.transition = 'left 100ms linear';
                }, 0);
            }
        });
    });
}
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
            sliderId: 'smoothSlider1',
            sliderClass: 'smooth-slider',
            processClass: 'slider-process',
            handleClass: 'smooth-handle',
            tooltipClass: 'smooth-tooltip',
            minValue: 0,
            maxValue: 100,
            segments: null,
            initialValue: 66.66
        },
        {
            sliderId: 'smoothSlider2',
            sliderClass: 'smooth-slider',
            processClass: 'slider-process',
            handleClass: 'smooth-handle',
            tooltipClass: 'smooth-tooltip',
            minValue: 20,
            maxValue: 60,
            segments: null,
            initialValue: null
        },
        {
            sliderId: 'segmentedSlider1',
            sliderClass: 'segmented-slider',
            processClass: 'slider-process',
            handleClass: 'segmented-handle',
            tooltipClass: 'segmented-tooltip',
            minValue: 0,
            maxValue: 100,
            segments: 5,
            initialValue: null
        },
        {
            sliderId: 'segmentedSlider2',
            sliderClass: 'segmented-slider',
            processClass: 'slider-process',
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
        startX = e.clientX;
    });

    switchElement[i].addEventListener("touchstart", function (e) {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    // document.addEventListener("mousemove", function (e) {
    //
    // });
    //
    // document.addEventListener("touchmove", function (e) {
    //
    // });

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
        const slider = document.getElementById(data.sliderId);
        const process = slider.querySelector('.' + data.processClass);
        const handle = slider.querySelector('.' + data.handleClass);
        const tooltip = slider.querySelector('.' + data.tooltipClass);
        const minValue = data.minValue;
        const maxValue = data.maxValue;
        const segments = data.segments;
        const initialValue = data.initialValue || minValue; // 使用初始值或最小值作为默认值
        let currentValue = initialValue;
        let resizing = false;
        // 设置初始值并展示
        const initialPosition = (initialValue - minValue) / (maxValue - minValue) * slider.offsetWidth;
        handle.style.left = initialPosition + 'px';
        process.style.width = initialPosition + 'px';

        if (slider.classList.contains('smooth-slider')) {
            // 设置平滑的slider

            let isDragging = false;
            tooltip.textContent = initialValue.toFixed(2);

            function updateValueSmoothSlider(posX) {
                updateProcessBar(posX); // 更新进度条背景
                currentValue = ((posX / slider.offsetWidth) * (maxValue - minValue)) + minValue;
                tooltip.textContent = currentValue.toFixed(2);
                // document.getElementById('smoothValue').textContent = `Smooth Slider: ${value.toFixed(2)}`;
            }

            function handleDragSmoothSlider(e) {
                if (isDragging) {
                    let posX = e.clientX - slider.getBoundingClientRect().left;
                    if (posX < 0) {
                        posX = 0;
                    } else if (posX > slider.offsetWidth) {
                        posX = slider.offsetWidth;
                    }
                    handle.style.left = posX + 'px';
                    updateValueSmoothSlider(posX);
                }
            }

            handle.addEventListener('mousedown', function (e) {
                isDragging = true;
                process.style.transition = 'none';
                handle.style.transition = 'none';
                handleDragSmoothSlider(e);
            });

            document.addEventListener('mousemove', handleDragSmoothSlider);

            document.addEventListener('mouseup', function () {
                isDragging = false;
                process.style.transition = 'width 100ms linear';
                handle.style.transition = 'left 100ms linear';
            });

            handle.addEventListener('touchstart', function (e) {
                isDragging = true;
                process.style.transition = 'none';
                handle.style.transition = 'none';
                handleDragSmoothSlider(e.touches[0]); // 使用第一个触摸点的位置
            });

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    handleDragSmoothSlider(e.touches[0]); // 使用第一个触摸点的位置
                    e.preventDefault(); // 防止默认的滚动行为
                }
            });

            document.addEventListener('touchend', function () {
                isDragging = false;
                process.style.transition = 'width 100ms linear';
                handle.style.transition = 'left 100ms linear';
            });

            slider.addEventListener('touchstart', function (e) {
                handleDragSmoothSlider(e.touches[0]); // 使用第一个触摸点的位置
                e.preventDefault(); // 防止默认的滚动行为
            });

            slider.addEventListener('click', function (e) {
                let posX = e.clientX - slider.getBoundingClientRect().left;
                if (posX < 0) {
                    posX = 0;
                } else if (posX > slider.offsetWidth) {
                    posX = slider.offsetWidth;
                }
                handle.style.left = posX + 'px';
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

        } else if (slider.classList.contains('segmented-slider')) {
            // 设置分段的slider

            const segmentWidth = 100 / segments;
            let isDragging = false;
            tooltip.textContent = initialValue.toFixed(2).replace(/\.?0+$/, '');

            function updateValueSegmentSlider(posX) {
                updateProcessBar(posX);
                const segmentIndex = Math.round(posX / (slider.offsetWidth / segments));
                currentValue = segmentIndex * segmentWidth + minValue;
                tooltip.textContent = currentValue.toFixed(2).replace(/\.?0+$/, '');
                // document.getElementById('segmentedValue').textContent = `Segmented Slider: ${value.toFixed(2).replace(/\.?0+$/, '')}`;
            }

            function handleDragSegmentSlider(e) {
                if (isDragging) {
                    let posX = e.clientX - slider.getBoundingClientRect().left;
                    updateProcessBar(posX);
                    if (posX < 0) {
                        posX = 0;
                    } else if (posX > slider.offsetWidth) {
                        posX = slider.offsetWidth;
                    }
                    handle.style.left = posX + 'px';
                }
            }

            handle.addEventListener('mousedown', function (e) {
                isDragging = true;
                handleDragSegmentSlider(e);
            });

            document.addEventListener('mousemove', handleDragSegmentSlider);

            document.addEventListener('mouseup', function () {
                isDragging = false;
                const segmentIndex = Math.round(handle.offsetLeft / (slider.offsetWidth / segments));
                const segmentPosition = segmentIndex * (slider.offsetWidth / segments);
                handle.style.left = segmentPosition + 'px';
                updateValueSegmentSlider(segmentPosition);
            });

            handle.addEventListener('touchstart', function (e) {
                isDragging = true;
                handleDragSegmentSlider(e.touches[0]); // 使用第一个触摸点的位置
            });

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    handleDragSegmentSlider(e.touches[0]); // 使用第一个触摸点的位置
                    updateProcessBar(e.touches[0]);
                    e.preventDefault(); // 防止默认的滚动行为
                }
            });

            document.addEventListener('touchend', function () {
                isDragging = false;
                const segmentIndex = Math.round(handle.offsetLeft / (slider.offsetWidth / segments));
                const segmentPosition = segmentIndex * (slider.offsetWidth / segments);
                handle.style.left = segmentPosition + 'px';
                updateValueSegmentSlider(segmentPosition);
            });

            slider.addEventListener('touchstart', function (e) {
                handleDragSegmentSlider(e.touches[0]); // 使用第一个触摸点的位置
                updateProcessBar(e.touches[0]);
                e.preventDefault(); // 防止默认的滚动行为
            });

            slider.addEventListener('click', function (e) {
                let posX = e.clientX - slider.getBoundingClientRect().left;
                if (posX < 0) {
                    posX = 0;
                } else if (posX > slider.offsetWidth) {
                    posX = slider.offsetWidth;
                }
                const segmentIndex = Math.round(posX / (slider.offsetWidth / segments));
                const segmentPosition = segmentIndex * (slider.offsetWidth / segments);
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

        function replaceHandle() {
            const rect = slider.getBoundingClientRect();
            const newPosition = (currentValue - minValue) / (maxValue - minValue) * rect.width;
            handle.style.left = newPosition + 'px';
        }

        function updateProcessBar(posX) {
            const value = posX / slider.offsetWidth;
            process.style.width = `${value * 100}%`;
        }

        window.addEventListener('resize', function () {
            if (!resizing) {
                resizing = true;
                setTimeout(function () {
                    resizing = false;
                }, 0);
                process.style.transition = 'none';
                handle.style.transition = 'none';
                replaceHandle();
                updateProcessBar(handle.offsetLeft);
                setTimeout(function () {
                    process.style.transition = 'width 100ms linear';
                    handle.style.transition = 'left 100ms linear';
                }, 0);
            }
        });
    });
}
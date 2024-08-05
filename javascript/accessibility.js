// 焦点事件

// 选择多个类名、ID 和自定义元素

// 移除焦点列表
const exclusionSelectors = [
    'button'
];
// 新增焦点列表
const inclusionSelectors = [
    '.header_item:not(.header_right_blank)',
    '#banner_tip',
    'modal_close_btn',
    'modal_checkbox_area',
    '.edition_block',
    '.btn:not(.disabled_btn)',
    '.tab_bar_btn',
    '.expandable_card',
    '.plan_block',
    '.switch:not(.disabled_switch) .switch_slider',
    '.slider_slider:not(.disabled_slider)'
];

// 生成选择器字符串
const exclusionSelectorString = exclusionSelectors.join(', ');
const inclusionSelectorString = inclusionSelectors.join(', ');

// 选择所有匹配的元素
const exclusionElements = document.querySelectorAll(exclusionSelectorString);
const inclusionElements = document.querySelectorAll(inclusionSelectorString);

// 为每个选中的元素设置 tabindex 属性
exclusionElements.forEach(exclusionElement => {
    exclusionElement.setAttribute('tabindex', '-1');
});

inclusionElements.forEach(inclusionElement => {
    inclusionElement.setAttribute('tabindex', '0');
    inclusionElement.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            inclusionElement.click();
        }
    });
});


// 弹窗焦点陷阱
function updateFocusableElements() {
    const modals = document.querySelectorAll('modal');
    modals.forEach((modal) => {
        // 移除旧的事件监听器
        const oldHandler = (e) => {
            if (e.key === 'Tab') {
                handleTabNavigation(e, modal);
            }
        };
        modal.removeEventListener('keydown', oldHandler);

        // 更新焦点元素
        const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]):not(.disabled_btn), iframe, object, embed, [tabindex="0"], [contenteditable]';
        let focusableElements = modal.querySelectorAll(focusableElementsString);
        focusableElements = Array.from(focusableElements);

        const firstTabStop = focusableElements[0];
        const lastTabStop = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => handleTabNavigation(e, modal));

        // 聚焦模态框内的第一个可聚焦元素
        modal.addEventListener('shown.modal', () => {
            if (firstTabStop) {
                firstTabStop.focus();
            }
        });
    });
}

function handleTabNavigation(e, modal) {
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]):not(.disabled_btn), custom-checkbox:not(.disabled), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    focusableElements = Array.from(focusableElements);

    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstTabStop) {
                e.preventDefault();
                lastTabStop.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastTabStop) {
                e.preventDefault();
                firstTabStop.focus();
            }
        }
    }
}

updateFocusableElements();
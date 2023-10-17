let sidebarOpen = false;
let overlayShow = false;

const startTime = new Date().getTime();
const audioInstances = [];
const main = document.getElementById("main");

const currentURL = window.location.href;

window.addEventListener("error", function (event) {
    console.error("错误: ", event.message);
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("页面加载完成!");
    if (currentURL.startsWith('file:///')) {
        console.log('当前运行在本地');
    } else {
        if (currentURL.includes('github.io/')) {
            console.log("当前运行在Github");
        } else if (currentURL.includes('gitee.io/')) {
            console.log("当前运行在Gitee");
        } else {
            console.log("当前运行在" + currentURL);
        }
        if (currentURL.includes('test')) {
            console.log("环境为测试环境");
        } else {
            console.log("环境为标准环境");
        }
    }
});

window.addEventListener("load", function () {
    const endTime = new Date().getTime();
    let loadTime = endTime - startTime;
    console.log("页面加载耗时: " + loadTime + "ms");
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebarOpen) {
        sidebar.style.width = "0";
        console.log("侧边栏执行收起操作");
    } else {
        sidebar.style.width = "160px";
        console.log("侧边栏执行展开操作");
    }
    sidebarOpen = !sidebarOpen;
    console.log("更新侧边栏状态成功");
}

function toggleOverlay() {
    const overlay_main = document.getElementById("overlay_main");
    if (overlayShow) {
        overlay_main.style.display = "none";
        console.log("遮罩成功隐藏");
    } else {
        overlay_main.style.display = "block";
        console.log("遮罩成功显示");
    }
    overlayShow = !overlayShow;
    console.log("更新遮罩状态成功");
}

// 按键音效
function playSound(button) {
    if (button.classList.contains("normal_btn") || button.classList.contains("red_btn")) {
        console.log("选择播放点击音效");
        playSound1();
    } else if (button.classList.contains("green_btn")) {
        console.log("选择播放按钮音效");
        playSound2();
    }
}

function clickedMenu() {
    playSound1();
    toggleSidebar();
    toggleOverlay();
}

function clickedBack() {
    playSound1();
    if (window.history.length <= 1) {
        console.log("关闭窗口");
        setTimeout(function () {
            window.close();
        }, 160);
    } else {
        console.log("返回上一级页面");
        setTimeout(function () {
            window.history.back();
        }, 160);
    }
}

function clickedOverlay() {
    toggleSidebar();
    toggleOverlay();
}

function clickedRepo() {
    playSound1();
    window.open("https://github.com/Spectrollay/minecraft_repository");
}

function clickedSidebarBottomBtn() {
    playSound1();
    window.open("https://github.com/Spectrollay/minecraft_kit");
}

function jumpToPage(link) {
    playSound1();
    setTimeout(function () {
    window.location.href = link;
    }, 160);
}

// 回到网页顶部
function scrollToTop() {
    main.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    console.log("成功执行回到顶部操作");
}
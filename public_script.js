let sidebarOpen = false;
let overlayShow = false;
const audioInstances = [];
const main = document.getElementById("main");

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebarOpen) {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "160px";
    }
    sidebarOpen = !sidebarOpen;
}

function toggleOverlay() {
    const overlay_main = document.getElementById("overlay_main");
    if (overlayShow) {
        overlay_main.style.display = "none";
    } else {
        overlay_main.style.display = "block";
    }
    overlayShow = !overlayShow;
}

// 按键音效
function playSound1() {
    const audio = new Audio("./sounds/click.ogg");
    audioInstances.push(audio);
    audio.play().then();
}

function playSound2() {
    const audio = new Audio("./sounds/button.ogg");
    audioInstances.push(audio);
    audio.play().then();
}

function playSound(button) {
    if (button.classList.contains("normal_btn") || button.classList.contains("red_btn")) {
        playSound1();
    } else if (button.classList.contains("green_btn")) {
        playSound2();
    }
}

// 回到网页顶部
function scrollToTop() {
    main.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
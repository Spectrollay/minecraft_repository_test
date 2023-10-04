let sidebarOpen = false;
let overlayShow = false;
const audioInstances = [];

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
    const overlay = document.getElementById("overlay");
    if (overlayShow) {
        overlay.style.display = "none";
    } else {
        overlay.style.display = "block";
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
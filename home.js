let sidebarOpen = false;
let overlayShow = false;

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

function clickedMenu() {
    toggleSidebar();
    toggleOverlay();
}

function clickedOverlay() {
    toggleSidebar();
    toggleOverlay();
}

function clickedRepo() {
    window.open("https://github.com/Spectrollay/Minecraft_Repository");
}

function clickedMainBtn() {
    window.open("https://github.com/Spectrollay/Minecraft_Kit");
}
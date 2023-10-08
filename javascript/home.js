function clickedMenu() {
    playSound1();
    toggleSidebar();
    toggleOverlay();
}

function clickedOverlay() {
    toggleSidebar();
    toggleOverlay();
}

function clickedRepo() {
    playSound1();
    window.open("https://github.com/Spectrollay/minecraft_repository");
}

function clickedMainBtn() {
    playSound1();
    window.open("https://github.com/Spectrollay/minecraft_kit");
}

function jumpToPage(link) {
    playSound1();
    window.location.href = link;
}
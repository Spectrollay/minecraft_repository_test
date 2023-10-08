document.addEventListener("DOMContentLoaded", function() {
    console.log("页面加载完成");
    const audio = new Audio("../sounds/none.mp3");
    audioInstances.push(audio);
    audio.play().then();
    console.log("音频资源加载完成");
});

function playSound1() {
    const audio = new Audio("../sounds/click.ogg");
    audioInstances.push(audio);
    audio.play().then();
    console.log("播放点击音效成功");
}

function playSound2() {
    const audio = new Audio("../sounds/button.ogg");
    audioInstances.push(audio);
    audio.play().then();
    console.log("播放按钮音效成功");
}
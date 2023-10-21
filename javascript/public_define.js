let previousTipIndex = -2;
let currentTipIndex = -1;
const tipElement = document.getElementById("tip");

const texts = {
    jump_text: "点击前往下载页面",
    back_to_main: "返回首页",
    sidebar_bottom_btn: "官方网站",
    page_info_title1: "INFORMATION",
    page_info_detail1: "Version: 4.2-Preview8<br>Server Version: 4.0<br>Updated: 2023-10-21-01",
    page_info_title2: "ABOUT US",
    page_info_detail2: "<span>Developer: @Spectrollay<br>Maintainer: @Spectrollay<br>Chat Group: [<a href=\"https://t.me/Spectrollay_MCW\" target=\"_blank\" onclick=\"playSound1();\">Telegram</a>] [<a href=\"https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WVA6aPqtv99hiYleW7vUq5OsBIufCAB1&authKey=B0%2BaXMCTqnmQrGh0wzCZTyWTIPyHS%2FPEM5QXcFfVwroFowNnzs6Yg1er1%2F8Fekqp&noverify=0&group_code=833473609\" target=\"_blank\" onclick=\"playSound1();\">QQ</a>] [<a href=\"https://yhfx.jwznb.com/share?key=VyTE7W7sLwRl&ts=1684642802\" target=\"_blank\" onclick=\"playSound1();\">云湖</a>]<span>",
};

const tipsWithWeights = [
    {
        text: "<span>本站有<a href=\"https://spectrollay.github.io/minecraft_repository/home.html\" target=\"_blank\" onclick=\"playSound1();\">国外源</a>和<a href=\"https://spectrollay.gitee.io/minecraft_repository/home.html\" target=\"_blank\" onclick=\"playSound1();\">国内源</a>,如遇加载问题可以切换线路访问.</span>",
        weight: 5
    },
    {
        text: "<span>发现问题或有好的建议?<a href=\"https://github.com/Spectrollay/minecraft_repository/issues/new\" target=\"_blank\" onclick=\"playSound1();\">欢迎提出</a>!</span>",
        weight: 5
    },
    {
        text: "<span>想和大家一起闲聊吹水?<br>快加入<a href=\"https://t.me/Spectrollay_MCW\" target=\"_blank\" onclick=\"playSound1();\">Telegram</a> / <a href=\"https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WVA6aPqtv99hiYleW7vUq5OsBIufCAB1&authKey=B0%2BaXMCTqnmQrGh0wzCZTyWTIPyHS%2FPEM5QXcFfVwroFowNnzs6Yg1er1%2F8Fekqp&noverify=0&group_code=833473609\" target=\"_blank\" onclick=\"playSound1();\">QQ</a> / <a href=\"https://yhfx.jwznb.com/share?key=VyTE7W7sLwRl&ts=1684642802\" target=\"_blank\" onclick=\"playSound1();\">云湖</a>群聊!</span>",
        weight: 5
    },
    {
        text: "<span>也来看看我们的<a href=\"https://github.com/Spectrollay/mclang_cn\" target=\"_blank\" onclick=\"playSound1();\">中文译名修正项目</a>!</span>",
        weight: 5
    },
    {text: "感谢你参加测试!", weight: 4},
    {text: "我们欢迎你的反馈!", weight: 4},
    {text: "想和我们聊聊预览版?前往官方群组和开发者面对面交流!", weight: 4},
    {text: "请注意,这并不是最终成品.你可能会遇到崩溃,故障或其他奇怪的问题.", weight: 4},
    {text: "不要担心漏洞,因为在预览版中发现漏洞意味着之后的漏洞会少一些！", weight: 4},
    {text: "← 点击这里可以切换提示 →", weight: 3},
    {text: "↑ 点击标题栏可以快速回到顶部 ↑", weight: 3},
    {text: "除另有声明,转载时均必须注明出处!", weight: 3},
    {text: "你知道吗,版本库界面的构建花费了两天的时间.", weight: 2},
    {text: "向我们捐赠以支持维护和开发!", weight: 2},
    {text: "别杀怪物,你这个海豚!", weight: 2},
    {text: "95%OreUI!", weight: 2},
    {text: "真的有人会看这些吗?", weight: 2},
    {text: "这是一条永远不会出现的提示.", weight: 0}
];

console.log("加载常量和变量完成");

const editionBlocks = document.getElementsByClassName("edition_block");
for (let i = 0; i < editionBlocks.length; i++) {
    editionBlocks[i].innerHTML = texts.jump_text;
}

const backToMainTexts = document.getElementsByClassName("back_to_main");
for (let i = 0; i < backToMainTexts.length; i++) {
    backToMainTexts[i].innerHTML = texts.back_to_main;
}

document.getElementById("page_info_title1").innerHTML = texts.page_info_title1;
document.getElementById("page_info_detail1").innerHTML = texts.page_info_detail1;
document.getElementById("page_info_title2").innerHTML = texts.page_info_title2;
document.getElementById("page_info_detail2").innerHTML = texts.page_info_detail2;
document.getElementById("sidebar_bottom_btn").innerHTML = texts.sidebar_bottom_btn;
console.log("字符常量已成功应用");

// 加载网页时的提示
tipElement.innerHTML = getRandomTip();
console.log("提示已选择成功");

function getRandomTip() {
    const totalWeight = tipsWithWeights.reduce((acc, tip) => acc + tip.weight, 0);
    console.log("总权重:" + totalWeight + ",上次选中值:" + previousTipIndex + ",当前选中值" + currentTipIndex);
    console.log("开始选择");
    let accumulatedWeight = 0;
    for (const tip of tipsWithWeights) {
        accumulatedWeight += tip.weight;
        let randomWeight = Math.random() * totalWeight;
        if (randomWeight <= accumulatedWeight) {
            previousTipIndex = currentTipIndex;
            currentTipIndex = tipsWithWeights.indexOf(tip);
            if (currentTipIndex === previousTipIndex) {
                console.log("当前选中值与上次选中值相同!");
                randomWeight = Math.random() * (totalWeight - tip.weight);
                accumulatedWeight = 0;
                for (const tip_new of tipsWithWeights) {
                    if (tip_new !== tip) {
                        accumulatedWeight += tip_new.weight;
                        if (randomWeight <= accumulatedWeight) {
                            previousTipIndex = currentTipIndex;
                            currentTipIndex = tipsWithWeights.indexOf(tip_new);
                            console.log("更新后的上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
                            return tip_new.text;
                        }
                    }
                }
            } else {
                console.log("当前选中值与上次选中值不同.");
                console.log("上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
                return tip.text;
            }
        }
    }
}

tipElement.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        console.log("检测到点击了链接,不执行切换提示操作");
    } else {
        tipElement.innerHTML = getRandomTip();
    }
});
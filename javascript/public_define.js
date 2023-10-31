let previousTipIndex = -2;
let currentTipIndex = -1;
const tipElement = document.getElementById("tip");

const texts = {
    preview_title: "欢迎观看设计预览!",
    preview_detail1: "我们想听听你对这个新设计的意见.",
    preview_detail2: "请注意: 新设计还未完工,可能会缺失部分功能.",
    preview_btn1: "更新历史",
    preview_btn2: "<img class=\"link_img\" src=\"\" alt=\"link\"/>提出反馈",
    page_info_title1: "INFORMATION",
    page_info_detail1: "Version: 4.3-Preview2<br>Server Version: 4.0<br>Updated: 2023-10-31-12",
    page_info_title2: "ABOUT US",
    page_info_detail2: "<span>Developer: @Spectrollay<br>Maintainer: @Spectrollay<br>Chat Group: [<a href=\"https://t.me/Spectrollay_MCW\" target=\"_blank\" onclick=\"playSound1();\">Telegram</a>] [<a href=\"https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WVA6aPqtv99hiYleW7vUq5OsBIufCAB1&authKey=B0%2BaXMCTqnmQrGh0wzCZTyWTIPyHS%2FPEM5QXcFfVwroFowNnzs6Yg1er1%2F8Fekqp&noverify=0&group_code=833473609\" target=\"_blank\" onclick=\"playSound1();\">QQ</a>] [<a href=\"https://yhfx.jwznb.com/share?key=VyTE7W7sLwRl&ts=1684642802\" target=\"_blank\" onclick=\"playSound1();\">云湖</a>]<span>",
    jump_text: "点击前往下载页面",
    back_to_main: "返回首页",
    sidebar_bottom_title: "Minecraft Kit",
    sidebar_bottom_detail1: "© 2020 Spectrollay",
    sidebar_bottom_btn: "官方网站",
    minecraft_wiki: "中文Minecraft Wiki",
    download_btn1: "官方原版",
    download_btn1_1: "<img class=\"link_img_black\" src=\"\" alt=\"link\"/>官方原版(外部链接)",
    download_btn2: "中文译名修正",
    download_btn3: "去验证版",
    download_btn4: "默认云盘",
    download_btn5: "蓝奏云盘",
    download_btn6: "123云盘",
    download_btn7: "天翼云盘",
    download_btn8: "百度云盘",
    download_btn9: "<img class=\"link_img_black\" src=\"\" alt=\"link\"/>外部链接",
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

const buttons = document.querySelectorAll('.btn');

function updateButtonText(button) {
    const textKey = button.getAttribute('text-generation');
    if (textKey !== null) {
        button.innerHTML = texts[textKey];
    }
}

buttons.forEach(button => {
    updateButtonText(button);
});

const editionBlocks = document.getElementsByClassName("edition_block");
if (editionBlocks) {
    for (let i = 0; i < editionBlocks.length; i++) {
        editionBlocks[i].innerHTML = texts.jump_text;
    }
} else {
}

const wikiTexts = document.getElementsByClassName("wiki");
if (wikiTexts) {
    for (let i = 0; i < wikiTexts.length; i++) {
        wikiTexts[i].innerHTML = texts.minecraft_wiki;
    }
} else {
}

const backToMainTexts = document.getElementsByClassName("back_to_main");
if (backToMainTexts) {
    for (let i = 0; i < backToMainTexts.length; i++) {
        backToMainTexts[i].innerHTML = texts.back_to_main;
    }
} else {
}

const setElementText = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = text;
    } else {
    }
}

setElementText("page_info_title1", texts.page_info_title1);
setElementText("page_info_detail1", texts.page_info_detail1);
setElementText("page_info_title2", texts.page_info_title2);
setElementText("page_info_detail2", texts.page_info_detail2);
setElementText("sidebar_bottom_title", texts.sidebar_bottom_title);
setElementText("sidebar_bottom_detail1", texts.sidebar_bottom_detail1);
setElementText("sidebar_bottom_btn", texts.sidebar_bottom_btn);
setElementText("preview_title", texts.preview_title);
setElementText("preview_detail1", texts.preview_detail1);
setElementText("preview_detail2", texts.preview_detail2);
setElementText("preview_btn1", texts.preview_btn1);
setElementText("preview_btn2", texts.preview_btn2);

console.log("字符常量已成功应用");

// 加载网页时的提示
if (tipElement) {
    tipElement.innerHTML = getRandomTip();
    console.log("提示已选择成功");
} else {
    console.log("未发现提示框");
}

function getRandomTip() {
    const totalWeight = tipsWithWeights.reduce((acc, tip) => acc + tip.weight, 0);
    console.log("总权重:" + totalWeight + ",上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
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
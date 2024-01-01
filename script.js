// script.js
var isPlaying = false; // 标志变量，初始值为false

function playVideo() {
    if (isPlaying) {
        return; // 如果正在播放视频，则不执行后续操作
    }

    isPlaying = true; // 设置标志变量为true，表示正在播放视频

    var video = document.getElementById("video");
    var characterImage = document.getElementById("characterImage");
    var backgroundImage = document.getElementById("backgroundImage");
    var c10 = document.getElementById("c10");
    var c10text = document.getElementById("c10text");
    var c1 = document.getElementById("c1");
    var c1text = document.getElementById("c1text");
    var gachabg = document.getElementById("gachabg");
    var gotItem = document.createElement("img"); // 创建图片元素
    var kokomi = document.createElement("img"); // 创建图片元素
    var randomNameElement = document.createElement("div"); // 创建div元素

    // 隐藏角色图片和背景图片
    characterImage.classList.add("hidden");
    backgroundImage.classList.add("hidden");
    gachabg.classList.add("hidden");
    // 隐藏按钮
    c10.classList.add("hidden");
    c10text.classList.add("hidden");
    c1.classList.add("hidden");
    c1text.classList.add("hidden");

    // 显示视频并播放
    video.style.display = "block";
    video.play();

    // 移除之前绑定的ended事件监听器
    video.removeEventListener("ended", handleVideoEnded);

    // 定义视频播放结束时的处理函数
    function handleVideoEnded() {
        // 显示背景图片
        backgroundImage.style.backgroundImage = 'url("/img/gotitem.webp")';
        backgroundImage.style.backgroundSize = "cover";
        backgroundImage.style.backgroundPosition = "center";
        backgroundImage.style.width = "50%";

        // 显示图片/img/kokomi.png在/img/gotitem.webp的图层正上方
        kokomi.src = "/img/kokomi.png";
        kokomi.style.position = "absolute";
        kokomi.style.top = "10%";
        kokomi.style.left = "17%";
        kokomi.style.width = "70%";
        kokomi.style.zIndex = "100"

        document.body.appendChild(kokomi);

        // 显示随机的名字在图片的正下方
        fetch("names.txt")
            .then(response => response.text())
            .then(data => {
                var names = data.split("\n");
                var randomIndex = Math.floor(Math.random() * names.length);
                var randomName = names[randomIndex].trim();
                randomNameElement.textContent = randomName;
                randomNameElement.style.position = "absolute";
                //在正中间,似乎不太像
                // randomNameElement.style.top = "calc(50% + 150px)";
                // randomNameElement.style.left = "calc(50%)";
                //应该在左边才对
                randomNameElement.style.top = "calc(50% + 150px)";
                // randomNameElement.style.left = "calc(50%)";
                randomNameElement.style.fontSize = "24px";
                randomNameElement.style.zIndex = "200";
                randomNameElement.style.color = "white";
                document.body.appendChild(randomNameElement);

                // 显示图片/img/gotitem.webp在网页的正中间
                gotItem.src = "/img/gotitem.webp";
                gotItem.style.position = "absolute";
                gotItem.style.top = "10%";
                gotItem.style.left = "30%";
                gotItem.style.width = "40%";
                document.body.appendChild(gotItem);

                // 隐藏视频
                video.style.display = "none";
                video.pause();
                video.currentTime = 0;

                // 更换背景图
                document.body.style.backgroundImage = 'url("/img/splash-background.webp")';

                isPlaying = false; // 设置标志变量为false，表示播放结束
                gachabg.classList.remove("hidden");
            })
            .catch(error => {
                console.log("读取文件出错:", error);
                isPlaying = false; // 设置标志变量为false，表示播放结束
            });
    }

    // 在视频播放结束时绑定事件监听器
    video.addEventListener("ended", handleVideoEnded);
}

function resetPage() {
    var video = document.getElementById("video");
    var characterImage = document.getElementById("characterImage");
    var backgroundImage = document.getElementById("backgroundImage");
    var c10 = document.getElementById("c10");
    var c10text = document.getElementById("c10text");
    var c1 = document.getElementById("c1");
    var c1text = document.getElementById("c1text");
    var gachabg = document.getElementById("gachabg");

    // 显示角色图片和背景图片
    characterImage.classList.remove("hidden");
    backgroundImage.classList.remove("hidden");

    // 显示按钮
    c10.classList.remove("hidden");
    c10text.classList.remove("hidden");
    c1.classList.remove("hidden");
    c1text.classList.remove("hidden");

    // 隐藏图片/img/gotitem.webp、图片/img/kokomi.png和随机名字
    var gotItem = document.querySelector("img[src='/img/gotitem.webp']");
    var kokomi = document.querySelector("img[src='/img/kokomi.png']");
    var randomNameElement = document.querySelector("div");
    if (gotItem) {
        gotItem.remove();
    }
    if (kokomi) {
        kokomi.remove();
    }
    if (randomNameElement) {
        randomNameElement.remove();
    }

    // 恢复背景图
    document.body.style.backgroundImage = 'url("/img/splash-background.webp")';

    // 显示视频
    video.style.display = "none";
    video.pause();
    video.currentTime = 0;

    isPlaying = false; // 设置标志变量为false，表示播放结束
    gachabg.classList.remove("hidden");
    window.scrollTo(0, 0);
}
window.scrollTo(0, 0);
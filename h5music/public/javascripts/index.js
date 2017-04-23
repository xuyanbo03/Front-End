function $(s) {
    return document.querySelectorAll(s);
}

var lis = $("#list li");

//点击事件
for (var i = 0; i < list.length; i++) {
    lis[i].onclick = function() {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        this.className = "selected";
        load("/media/" + this.title);
    }
}

var xhr = new XMLHttpRequest();

//AudioContext
var ac = new(window.AudioContext || window.webkitAudioContext)();

//gainNode
var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();
gainNode.connect(ac.destination);

//analyserNode
var analyser = ac.createAnalyser();
var size = 128;
analyser.fftSize = size * 2;
analyser.connect(gainNode);

//音乐资源加载
var source = null;

//计数器
var count = 0;

//canvas画图（柱状）
var box = $("#box")[0];
var height, width;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
box.appendChild(canvas);

//canvas画图（点状）
var Dots = [];

function random(m, n) {
    //返回m-n之间的整数
    return Math.round(Math.random() * (n - m) + m);
}

function getDots() {
    Dots = [];
    for (var i = 0; i < size; i++) {
        var x = random(0, width);
        var y = random(0, height);
        var color = "rgb(" + random(0, 255) + "," + random(0, 255) + ","
        random(0, 255) + ")";
        Dots.push({
            x: x,
            y: y,
            color: color
        });
    }
}

var line;

function resize() {
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    var line = ctx.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, "red");
    line.addColorStop(0.5, "yellow");
    line.addColorStop(1, "green");
    
    getDots();
}
resize();
window.onresize = resize;

function draw(arr) {
    ctx.clearRect(0, 0, width, height);
    var w = width / size;
    ctx.fillstyle = line;
    for (var i = 0; i < size; i++) {
        if (draw.type == "column") {
            var h = arr[i] / 256 * height;
            ctx.fillRect(w * i, height - h, w * 0.6, h);
        } else if (draw.type == "dot") {
        	ctx.beginPath();
            var o = Dots[i];
            var r = arr[i] / 256 * 50;
            ctx.arc(o.x, o.y, r, 0, Math.PI * 2, true);
            //画圆
            // ctx.strokeStyle = "#fff";
            // ctx.stroke();
            // 流动圆
            var g=ctx.createRedialGradient(o.x,o.y,0,o.x,o.y,r);
            g.addColorStop(0,"#fff");
            g.addColorStop(1,o.color);
            ctx.fillStyle=g;
            ctx.fill();
        }
    }
}
//draw默认属性
draw.type = "column";

var types = $("#type li");
for (var i = 0; i < type.length; i++) {
    types[i].onclick = function() {
        for (var j = 0; j < types.length; j++) {
            types[j].className = "";
        }
        this.className = "selected";
        draw.type = this.getAttribute("data-type");
    }
}


function load(url) {
    var n = ++count;
    source && source[source.stop ? "stop" : "noteOff"](); //默认为0
    xhr.abort();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        if (n != count) return;
        ac.decodeAudioData(xhr.response, function(buffer) {
            if (n != count) return;
            var bufferSource = ac.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.connect(analyser);
            //bufferSource.connect(gainNode);
            //bufferSource.connect(ac.destination);
            bufferSource[bufferSource.start ? "start" : "noteOn"](0);
            source = bufferSource;

        }, function(err) {
            console.log(err);
        })
    }
    xhr.send();
}

//分析音频
function visualizer() {
    var arr = new Uint8Array(analyser.frequencyBinCount);

    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    function v() {
        analyser.getByteFrequencyData(arr);
        draw(arr);
        requestAnimationFrame(v);
    }
    requestAnimationFrame(v);
}

visualizer();

//改变音量
function changeVolume(percent) {
    gainNode.gain.value = percent * percent;
}
$("#volume")[0].onchange = function() {
    changeVolume(this.value / this.max);
}

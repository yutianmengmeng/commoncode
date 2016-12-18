// 常用的代码片段

// h5 DOM选择器
// querySelector() 返回匹配到的第一个元素
var item = document.querySelector('.item');
console.log(item);

// querySelectorAll() 返回匹配到的所有元素，是一个nodeList集合
var items = document.querySelectorAll('.item');
console.log(items[0]);

//组织默认行为
// 原生js
document.getElementById('btn').addEventListener('click', function (event) {
    event = event || window.event；

    if (event.preventDefault){
        // w3c方法 阻止默认行为
        event.preventDefault();
    } else{
        // ie 阻止默认行为
        event.returnValue = false;
    }
}, false);

// jQuery
$('#btn').on('click', function (event) {
    event.preventDefault();
});

// 阻止冒泡
// 原生js
document.getElementById('btn').addEventListener('click', function (event) {
    event = event || window.event；

    if (event.stopPropagation){
        // w3c方法 阻止冒泡
        event.stopPropagation();
    } else{
        // ie 阻止冒泡
        event.cancelBubble = true;
    }
}, false);

// jQuery
$('#btn').on('click', function (event) {
    event.stopPropagation();
});


//鼠标滚轮事件
$('#content').on("mousewheel DOMMouseScroll", function (event) { 
    // chrome & ie || // firefox
    var delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) || (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));  
    
    if (delta > 0) { 
        // 向上滚动
        console.log('mousewheel top');
    } else if (delta < 0) {
        // 向下滚动
        console.log('mousewheel bottom');
    } 
});

//检测浏览器是否支持svg
function isSupportSVG() { 
    var SVG_NS = 'http://www.w3.org/2000/svg';
    return !!document.createElementNS &&!!document.createElementNS(SVG_NS, 'svg').createSVGRect; 
} 
console.log(isSupportSVG());

//检测浏览器是否支持canvas
function isSupportCanvas() {
    if(document.createElement('canvas').getContext){
        return true;
    }else{
        return false;
    }
}

console.log(isSupportCanvas());

// 检测是否是微信浏览器
function isWeiXinClient() {
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.match(/MicroMessenger/i)=="micromessenger") { 
        return true; 
    } else { 
        return false; 
    }
}

// 测试
alert(isWeiXinClient());


//jquery获取鼠标在图片上的坐标
$('#myImage').click(function(event){
    console.log('X：' + event.offsetX+'\n Y:' + event.offsetY);

    console.log('X：'+$(this).offset().left+'\n Y:'+$(this).offset().top);
});

//jQuery获取验证码倒计时效果
// 原生js版本
var times = 60, // 临时设为60秒
    timer = null;
            
document.getElementById('send').onclick = function () {
    // 计时开始
    timer = setInterval(function () {
        times--;
        
        if (times <= 0) {
            send.value = '发送验证码';
            clearInterval(timer);
            send.disabled = false;
            times = 60;
        } else {
            send.value = times + '秒后重试';
            send.disabled = true;
        }
    }, 1000);
}

// jQuery版本
var times = 60,
    timer = null;

$('#send').on('click', function () {
    var $this = $(this);
    
    // 计时开始
    timer = setInterval(function () {
        times--;
        
        if (times <= 0) {
            $this.val('发送验证码');
            clearInterval(timer);
            $this.attr('disabled', false);
            times = 60;
        } else {
            $this.val(times + '秒后重试');
            $this.attr('disabled', true);
        }
    }, 1000);
});

//常用的正则表达式
//匹配字母、数字、中文字符 
/^([A-Za-z0-9]|[\u4e00-\u9fa5])*$/ 

//验证邮箱 
/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/ 

//验证手机号 
/^1[3|5|8|7]\d{9}$/ 

//验证URL 
/^http:\/\/.+\./

//验证身份证号码 
/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/ 

//匹配中文字符的正则表达式 
/[\u4e00-\u9fa5]/ 

//匹配双字节字符(包括汉字在内) 
/[^\x00-\xff]/


//js事件戳\毫秒格式化
function formatDate(now) { 
    var y = now.getFullYear();
    var m = now.getMonth() + 1; // 注意js里的月要加1 
    var d = now.getDate();
    var h = now.getHours(); 
    var m = now.getMinutes(); 
    var s = now.getSeconds();
    
    return y + "-" + m + "-" + d + " " + h + ":" + m + ":" + s; 
} 

var nowDate = new Date(2016, 5, 13, 19, 18, 30, 20);

console.log(nowDate.getTime()); // 获得当前毫秒数: 1465816710020
console.log(formatDate(nowDate));

//js限定字符数
//字符串截取
function getByteVal(val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) byteValLen += 2; else byteValLen += 1;
        if (byteValLen > max) break;
        returnValue += val[i];
    }
    return returnValue;
}

$('#txt').on('keyup', function () {
    var val = this.value;
    if (val.replace(/[^\x00-\xff]/g, "**").length > 14) {
        this.value = getByteVal(val, 14);
    }
});


//js判断是否移动端以及浏览器内核
var browser = { 
    versions: function() { 
        var u = navigator.userAgent; 
        return { 
            trident: u.indexOf('Trident') > -1, //IE内核 
            presto: u.indexOf('Presto') > -1, //opera内核 
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko 
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android 
            iPhone: u.indexOf('iPhone') > -1 , //iPhone 
            iPad: u.indexOf('iPad') > -1, //iPad 
            webApp: u.indexOf('Safari') > -1 //Safari 
        }; 
    }
} 

if (browser.versions.mobile() || browser.versions.ios() || browser.versions.android() || browser.versions.iPhone() || browser.versions.iPad()) { 
    alert('移动端'); 
}

//获取元素位置
//它返回一个对象，其中包含了left、right、top、bottom四个属性
var myDiv = document.getElementById('myDiv');
var x = myDiv.getBoundingClientRect().left; 
var y = myDiv.getBoundingClientRect().top; 

// 相当于jquery的： $(this).offset().left、$(this).offset().top // js的：this.offsetLeft、this.offsetTop


//H5全屏
function fullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

fullscreen(document.documentElement);


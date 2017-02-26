/**
 * Created by Administrator on 2016/10/23 0023.
 */
/**
 * 获取计算机计算过后的的样式
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
};
/**
 * 缓动框架
 * @param obj
 * @param json
 * @param endfn
 */
function animate(obj, json, endfn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            if (attr === "opacity") {
                var leader = getStyle(obj, attr) * 100;//这里就不能给默认值了
                var target = json[attr] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[attr] = leader / 100;
            } else if (attr === "zIndex") {
                obj.style[attr] = json[attr];
            } else {
                var leader = parseInt(getStyle(obj, attr)) || 0;//如果是NaN给个默认值0
                var target = json[attr];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[attr] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            endfn && endfn();
        }
    }, 15);
}
/**
 * 封装当前元素的第一个子节点
 * @param obj
 * @returns {*}
 */
function getFirstElementChild(obj) {
    if (obj.firstElementChild) {
        return obj.firstElementChild;
    } else {
        var el = obj.firstChild;
        while (el && 1 !== el.nodeType) {
            el = el.nextSibling;
        }
        return el;
    }
}
/**
 * 封装当前元素的最后一个子节点
 * @param obj
 * @returns {*}
 */
function getLastElementChild(obj) {
    if (obj.lastElementChild) {
        return obj.lastElementChild;
    } else {
        var el = obj.lastChild;
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;
        }
        return el;
    }
}
/**
 * 替换类名但不覆盖
 * @param obj
 * @param oldstr
 * @param newstr
 */
function replaceclassname(obj, oldstr, newstr) {
    obj.className = obj.className.replace(oldstr, newstr);
}
/**
 * 封装nextElementSibling兼容浏览器
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;
        while (next && 1 !== next.nodeType) {
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 封装previousElementSibling兼容浏览器
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var prev = element.previousSibling;
        while (next && 1 !== next.nodeType) {
            prev = prev.previousSibling;
        }
        return prev;
    }
}
/**
 * 获取绝对位置函数
 * @param obj
 * @returns {{left: number, top: number}}
 */

function getPos(obj) {
    var pos = {"left": 0, "top": 0};
    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}
/**
 * 获取innertext兼容
 * @param obj
 * @returns {*}
 */
function getinnertext(obj) {
    if (typeof obj.innerText === "string") {
        return obj.innerText;
    } else {
        return obj.textContent;
    }
}
/**
 * 设置innertext兼容
 * @param obj
 * @param content
 */
function setinnertext(obj, content) {
    if (typeof obj.innerText === "string") {
        obj.innerText = content;
    } else {
        obj.textContent = content;
    }
}
/**
 * 移动函数
 * @param obj
 * @param dir
 * @param target
 * @param position
 * @param endFn
 */
function doMove(obj, dir, target, position, endFn) {
    //obj.onclick=function(){
    dir = parseInt(getStyle(obj, position)) < target ? dir : -dir;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, position)) + dir;
        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
            clearInterval(obj.timer);
            endFn && endFn();
        }
        obj.style[position] = speed + "px";
    }, 30);
    //}
}
/**
 * 抖动函数
 * @param obj
 * @param direction
 * @param endFn
 */
function shake(obj, direction, endFn) {
    var arr = new Array();
    var num = 0;
    for (var i = 20; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);
    var position = parseInt(getStyle(obj, direction));
    //obj.onclick=function(){
    clearInterval(obj.shaketimer);
    obj.shaketimer = setInterval(function () {
        obj.style[direction] = position + arr[num] + "px";
        num++;
        if (num == arr.length) {
            clearInterval(obj.shaketimer);
            num = 0;
            endFn && endFn();
        }
    }, 50);
    //}
}
/**
 * 获取x到y的整数
 * @param x
 * @param y
 * @returns {*}
 */
function randomGetXToY(x, y) {
    return Math.round((Math.random()) * (y - x)) + x;
}
/**
 * 拖拽函数
 * @param obj
 */
function drag(obj) {
    obj.onmousedown = function (ev) {
        var ev = ev || event;
        var disx = ev.clientX - this.offsetLeft;
        var disy = ev.clientY - this.offsetTop;
        document.onmousemove = function (ev) {
            var ev = ev || event;

            var l = ev.clientX - disx;
            var t = ev.clientY - disy;
            if (l < 30) {
                l = 0;
            }
            if (l > document.documentElement.clientWidth - obj.offsetWidth - 30) {
                l = document.documentElement.clientWidth - obj.offsetWidth;
            }
            if (t < 30) {//磁性吸附距离
                t = 0;
            }
            if (t > document.documentElement.clientHeight - obj.offsetHeight - 30) {
                t = document.documentElement.clientHeight - obj.offsetHeight;
            }
            obj.style.left = l + "px";
            obj.style.top = t + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        }
        return false;//当页面选中文字或者图片的时候进行拖拽会出问题
    }
}
/**
 * 百叶窗效果
 * @param obj
 */
function toShow(obj) {
    var aDiv = obj.getElementsByTagName('div');
    var iNow = 0;
    var timer = null;
    var bBtn = true;
    setInterval(function () {
        toChange();
    }, 4000);
    function toChange() {
        timer = setInterval(function () {
            if (iNow == aDiv.length) {
                clearInterval(timer);
                iNow = 0;
                bBtn = !bBtn;
            }
            else if (bBtn) {
                animate(aDiv[iNow], {top: 0});
                iNow++;
            }
            else {
                animate(aDiv[iNow], {top: -45});
                iNow++;
            }
        }, 100);
    }
}
/**
 * 获得页面滚动坐标的兼容方法
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
//        var scrollTop =window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
//        var scrollLeft=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
//        var o={};
//        o.top=scrollTop;
//        o.left=scrollLeft;
//        return o;
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 获得页面可视区的兼容性方法
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientWidth || 0
    }
}
/**
 * 获得pageX，pageY的兼容性写法
 * @param event
 * @returns {Number|*}
 */
function getPageX(event) {
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
function getPageY(event) {
    return event.pageY || event.clientY + document.documentElement.scrollTop;
}

function fullPage(obj,ul) {
    var ullis = obj.children;
    var ollis = ul.children;
    obj.timer = null;
    for (var j = 0; j < ollis.length; j++) {
        ollis[j].index = j;
        ollis[j].onclick = function () {
            clearInterval(obj.timer);
            var target = ullis[this.index].offsetTop;
            obj.timer = setInterval(function () {
                var leader = window.pageYOffset;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                window.scrollTo(0, leader);
                if (target === leader) {
                    clearInterval(obj.timer);
                }
            }, 15);
        }
    }
}
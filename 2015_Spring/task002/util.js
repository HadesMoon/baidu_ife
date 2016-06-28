//判断一个元素是不是数组

//typeof 只能判断Function， String， Number ，Undefined 等几种类型的对象

/*instanceof操作符问题在于，他假定只有一个全局执行环境，如果网页中有多个框架，那实际上就存在两个不同的全局执行环境，
从而存在两个以上不同版本的Array构造函数。如果我从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中
原生创建的数组分别具有不同的构造函数*/
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

function isArray2(arr) {
    console.log(Array.isArray(arr));
    console.log("isArray2");
    /*Array.isArray()适用于ie9+及其他高级浏览器*/
}


// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var result, oClass = isClass(src);

    if (oClass === 'Object') {
        result = {};
    } else if (oClass === 'Array') {
        result = [];
    } else {
        return src;
    }

    for (var key in src) {
        var c = src[key];
        if (isClass(c) === 'Object' || isClass(c) === 'Array') {
            result[key] = cloneObject(c);
        } else {
            result[key] = c
        }
    }

    return result;

}

function cloneObject1(p, c) {
    var c = c || {};

    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            cloneObject1(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }

    return c;
}

function isClass(obj) {
    if (obj === null) {
        return "Null";
    } else if (obj === undefined) {
        return "Undefined";
    } else {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        var copy = arr[i];
        for (var j = arr.length - 1; j > i; j--) {
            if (arr[j] === copy) {
                arr.splice(j, 1);
            }
        }
    }
}

//hash
function uniqArray1(arr) {

    var temp = {},
        result = [];

    for (var i = 0; i < arr.length; i++) {
        if (!temp[arr[i]]) {
            temp[arr[i]] = true;
            result.push(arr[i]);
        }
    }

    return result;
}
// hash + es5
// 速度最快
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);
}

function uniqArray3(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0) { // indexOf方法不支持IE9以下
            new_array.push(arr[i]);
        }
    }
    return new_array;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var start, end;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) !== ' ' && str.charAt(i) !== '	') {
            start = i;
            break;
        }
    }

    for (var j = str.length - 1; j > 0; j--) {
        if (str.charAt(j) !== ' ' && str.charAt(j) !== '	') {
            end = j + 1;
            break;
        }
    }

    return str.substring(start, end);
}
var str = "	hello world";

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {

    for (var i = 0; i < arr.length; i++) {
        fn(i, arr[i]);
    }
}
var arr = [1, 2, 3, 4];
var fn = function(key, value) {
    console.log(key + value);
}

// 获取一个对象里面第一层元素的数量，返回一个整数
/**
 * getObjectLength 在for in的时候，要了解在IE9以下，有枚举bug。
 * a = {toString:1}时，for in不出toString这个key。
 * 查找关于propertyIsEnumerable的使用方法，来判断
 * 'toString' 'toLocaleString' 'valueOf' 'hasOwnProperty' 'isPrototypeOf' 'propertyIsEnumerable' ‘constructor'
 * 这几个不可枚举(for in)出来的key
 */
function getObjectLength(obj) {
    var i = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            i++;
        }
    }
    return i;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    return reg.test(phone);

}


function hasClass(element, newClassName) {
    var name = element.className.match(/\S+/g) || [];
    if (name.indexOf(newClassName) !== -1) {
        return true;
    }
    return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className = element.className + ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = trim(element.className.replace(oldClassName, ''));
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var pa1 = element.parentNode,
        pa2 = siblingNode.parentNode;
    if (pa1 === pa2) {
        return true;
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var x = 0,
        y = 0,
        current = element;

    while (current !== null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    }

    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft,
        scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    x -= scrollLeft;
    y -= scrollTop;

    return { x: x, y: y }
}


// 实现一个简单的Query
function $(selector) {
    var ele = selector.match(/\S+/g),
        type,
        name,
        tagName = document;
    for (var i = 0, len = ele.length;i<len; i++) {
    	type=ele[i][0];
    	name=ele[i].substring(1);
        switch (type) {
            case "#":
                tagName = tagName.getElementById(name);
                break;
            case ".":
                tagName = tagName.getElementsByClassName(name);
                break;
            case "[":
                name = ele[i].substring(1, ele[i].length - 1);
                var eles = tagName.getElementsByTagName('*');
                for (var i = 0, len = eles.length; i < len; i++) {
                    if (name.indexOf('=') !== -1) {
                        var arr = name.split('=');
                        if (arr[1] == eles[i].getAttribute(arr[0])) {
                            return eles[i];
                        }
                    } else {
                        if (eles[i].getAttribute(name)) {
                            return eles[i];

                        }
                    }
                }
                break;
            default:
                tagName = tagName.getElementsByTagName(ele);
                break;
        }
    }


    return tagName;
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象



// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
    	element.addEventListener(event,listener,false);
    }else{
    	element.attachEvent('on'+event,listener);
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
    	element.removeEventListener(event,listener,false);
    }else{
    	element.detachEvent('on'+event,listener);
    }
}

// addEvent($("#doma"), "click", a);


// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function(e){
    	var event=e || window.event;

    	var keyCode=event.which || event.keyCode;
    	if (keyCode===13) {
    		listener.call(element,event);
    	}

    })
}

//事件代理
function delegateEvent(element,tag,event,listener){
	addEvent(element, event, function(e){
		var e=e || window.event;
		var target=e.target || e.srcElement;

		if (target&&target.tagName===tag.toUpperCase()) {
			listener.call(target,e);
		}
	});
}

$.on=addEvent;
$.un=removeEvent;
$.click=addClickEvent;
$.enter=addEnterEvent;
$.delegate=delegateEvent;





// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
     var ua=navigator.userAgent;

    // return /msie(\d+\.\d+)/i.test(ua)?:-1;

    if (!+[1,]) {
    	return document.documentMode || ua.match(/msie (\d+\.\d+)/i)[1];
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var exdate='',
	    expires='';
	if (expiredays) {
		exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        expires=';expires='+exdate.toUTCString();
	}
    
    document.cookie=cookieName+'='+encodeURIComponent(cookieValue)+expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var reg=new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)");
   return reg.exec(document.cookie)[2] || null;
}




function ajax(url, options) {
    var xmlHttp;
    if (window.XMLHttpRequest) {
    	xmlHttp=new XMLHttpRequest();
    }else{
    	xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 处理data
    if (options.data) {
    	var temp=[];
    	for(var item in options.data){
    		temp.push(item+'='+encodeURI(options.data[item]));
    	}
    	var data=temp.join('&');
    }

    if (!options.type) {
    	options.type='GET';
    }
    options.type=options.type.toUpperCase();

    if (options.type==='GET') {
    	var myURL='';
    	if (data) {
    		myURL=url+'?'+data;
    	}else{
    		myURL=url;
    	}
    	xmlHttp.open(options.type,myURL,true);
    	xmlHttp.send();
    }else if (options.type==='POST') {
    	xmlHttp.open(options.type,url,true);
    	xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    	xmlHttp.send(data);
    }


    xmlHttp.onreadystatechange=function(){
    	if (xmlHttp.readyState==4 && xmlHttp.status==200) {
    		if (options.onsuccess) {
    			options.onsuccess(xmlHttp.responseText,xmlHttp.responseXML);
    		}
    	}else{
    		if(options.onfail){
    			options.onfail();
    		}
    	}
    }
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
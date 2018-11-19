//---访问器属性

//尽管应该在类构造函数中创建自己的属性
//但是类也支持直接在原型上定义访问器属性
//创建getter时，需要在关键字get后紧跟一个空格和相应的标识符
//创建setter时，只需把关键字get换成set即可
class Custom_Element {
    constructor(element) {
        this.element = element;
    }
    get ele() {
        return this.element;
    }
    set ele(value) {
        this.element = value;
    }
}
let descriptor = Object.getOwnPropertyDescriptor(Custom_Element.prototype, "ele");
console.log("[访问器属性]---", "get" in descriptor); //true
console.log("[访问器属性]---", "set" in descriptor); //true
console.log("[访问器属性]---", descriptor.enumerable); //false
//这个访问器属性是在Custom_Element.prototype上创建的
//与其他方法一样，创建时声明该属性不可枚举
//下面这段代码是非类形式的等价实现：
let same_custom_element = (function () {
    "use strict";
    const same_custom_element = function (element) {
        if (typeof new.target === "undefined") {
            throw new Error("必须通过关键字new调用构造函数");
        }
        this.element = element;
    }
    Object.defineProperty(same_custom_element.prototype, "ele", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this.element;
        },
        set: function (value) {
            this.element = value;
        }
    });
    return same_custom_element;
}());
//由上可见，比起非类等效实现，类语法可以节省很多代码
//在非类等效实现中，仅ele访问器属性定义的代码量就与类声明一样多
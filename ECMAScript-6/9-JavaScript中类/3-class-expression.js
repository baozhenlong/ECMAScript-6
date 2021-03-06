//---类表达式
//类和函数都有 2 种存在形式：声明形式和表达式形式
//声明形式的函数和类：都由相应的关键字（分别是 function 和 class ）进行定义，随后紧跟一个标识符
//表达式形式的函数和类与之相似：只是不需要在关键字后添加标识符
//类表达式的设计初衷是为了声明相应变量或传入函数作为参数

//1---基本的类表达式语法
let PersonClass = class {
    //等价于 PersonType 的构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于 PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
        console.log(PersonClass.name);
    }
};
let person = new PersonClass('damon');
person.sayName(); //damon PersonClass
console.log('[匿名类表达式]---', (person instanceof PersonClass)); // true
console.log('[匿名类表达式]---', (person instanceof Object)); // true
console.log('[匿名类表达式]---', (typeof PersonClass)); // function
console.log('[匿名类表达式]---', (typeof PersonClass.prototype.sayName)); // function
console.log('[匿名类表达式]---PersonClass.name = ', PersonClass.name); // PersonClass
//这个示例解释的是，类表达式不需要标识符在类后，
//除了语法，类表达式在功能上等价于类声明
//在匿名类表达式中，就像之前的示例中， PersonClass.name 是一个空字符串；当使用一个类声明时， PersonClass.name 将会是 "PersonClass" 字符串
//类声明和类表达式的功能极为相似，只是代码编写方式略有差异
//二者均不会像函数声明和函数表达式一样被提升，所以在运行时状态下无论选择哪一种方式，代码最终的执行结果都没有太大差别
//二者最重要的区别是 name 属性不同，匿名类表达式的 name 属性值是一个空字符串，而类声明的 name 属性值为类名
//例如：通过声明方式定义一个类 PersonClass ， 则 Person_Class.name 的值为 "PersonClass"

//2---命名类表达式
//在之前的示例中，我们定义的类表达式都是匿名的，其实类与函数一样，都可以定义为命名表达式
//声明时，在关键字 class 后添加一个标识符即可定义为命名类表达式：
PersonClass = class PersonClass2 {
    //等价于 PersonType 构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于 Person_Type.prototype.sayName
    sayName() {
        console.log('[命名表达式]---PersonClass2 sayName', this.name);
        console.log('[命名表达式]---PersonClass2 PersonClass2.name', PersonClass2.name);
    }
};
console.log('[命名类表达式]---typeof PersonClass = ', (typeof PersonClass)); // function
console.log('[命名类表达式]---typeof PersonClass2 = ', (typeof PersonClass2)); // undefined
console.log('[命名类表达式]---typeof PersonClass.name = ', (PersonClass.name)); // PersonClass2
person = new PersonClass('stefan');
person.sayName(); // stefan PersonClass2
//在此示例中，类表达式被命名为 PersonClass2 ，由于标识符 PersonClass2 只存在于类定义中，因此它可被用在像 say_name() 这样的方法中
//而在类的外部，由于不存在一个名为 "PersonClass2" 的绑定，因此输出值为 undefined
//没有使用关键字 class 的等价声明：
//等价于命名类表达式 PersonClass2
PersonClass = (function () {
    "use strict";
    const PersonClass3 = function (name) {
        //确保通过关键字 new 调用该函数
        if (typeof new.target === 'undefined') {
            throw new Error('必须通过关键字new调用构造函数"');
        }
        this.name = name;
    }
    Object.defineProperty(PersonClass3.prototype, 'sayName', {
        value: function () {
            //确保不会通过关键字new调用该方法
            if (typeof new.target !== 'undefined') {
                throw new Error('不可通过关键字new调用该方法');
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonClass3;
}());
//在 JavaScript 引擎中，类表达式的实现与类声明稍有不同
//对于类声明来说，通过 let 定义的外部绑定与通过 const 定义的内部绑定具有相同的名称
//而命名表达式通过 const 定义名称，从而 PersonClass2 只能在类的内部使用
//尽管命名表达式与命名函数表达式有不同的表现，但二者间仍有相似之处，都可以在多个场景中作为值使用
//---类表达式
//类和函数都有2种存在形式：声明形式和表达式形式
//声明形式的函数和类：都由相应的关键字(分别是function和class)进行定义，随后紧跟一个标识符
//表达式形式的函数和类与之相似：只是不需要在关键字后添加标识符
//类表达式的设计初衷是为了声明相应变量或传入函数作为参数

//1---基本的类表达式语法
let Person_Class = class {
    //等价于Person_Type的构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于PersonType.prototype.say_name
    say_name() {
        console.log(this.name);
        console.log(Person_Class.name);
    }
};
let person = new Person_Class("damon");
person.say_name(); //damon Person_Class
console.log("[匿名类表达式]---", (person instanceof Person_Class)); //true
console.log("[匿名类表达式]---", (person instanceof Object)); //true
console.log("[匿名类表达式]---", (typeof Person_Class)); //function
console.log("[匿名类表达式]---", (typeof Person_Class.prototype.say_name)); //function
console.log("[匿名类表达式]---Person_Class.name = ", Person_Class.name); //Person_Class
//这个示例解释的是，类表达式不需要标识符在类后，
//除了语法，类表达式在功能上等价于类声明
//在匿名类表达式中，就像之前的示例中，Person_Class.name是一个空字符串；当使用一个类声明时，Person_Class.name将会是"Person_Class"字符串
//类声明和类表达式的功能极为相似，只是代码编写方式略有差异
//二者均不会像函数声明和函数表达式一样被提升，所以在运行时状态下无论选择哪一种方式，代码最终的执行结果都没有太大差别
//二者最重要的区别是name属性不同，匿名类表达式的name属性值是一个空字符串，而类声明的name属性值为类名
//例如：通过声明方式定义一个类Person_Class，则Person_Class.name的值为"Person_Class"

//2---命名类表达式
//在之前的示例中，我们定义的类表达式都是匿名的，其实类与函数一样，都可以定义为命名表达式
//声明时，在关键字class后添加一个标识符即可定义为命名类表达式：
let Person_Class_22 = class Person_Class_2 {
    //等价于Person_Type构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于Person_Type.prototype.say_name
    say_name() {
        console.log(this.name);
        console.log(Person_Class_2.name);
    }
};
console.log("[命名类表达式]---typeof Person_Class_22 = ", (typeof Person_Class_22)); //function
console.log("[命名类表达式]---typeof Person_Class_2 = ", (typeof Person_Class_2)); //undefined
//在此示例中，类表达式被命名为Person_Class_2，由于标识符Person_Class_2只存在于类定义中，因此它可被用在像say_name()这样的方法中
//而在类的外部，由于不存在一个名为"Person_Class_2"的绑定，因此输出值为undefined
//没有使用关键字class的等价声明：
//等价于命名类表达式Person_Class_22
let Person_Class_3 = (function () {
    "use strict";
    const Person_Class_33 = function (name) {
        //确保通过关键字new 调用该函数
        if (typeof new.target === "undefined") {
            throw new Error("必须通过关键字new调用构造函数");
        }
        this.name = name;
    }
    Object.defineProperty(Person_Class_33.prototype, "say_name", {
        value: function () {
            //确保不会通过关键字new调用该方法
            if (typeof new.target !== "undefined") {
                throw new Error("不可通过关键字new调用该方法");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return Person_Class_33;
}());
//在JavaScript引擎中，类表达式的实现与类声明稍有不同
//对于类声明来说，通过let定义的外部绑定与通过const定义的内部绑定具有相同的名称
//而命名表达式通过const定义名称，从而Person_Class_2只能在类的内部使用
//尽管命名表达式与命名函数表达式有不同的表现，但二者间仍有相似之处，都可以在多个场景中作为值使用
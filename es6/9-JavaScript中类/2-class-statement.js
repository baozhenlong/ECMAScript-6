//---类的声明

//1---基本的类声明语法
//class关键字 + 类名 + 其他部分(语法类似对象字面量方法的简写形式，但不需要在类的各元素之间使用逗号,分隔)
class Person_Class {
    //等价于Person_Type构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于Person_Type.prototype.say_name
    say_name() {
        console.log("[基本的类声明语法]---say_name name = ", this.name);
    }
}
let person = new Person_Class("damon");
person.say_name(); //damon
console.log("[基本的类声明语法]---", (person instanceof Person_Class)); //true
console.log("[基本的类声明语法]---", (person instanceof Object)); //true
console.log("[基本的类声明语法]---", (typeof Person_Class)); //function
console.log("[基本的类声明语法]---", (typeof Person_Class.prototype.say_name)); //function
//1.1---通过类声明语法定义Person_Class的行为与之前创建Person_Type构造函数的过程相似
//只是这里直接在类中通过特殊的constructor方法名来定义构造函数，且由于这种类使用简洁语法来定义方法，因而不需要添加function关键字
//除constructor外没有其他保留的方法名，所以可以尽情添加方法
//1.2---私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建，此例中的name就是一个私有属性
//建议：在构造函数中创建所有私有属性，从而只通过一处就可以控制类中的所有私有属性
//1.3---有趣的是，类声明仅仅是基于已有自定义类型声明的语法糖
//typeof Person_Class最终返回的结果的是"function"，所以Person_Class声明实际上创建了一个具有构造函数方法行为的函数
//此示例中的say_name()方法实际上是Person_Class.prototype上的一个方法
//与之类似的是，在之前的示例中，say_name()也是Person_Type.prototype上的一个方法
//通过语法糖包装以后，类就可以代替自定义类型的功能，不必担心使用的是哪种方法，只需关注如何定义正确的类
//Note：与函数不同的是，类属性不可被赋予新值，在之前的示例中，Person_Class.prototype就是这样一个只可读的类属性

//2---为何使用类语法
//尽管类与自定义类型之间有诸多相似之处，仍需牢记它们的这些差异：
//差异1---函数声明可以被提升，而类声明与let声明类似，不能被提升，；真正执行声明语句之前，它们会一直存在于临时死区中
//差异2---类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行
//差异3---在自定义类型中，需要通过Object.defineProperty()方法手工指定某个方法为不可枚举;而在类中，所有方法都是不可枚举的
//差异4---每个类都有一个名为[[Construct]]的内部方法，通过关键字new调用那些不含[[Construct]]的方法会导致程序抛出错误
//差异5---使用除关键字new以外的方式调用类的构造函数会导致程序抛出错误
//差异6---在类中修改类名会导致程序报错
//使用除类之外的语法为之前示例中Person_Class声明编写等价代码
let Person_Type_2 = (function () {
    "use strict";
    const Person_Type_2 = function (name) {
        //确保关键字new调用该函数
        if (typeof new.target === "undefined") {
            throw new Error("必须通过关键字new调用该构造函数")
        }
        this.name = name;
    }
    Object.defineProperty(Person_Type_2.prototype, "say_name", {
        value: function () {
            //确保不会通过关键字new调用该方法
            if (typeof new.target !== "undefined") {
                throw new Error("不可使用关键字new调用该方法");
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return Person_Type_2;
}());
//这段代码中有2出Person_Type_2声明：一处是外部作用域中的let声明，一处是立即执行函数表达式中的const声明
//这个也从侧面说明了为什么可以在外部修改类名，而内部却不可修改
//在构造函数中，先检查new.target是否通过new调用，如果不是则抛出错误；
//紧接着，将say_name()方法定义为不可枚举，并在此检查new.target是否通过new调用，如果是则抛出错误
//最后，返回这个构造函数

//3---常量类名：类的名称只在类中为常量，所以尽管不能在类的方法中修改类名，但可以在外部修改
class Foo {
    constructor() {
        // Foo = "bar";
        //执行时会抛出错误
    }
}
//但在类声明结束后就可以修改
Foo = "baz";
//在这段代码中，类的外部有一个Foo声明，而类的构造函数里的Foo则是一个独立存在的绑定
//内部的Foo就像是通过const声明的，修改它的值会导致程序抛出错误
//而外部的Foo就像是通过let声明的，可以随时修改这个绑定的值
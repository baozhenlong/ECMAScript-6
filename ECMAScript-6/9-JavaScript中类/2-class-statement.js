//---类的声明

//1---基本的类声明语法
// class 关键字 + 类名 + 其他部分（语法类似对象字面量方法的简写形式，但不需要在类的各元素之间使用逗号(,)分隔）
class PersonClass {
    //等价于 PersonType 构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于 PersonType.prototype.sayName
    sayName() {
        console.log('[基本的类声明语法]---sayName name = ', this.name);
    }
}
let person = new PersonClass('damon');
person.sayName(); //damon
console.log('[基本的类声明语法]---', (person instanceof PersonClass)); // true
console.log('[基本的类声明语法]---', (person instanceof Object)); // true
console.log('[基本的类声明语法]---', (typeof PersonClass)); // function
console.log('[基本的类声明语法]---', (typeof PersonClass.prototype.sayName)); // function
console.log('[基本的类声明语法]---', (PersonClass.name)); // PersonClass
//1.1---通过类声明语法定义 PersonClass 的行为与之前创建 PersonType 构造函数的过程相似
//只是这里直接在类中通过特殊的 constructor 方法名来定义构造函数，且由于这种类使用简洁语法来定义方法，因而不需要添加 function 关键字
//除 constructor 外没有其他保留的方法名，所以可以尽情添加方法
//1.2---私有属性是实例中的属性，不会出现在原型上，且只能在类的构造函数或方法中创建，此例中的 name 就是一个私有属性
//建议：在构造函数中创建所有私有属性，从而只通过一处就可以控制类中的所有私有属性
//1.3---有趣的是，类声明仅仅是基于已有自定义类型声明的语法糖
// typeof PersonClass 最终返回的结果的是 "function" ，所以 PersonClass 声明实际上创建了一个具有构造函数方法行为的函数
//此示例中的 sayName()方法实际上是 PersonClass.prototype 上的一个方法
//与之类似的是，在之前的示例中， sayName()也是 PersonType.prototype 上的一个方法
//通过语法糖包装以后，类就可以代替自定义类型的功能，不必担心使用的是哪种方法，只需关注如何定义正确的类
//Note：与函数不同的是，类属性不可被赋予新值，在之前的示例中， PersonClass.prototype 就是这样一个只可读的类属性

//2---为何使用类语法
//尽管类与自定义类型之间有诸多相似之处，仍需牢记它们的这些差异：
//差异1---函数声明可以被提升，而类声明与 let 声明类似，不能被提升；真正执行声明语句之前，它们会一直存在于临时死区中
//差异2---类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式执行
//差异3---在自定义类型中，需要通过 Object.defineProperty() 方法手工指定某个方法为不可枚举；而在类中，所有方法都是不可枚举的
//差异4---每个类都有一个名为 [[Construct]] 的内部方法，通过关键字 new 调用那些不含 [[Construct]] 的方法会导致程序抛出错误
//差异5---使用除关键字 new 以外的方式调用类的构造函数会导致程序抛出错误
//差异6---在类中修改类名会导致程序报错
//使用除类之外的语法为之前示例中 PersonClass 声明编写等价代码
let PersonType2 = (function () {
    "use strict";
    const PersonType2 = function (name) {
        //确保关键字 new 调用该函数
        if (typeof new.target === 'undefined') {
            throw new Error("必须通过关键字new调用该构造函数")
        }
        this.name = name;
    }
    Object.defineProperty(PersonType2.prototype, 'sayName', {
        value: function () {
            //确保不会通过关键字new调用该方法
            if (typeof new.target !== 'undefined') {
                throw new Error('不可使用关键字new调用该方法');
            }
            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
    return PersonType2;
}());
console.log(PersonType2.name); // PersonType2
//这段代码中有 2 处 PersonType2 声明：一处是外部作用域中的 let 声明，一处是立即执行函数表达式中的 const 声明
//这个也从侧面说明了为什么可以在外部修改类名，而内部却不可修改
//在构造函数中，先检查 new.target 是否通过 new 调用，如果不是则抛出错误；
//紧接着，将 sayName() 方法定义为不可枚举，并在此检查 new.target 是否通过 new 调用，如果是则抛出错误
//最后，返回这个构造函数

//3---常量类名：类的名称只在类中为常量，所以尽管不能在类的方法中修改类名，但可以在外部修改
class Foo {
    constructor() {
        // Foo = "bar";
        //执行时会抛出错误
    }
}
//但在类声明结束后就可以修改
console.log("[类名]---Foo.name = ", Foo.name); // Foo
console.log("[类名]---typeof Foo.name = ", (typeof Foo.name)); // string
Foo = "baz"; // 此时 Foo 只是一个字符串
//在这段代码中，类的外部有一个 Foo 声明，而类的构造函数里的 Foo 则是一个独立存在的绑定
//内部的 Foo 就像是通过 const 声明的，修改它的值会导致程序抛出错误
//而外部的 Foo 就像是通过 let 声明的，可以随时修改这个绑定的值
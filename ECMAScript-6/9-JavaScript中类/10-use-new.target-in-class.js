//---在类的构造函数中使用 new.target

//在类的构造函数中，可以通过 new.target 来确定类是如何被调用的
//在简单情况下， new.target 等于类的构造函数，例如：
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
// new.target 的值是 Rectangle
let obj = new Rectangle(3, 4); // true
//这段代码展示了当调用 new Rectangle(3, 4) 时， new.target 等价于 Rectangle
//类构造函数必须通过 new 关键字调用，所以总是在类的构造函数中定义 new.target 属性
//但是其值有时会不同：
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}
// new.target 的值是 Square
let obj_2 = new Square(3); // false
// Square 调用 Rectangle 的构造函数，所以当调用发生时 new.target 等于 Square
//每个构造函数都可以根据自身被调用的方式改变自己的行为
//例如，可以用 new.target 创建一个抽象基类（不能被直接实例化的类）：
class Shape {
    constructor() {
        if (new.target === Shape) {
            // throw new Error("这个类不能被直接实例化");
        }
    }
}
class Rectangle2 extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
let x = new Shape(); //抛出错误
let y = new Rectangle2(3, 4);
console.log(y instanceof Shape); // true
//在这个示例中，每当 new.target 是 Shape 时构造函数总会抛出错误，这相当于调用 new Shape() 时总会出错
//但是，仍可用 Shape作为 基类派生其他类，如示例中的 Rectangle
// super() 调用执行了 Shape 的构造函数， new.target 与 Rectangle2 等价，所以构造函数继续执行不会抛出错误
//Note：因为类必须通过 new 关键字才能调用，所以在类的构造函数中， new.target 属性永远不会是 undefined
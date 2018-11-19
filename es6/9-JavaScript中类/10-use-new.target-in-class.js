//---在类的构造函数中使用new.target

//在类的构造函数中，可以通过new.target来确定类是如何被调用的
//在简单情况下，new.target等于类的构造函数，例如：
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
//new.target的值是Rectangle
let obj = new Rectangle(3, 4); //输出true
//这段代码展示了当调用new Rectangle(3, 4)时，等价于Rectangle的new.target
//类构造函数必须通过new关键字调用，所以总是在类的构造函数中定义new.target属性
//但是其值有时会不同：
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}
//new.target的值是Square
let obj_2 = new Square(3); //输出false
//Square调用Rectangle的构造函数，所以当调用发生时new.target等于Square
//每个构造函数都可以根据自身被调用的方式改变自己的行为
//例如，可以用new.target创建一个抽象基类(不能被直接实例化的类)：
class Shape {
    constructor() {
        if (new.target === Shape) {
            // throw new Error("这个类不能被直接实例化");
        }
    }
}
class Rectangle_2 extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
let x = new Shape(); //抛出错误
let y = new Rectangle_2(3, 4);
console.log(y instanceof Shape); //true
//在这个示例中，每当new.target是Shape时构造函数总会抛出错误，这相当于调用new Shape()时总会出错
//但是，仍可用Shape作为基类派生其他类，如示例中的Rectangle
//super()调用执行了Shape的构造函数，new.target与Rectangle_2等价，所以构造函数继续执行不会抛出错误
//Note：因为类必须通过new关键字才能调用，所以在类的构造函数中，new.target属性永远不会是undefined
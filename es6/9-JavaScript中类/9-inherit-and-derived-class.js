//---继承和派生类

//在es6之前，实现继承与自定义类型是一个不小的工作
//严格意义上的继承需要多个步骤实现：
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.get_area = function () {
    return this.length * this.width;
};

function Square(length) {
    Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value: Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});
let square = new Square(3);
console.log("[Square]---area = ", square.get_area()); //9
console.log("[Square]---square instanceof Square = ", square instanceof Square); //true
console.log("[Square]---square instanceof Rectangle = ", square instanceof Rectangle); //true
//Square继承自Rectangle，为了这样做，必须用一个创建自Rectangle.prototype的新对象重写Square.prototype，并调用Rectangle.call()方法
//类的出现，可以更轻松地实现继承功能，使用熟悉的extends关键字可以指定类继承的函数
//原型会自动调整，通过调用super()方法即可访问基类的构造函数
class Easy_Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    get_area() {
        return this.length * this.width;
    }
}
class Easy_Square extends Easy_Rectangle {
    constructor(length) {
        //等价于Rectangle.call(this, length, length);
        super(length, length);
    }
}
let easy_square = new Easy_Square(3);
console.log("[Easy_Square]---area = ", square.get_area()); //9
console.log("[Easy_Square]---easy_square instanceof Easy_Square = ", easy_square instanceof Easy_Square); //true
console.log("[Easy_Square]---easy_square instanceof Easy_Rectangle = ", easy_square instanceof Easy_Rectangle); //true
//Easy_Square通过extends关键字继承Rectangle类，在Square构造函数中，通过super()调用Rectangle构造函数并传入相应参数
//注意：与es5版本代码不同的是，标识符Easy_Rectangle只用于类声明(extends之后)
//继承自其他类的类被称作派生类，如果在派生类中指定了构造函数，则必须要调用super()，如果不这样做，程序就会报错
//如果选择不使用构造函数，则当创建新的类的实例时，会自动调用super()并传入所有参数
//以下两个类完全相同
class E_S_N extends Easy_Rectangle {
    //没有构造函数
}
class E_S_H extends Easy_Rectangle {
    constructor(...args) {
        super(...args);
    }
    //所有派生类的等效默认构造函数，所有参数按顺序被传递给基类的构造函数
}
//使用super()的小贴士
//关键点---1：只可在派生类的构造函数中使用super()，如果尝试在非派生类(不是用extends声明的类)或函数中使用则会导致程序抛出错误
//关键点---2：在构造函数中访问this之前一定要调用super()，它负责初始化this，如果在调用super()之前尝试访问this会导致程序出错
//关键点---3：如果不想调用super()，则唯一的方法是让类的构造函数返回一个对象

//1---类方法遮蔽
//派生类中的方法总会覆盖基类中的同名方法
class Cover_Method extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    //覆盖并遮蔽Rectangle.prototype.get_area()方法
    get_area() {
        return this.length * this.length;
    }
}
//由于为Cover_Method定义了get_area()方法，便不能再Cover_Method的实例中调用Rectangle.prototype.get_area()方法
//当然，如果想调用基类中该方法，则可以调用super.get_area()方法：
class Call_Method extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    //覆盖遮蔽后，调用Rectangle.prototype.get_area()
    get_area() {
        return super.get_area();
    }
}
//以这种方法使用Super与第4章讨论的Super引用一样，this值会被自动正确设置，然后就可以进行简单的方法调用了
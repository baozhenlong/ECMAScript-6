//---继承和派生类

//在 es6 之前，实现继承与自定义类型是一个不小的工作
//严格意义上的继承需要多个步骤实现：
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function () {
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
console.log('[Square]---area = ', square.getArea()); // 9
console.log('[Square]---square instanceof Square = ', square instanceof Square); // true
console.log('[Square]---square instanceof Rectangle = ', square instanceof Rectangle); // true
// Square 继承自 Rectangle ，为了这样做，必须用一个创建自 Rectangle.prototype 的新对象重写 Square.prototype ，并调用 Rectangle.call() 方法
//类的出现，可以更轻松地实现继承功能，使用熟悉的 extends 关键字可以指定类继承的函数
//原型会自动调整，通过调用 super() 方法即可访问基类的构造函数
class EasyRectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }
}
class EasySquare extends EasyRectangle {
    constructor(length) {
        //等价于 Rectangle.call(this, length, length);
        super(length, length);
    }
}
let easySquare = new EasySquare(3);
console.log('[EasySquare]---area = ', square.getArea()); // 9
console.log('[EasySquare]---easySquare instanceof EasySquare = ', easySquare instanceof EasySquare); // true
console.log('[EasySquare]---easySquare instanceof EasyRectangle = ', easySquare instanceof EasyRectangle); // true
// EasySquare 通过 extends 关键字继承 Rectangle 类，在 Square 构造函数中，通过 super() 调用 Rectangle 构造函数并传入相应参数
//注意：与 es5 版本代码不同的是，标识符 EasySquare 只用于类声明（ extends 之后）
//继承自其他类的类被称作派生类，如果在派生类中指定了构造函数，则必须要调用super()，如果不这样做，程序就会报错
//如果选择不使用构造函数，则当创建新的类的实例时，会自动调用super()并传入所有参数
//以下两个类完全相同
class ESN extends EasyRectangle {
    //没有构造函数
}
class ESH extends EasyRectangle {
    constructor(...args) {
        super(...args);
    }
    //所有派生类的等效默认构造函数，所有参数按顺序被传递给基类的构造函数
}
//使用 super() 的小贴士
//关键点---1：只可在派生类的构造函数中使用 super() ，如果尝试在非派生类（不是用 extends 声明的类）或函数中使用则会导致程序抛出错误
//关键点---2：在构造函数中访问 this 之前一定要调用 super() ，它负责初始化 this ，如果在调用 super() 之前尝试访问 this 会导致程序出错
//关键点---3：如果不想调用 super() ，则唯一的方法是让类的构造函数返回一个对象

//1---类方法遮蔽
//派生类中的方法总会覆盖基类中的同名方法
class CoverMethod extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    //覆盖并遮蔽 Rectangle.prototype.getArea() 方法
    getArea() {
        return this.length * this.length;
    }
}
//由于为 CoverMethod 定义了 getArea() 方法，便不能在 CoverMethod 的实例中调用 Rectangle.prototype.getArea() 方法
//当然，如果想调用基类中该方法，则可以调用 super.getArea() 方法：
class CallMethod extends Rectangle {
    constructor(length) {
        super(length, length);
    }
    //覆盖遮蔽后，调用 Rectangle.prototype.getArea()
    getArea() {
        return super.getArea();
    }
}
//以这种方法使用 Super 与第 4 章讨论的 Super 引用一样， this 值会被自动正确设置，然后就可以进行简单的方法调用了

//2---静态成员继承
//如果基类有静态成员，那么这些静态成员在派生类中也可用
class Rectangle2 {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    static create(length, width) {
        return new Rectangle2(length, width);
    }
}
class Square2 extends Rectangle2 {
    constructor(length) {
        //等价于 Rectangke_2.call(this, length, length)
        super(length, length);
    }
}
let rect2 = Square2.create(3, 4);
console.log('rect2 instanceof Rectangle2 = ', rect2 instanceof Rectangle2); // true
console.log('rect2.getArea() = ', rect2.getArea()); // 12
console.log('rect2 instanceof Square2 = ', rect2 instanceof Square2); // false
//在这段代码中，新的静态方法 create() 被添加到 Rectangle2 类中，继承后的 Square2.create() 与 Rectangle.create() 的行为很像

//3---派生自表达式的类
// ECMAScript 6 最强大的一面或许是从表达式导出类的功能了
//只要表达式可以被解析为一个函数并且具有 [[Construct]] 属性和原型，那么就可以用 extends 进行派生
function Rectangle3(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle3.prototype.getArea = function () {
    return this.length * this.width;
};
class Square3 extends Rectangle3 {
    constructor(length) {
        super(length, length);
    }
}
let x = new Square3(3);
console.log('x.getArea() = ', x.getArea()); // 9
console.log('x instanceof Rectangle3 = ', x instanceof Rectangle3); // true
// Rectangle3 是 ECMAScript 5 风格的构造函数， Square3 是一个类
//由于 Rectangle3 具有 [[Construct]] 属性和原型，因此 Square3 类可以直接继承它
// extends 强大的功能使得类可以继承自任意类型的表达式，从而创造更多可能性
//动态地确定类的继承目标：
function get_base() {
    return Rectangle3;
}
class Square4 extends get_base() {
    constructor(length) {
        super(length, length);
    }
}
let x4 = new Square4(3);
console.log('x4.getArea() = ', x4.getArea()); // 9
console.log('x4 instanceof Rectangle3 = ', x4 instanceof Rectangle3); // true
// get_base() 函数是类声明的一部分，直接调用后返回 Rectangle3 ，此示例实现的功能与之前的示例等价
//由于可以动态确定使用哪个基类，因而可以创建不同的继承方法：
let SerializableMixIn = {
    serialize() {
        return JSON.stringify(this);
    }
};
let AreaMixIn = {
    getArea() {
        return this.length * this.width;
    }
};

function mixIn(...mixInList) {
    let base = function () {};
    Object.assign(base.prototype, ...mixInList);
    return base;
}

class Square5 extends mixIn(AreaMixIn, SerializableMixIn) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}
let x5 = new Square5(3);
console.log('x5.getArea() = ', x5.getArea()); // 9
console.log('x5.serialize() = ', x5.serialize()); // {"length":3,"width":3}
//这个示例使用了 mixIn 函数代替传统的继承方法，它可以接受任意数量的 mixIn 对象作为参数
//首先创建一个函数 base ，再将每一个 mixIn 对象的属性值赋值给 base 的原型，最后 mixIn 返回这个 base 函数
//所以 Square5 可以基于这个返回的函数用 extends 进行扩展
//注意：因为使用了 extends ，因此在构造函数中需要调用 super()
// Square5 的实例拥有来自 AreaMixIn 对象的 getArea() 方法和 SerializableMixIn 对象的 serialize() 方法
//这些都是通过原型继承实现的， mixIn 函数会用所有 mixIn 对象的自有属性动态填充新函数的原型
//注意：如果多个 mixIn 对象具有相同属性，那么只有最后一个被添加的属性被保留
//Note：在 extends 后可以使用任意表达式，但不是所有表达式最终都能生成合法的类
//如果使用 null 或生成器函数会导致错误发生
//类在这些情况下没有 [[Construct]] 属性，尝试为其创建新的实例会导致程序无法调用 [[Construct]] 而报错

//4---内建对象的继承
//自 JavaScript 数组诞生以来，开发者一直都希望通过继承的方式创建属于自己的特殊数组
//在 ECMAScript 5 及早期版本中，这几乎是不可能的，用传统的继承方法无法实现这样的功能，例如：
//内建数组行为
let colors = [];
colors[0] = 'red';
console.log('colors.length = ', colors.length); // 1
colors.length = 0;
console.log('colors[0] = ', colors[0]); // undefined
//尝试通过 ES5 语法语法继承数组
function MyArray() {
    Array(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
let myColors = new MyArray();
myColors[0] = 'red';
console.log('myColors.length = ', myColors.length); // 0
myColors.length = 0;
console.log('myColors[0] = ', myColors[0]); // red
// MyArray 实例的 length 和数值型属性的行为与内建数组中的不一致
//这是因为通过传统 JavaScript 继承形式实现的数组继承没有从 Array.apply() 或原型赋值中继承相关的功能
// ES5 的传统继承方式中，先由派生类型 （例如，My_Array）创建 this 的值，然后调用基类型的构造函数（例如， Array.apply() 方法）
//这也意味着， this 的值开始指向的是 MyArray 的实例，但是随后会被来自 Array 的其他属性所修饰
// ES6 中的类继承则与之相反，先由基类（Array）创建 this 的值，然后派生类的构造函数（MyArray）再修改这个值
//所以一开始可以通过 this 访问基类的所有内建功能，然后再正确地接收所有与之相关的功能
//以下示例是一个基于类生成特殊数组的实践：
class MyArray2 extends Array {
    //空
}
let myColors2 = new MyArray2();
myColors2[0] = 'red';
console.log('myColors2.length = ', myColors2.length); // 1
myColors2.length = 0;
console.log('myColors2[0] = ', myColors2[0]); // undefined
// MyArray2 继承自 Array ，其行为与 Array 也很相似，操作数值型属性会更新 length ，操作 length 属性也会更新数值型属性
//于是，可以正确地继承 Array 对象来创建自己的派生数组类型，当然也可以继承其他的内建对象
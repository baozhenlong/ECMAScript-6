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

//2---静态成员继承
//如果基类有静态成员，那么这些静态成员在派生类中也可用
class Rectangle_2 {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    get_area() {
        return this.length * this.width;
    }

    static create(length, width) {
        return new Rectangle_2(length, width);
    }
}
class Square_2 extends Rectangle_2 {
    constructor(length) {
        //等价于Rectangke_2.call(this, length, length)
        super(length, length);
    }
}
let rect_2 = Square_2.create(3, 4);
console.log("rect_2 instanceof Rectangle_2 = ", rect_2 instanceof Rectangle_2); //true
console.log("rect_2.get_area() = ", rect_2.get_area()); //12
console.log("rect_2 instanceof Square_2 = ", rect_2 instanceof Square_2); //false
//在这段代码中，新的静态方法create()被添加到Rectangle_2类中，继承后的Square_2.create()与Rectangle.create()的行为很像

//3---派生自表达式的类
//ECMAScript 6最强大的一面或许是从表达式导出类的功能了
//只要表达式可以被解析为一个函数并且具有[[Construct]]属性和原型，那么就可以用extends进行派生
function Rectangle_3(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle_3.prototype.get_area = function () {
    return this.length * this.width;
};
class Square_3 extends Rectangle_3 {
    constructor(length) {
        super(length, length);
    }
}
let x = new Square_3(3);
console.log("x.get_area() = ", x.get_area()); //9
console.log("x instanceof Rectangle_3 = ", x instanceof Rectangle_3); //true
//Rectangle_3是ECMAScript 5风格的构造函数，Square_3是一个类
//由于Rectangle_3具有[[Construct]]属性和原型，因此Square_3类可以直接继承它
//extends强大的功能使得类可以继承自任意类型的表达式，从而创造更多可能性
//动态地确定类的继承目标：
function get_base() {
    return Rectangle_3;
}
class Square_3_2 extends get_base() {
    constructor(length) {
        super(length, length);
    }
}
let x_2 = new Square_3_2(3);
console.log("x_2.get_area() = ", x_2.get_area()); //9
console.log("x_2 instanceof Rectangle_3 = ", x_2 instanceof Rectangle_3); //true
//get_base()函数是类声明的一部分，直接调用后返回Rectangle_3，此示例实现的功能与之前的示例等价
//由于可以动态确定使用哪个基类，因而可以创建不同的继承方法：
let Serializable_Mix_In = {
    serialize() {
        return JSON.stringify(this);
    }
};
let Area_Mix_In = {
    get_area() {
        return this.length * this.width;
    }
};

function mix_in(...mix_in_list) {
    let base = function () {};
    Object.assign(base.prototype, ...mix_in_list);
    return base;
}

class Square_3_3 extends mix_in(Area_Mix_In, Serializable_Mix_In) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}
let x_3 = new Square_3_3(3);
console.log("x_3.get_area() = ", x_3.get_area()); //9
console.log("x_3.serialize() = ", x_3.serialize()); //{"length":3,"width":3}
//这个示例使用了mix_in函数代替传统的继承方法，它可以接受任意数量的min_in对象作为参数
//首先创建一个函数base，再将每一个mix_in对象的属性值赋值给base的原型，最后mix_in返回这个base函数
//所以Square_3_3可以基于这个返回的函数用extends进行扩展
//注意：因为使用了extends，因此在构造函数中需要调用super()
//Square_3_3的实例拥有来自Area_Mix_In对象的get_area()方法和Serializable_Mix_In对象的serialize()方法
//这些都是I通过原型继承实现的，mix_in函数会用所有mix_in对象的自有属性动态填充新函数的原型
//注意：如果多个mix_in对象具有相同属性，那么只有最后一个被添加的属性被保留
//Note：在extends后可以使用任意表达式，但不是所有表达式最终都能生成合法的类
//如果使用null或生成器函数会导致错误发生
//类在这些情况下没有[[Construct]]属性，尝试为其创建新的实例会导致程序无法调用[[Construct]]而报错

//4---内建对象的继承
//自JavaScript数组诞生以来，开发者一直都希望通过继承的方式创建属于自己的特殊数组
//在ECMAScript 5及早期版本中，这几乎是不可能的，用传统的继承方法无法实现这样的功能，例如：
//内建数组行为
let colors = [];
colors[0] = "red";
console.log("colors.length = ", colors.length); //1
colors.length = 0;
console.log("colors[0] = ", colors[0]); //undefined
//尝试通过ES5语法语法继承数组
function My_Array() {
    Array(this, arguments);
}
My_Array.prototype = Object.create(Array.prototype, {
    constructor: {
        value: My_Array,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
let my_colors = new My_Array();
my_colors[0] = "red";
console.log("my_colors.length = ", my_colors.length); //0
my_colors.length = 0;
console.log("my_colors[0] = ", my_colors[0]); //red
//My_Array实例的length和数值型属性的行为与内建数组中的不一致
//这是因为通过传统JavaScript继承形式实现的数组继承没有从Array.apply()或原型赋值中继承相关的功能
//ES5的传统继承方式中，先由派生类型(例如，My_Array)创建this的值，然后调用基类型的构造函数(例如，Array.apply()方法)
//这也意味着，this的值开始指向的是My_Array的实例，但是随后会被来自Array的其他属性所修饰
//ES6中的类继承则与之相反，先由基类(Array)创建this的值，然后派生类的构造函数(My_Array)再修改这个值
//所以一开始可以通过this访问基类的所有内建功能，然后再正确地接收所有与之相关的功能
//以下示例是一个基于类生成特殊数组的实践：
class My_Array_2 extends Array {
    //空
}
let my_colors_2 = new My_Array_2();
my_colors_2[0] = "red";
console.log("my_colors_2.length = ", my_colors_2.length); //1
my_colors_2.length = 0;
console.log("my_colors_2[0] = ", my_colors_2[0]); //undefined
//My_Array_2继承自Array，其行为与Array也很相似，操作数值型属性会更新length，操作length属性也会更新数值型属性
//于是，可以正确地继承Array对象来创建自己的派生数组类型，当然也可以继承其他的内建对象
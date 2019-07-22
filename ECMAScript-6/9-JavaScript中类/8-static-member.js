//---静态成员

//如果不介意在对象的实例中出现添加的方法和访问器属性，则可以将它们添加到类的原型中
//如果希望只出现在类中，那么需要使用静态成员
//在 es5 及早期版本中，直接将方法添加到构造接函数中来模拟静态成员是一种常见的模式，例如：
function PersonType(name) {
    this.name = name;
}
//静态方法
PersonType.create = function (name) {
    return new PersonType(name);
};
//实例方法
PersonType.prototype.sayName = function () {
    console.log('[PersonType]---name = ', this.name);
};
let person = Person.create('damon');
//在其他编程语言中，由于工厂方法 PersonType.create() 使用的数据不依赖 PersonType 的实例，因而其会被认为是一个静态方法
// es6 的类语法简化了创建静态成员的过程，在方法或访问器属性名前使用正式的静态注释即可
//下面这个类等价于之前的示例：
class SimplifyPersonType {
    //等价于 Person_Type 构造函数
    constructor(name) {
        this.name = name;
    }
    //等价于 Person_Type.prototype.sayName
    sayName() {
        console.log('[SimplifyPersonType]---name = ', this.name);
    }
    //等价于 Person_Type.create
    static create(name) {
        return new SimplifyPersonType(name);
    }
}
let simplifyPerson = Simplify_Person_Type.create('damon');
//类中的所有方法和访问器属性都可以用 static 关键字来定义，唯一的限制是不能将 static 用于定义构造函数方法
//Note：不可在实例中访问静态成员，必须要直接在类中访问静态成员
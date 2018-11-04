//作为一等公民的类

//在程序中，一等公民是指一个可以传入函数，可以从函数返回，并且可以赋值给变量的值
//JavaScript函数是一等公民(也被称作头等函数)

//1---将类作为参数传入函数：
function create_obj(class_def) {
    return new class_def();
}
let obj = create_obj(class {
    say_hi() {
        console.log("[将类作为参数传入函数]---hi");
    }
});
obj.say_hi(); //hi
//在这个示例中，调用create_obj()函数时，传入一个匿名类表达式作为参数
//然后通过关键字new实例化这个类并返回实例，将其存储在变量obj中

//2---通过立即调用类构造函数可以创建单例
//用new调用类表达式，紧接着用一对小括号()调用这个表达式：
let person = new class {
    constructor(name) {
        this.name = name;
    }
    say_name() {
        console.log("[单例]---hi");
    }
}("damon");
person.say_name(); //hi
//这里先创建一个匿名类表达式，然后立即执行
//依照这种模式可以使用类语法创建单例，并且不会在作用域中暴露类的引用
//其后的小括号表明正在调用一个函数，而且可以传参数给这个函数
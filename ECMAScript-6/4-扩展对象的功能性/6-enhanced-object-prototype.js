//---增强对象原型
//原型是JavaScript继承的基础

//1---改变对象的原型
//正常情况下，无论是通过构造函数还是Object.create()方法创建对象，其原型是在对象被创建时指定的
//获取对象的原型：Object.getPropertyOf()
//改变对象的原型：Object.setPropertyOf(obj, prototype)
//obj：被改变原型的对象
//prototype：替代第一个参数原型的对象
let person = {
    get_greeting() {
        return "hi";
    }
};
let dog = {
    get_greeting() {
        return "woof";
    }
};
//以person对象为原型
let friend = Object.create(person);
console.log("[friend]---greeting = " + friend.get_greeting()); //hi
console.log(Object.getPrototypeOf(friend) === person); //true
//将原型设置为dog
Object.setPrototypeOf(friend, dog); //原先与person对象的关联被解除
console.log("[friend]---greeting = " + friend.get_greeting()); //woof
console.log(Object.getPrototypeOf(friend) === dog); //true
//对象原型的真实值被存储在内部专用属性[[Prototype]]中，调用Object.getPropertyOf()方法返回存储在其中的值
//调用Object.setPrototypeOf()方法改变其中的值；然而这不是操作[[Prototype]]的唯一方法

//2---简化原型访问的Super引用
//es6引入了Super引用的特性，使用它可以更便捷地访问对象原型
//重写对象实例的方法，并调用与它同名的原型方法
//在es5的实现
let teacher = {
    get_greeting() {
        return Object.getPrototypeOf(this).get_greeting.call(this) + ", teacher";
    }
};
//将person对象设置为person
Object.setPrototypeOf(teacher, person);
console.log("[teacher]---greeting = " + teacher.get_greeting()); //hi, teacher
console.log(Object.getPrototypeOf(teacher) === person); //true
//将原型设置为dog
Object.setPrototypeOf(teacher, dog);
console.log("[teacher]---greeting = " + teacher.get_greeting()); //woof, teacher
console.log(Object.getPrototypeOf(teacher) === dog); //true
//es6的实现
//Super引用存在于简写方法的对象中
//Super引用相当于指向对象原型的指针，实际上也就是Object.getPrototypeOf(this)的值
//使用super关键字调用对象原型上方法，此时的this绑定会被自动设置为当前作用域的this值
let better_teacher = {
    get_greeting() {
        return super.get_greeting() + ", better_teacher";
        //调用super.get_greeting()方法[效果]相当于在当前上下文中调用Object.getPrototypeOf(this).get_greeting.call(this)
    }
};
Object.setPrototypeOf(better_teacher, person);
console.log("[better_teacher]---greeting = " + better_teacher.get_greeting()); //hi, better_teacher
//Super引用在多重继承的情况下非常有用，因为在这种情况下，使用Object.getPrototypeOf()方法将出现问题
//原型是teacher
let relative = Object.create(teacher);
// console.log("[多重继承]---relative.get_greeting = " + relative.get_greeting());  //报错
//this是relative，relative的原型是teacher对象，当执行relative的get_greeting()方法时，会调用teacher的get_greeting()方法，
//而此时的this值为relative，Object.getPrototypeOf(this)又会返回teacher对象
//所以就会进入递归调用直到触发栈溢出报错
//使用Super引用可以解决
let better_relative = Object.create(better_teacher);
console.log("[多重继承]---better_relative.get_greeting = " + better_relative.get_greeting()); //hi, better_teacher
//Super引用不是动态变化的，它总是指向正确的对象
//在这个示例中，无论有多少其他方法继承了get_greeting()方法，super.get_greeting()始终指向person.get_greeting()方法
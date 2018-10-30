//---es5中的近类结构

//在es5及早期版本中没有类的概念，最相近的思路是创建一个自定义类型：
//首先创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型：
function Person_Type(name) {
    this.name = name;
}
Person_Type.prototype.say_name = function () {
    console.log("[es5中的近类结构]---say_name name = ", this.name);
};
let person = new Person_Type("damon"); //damon
person.say_name();
console.log("[es5中的近类结构]---", (person instanceof Person_Type)); //true
console.log("[es5中的近类结构]---", (person instanceof Object)); //true
//Person_Type是一个构造函数，其执行后创建一个名为name的属性
//给Person_Type的原型添加一个say_name()方法，所以Person_Type对象的所有实例都将共享这个方法
//使用new操作符创建一个Person_Type的实例person，并最终证实了person对象确实是Person_Type的实例，且由于存在原型继承的特性，因而它也是Object的实例
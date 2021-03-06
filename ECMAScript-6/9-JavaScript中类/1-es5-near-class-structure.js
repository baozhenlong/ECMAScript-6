//---es5 中的近类结构

//在 es5 及早期版本中没有类的概念，最相近的思路是创建一个自定义类型：
//首先创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型：
function PersonType(name) {
    this.name = name;
}
PersonType.prototype.sayName = function () {
    console.log('[es5中的近类结构]---sayName name = ', this.name);
};
let person = new PersonType('damon');
person.sayName(); //damon
console.log('[es5中的近类结构]---', (person instanceof PersonType)); // true
console.log('[es5中的近类结构]---', (person instanceof Object)); // true
// PersonType 是一个构造函数，其执行后创建一个名为 name 的属性
//给 PersonType 的原型添加一个 sayName() 方法，所以 PersonType 对象的所有实例都将共享这个方法
//使用 new 操作符创建一个 PersonType 的实例 person ，并最终证实了 person 对象确实是 PersonType 的实例
//且由于存在原型继承的特性，因而它也是 Object 的实例
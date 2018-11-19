//---可计算成员名称

//类和对象字面量还有更多相似之处，类方法和访问器属性也支持使用可计算名称
//就像在对象字面量中一样，用方括号包裹一个表达式即可使用可计算名称
//[expression]
let method_name = "say_name";
class Person_Class {
    constructor(name) {
        this.name = name;
    }

    [method_name]() {
        console.log("[可计算成员名称]---say_name name = ", this.name);
    }
};
let me = new Person_Class("damon");
me.say_name(); //damon
//这个版本的Person_Class通过变量来给类定义中的方法命名
//字符串"say_name"被赋值给method_name变量，然后method又被用于声明随后可直接访问的say_name()方法
//通过相同的方式，可以在访问器属性中应用可计算名称
let property_name = "ele";
class Custom_Element {
    constructor(element) {
        this.element = element;
    }
    get[property_name]() {
        return this.element;
    }
    set[property_name](value) {
        this.element = value;
    }
}
//在这里通过property_name变量并使用getter和setter方法为类添加ele属性，并且可以像往常一样通过.ele访问该属性
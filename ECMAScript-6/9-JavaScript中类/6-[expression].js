//---可计算成员名称

//类和对象字面量还有更多相似之处，类方法和访问器属性也支持使用可计算名称
//就像在对象字面量中一样，用方括号包裹一个表达式即可使用可计算名称
// [expression]
let methodName = 'sayName';
class PersonClass {
    constructor(name) {
        this.name = name;
    }

    [methodName]() {
        console.log('[可计算成员名称]---sayName name = ', this.name);
    }
};
let me = new PersonClass('damon');
me.sayName(); // damon
//这个版本的 PersonClass 通过变量来给类定义中的方法命名
//字符串 "sayName" 被赋值给 methodName 变量，然后 methodName 又被用于声明随后可直接访问的 sayName() 方法
//通过相同的方式，可以在访问器属性中应用可计算名称
let propertyName = 'ele';
class CustomElement {
    constructor(element) {
        this.element = element;
    }
    get[propertyName]() {
        return this.element;
    }
    set[propertyName](value) {
        this.element = value;
    }
}
//在这里通过 propertyName 变量并使用 getter 和 setter 方法为类添加 ele 属性，并且可以像往常一样通过 .ele 访问该属性
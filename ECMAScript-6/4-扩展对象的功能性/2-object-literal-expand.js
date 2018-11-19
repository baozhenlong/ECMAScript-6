//---对象字面量语法扩展

//1---属性初始值的简写
function create_person(name, age) {
    //属性名称和函数参数相同
    return {
        name: name,
        age: age
    };
}
//在es6中，通过使用属性初始化的简写语法，可以消除这种属性名称和局部变量之间的重复书写
//当一个对象的属性与本地变量同名时，不必再写冒号和值，简单地只写属性名即可
function better_create_person(name, age) {
    return {
        name,
        age
    };
}
//当对象字面量里只有一个属性的名称时，JavaScript引擎会在可访问作用域中查找其同名变量
//如果找到，则该变量的值被赋给对象字面量的同名属性
{
    let person = better_create_person("damon", 18);
    console.log("[对象属性初始值简写]---person = " + JSON.stringify(person)); //{"name":"damon","age":18}
}

//2---对象方法的简写语法
let person = {
    name: "damon",
    say_name: function () {
        console.log(this.name);
    }
}
//在es6中，语法更简洁，消除了冒号和function关键字
let better_person = {
    name: "damon",
    say_name() {
        console.log(this.name)
    }
    //say_name属性被赋值为一个匿名函数表达式，它拥有在es5中定义的对象方法所具有的全部特性
    //两者唯一的区别是，简写方法可以使用super关键字
}
console.log("[对象方法的简写语法]---name = " + better_person.say_name.name); //say_name
//通过对象方法的简写语法创建的方法有一个name属性，其值为小括号()前的名称

//3---可计算属性名
{
    let name = {};
    let last_name = "last name";
    name["first name"] = "first name";
    name[last_name] = "last name";
    console.log("[可计算属性名]---[字符串字面值] = " + name["first name"]); //first name
    console.log("[可计算属性名]---[变量] = " + name[last_name]); //last name
    //引用的2个属性名称中都含有空格，因为不可使用点记法引用这些属性，却可以使用方括号（支持通过任何字符串值作为名称访问属性的值）
    //在对象字面量中，可以直接使用字符串字面值作为属性名称
    let another_name = {
        "real name": "damon"
    };
}
//在es6中，可在对象字面量中使用可计算属性名称，其语法与引用对象实例的可计算属性名称相同（使用方括号[]）
{
    let last_name = "last name";
    let name = {
        "first name": "first name",
        [last_name]: "last name",
        last_name: " last_name"
    };
    console.log("[在{}中使用字符串作为可计算属性名]---first name = " + name["first name"]); //first name
    console.log("[在{}中使用字符串作为可计算属性名]---last name = " + name["last name"]); //last name
    console.log("[在{}中使用字符串作为可计算属性名]---last_name = " + name["last_name"]); //last_name
    //在对象字面量中使用方括号表示的该属性名称是可计算的，它的内容将被求值并被最终转化为一个字符串
    //因而，同样可以使用表达式作为属性的可计算名称
    let suffix = " name";
    let another_name = {
        ["first" + suffix]: "first name",
        ["last" + suffix]: "last name"
    };
    console.log("[在{}中使用表达式作为可计算属性名]---first name = " + another_name["first name"]); //first name
    console.log("[在{}中使用表达式作为可计算属性名]---last name = " + another_name["last name"]); //last name
    //任何可用于对象实例括号记法的属性名，也可以作为字面量中的计算属性名
}
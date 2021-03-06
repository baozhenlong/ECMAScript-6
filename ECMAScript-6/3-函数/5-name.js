//---name属性

//1---如何选择合适的名称
function do_something() {}
let do_another_thing = function () {}
//函数声明的name属性值，对应着声明时的函数名称
console.log("[name]---函数 name = " + do_something.name); //do_something
//匿名函数表达式的name属性值，对应着被赋值为该匿名函数的变量的名称
console.log("[name]---函数表达式 name = " + do_another_thing.name); //do_another_thing

//2---name属性的特殊情况
let do_something_2 = function do_something_else() {};
let person = {
    say_name: function () {
        console.log("[name]---thisr.name" + this.name);
    }
};
//函数表达式的名字比函数本身被赋值的变量的权重高
console.log("[name]---do_something_2.name = " + do_something_2.name); //do_something_else
//对象的函数取对象字面量
console.log("[name]---person.say_name.name = " + person.say_name.name); //say_name
//通过bind()函数创建的函数，其名称将带有"bound"前缀
//绑定函数的name属性 = "bound " + 由被绑定函数的name属性
console.log("[name]---bind = " + do_something_2.bind().name); //bound do_something_else
//通过Function构造函数创建的函数，其名称将带有"anonymous"前缀
console.log("[name]---Function = " + (new Function().name)); //anonymous

//切记：函数name属性的值不一定引用同名变量，它只是协助调试用的额外信息，所以不能使用name属性的值来获取对于函数的引用
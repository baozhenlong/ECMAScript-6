//---块级声明
//块级声明用于声明在指定块的作用域之外无法访问的变量
//块级作用域存在于：函数内部和块中（{}）

//1---let声明
//let声明的用法与var相同，用let代替var来声明变量。就可以把变量的作用域限制在当前代码块中
function get_let_value(condition) {
    if (condition) {
        let value = 'blue';
        return value;
    } else {
        //变量value在此处不存在
        return null;
    }
    //变量value在此处不存在
}

//2---禁止重声明
//作用域中已经存在某个标识符，此时再使用let关键字声明它就会抛出错误
// var count = 30;
// let count = 40; //抛出语法错误
//同一作用域中不能用let重复定义已经存在的标识符
//可以在内嵌的作用域中用let声明同名变量
var count = 30;
if (true) {
    //不会抛出错误，内部块中的count会遮蔽全局作用域中的count，后者只有if块外才能访问到
    let count = 40;
}

//3---const声明
//使用const声明的是常量，其值一旦被设定后不可更改
//因此每个通过const声明的常量必须进行初始化，否则会抛出语法错误
//3.1---const与let
//相似
//const与let声明的都是块级标识符，所以常量也只在当前代码块内有效，一旦执行到块外会立即销毁
//常量同样也不会被提升至作用域顶部
if (true) {
    const max_score = 100;
}
//此处无法访问max_score
//与let相似，在同一作用域用const声明已经存在的标识符也会导致语法错误
//无论标识符是使用var（在全局或函数作用域中），还是let（块级作用域中）声明
var message = 'hi';
let age = 18;
//下述两条语句都会抛出错误
// const message = 'hello';
// const age = 20;
//不同
//无论在严格模式还是在非严格模式下，都不可以为const定义的常量再赋值，否则会抛出错误
//3.2---用const声明对象
//const声明不允许修改绑定，但允许修改值；这也就意味着用const声明对象后，可以修改该对象的属性值
const person = {
    name: 'damon'
};
//可以修改对象属性的值
person.name = 'stefan';
person.age = 18;
// person = {
//     name: 'stefan'
// }; //抛出语法错误

//4---临时死区（Temporal Dead Zone）TDZ
//与var不同，let和const声明的变量不会被提升到作用域顶部
//如果在声明之前访问这些变量，会引发错误
if (true) {
    // console.log(typeof value); //引用错误
    let value = 'bule';
}
//JavaScript引擎在扫描代码发现变量声明时，要么将它们提升至作用域顶部（遇到var变量），要么将声明放到TDZ中（遇到let和const）
//访问TDZ中的变量会触发运行时错误；只有执行过变量声明语句后，变量才从TDZ中移除，然后方可正常访问
console.log(typeof value); //undefined
//typeof是在变量value声明的代码块执行的，此时value并不在TDZ中，意味着不存在value这个绑定
if (true) {
    let value = 'blue';
}
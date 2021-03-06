//---函数形参的默认值

//1---es5中模拟默认参数
function make_request(url, timeout, callback) {
    timeout = timeout || 2000;
    callback = callback || function () {};
}
//在这个示例中，timeout和callbac为可选参数，如果不传入相应的参数，系统会给它们赋予一个默认值
//在含有逻辑或（||）操作符的表达式中，前一个操作数的值为false时，总会返回后一个值
//对于函数的命名参数，如果不显式传值，则其值默认为undefined
//缺陷：当给timeout传入值0，即使这个值是合法的，也会被视为一个false值，并最终将timeout赋值为2000
//更安全的方式：通过typeof检查参数类型
function make_request_2(url, timeout, callback) {
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function () {};
}

//2---es6中的参数默认值
//如果没为参数传入值，则为其提供一个初始值
function make_request_3(url, timeout = 2000, callback = function () {}) {}
//url为必需参数，timeout和callback为可选参数
//声明函数时，可以为任意参数指定默认值，在已指定默认值的参数后可以继续声明无默认值参数
function make_request_4(url, timeout = 2000, callback) {}
//在这种情况下，只有当不为第2个参数传入值或主动传入undefined时，才会使用timeout的默认值
//对于默认参数,null是一个合法值；传入null时，将不使用默认值

//3---默认参数值对arguments对象的影响
//切记，当使用默认参数值时，arguments对象的行为与以往不同
//在es6中，如果一个函数使用了默认参数值，默认参数值的存在使得arguments对象保持与命名参数分离
function mix_args(first, second = "b") {
    console.log("[mix_args]---arguments.length = " + arguments.length);
    console.log("[mix_args]---arguments[0] = " + arguments[0]);
    console.log("[mix_args]---arguments[1] = " + arguments[1]);
    console.log("[mix_args]---first === arguments[0] = " + (first === arguments[0]));
    console.log("[mix_args]---second === arguments[0] = " + (first === arguments[1]));
    first = "c";
    second = "d";
    console.log("[mix_args]---arguments[0] = " + arguments[0]);
    console.log("[mix_args]---arguments[1] = " + arguments[1]);
    console.log("[mix_args]---first === arguments[0] = " + (first === arguments[0]));
    console.log("[mix_args]---second === arguments[0] = " + (first === arguments[1]));
}
mix_args("a");
// [mix_args]---arguments.length = 1
// [mix_args]---arguments[0] = a
// [mix_args]---arguments[1] = undefined
// [mix_args]---first === arguments[0] = true
// [mix_args]---second === arguments[0] = false
// [mix_args]---arguments[0] = a
// [mix_args]---arguments[1] = undefined
// [mix_args]---first === arguments[0] = false
// [mix_args]---second === arguments[0] = false
//改变first和second并不会影响arguments对象
//总是可以通过arguments对象将参数恢复为初始值，无论当前是否在严格模式的环境下

//4---默认参数表达式
//关于默认参数值，最有趣的特性可能是非原始值传参了
//例子：通过函数执行来得到默认参数的值
let value = 5;
//每次返回不同的值
function get_value() {
    return value++;
}
//相加
function add(first, second = get_value()) {
    console.log("[add]---value = " + (first + second));
    return first + second;
}
//如果不传入最后一个参数，就调用get_value()函数来得到默认值
//切记，初次解析函数声明时，不会调用get_value()方法，只有当调用add()函数且不传入第2个参数时才会调用
add(1, 1);
// [add]---value = 2
add(1);
// [add]---value = 6
add(1);
// [add]---value = 7
//注意：当使用函数调用结果作为默认参数值时，如果忘了写小括号()，例如，second = get_value，则最终传入的是对函数的引用，而不是函数调用的结果
//因为默认参数是在函数调用时求值，所以可以使用先定义的参数作为后定义参数的默认值
function add_2(first, second = first) {
    console.log("[add_2]---value = " + (first + second));
    return first + second;
}
add_2(1, 1);
// [add_2]---value = 2
add_2(1);
// [add_2]---value = 2
//在引用参数默认值的时候，只允许引用前面参数的值，即先定义的参数不能访问后定义的参数

//5---默认参数的临时死区
//与let声明类似，定义参数时会为每个参数创建一个新的标识符绑定，该标识符在初始化之前不可被引用，如果试图访问会导致程序抛出错误
//当调用函数时，会通过传入的值或参数的默认值初始化该参数
function add_3(first, second = first) {}
add_3(1, 1);
//相当于执行以下代码来创建first和second参数值
{
    let first = 1;
    let second = 1;
}
add_3(1);
//相当于执行以下代码来创建first和second参数值
{
    let first = 1;
    let second = first;
}
//当初次执行函数add()时，绑定first和second被添加到一个专属于函数参数的临时死区（与let的行为类似）
//初始化后，被移出临时死区
//由于初始化second的时，first已经被初始化，所以它可以访问first的值，但是反过来就错了
//所有引用临时死区中绑定的行为都会报错
//函数参数有自己的作用域和临时死区，与其函数体的作用域是各自独立的，也就是说参数的默认值不可访问函数体内声明的变量
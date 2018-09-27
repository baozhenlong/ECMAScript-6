//---尾调用优化

function do_something_else() {
    return 1;
}
//尾调用：指的是函数作为另一个函数的最后一条语句被调用
function do_somthing() {
    return do_something_else(); //尾调用
}
//在es5的引擎中，尾调用的实现与其他函数调用的实现类似：
//创建一个新的栈帧，将其推入调用栈来表示函数调用
//在循环调用中，每一个未用完的栈帧都会被保存在内存中，当调用栈变得过大时，会造成程序问题

//1---es6中的尾调用优化
//es6缩减了严格模式下尾调用栈的大小（非严格模式下不受影响）
//如果满足以下条件，尾调用不再创建新的栈帧，而是清除并重用当前栈帧：
//条件1：尾调用不访问当前栈帧的变量；也就是说函数不是一个闭包
//条件2：在函数内部，尾调用是最后一条语句
//条件3：尾调用的结果作为函数值返回
//do_somthing满足上述3个条件
//不满足上述条件3
function do_something_3() {
    //无法优化，无返回
    do_something_else();
}
//不满足上述条件2
function do_something_2() {
    //无法优化，在尾调用返回后执行其他操作
    return 1 + do_something_else();
}
//不满足上述条件2的意外情况
function do_something_2_2() {
    //无法优化，调用不在尾部
    let result = do_something_else();
    return result;
}
//不满足上述条件1
function do_something_1() {
    let num = 1;
    let func = () => num;
    //无法优化，该函数是一个闭包
    return func();
}

//2---如何利用尾调用优化
//实际上，尾调用的优化发生在引擎背后，除非尝试优化一个函数，否则无须思考此类问题
//递归函数是其最主要的应用场景
function factorial(n) {
    if (n < 1) {
        return 1;
    } else {
        //无法优化，在返回后执行乘法操作
        return n * factorial(n - 1);
    }
}
//如果n是一个非常大的数，则调用栈的尺寸就会不断增长并存在最终导致栈溢出的潜在风险
//优化函数
function better_factorial(n, p = 1) {
    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;
        return better_factorial(n - 1, result);
    }
}
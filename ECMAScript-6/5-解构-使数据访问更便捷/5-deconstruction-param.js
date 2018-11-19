//---解构参数
//解构可以用在函数参数的传递过程中
//当定义一个接受大量可选参数的JavaScript函数时，通常会创建一个可选对象，将额外的参数定义为这个对象的属性
//options的属性表示其他参数
function set_cookie(name, value, options) {
    options = options || {};
    let secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;
    console.log("[set_cookie]---secure = " + secure);
    console.log("[set_cookie]---secure = " + path);
    console.log("[set_cookie]---secure = " + domain);
    console.log("[set_cookie]---secure = " + expires);
}
//第三个参数映射到options中
set_cookie("type", "js", {
    secure: true,
    expires: 60000
});
//问题：仅查看函数的声明部分，无法辨识函数的预期参数，必须通过阅读函数体才可以确定所有参数的情况
//如果将options定义为解构参数，则可以更清晰地了解函数预期传入的参数
//解构参数需要使用对象或数组解构模式代替命名参数
function better_set_cookie(name, value, {
    secure,
    path,
    domain,
    expires
}) {
    console.log("[set_cookie]---secure = " + secure);
    console.log("[set_cookie]---secure = " + path);
    console.log("[set_cookie]---secure = " + domain);
    console.log("[set_cookie]---secure = " + expires);
}
better_set_cookie("type", "js", {
    secure: true,
    expires: 10000
});

//1---必须传值的解构参数
//问题：默认情况下，如果调用函数时，不提供被解构的参数会导致程序抛出错误
//当调用better_set_cookie()函数，如果不传递第3个参数，会报错
//缺失的第3个参数，其值为undefined，而解构参数只是将解构声明应用在函数参数的一个简写方法，其会导致程序抛出错误
//当调用better_set_cookie()函数时，JavaScript引擎实际上做了这些事情：
function actually_set_cookie(name, value, options) {
    let {
        secure,
        path,
        domain,
        expires
    } = options;
}
//如果解构赋值表达式的右值为null或undefined，则程序会报错
//同理，若调用当调用better_set_cookie()函数时，不传入第3个参数，也会导致程序抛出错误
//如果解构参数时必需的，大可忽略掉这些问题
//如果希望将解构参数定义为可选，那么久必须为其提供默认值来解决这个问题
function best_set_cookie(name, value, {
    secure,
    path,
    domain,
    expires
} = {}) {}
//这个示例中为解构参数添加一个新对象作为默认值，secure,path,domain,expires这些变量的值全部为undefined
//这样即使在调用best_set_cookie()时未传递第3个参数，程序也不会报错

//2---解构参数的默认值
//可以为解构参数指定默认值，就像在解构赋值语句中做的那样，只需在参数后添加=并且指定一个默认值即可
const set_cookie_defaults = {
    secure: false,
    path: "/",
    domain: "example.com",
    expires: 60000
}
//将默认值提取到一个独立对象中，使用该对象可以作为解构和默认参数的一部分
function default_set_cookie(name, value, {
    secure = false,
    path = "/",
    domain = "example.com",
    expires = 60000
} = set_cookie_defaults) {}
//第一个对象字面量是解构参数，第二个对象字面量是默认值
//在这段代码中，默认值被放到set_cookie_defaults对象中，
//除了作为默认参数值外，在解构参数中，可以直接使用这个对象来为每一个绑定设置默认参数
//使用解构参数后，不得不面对处理默认参数的复杂逻辑
//但它也有好的一面，如果要改变默认值，可以立即在set_cookie_defaults中修改，改变的数据将自动同步到所有出现过的地方
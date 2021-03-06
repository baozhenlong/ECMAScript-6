//---循环中的块作用域绑定
for (let i = 0; i < 1; i++) {
    console.log('i');
}
//变量i只存在于for循环中，一旦循环结束，在其他地方均无法访问该变量

//1---循环中的函数
var func_arr = [];
for (var i = 0; i < 2; i++) {
    func_arr.push(function () {
        console.log('[循环中的函数]---var ' + i);
    });
}
func_arr.forEach(function (ele) {
    ele(); //2, 2
});
//循环里的每次迭代同时共享着变量i，循环内部创建的函数全部保留了对相同变量的引用
//循环结束时，变量i的值为2,所以每次调用都会输出数字2
//使用立即调用函数表达式（IIFE）
func_arr = [];
for (var i = 0; i < 2; i++) {
    func_arr.push((function (value) {
        return function () {
            console.log('[循环中的函数]---IIFE ' + value);
        }
    }(i)));
}
func_arr.forEach(function (ele) {
    ele(); //0, 1
});
//在循环内部，IIFE表达式为接受的每一个变量i都创建了一个副本并存储为变量value
//这个变量的值就是相应迭代创建的函数所使用的值

//2---循环中的let声明
//每次迭代循环都会创建一个新变量i，并将其初始化为i的当前值
//let声明在循环内部的行为是标准中专门定义的，它不一定与let的不提升特性相关
func_arr = [];
for (let i = 0; i < 2; i++) {
    func_arr.push(function () {
        console.log('[循环中的let声明]---let ' + i);
    });
}
func_arr.forEach(function (ele) {
    ele(); //0, 1
});

//3---循环中的const声明
//每次迭代会创建一个新绑定
//在循环内不能修改const修饰的变量的值
func_arr = [];
let obj = {
    a: true,
    b: true
};
for (const key in obj) {
    func_arr.push(function () {
        console.log('[循环中的const声明]---' + key);
    });
}
func_arr.forEach(function (ele) {
    ele(); //a, b
});
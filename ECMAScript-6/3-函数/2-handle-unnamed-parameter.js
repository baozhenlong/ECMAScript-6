//---处理无命名参数
//JavaScript的函数语法规定，无论函数已定义的命名参数有多少，都不限制调用时传入的实际参数数量，调用时总是可以传入任意数量的参数
//当传入更少数量的参数时，默认参数值的特性可以有效简化函数声明的代码
//当传入更多数量的参数时，es6同样也提供了更好的方案

//1---不定参数
//在函数的命名参数前添加3个点（...）就表明这是一个不定参数
//不定参数为一个数组，包含着自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数
function pick(object, ...keys) {
    let result = Object.create(null);
    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
let book = {
    title: "ES6",
    author: "damon",
    year: 2018
};
let temp_book = pick(book, "author", "year");
console.log("[不定参数]---author = " + temp_book.author); //damon
console.log("[不定参数]---year = " + temp_book.year); //2018
console.log('[不定参数]---func.length = ' + pick.length); //1
//函数的length属性统计的是函数命名参数的数量，不定参数的加入不会影响length属性的值
//1.1---不定参数的使用限制
//每个函数最多声明一个不定参数，而且一定要放在所有参数的末尾
//不定参数不能用于对象字面量setter之中
//语法错误：不可以在setter中使用不定参数
// let obj = {
//     set name(...value) {}
// }
//对象字面量setter的参数有且只能有一个
//在不定参数的定义中，参数的数量可以无限多
//1.2---不定参数对arguments对象的影响
//如果声明函数时定义了不定参数，则在函数被调用时，arguments对象包含了所有传入函数的参数
function check_args(...args) {
    console.log("[check_args]---args.length = " + args.length);
    console.log("[check_args]---arguments.length = " + arguments.length);
    console.log("[check_args]---args[0] = " + args[0]);
    console.log("[check_args]---arguments[0] = " + arguments[0]);
    console.log("[check_args]---args[1] = " + args[1]);
    console.log("[check_args]---arguments[1] = " + arguments[1]);
}
check_args("a", "b");
// [check_args]---args.length = 2
// [check_args]---arguments.length = 2
// [check_args]---args[0] = a
// [check_args]---arguments[0] = a
// [check_args]---args[1] = b
// [check_args]---arguments[1] = b
//无论是否使用不定参数，arguments对象总是包含所有传入函数的参数
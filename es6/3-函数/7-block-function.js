//---块级函数
if (true) {
    console.log("[块级函数]---块内 " + (typeof do_something)); //"function"
    //严格模式下：函数提升至代码块顶部
    //非严格模式下：函数提升至外围函数或全局作用域的顶部
    function do_something() {}
    // console.log("[块级函数]---块内 " + (typeof do_other_thing)); //抛出错误
    //未执行声明语句，do_other_thing还在当前块作用域的临时死区中
    let do_other_thing = function () {}
}
//---var声明及变量提升机制
//在函数作用域或全局作用域中通过关键字var声明的变量，
//无论实际上在哪里声明的，都会被当成在当前作用域顶部声明的变量
function get_value(condition) {
    if (condition) {
        var value = 'bule';
        return value;
    } else {
        //此处可访问变量value，其值为undefined
        return null;
    }
    //此处可访问变量value，其值为undefined
}
//在预编译阶段JavaScript引擎会将上述get_value函数修改成下面这样
function real_get_value(condition) {
    var value;
    if (condition) {
        value = 'bule'
        return value;
    } else {
        return null;
    }
}
//变量value的声明被提升至函数顶部，而初始化操作依旧留在原处执行
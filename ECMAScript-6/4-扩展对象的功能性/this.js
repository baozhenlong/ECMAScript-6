//---this
//在function内部被创建
//指向调用时所在函数所绑定的对象
//this不能被赋值，但可以被call、apply改变

//1---this和构造器
//this本身就是类定义时构造器里需要用到的
function Tab(content) {
    this.content = content;
}
Tab.prototype.set_content = function (content) {
    this.content = content;
};
Tab.prototype.get_content = function () {
    return this.content;
};
//按照JavaScript的习惯，this应该挂属性，方法都应该放在原型上

//2---this和对象
//JS中的对象不用类也可以创建
let tan = {
    content: "",
    set_content(content) {
        this.content = content;
    },
    get_content() {
        return this.content;
    }
};

//3---this和函数
//this和独立的函数(纯函数)放在一起是没有意义的
function show_msg() {
    console.log("msg = " + this.msg);
}
show_msg(); //undefined
let msg_1 = {
    msg: "msg_1"
};
let msg_2 = {
    msg: " msg_2"
};
show_msg.call(msg_1); //msg_1
show_msg.call(msg_2); //msg_2
//用这种方式可以节省一些代码量，比如当多个类或对象有相同的方法时，不必写多份，
//只要定义一个，然后将其绑定在各自的原型和对象上
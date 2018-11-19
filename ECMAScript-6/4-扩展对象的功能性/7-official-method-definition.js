//---正式的方法定义

//在es6以前从未正式定义"方法"的概念，方法仅仅是一个具有功能而非数据的对象属性

//在es6中正式将方法定义为一个函数，它会有一个内部的[[HomeObject]]属性来容纳这个方法从属的对象
let person = {
    //是方法
    get_greeting() {
        return "hi";
    }
};
//定义了一个person对象，它有一个get_greeting()方法
//由于直接把函数赋值给了person对象，因而get_greeting()方法的[[HomeObject]]属性值为person
//不是方法
function share_greeting() {
    return "hello";
}
//创建share_greeting()函数时，由于未将其赋值给一个对象，因而该方法没有明确定义[[HomeObject]]属性
//Super的所有引用都通过[[HomeObject]]属性来确定后续的运行过程
//第一步：在[[HomeObject]]属性上调用Object.getPrototypeOf()方法来检索原型的引用
//第二步：搜寻原型找到同名函数
//第三步：设置this绑定并且调用相应的方法
let friend = {
    get_greeting() {
        return super.get_greeting() + ", friend";
    }
};
Object.setPrototypeOf(friend, person);
console.log("[super]---firend.get_greeting() = " + friend.get_greeting()); //hi, friend
//解析：friend.get_greeting()方法的[[HomeObject]]属性值是friend，friend的原型是person，所以super.get_greeting()等价于person.get_greeting().call(this)
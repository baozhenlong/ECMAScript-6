//---明确函数的多重用途

//1---es5及早期版本中的函数具有多重功能
//结合new使用，函数内的this值将指向一个新对象，函数最终会返回这个新对象
function Person(name) {
    this.name = name;
}
let person = new Person("damon");
let not_a_person = Person("damon");
console.log("[use]---person = " + person); //[object Object]
console.log("[use]---not_a_person = " + not_a_person); //undefined

//2---JavaScript函数有2个不同的内部方法：[[Call]]和[[Construct]]
//具有[[Construct]]方法的函数被统称为构造函数
//当通过new关键字调用函数时，执行的是[[Construct]]方法，它负责创建一个通常称作实例的新对象，然后再执行函数体，将this绑定到实例上
//如果不通过new关键字调用函数，则执行的是[[Call]]方法，从而直接执行代码中的函数体
//不是所有函数都有[[Construct]]方法，因此不是所有函数都可以通过new来调用；例如：箭头函数就没有这个[[Construct]]方法

//3---在es5中判断函数被调用的方法
function Student(name) {
    if (this instanceof Student) {
        this.name = name; //如果通过new关键字调用
        console.log("[use]---Student 通过new关键字来调用");
    } else {
        console.log("[use]---Student 不通过new关键字来调用");
    }
}
//[[Construct]]方法会创建一个Student的新实例，并将this绑定到新实例上
let student = new Student("damon");
// [use]---Student 通过new关键字来调用
let not_a_student = Student("damon");
// [use]---Student 不通过new关键字来调用
//通常来讲，这样是做是正确的，例外：手动修改this的绑定
//将Student函数里的this设为student实例
let call_student = Student.call(student, "damon");
// [use]---Student 通过new关键字来调用

//4---元属性（Metaproperty）new.target
//为了解决函数是否通过new关键字调用的问题，es6引入了new.target这个元属性
//元属性：指非对象的属性，其可以提供非对象目标的补充信息（例如new）
//调用函数的[[Construct]]方法时，new.target被赋值为new操作符的目标，通常是函数体内this的构造函数
//调用[[Call]]方法时，则new.target的值为undefined
//通过检查new.target是否被定义，来安全地检测一个函数是否通过new关键字调用
function Teacher(name) {
    console.log("[use]---Teacher typeof new.target = " + typeof new.target);
    console.log("[use]---Teacher new.target = " + new.target);
    if (typeof new.target !== "undefined") {
        this.name = name; //如果通过new关键字调用
        console.log("[use]---通过new关键字来调用");
    } else {
        console.log("[use]---不通过new关键字来调用");
    }
}
let teacher = new Teacher("damon");
// [use]---Teacher typeof new.target = function
// [use]---Teacher new.target = function Teacher(name) {
//     console.log("[use]---Teacher typeof new.target = " + typeof new.target);
//     console.log("[use]---Teacher new.target = " + new.target);
//     if (typeof new.target !== "undefined") {
//         this.name = name; //如果通过new关键字调用
//         console.log("[use]---通过new关键字来调用");
//     } else {
//         console.log("[use]---不通过new关键字来调用");
//     }
// }
// [use]---通过new关键字来调用
let not_a_teacher = Teacher("damon");
// [use]---Teacher typeof new.target = undefined
// [use]---Teacher new.target = undefined
// [use]---不通过new关键字来调用
Teacher.call(teacher, "damon");
// [use]---Teacher typeof new.target = undefined
// [use]---Teacher new.target = undefined
// [use]---不通过new关键字来调用
console.log("[use]---" + typeof Teacher); //function
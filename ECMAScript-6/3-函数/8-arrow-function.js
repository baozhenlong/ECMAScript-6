//---箭头函数

//1---箭头函数与传统的JavaScript函数的不同
//没有this、super、arguments和new.target绑定：箭头函数中这些值由外围最近一层非箭头函数决定
//不能通过new关键字调用：箭头函数没有[[Construct]]方法，所有不能被用作构造函数，如果通过new关键字调用箭头函数，程序会抛出错误
//没有原型：由于不可以通过new关键字调用箭头函数，因而没有构建原型的需求，所以箭头函数不存在prototype这个属性
//不可以改变this的绑定：函数内部的this值不可被改变，在函数的声明周期内始终保持一致
//不支持arguments对象：箭头函数没有arguments绑定，所以必须通过命名参数和不定参数这2种形式访问函数的参数
//不支持重复的命名参数：无论在严格还是非严格模式下，箭头函数都不支持重复的命名参数；而在传统函数的规定中，只有在严格模式下才不能有重复的命名参数

//note：箭头函数同样也有一个name属性，这与其他函数的规则相同

//2---箭头函数语法
//由函数参数、箭头、函数体组成
//2.1---简单的
let reflect = value => value;
//实际相当于
let another_reflect = function (value) {
    return value;
};
//当箭头函数只有一个参数时，可以直接写参数名，箭头紧随其后，箭头右侧的表达式被求值后便立即返回
//即使没有显式的返回语句这个箭头函数也可以返回传入的第一个参数，不需要更多的语法铺垫
//2.2---复杂的
//当参数数量>1时，用小括号()包裹，并用逗号,进行分隔
//当函数体由多个表达式组成时，用花括号{}包裹，并显式地定义一个返回值
let sum = (num1, num2) => {
    return num1 + num2;
};
//实际相当于
let another_sum = function (num1, num2) {
    return num1 + num2;
};

//3---创建立即执行函数表达式（IIFE）
//定义一个匿名函数并立即调用，自始至终不保存对该函数的引用
let person = function (name) {
    return {
        get_name: function () {
            return name;
        }
    };
}("damon");
console.log("[立即执行函数表达式]---person.get_name() = " + person.get_name()); //damon
//使用箭头函数实现相同的功能：将箭头函数包裹在小括号()里
let another_person = ((name) => {
    return {
        get_name: function () {
            return name;
        }
    };
})("damon");
console.log("[立即执行函数表达式]---another_person.get_name() = " + another_person.get_name()); //damon
//注意：小括号只包裹箭头函数定义，没有包括函数调用部分-("damon")

//4---箭头函数没有this绑定
//函数内的this绑定是JavaScript中最常出现错误的因素
//函数内的this值可以根据函数调用的上下文而改变，这有可能错误地影响其他对象
let handler = {
    init: function () {
        let cb = function () {
            // this.do_something(""); //抛出错误
            //this绑定的是事件目标对象的引用
            //在这段代码中引用的是匿名函数，而没有绑定handler，且由于this.do_something()在匿名函数中不存在，所以无法正常执行，尝试运行时会抛出错误
        }
        cb();
        let cb_with_bind = function () {
            this.do_something("bind");
        }.bind(this);
        //调用bind(this)后，事实上创建了一个新函数，它的this被绑定到当前的this，也就是handler
        cb_with_bind(); // [this绑定]------do_something bind
        //为了避免创建一个额外的函数，可以使用箭头函数
        //箭头函数中没有this绑定，必须通过查找作用域链来决定其值
        //如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this；否则，this的值会被设置为undefined
        let cb_with_arrow = () => {
            this.do_something("arrow");
        };
        cb_with_arrow(); // [this绑定]------do_something arrow
    },
    do_something: function (type) {
        console.log("[关于this绑定]------do_something " + type);
    }
};
handler.init();
//箭头函数缺少正常函数所拥有的prototype属性，它的设计初衷是"即用即弃"，所以不能用它来定义新的类型
//如果尝试通过new关键字调用一个箭头函数函数，会导致程序抛出错误
let my_type = () => {};
// let new_type = new my_type();
//my_type是一个没有[[Construct]]方法的箭头函数，所以不能正常执行new my_type()
//箭头函数中的this值取决于该函数外部非箭头函数的this值，且不能通过call()、apply()或bind()方法来改变this的值

//5---箭头函数没有arguments绑定
//箭头函数没有自己的arguments对象，且未来无论函数在哪个上下文中执行，箭头函数始终可以访问外围函数的arguments对象
function create_arrow_function_return_first_arg() {
    return () => arguments[0];
}
let arrow_function = create_arrow_function_return_first_arg(5);
console.log("[关于arguments绑定]---arrow_function() = " + arrow_function()); //5
//即使箭头函数此时已不在处于创建它的函数的作用域中，却仍然可以访问当时的arguments对象，这个arguments标识符的作用域链解决方案所规定的

//6---箭头函数的辨识方法
let comparator = (a, b) => a - b;
console.log("[辨识方法]---typeof comparator = " + (typeof comparator)); //"function"
console.log("[辨识方法]---comparator instanceof Function = " + (comparator instanceof Function)); //true
//可以在箭头函数上调用call()、apply()、及bind()方法，但与其他函数不同的是，箭头函数的this值不会受这些方法的影响
let add = (num1, num2) => num1 + num2;
console.log("[call]---add = " + add.call(null, 1, 2)); //3
console.log("[apply]---add = " + add.apply(null, [1, 2])); //3
let bound_add = add.bind(null, 1, 2);
console.log("[bind]---add = " + bound_add()); //3

//包括回调函数在内所有使用匿名函数表达式的地方都适合用箭头函数来改写
//---创建数组

//1---Array.of()方法
//ECMAScript 6之所以向JavaScript添加新的创建方法，是要帮助开发者们规避通过Array构造函数创建数组时的怪异行为
//事实上，Array构造函数表现得与传入的参数类型及数量有些不符，例如：
let items = new Array(2);
console.log("[一个数值参数]", items.length); //2
console.log("[一个数值参数]", items[0]); //undefined
console.log("[一个数值参数]", items[1]); //undefined

items = new Array("2");
console.log("[一个非数值参数]", items.length); //1
console.log("[一个非数值参数]", items[0]); //"2"

items = new Array(1, 2);
console.log("[两个参数]", items.length); //2
console.log("[两个参数]", items[0]); //1
console.log("[两个参数]", items[1]); //2

items = new Array(3, "2");
console.log("[两个参数]", items.length); //2
console.log("[两个参数]", items[0]); //3
console.log("[两个参数]", items[1]); //"2"
//如果给Array构造函数传入一个数值型的值，那么数组的length属性会被设为该值
//如果传入多个值，此时无论这些值是不是数值型的，都会变为数组的元素
//Array.of()与Array构造函数的工作机制类似，只是不存在单一数值型参数值的特例
//无论有多少参数，无论参数是什么类型的，Array.of()方法总会创建一个包含所有参数的数组

items = Array.of(1, 2);
console.log("[Array.of]", items.length); //2
console.log("[Array.of]", items[0]); //1
console.log("[Array.of]", items[1]); //2
//创建了一个包含2个数字的数组

items = Array.of(2);
console.log("[Array.of]", items.length); //1
console.log("[Array.of]", items[0]); //2
//包含一个数字

items = Array.of("2");
console.log("[Array.of]", items.length); //1
console.log("[Array.of]", items[0]); //"2"
//包含一个字符串
//要用Array.of()方法创建数组，只需传入你希望在数组中包含的值
//这与数组字面量的使用方法很相似，在大多数时候，可以用数组字面量来创建原生数组
//但如果需要给一个函数传入Array的构造函数，则可能更希望传入Array.of()来确保行为一致：
function create_array(array_creator, value) {
    return array_creator(value);
}
let new_items = create_array(Array.of, [1, 2, 3]);
console.log(new_items); //[ [ 1, 2, 3 ] ]
//在这段代码中，create_array()函数接受2个参数，一个是数组创造者函数，另一个是要插入数值的值
//可以传入Array.of()作为create_array()方法的第一个参数来创建新数组，如果不能保证传入的值一定不是数字，那么直接传入Array会非常危险

//2---Array.from()方法
//JavaScript不支持直接将非数组对象转换为真实数组，arguments就是一种类数组对象，如果要把它当作数组使用则必须先转换该对象的类型
//在ECMAScript 5中，可能需要编写如下函数来把类数组对象转换为数组：
function make_array(array_like) {
    let result = [];
    for (let i = 0, len = array_like.length; i < len; i++) {
        result.push(array_like[i]);
    }
    return result;
}

function do_something() {
    let args = make_array(arguments);
    console.log(args);
}
do_something("damon", 18); //[ 'damon', 18 ]
//这种方法先是手动创建一个result数组，再将argument对象里的每一个元素复制到新数组中
//尽管这种方法有效，但需要编写很多代码才能完成如此简单的操作
//调用数组原生的slice()方法可以将非数组对象转换为数组：
function make_array_2(array_like) {
    return Array.prototype.slice.call(array_like);
}

function do_something_2() {
    let args = make_array_2(arguments);
    console.log(args);
}
do_something_2("damon", 18, 2); //[ 'damon', 18, 2 ]
//这段代码的功能等价于之前的示例，将slice()方法执行时的this值设置为类数组对象
//而slice()对象只需数值型索引和length属性就能够正常运行，所以任何类数组对象都能被转换为数组
//Array.from()方法可以接受可迭代对象或类数组对象作为第一个参数，最终返回一个数组
function do_something_3() {
    let args = Array.from(arguments);
    console.log(args);
}
do_something_3("damon", 18, 3); //[ 'damon', 18, 3 ]
//Array.from()方法调用会基于arguments对象中的元素创建一个新数组
//args是Array的一个实例，包含arguments对象中同位置的相同值
//Note：Array.from()方法也是通过this来确定返回数组的类型的
//2.1---映射转换
//如果想要进一步转换数组，可以提供一个映射函数作为Array.from()的第二个参数
//这个函数用来将类数组对象中的每一个值转换成其他形式，最后将这些结果存储在结果数组的相应索引中：
function translate() {
    return Array.from(arguments, value => value + 1);
}
let nums = translate(1, 2, 3);
console.log("nums = ", nums); //[ 2, 3, 4 ]
//在这段代码中，为Array.from()方法传入映射函数value => value + 1，数组中的每个元素在存储前都会被+1
//如果用映射函数处理对象，也可以给Array.from()方法传入第3个参数来表示映射函数的this值
let helper = {
    diff: 2,
    add(value) {
        return value + this.diff;
    }
};

function translate_2() {
    return Array.from(arguments, helper.add, helper);
}
let nums_2 = translate_2(1, 2, 3);
console.log("nums_2 = ", nums_2); //[ 3, 4, 5 ]
//此示例传入helper.add()作为转换用的映射函数
//由于该方法使用了this.diff属性，因此需要为Array.from()方法提供第3个参数来指定this的值
//从而无须通过调用bind()方法或其他方式来指定this的值
//2.2---用Array.from()转换可迭代对象
//Array.from()方法可以处理类数组对象和可迭代对象，也就是说该方法能够将所有含有Symbol.iterator属性的对象转换为数组：
let nums_3 = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};
let num_4 = Array.from(nums_3, value => value + 3);
console.log("num_4 = ", num_4); //[ 4, 5, 6 ]
//由于num_3是一个可迭代对象，因此可以直接将它传入Array.from()来转换成数组
//此处的映射函数将每一个数字+1，所以结果数组最终包含的值为4,5,6
//Note：如果一个对象既是类数组，又是可迭代的，那么Array.from()方法会根据迭代器来决定转换哪个值
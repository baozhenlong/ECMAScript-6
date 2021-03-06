//---高级迭代器功能

//1---给迭代器传递参数
//一些迭代器向外传值的方法：用迭代器的next()方法返回值；在生成器内部使用yield关键字来生成值
//如果给迭代器的next()方法传递参数，则这个参数的值就会替代生成器内部上一条yield语句的返回值
function* create_iterator() {
    let first = yield 1;
    let second = yield first;
    yield second + 3;
}
let normal_iterator = create_iterator();
console.log("[迭代器的next()方法]---", normal_iterator.next());
// [迭代器的next()方法]--- { value: 1, done: false }
console.log("[迭代器的next()方法]---", normal_iterator.next());
//next()未传递参数，first的值为undefined
// [迭代器的next()方法]--- { value: undefined, done: false }
console.log("[迭代器的next()方法]---", normal_iterator.next());
//undefined+3为NaN
// [迭代器的next()方法]--- { value: NaN, done: false }
console.log("[迭代器的next()方法]---", normal_iterator.next());
// [迭代器的next()方法]--- { value: undefined, done: true }
let iterator = create_iterator();
console.log("[给迭代器的next()方法传递参数]---", iterator.next());
//每次yield前执行的代码： yield 1;
// { value: 1, done: false }
console.log("[给迭代器的next()方法传递参数]---", iterator.next(4));
//每次yield前执行的代码： let first = | yield first + 2;
// { value: 6, done: false }    4+2
console.log("[给迭代器的next()方法传递参数]---", iterator.next(5));
//每次yield前执行的代码： let second = | yield second + 3;
// { value: 8, done: false }    5+3
console.log("[给迭代器的next()方法传递参数]---", iterator.next());
// { value: undefined, done: true }
//***这里有一个过程很复杂，在执行左侧代码前，右侧的每一个表达式会先执行再停止
//特例：第一次调用next()方法时，无论传入什么参数都会被丢弃
//由于传给next()方法的参数会替代上一次yield的返回值
//而在第一次调用next()方法前不会执行任何yield语句，因此在第一次调用next()方法时传递参数是毫无意义的
//第二次调用next()方法传入数值4作为参数，它最后被赋值给生成器函数内部的变量first
//在一个含参yield语句中，表达式右侧等价于第一次调用next()方法后的下一个返回值，表达式左侧等价于第二次调用next()方法后，在函数继续执行前得到的返回值
//第二次调用next()方法传入的值为4，它会被赋值给变量first，函数则继续执行
//第二条yield语句在第一次yield的结果上加了2,最终的返回值为6
//第三次调用next()方法时，传入数值为5，这个值被赋值给second，最后用于第三条yield语句并最终返回数值8

//2---在迭代器中抛出错误
//除了给迭代器传递数据外，还可以给它传递错误条件，通过throw方法()，当迭代器恢复执行时，可令其抛出一个错误
//这种主动抛出错误的能力对于异步编程而言至关重要
//也能为提供模拟结束函数执行的2种方法(返回值或抛出错误)，从而增强生成器内部的的编程弹性
//将错误对象传给throw()方法后，在迭代器继续执行时，其会被抛出：
function* create_iterator_2() {
    let first = yield 1;
    let second = yield first + 2; //yield 4+2, 然后抛出错误
    yield second + 3; //永远不会被执行
}
let iterator_2 = create_iterator_2();
console.log("[在迭代器中抛出错误]---", iterator_2.next());
//每次yield前执行的代码： yield 1;
// { value: 1, done: false }
console.log("[在迭代器中抛出错误]---", iterator_2.next(4));
//每次yield前执行的代码： let first = | yield first + 2;
// { value: 6, done: false }
// console.log("[在迭代器中抛出错误]---", iterator_2.throw(new Error("boom")));
//从生成器中抛出的错误：Error: 
//调用throw()方法后，在继续执行let second求值前，错误就会被抛出并阻止了代码继续执行
function* create_iterator_3() {
    let first = yield 1;
    let second;
    try {
        second = yield first + 2; //yield 4 + 2, 然后抛出错误
    } catch (ex) {
        //如果捕获到错误，则给变量second赋另外一个值
        second = 6;
    }
    yield second + 3;
}
let iterator_3 = create_iterator_3();
console.log("[在迭代器中抛出错误]---", iterator_3.next());
// [在迭代器中抛出错误]--- { value: 1, done: false }
console.log("[在迭代器中抛出错误]---", iterator_3.next(4));
// [在迭代器中抛出错误]--- { value: 6, done: false }
console.log("[在迭代器中抛出错误]---", iterator_3.throw(new Error("boom")));
//调用throw()方法也会像调用next()方法一样返回一个结果对象
//由于在生成器内部捕获了这个错误，因而会继续执行下一条yield语句，最终返回数值9
// [在迭代器中抛出错误]--- { value: 9, done: false }
console.log("[在迭代器中抛出错误]---", iterator_3.next());
// [在迭代器中抛出错误]--- { value: undefined, done: true }
//next()和throw()就像迭代器的2条指令：
//调用next()方法命令迭代器继续执行(可能提供一个值)
//调用throw方法也会命令迭代器继续执行，但同时也会抛出一个错误，在此之后的执行过程取决于生成器内部的代码

//3---生成器返回语句
//由于生成器也是函数，因此可以通过return语句提前退出函数执行
//对于最后一次next()方法调用，可以主动为其指定一个返回值
//在生成器中，return表示所有操作已经完成，属性done被设置为true；如果同时提供了相应的值，则属性value会被设置为这个值
//未指定返回值
function* create_iterator_4() {
    yield 1;
    return;
    //其后的yield语句将不会被执行
    yield 2;
    yield 3;
}
let iterator_4 = create_iterator_4();
console.log("[生成器返回语句]---", iterator_4.next());
// [生成器返回语句]--- { value: 1, done: false }
console.log("[生成器返回语句]---", iterator_4.next());
// [生成器返回语句]--- { value: undefined, done: true }
//指定返回值：在return语句中也可以指定一个返回值，该值将被赋值给返回对象的value属性
function* create_iterator_5() {
    yield 1;
    return 42;
    //其后的yield语句将不会被执行
    yield 2;
    yield 3;
}
let iterator_5 = create_iterator_5();
console.log("[生成器返回语句]---", iterator_5.next());
// [生成器返回语句]--- { value: 1, done: false }
console.log("[生成器返回语句]---", iterator_5.next());
// [生成器返回语句]--- { value: 42, done: true }
console.log("[生成器返回语句]---", iterator_5.next());
// [生成器返回语句]--- { value: undefined, done: true }
//在此示例中，第2次调用next()方法时返回对象的value属性值为42，done属性首次设为true
//第3次调用next()方法依然返回一个对象，只是value属性的值会变为undefined
//因此，通过return语句指定的返回值，只会在返回对象中出现一次，在后续调用返回的对象中，value属性会被重置为undefined
//Note：展开运算符与for-of循环语句会直接忽略通过return语句指定的任何返回值，只要done一变为true，就立即停止读取其他的值
//不管怎样，迭代器的返回值依然是一个非常有用的特性，比如即将要讲到的委托迭代器

//4---委托生成器
//在某些情况下，我们需要将2个迭代器合二为一
//这时可以创建一个生成器，再给yield语句添加一个星号*，就可以将生成数据的过程委托给其他生成器
//当定义这些生成器时，只需将星号*放置在关键字yield和生成器的函数名之间即可：
function* create_number_iterator() {
    yield 1;
    yield 2;
}

function* create_color_iterator() {
    yield "red";
    yield "green";
}

function* create_combined_iterator() {
    yield* create_number_iterator();
    yield* create_color_iterator();
    yield true;
}
let combined_iterator = create_combined_iterator();
console.log("[委托生成器]---create_combined_iterator.next() ", combined_iterator.next());
// [委托生成器]---create_combined_iterator.next()  { value: 1, done: false }
console.log("[委托生成器]---create_combined_iterator.next() ", combined_iterator.next());
// [委托生成器]---create_combined_iterator.next()  { value: 2, done: false }
console.log("[委托生成器]---create_combined_iterator.next() ", combined_iterator.next());
// [委托生成器]---create_combined_iterator.next()  { value: 'red', done: false }
console.log("[委托生成器]---create_combined_iterator.next() ", combined_iterator.next());
// [委托生成器]---create_combined_iterator.next()  { value: 'green', done: false }
console.log("[委托生成器]---create_combined_iterator.next() ", combined_iterator.next());
// [委托生成器]---create_combined_iterator.next()  { value: true, done: false }
//这里的生成器create_combined_iterator()先后委托了另外2个生成器create_number_iterator()和create_color_iterator()
//仅根据迭代器的返回值来看，它就像是一个完整的迭代器，可以生成所有的值
//每一次调用next()方法就会委托相应的迭代器生成相应的值
//直到最后由create_number_iterator()和create_color_iterator()创建的迭代器无法返回更多的值，此时执行最后一条yield语句，并返回true
//有了生成器委托这个新功能，可以进一步利用生成器的返回值来处理复杂任务：
function* create_another_number_iterator() {
    yield 1;
    yield 2;
    return 3;
}

function* create_repeating_iterator(count) {
    for (let i = 0; i < count; i++) {
        yield "repeat";
    }
}

function* create_another_combined_iterator() {
    let result = yield* create_another_number_iterator();
    yield* create_repeating_iterator(result);
}
let another_combined_iterator = create_another_combined_iterator();
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: 1, done: false }
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: 2, done: false }
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_another_combined_iterator.next() ", another_combined_iterator.next());
// [委托生成器]---create_another_combined_iterator.next()  { value: undefined, done: true }
//在生成器another_create_combined_iterator()中
//执行过程先被委托给我生成器create_another_number_iterator()，返回值会被赋值给变量result
//执行到return 3时会返回数值3
//这个值随后被传入create_another_combined_iterator()作为它的参数，因而生成字符串"repeat"的yield语句会被执行3次
//注意：无论通过何种方式调用迭代器的next()方法，数值3永远不会被返回，它只存在于生成器create_another_combined_iterator()的内部
//但如果想输出这个值，则可以额外添加一条yield语句：
function* create_designed_combined_iterator() {
    let result = yield* create_another_number_iterator();
    yield result;
    yield* create_repeating_iterator(result);
}
let designed_combined_iterator = create_designed_combined_iterator();
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 1, done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 2, done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 3, done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: 'repeat', done: false }
console.log("[委托生成器]---create_designed_combined_iterator.next() ", designed_combined_iterator.next());
// [委托生成器]---create_designed_combined_iterator.next()  { value: undefined, done: true }
//Note：yield* 也可直接应用于字符串，例如yield* "hello"，此时将使用字符串的默认迭代器
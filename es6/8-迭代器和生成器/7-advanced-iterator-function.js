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
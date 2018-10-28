//---什么是生成器

//生成器：是一种返回迭代器的函数，通过function关键字后的星号(*)来表示，函数中会用到新的关键字yield
//通过关键字yield来标识每次调用迭代器的next()方法时的返回值
//星号(*)可以紧挨着function关键字，也可以在中间添加一个空格
function* create_iterator() {
    yield 1;
    yield 2;
    yield 3;
}
//生成器的调用方式与普通函数相同，只不过返回的是一个迭代器
let iterator = create_iterator();
console.log("[yield]---1 = ", iterator.next().value); //1
console.log("[yield]---2 = ", iterator.next().value); //2
console.log("[yield]---3 = ", iterator.next().value); //3
//在这个示例中，create_iterator()前的星号表明它是一个生成器；
//yield关键字是es6的新特性，可以通过它来指定调用迭代器的next()方法时的返回值及返回顺序
//生成迭代器后，连续3次调用它的next()方法返回3个不同的值，分别是1、2、3 
//生成器的调用过程与其他函数一样，最终返回的是创建好的迭代器

//生成器函数最有趣的部分大概是，每当执行完一条yiled语句后函数就会自动停止执行
//举个例子，在上面这段代码中，执行完语句yield 1之后，函数便不再执行其他任何语句
//直到再次调用迭代器的next()方法才会继续执行yield 2语句
//生成器函数的这种中止函数执行的能力有很多有趣的应用

//使用yield关键字可以返回任何值或表达式，所以可以通过生成器函数批量地给迭代器添加元素
//例如，可以在循环中使用yield关键字
function* create_iterator_array(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}
let iterator_array = create_iterator_array([1, 2, 3]);
console.log("[yield]---1 = ", iterator_array.next()); //{ value: 3, done: false }
console.log("[yield]---2 = ", iterator_array.next()); //{ value: 3, done: false }
console.log("[yield]---3 = ", iterator_array.next()); //{ value: 3, done: false }
console.log("[yield]---4 = ", iterator_array.next()); //{ value: undefined, done: true }
//之后所有的调用都会返回相同内容
//在此例中，给生成器函数create_iterator_array()传入一个items数组
//而在函数内部，for循环不断从数组中生成新的元素放入迭代器中
//每遇到一个yield语句循环都会停止；每次调用迭代器的next()方法，循环会继续运行并执行下一条yield语句

//yield的使用限制
//yield关键字只可在生成器内部使用，在其他地方使用会导致程序抛出语法错误，即便在生成器内部的函数里使用也是如此
//yield与return关键字一样，二者都不能穿透函数边界；嵌套函数中的return语句不能用作外部函数的返回语句
//在生成器嵌套函数中的yield语句会导致程序抛出语法错误

//1---生成器函数表达式
//也可以通过函数表达式来创建生成器，只需在function关键字和小括号()中间添加一个星号*即可
{
    let create_iterator_by_expression = function* (items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
    let iterator = create_iterator_by_expression([1, 2, 3]);
    console.log("[生成器函数表达式]---1 = ", iterator.next()); //{ value: 3, done: false }
    console.log("[生成器函数表达式]---2 = ", iterator.next()); //{ value: 3, done: false }
    console.log("[生成器函数表达式]---3 = ", iterator.next()); //{ value: 3, done: false }
    console.log("[生成器函数表达式]---4 = ", iterator.next()); //{ value: undefined, done: true }
    //之后所有的调用都会返回相同内容
    //在这段代码中，create_iterator_by_expression是一个生成器函数表达式，而不是一个函数声明
    //由于表达式是匿名的，因此星号*直接放在function关键字和小括号()之间
    //此外，这个示例基本与前例相同，使用的也是for循环
    //不能通过箭头函数来创建生成器
}

//2---生成器对象方法
//由于生成器本身就是函数，因而可以将它们添加到对象中
//例如，在es风格的对象字面量中，可以通过函数表达式来创建生成器：
{
    let o = {
        create_iterator: function* (items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i];
            }
        }
    };
    let iterator = o.create_iterator([1, 2, 3]);
}
//也可以用es6的函数方法的简写方式来创建生成器，只需在函数名添加一个星号*：
{
    let o = {
        * create_iterator(items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i];
            }
        }
    }
    let iterator = o.create_iterator([1, 2, 3]);
}
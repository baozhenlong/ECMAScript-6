//可迭代对象和for-of循环

//可迭代对象具有Symbol.iterator属性，是一种与迭代器密切相关的对象
//Symbol.iterator通过指定的函数可以返回一个作用于附属对象的迭代器
//在es6中，所有的集合对象(数组、Set集合、Map集合)和字符串都是可迭代器对象，这些对象中都有默认的迭代器
//es6中新加入的特性for-of循环需要用到可迭代对象的这些功能

//由于生成器默认会为Symbol.iterator属性赋值，因此所有通过生成器创建的迭代器都是可迭代器对象

//for-of循环每执行一次都会调用可迭代对象的next()方法，
//并将迭代器返回的结果对象的value属性存储在一个变量中，循环将持续执行这一过程直到返回对象的done属性为true
{
    let values = [1, 2, 3];
    for (let num of values) {
        console.log("[for-of]---num = ", num); //1,2,3
    }
    //这段for-of循环的代码通过调用values数组的Symbol.iterator方法来获取迭代器，这一过程是在JavaScript引擎背后完成的
    //随后迭代器的next()方法被多次调用，从其返回对象的value属性读取值并存储在变量num中，
    //当结果对象的done属性值为true时，循环退出，所以num属性不会被赋值为undefined
}
//如果只需迭代数组或集合中的值，用for-of循环代替for循环是个不错的选择
//相比传统的for循环，for-of循环的控制条件更简单，不需要追踪复杂的条件，所以更少出错
//Waring：如果将for-of语句用于不可迭代对象、null、undefined将会导致程序抛出错误

//1---访问默认迭代器
//可以通过Symbol.iterator来访问对象默认的迭代器
{
    let values = [1, 2, 3];
    let iterator = values[Symbol.iterator]();
    console.log("[默认迭代器]---iterator.next() = ", iterator.next()); //{ value: 1, done: false }
    console.log("[默认迭代器]---iterator.next() = ", iterator.next()); //{ value: 1, done: false }
    console.log("[默认迭代器]---iterator.next() = ", iterator.next()); //{ value: 1, done: false }
    console.log("[默认迭代器]---iterator.next() = ", iterator.next()); //{ value: undefined, done: true }
    //在这段代码中，通过Symbol.iterator获取了数组values的默认迭代器，并用它遍历数组中的元素
    //在JavaScrip引擎中执行for-of循环语句时也会有类似的处理过程
}
//由于具有Symbol.iterator属性的对象，都有默认的迭代器，因此可以用它来检测对象是否为可迭代对象
function is_iterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
console.log("[是否为可迭代对象]---", is_iterable([1, 2, 3])); //true
console.log("[是否为可迭代对象]---", is_iterable("hello")); //true
console.log("[是否为可迭代对象]---", is_iterable(new Map())); //true
console.log("[是否为可迭代对象]---", is_iterable(new Set())); //true
console.log("[是否为可迭代对象]---", is_iterable(new WeakMap())); //false
console.log("[是否为可迭代对象]---", is_iterable(new WeakSet())); //false
//这里的is_iterable()函数可以检查指定对象中是否存在默认的函数类型迭代器，而for-of循环也会做相似的检查

//2---创建可迭代对象
//默认情况下，开发者定义的对象都是不可迭代对象，但如果给Symbol.iterator属性添加一个生成器，则可以将其变为可迭代对象
{
    let collection = {
        items: [],
        *[Symbol.iterator]() {
            for (let item of this.items) {
                yield item;
            }
        }
    };
    collection.items.push(1);
    collection.items.push(2);
    collection.items.push(3);
    for (let item of collection) {
        console.log("[创建可迭代对象]---item = ", item); //1,2,3
    }
    //在这个示例中，先创建一个生成器(注意：星号*仍然在属性名前)，并将其赋值给对象的Symbol.iterator属性来创建默认的迭代器
    //而在生成器中，通过for-of循环迭代this.items并用yield返回每一个值
    //collection对象默认迭代器的返回值由迭代器this.items自动生成，而非手动遍历来定义返回值
}
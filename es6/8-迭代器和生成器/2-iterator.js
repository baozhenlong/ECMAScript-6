//---什么是迭代器
//迭代器：是一种特殊对象，它具有一些专门为迭代过程设计的专有接口
//所有的迭代器对象都有一个next()方法，每次调用都返回一个结果对象
//结果对象有2个属性：value(表示下一个将要返回的值)；done(是一个布尔类型的值，当没有更多可返回数据时，返回true)
//迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次next()方法，都会返回下一个可用的值
//如果在最后一个值返回后，再调用next()方法，那么返回的对象中属性done的值为true，属性value则包含迭代器最终返回的值
//这个返回值不是数据集合的一部分，它与函数的返回值类似，是函数调用过程中最后一次给调用者传递信息的方法，如果没有相关数据则返回undefined

//用es5的语法创建一个迭代器
function create_iterator(items) {
    let i = 0;
    return {
        next: function () {
            let done = (i >= items.length);
            let value = !done ? items[i++] : "undefined"; // JSON.stringify()打印会忽略undefined，因此改为字符串形式(方便查看)
            return {
                done: done,
                value: value
            };
        }
    }
}
let iterator = create_iterator([1, 2, 3]);
console.log("[迭代器]---1 = " + iterator.next()); //{"done":false,"value":1}
console.log("[迭代器]---2 = " + iterator.next()); //{"done":false,"value":2}
console.log("[迭代器]---3 = " + iterator.next()); //{"done":false,"value":3}
console.log("[迭代器]---4 = " + iterator.next()); //{"done":false,"value":"undefined"}
//之后所有的调用都会返回相同内容
console.log("[迭代器]---5 = " + iterator.next()); //{"done":false,"value":"undefined"}
//在上面这段代码中，create_iterator()函数返回的对象有一个next()方法
//每次调用，items数组的下一个会作为value返回
//当i=3时，done变为true，此时三元表达式会将value的值设置为undefined
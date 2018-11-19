//异步任务执行

//生成器令人兴奋的特性多于异步编程有关，JavaScript中的异步编程有利有弊：
//简单任务的异步化非常容易；而复杂任务的异步化会带来很多管理代码的挑战
//由于生成器支持在函数中暂停代码执行，因而可以深入挖掘异步处理的更多用法
//执行异步操作的传统方式一般是调用一个函数并执行相应的回调函数

//1---简单任务执行器
//由于执行yield语句会暂停当前函数的执行过程并等待下一次调用next()方法
//因此，可以创建一个函数，在函数中调用生成器生成相应的迭代器，从而在不用回调函数的基础上实现异步调用next()方法：
function run(task_def) {
    //创建一个无使用限制的迭代器
    let task = task_def();
    //开始执行任务
    let result = task.next();
    //循环调用next()函数
    function step() {
        //如果任务未完成，则继续执行
        if (!result.done) {
            result = task.next();
            step();
        }
    }
    //开始迭代执行
    step();
}
//函数run()接受一个生成器函数作为参数，这个函数定义了后续要执行的任务，生成一个迭代器并将它存储在变量task中
//首次调用迭代器的next()方法时，返回的结果被存储起来稍后继续使用
//step()函数会检查result.done的值，如果为false则执行迭代器的next()方法，并再次执行step()操作
//每次调用next()方法，返回的最新信息总会覆写变量result
//在代码的最后，初始化执行setp()函数并开始整个过程的迭代过程，每次通过检查result.done来确定是否有更多任务需要执行
//借助这个run()函数，可以像这样执行一个包含多条yield语句的生成器：
run(function* () {
    console.log("[简答任务执行器]---run 1");
    yield;
    console.log("[简答任务执行器]---run 2");
    yield;
    console.log("[简答任务执行器]---run 3");
});
// [简答任务执行器]---run 1
// [简答任务执行器]---run 2
// [简答任务执行器]---run 3
//这个示例最终会向控制台多次调用next()方法的结果

//2---向任务执行器传递数据
//给任务执行器传递数据的最简单办法是，将值通过迭代器的next()方法传入yield的生成值供下次调用
//在上述代码中，只需将result.value传入next()方法即可：
function another_run(task_def) {
    let task = task_def();
    let result = task.next();

    function step() {
        if (!result.done) {
            result = task.next(result.value);
            step();
        }
    }
    step();
}
another_run(function* () {
    let value = yield 1;
    console.log("[向任务执行器传递数据]---another_run value = ", value);
    value = yield value + 3;
    console.log("[向任务执行器传递数据]---another_run value = ", value);
});
// [向任务执行器传递数据]---another_run value =  1
// [向任务执行器传递数据]---another_run value =  4
//此示例会向控制台输出2个数值1和4
//其中，数值1取自yield 1语句中回传给变量value的值
//而数值4取自变量value+3后回传给value的值

//3---异步任务执行器
//之前的示例只是在多个yield调用间来回传递静态数据，而等待一个异步过程有些不同
//任务异步执行器需要知晓回调函数是什么以及如何使用它
//由于yield语句表达式会将值返回给任务任务迭代器，所有的函数调用都会返回一个值
//因而在某种程度上这也是一个异步操作，任务执行器会一直等待直到操作完成
function fetch_data() {
    return function (callback) {
        callback(null, "hi!");
    };
}
//本示例的原意是让任务执行器调用的所有函数都返回一个可以执行回调过程的函数
//此处的fetch_dada()函数的返回值是一个可接受回调函数作为参数的函数，当调用它时，会传入一个字符串"hi!"作为回调函数的参数并执行
//参数callback需要通过任务执行器指定，以确保回调函数执行时，可以与底层迭代器正确交互
//尽管fetch_data()是同步函数，但通过添加一个延时方法即可将其变为异步函数：
function asynchronous_fetch_data() {
    return function (callback) {
        setTimeout(function () {
            callback(null, "hi!");
        }, 1000);
    };
}
//在这个版本的asynchronous_fetch_data()函数中，让回调函数延迟了1000ms再被调用
//所以这种模式在同步和异步状态下都运行良好
//只需保证每个要通过yield关键字调用的函数都按照与之相同的模式编写
//将任务执行器稍作修改：当result.value是一个函数时，任务执行器会先执行这个函数再将结果传入next()方法：
function new_run(task_def) {
    let task = task_def();
    let result = task.next();

    function step() {
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function (err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    step();
}
//通过
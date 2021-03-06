//---展开运算符与非数组可迭代对象

let set = new Set([1, 2, 3]),
    set_to_array = [...set];
console.log("[set_to_array]---", set_to_array); //[ 1, 2, 3 ]
//这段代码中的展开运算符把Set集合的所有值填充到了一个数组字面量里
//展开运算符可以操作所有可迭代对象，并根据默认迭代器来选取要引用的值，从迭代器读取所有值
//然后按照返回的顺序将它们依次插入到数组中

let map = new Map([
        ["name", "damon"],
        ["age", 18]
    ]),
    map_to_array = [...map];
console.log("[map_to_array]---", map_to_array); //[ [ 'name', 'damon' ], [ 'age', 18 ] ]
//在此示例中，展开运算符把Map集合转换成多个数组的数组
//Map集合的默认迭代器返回的是多组键值对，所以结果数组与执行new Map()时传入的数组看起来一样

//在数组字面量中，可以多次使用展开运算符，将可迭代对象中的多个元素一次插入到新数组中，替换原先展开运算符所在的位置
let small_nums = [1, 2, 3],
    big_nums = [100, 200, 300],
    all_nums = [0, ...small_nums, ...big_nums];
console.log("[多次使用展开运算符]---", all_nums); //[ 0, 1, 2, 3, 100, 200, 300 ]
//原始数组中的值只是被复制到all_nums中，它们本身并未改变
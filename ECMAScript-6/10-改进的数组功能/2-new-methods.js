//---为所有数组添加的新方法

//1---find()方法和findIndex()方法
//ECMAScript 5的indexOf()和lastIndexOf()方法的局限之处：每次只能查找一个特定值，如果想在一系列数字中查找第一个偶数，则必须自己编写代码来实现
//ECMAScript 6引入了find()和findIndex()方法来解决这个问题
//find()和findIndex()方法都接受2个参数：一个是回调函数；另一个是可选参数，用于指定回调函数中this的值
//执行回调函数时，传入的参数分别为：数组中的某个元素、该元素在数组中的索引、数组本身，与传入map()和forEach()方法的参数相同
//如果给定的值满足定义的标准，回调函数应返回true，一旦回调函数返回true，find()和findIndex()方法都会立即停止搜索数组剩余的部分
//二者间唯一的区别是：find()方法返回查找到的值，findIndex()方法返回查找到的值的索引
let nums = [25, 30, 35, 40, 45];
console.log("[find]---", nums.find(n => n > 33)); //35
console.log("[find]---", nums.findIndex(n => n > 33)); //2
//这段代码通过调用find()方法和findIndex()方法来定位nums数组中第一个比33大的值
//如果要在数组中根据某个条件查找匹配的元素，那么find()和findIndex()方法可以很好地完成任务
//如果只想查找与某个值匹配的元素，则indexOf()和lastIndexOf()方法是更好的选择

//1.2---fill(value, start_index = 0, end_index = array.length)方法
//fill()方法可以用指定的值填充一至多个数组元素
//当传入一个值时，fill()方法会用这个值重写数组中的所有值：
let nums_2 = [1, 2, 3, 4];
nums_2.fill(1);
console.log("[fill]---nums_2 = ", nums_2); //[ 1, 1, 1, 1 ]
//在此示例中，调用nums_2.fill(1)方法后，nums_2中所有的值会变成1
//如果只想改变数组某一部分的值，可以传入开始索引和不包含结束索引(不包含结束索引当前值)这2个可选参数：
let nums_3 = [1, 2, 3, 4];
nums_3.fill(1, 2);
console.log("[fill]---nums_3 = ", nums_3); //[ 1, 2, 1, 1 ]
//参数2表示从索引2开始填充元素，由于未传入第3个参数作为不包含结束索引，因此使用nums_3.length作为不包含结束索引
//因而nums_3数组的最后2个元素被填充为1
nums_3.fill(0, 1, 3);
console.log("[fill]---nums_3 = ", nums_3); //[ 1, 0, 0, 1 ]
//将数组中位于索引1和2的元素填充为0
//Note：如果开始索引或结束索引为负值，那么这些值会与数组的length相加来作为最终位置
//例如：如果开始位置为-1，那么索引的实际值为array.length-1

//1.3---copyWithin(start_fill_index, start_copy_index, end_copy_index = array.length)方法
//copyWithin()方法与fill()方法相似，其也可以同时改变数组中的多个元素
//fill()方法时将数组元素赋值为一个指定的值
//而copyWithin()方法则是从数组中复制元素的值
//调用copyWithin()方法时需要传入2个参数：一个是该方法开始填充值的索引位置；另一个是开始复制值的索引位置
//复制数组前2个元素的值到后2个元素：
let nums_4 = [1, 2, 3, 4, 5];
//从数组的索引0开始复制
nums_4.copyWithin(3, 0);
console.log("[copyWithin]---nums_4 = ", nums_4); //[ 1, 2, 3, 1, 2 ]
//这段代码从nums_4的索引2开始粘贴值，所以索引2、3、4将被重写
//给copyWithin()传入第二个参数0表示，从索引0开始复制值，并持续到没有更多可复制的值
//默认情况下，copyWithin()会一直复制直到数组末尾的值，但是可以提供可选的第三个参数来限制被重写元素的数量
//第三个参数是不包含结束索引，用于指定停止复制值的位置：
let nums_5 = [1, 2, 3, 4, 5];
//从数组的索引2开始粘贴值
//从数组的索引0开始复制值
//当位于索引1时停止复制值
nums_5.copyWithin(2, 0, 1);
console.log("[copyWithin]---nums_5 = ", nums_5); //[ 1, 2, 1, 4, 5 ]
//在这个示例中，由于可选的结束索引被设置为了1，因此只有位于索引0的值被复制了
//Note：正如fill()方法一样，copyWithin()方法所有参数都接受负数值，并且会自动与数组长度相加来作为最终使用的索引
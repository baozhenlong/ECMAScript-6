//---Set集合
//Set类型：是一种有序列表，其中含有一些相互独立的非重复值，通过Set集合可以快速访问其中的数据，更有效地追踪各种离散值
//Set类型可以用来处理列表中的值
//Set集合可以用来过滤数组中的重复元素

//1---创建Set集合并添加元素
//调用new Set()创建Set集合，调用add()方法向集合中添加元素，访问集合的size属性可以获取集合中目前的元素数量
{
    let set = new Set();
    set.add(5);
    set.add("5");
    set.add({});
    set.add({});
    console.log("[Set]---size = " + set.size); //4
    //在Set集合中，不会对所存值进行强制类型转换，数字5和字符串"5"可以作为2个独立元素存在
    //如果向Set集合中添加多个对象，则它们之间彼此保持独立
    //{}不会被转换成字符串，因而它们在Set集合中是2个独立的元素；如果被转换，则两者的值的都是"[Object Object]"
    console.log(String({})); //[object Object]
    //如果多次调用add()方法并传入相同的值作为参数，那么后续的调用实际上会被忽略
    set.add(5); //重复：本次调用直接被忽略
    console.log("[Set]---size = " + set.size); //4
}
//可以用数组来初始化Set集合，Set构造函数同样会过滤掉重复的值，从而保证集合中的元素各自唯一
{
    let set = new Set([1, 2, 2, 3, 3, 3, 4, 5, 5]);
    console.log("[Set]---size = " + set.size); //5
}
//Note：Set构造函数可以接受所有可迭代对象作为参数，数组、Set集合、Map集合都是可迭代的，因而都可以作为Set构造函数的参数使用
//构造函数通过迭代器从参数中提取值

//2---检测Set集合中是否存在某个值
//通过has()方法
{
    let set = new Set();
    set.add(5);
    console.log("[Set]---has " + set.has(5)); //true
    console.log("[Set]---has " + set.has(6)); //false
}

//3---移除元素
//调用delete()方法可以移除Set集合中的某一个元素
//调用clear()方法会移除集合中的所有元素
{
    let set = new Set();
    set.add(5);
    set.add(6);
    console.log("[Set]---has " + set.has(5)); //true
    console.log("[Set]---size = " + set.size); //2
    set.delete(5);
    console.log("[Set]---has " + set.has(5)); //false
    console.log("[Set]---size = " + set.size); //1
    set.clear();
    console.log("[Set]---size = " + set.size); //0
}

//4---Set集合的forEach()方法
//forEach()方法的回调函数接受以下3个参数
//forEach()方法的第二个参数可选，绑定this的值
//参数1---Set集合中下一次索引的位置(值)
//参数2---与第一个参数一样的值
//参数3---被遍历的Set集合本身
//数组和Map集合的forEach()方法的回调函数都接受3个参数，前2个分别是值和键名(对于数组来说就是数值型索引值)
{
    let set = new Set([1, 2]);
    set.forEach((value, key, owner_set) => {
        console.log("[forEach]---value = " + value);
        console.log("[forEach]---key = " + key);
        console.log("[forEach]---owner_set === set = " + (owner_set === set));
    });
    //1 1
    //2 2
    //true true
}

//5---将Set集合转换为数组
//尽管Set集合更适合用来跟踪多个值，而且又可以通过forEach()方法操作集合中的每一个元素
//但是不能像访问数组元素那样直接通过索引访问集合中的元素；如有需要，最好先将Set集合转换成一个数组
//将数组转换为Set集合：给Set构造函数传入数组即可
//将Set集合转换为数组：使用展开运算符(...)，它可以将诸如Set集合的可迭代对象转换为数组
{
    let set = new Set([1, 2, 3, 3, 4, 5]),
        array = [...set];
    console.log("[将Set集合转换为数组]---array = " + array); //1,2,3,4,5
    //在这里，用一个含重复元素的数组初始化Set集合，集合会自动移除这些重复元素
    //然后再用展开运算符将这些元素放到一个新的数组中
    //Set集合依然保留创建时接受的元素(1、2、3、4、5)，新数组中保存着这些元素的副本
}

//6---Weak Set集合(弱引用Set集合)
//将对象存储在Set的实例与存储在变量中完全一样，只要Set实例中的引用存在，垃圾回收机制就不能释放该对象的内存空间
//于是之前提到的Set类型可以被看作是一个强引用的Set集合
//不支持size属性
{
    let set = new Set(),
        key = {};
    set.add(key);
    console.log("[Set]---size = " + set.size); //1
    //移除原始引用
    key = null;
    console.log("[Set]---size = " + set.size); //1
    //重新取回原始引用
    key = [...set][0];
    //在这个示例中，将变量key设置为null时，便清除了对初始对象的引用
    //但是Set集合却保留了这个引用，仍然可以使用展开运算符将Set集合转换成数组格式，并从数组的首个元素取出该引用
}
//Weak Set集合只存储对象的弱引用，并且不可以存储原始值，否则程序会抛出错误；集合中的弱引用如果是对象的唯一引用，则会被回收并释放相应内存
//创建Weak Set集合
//用WeakSet构造函数可以创建Weak Set集合，集合支持3个方法：add()、has()、delete()
{
    let set = new WeakSet(),
        key = {};
    set.add(key);
    console.log("[Weak Set]---has = " + set.has(key)); //true
    set.delete(key);
    console.log("[Weak Set]---has = " + set.has(key)); //false
    //Weak Set集合的使用方式与Set集合类似
    //可以向集合中添加引用
    //可以从集合中移除引用
    //可以检查集合中是否存在指定对象的引用
    //可以调用WeakSet构造函数并传入一个可迭代对象来创建Weak Set集合
}

//3---2种Set类型的主要区别
//最大区别：Weak Set保存的是对象值的弱引用
{
    let set = new WeakSet(),
        key = {};
    set.add(key);
    key = null;
    //移除对象的key的最后一个强引用，Weak Set中的引用也自动移除
}
//其他差别：
//差别1---在WeakSet实例汇总，如果向add()、has()、delete()这3个方法传入非对象参数都会导致程序报错
//差别2---Weak Set集合不可迭代，所以不能被用于for-of循环
//差别3---Weak Set集合不暴露任何迭代器(例如keys()和values()方法)，所以无法通过程序本身来检测其中的内容
//差别4---Weak Set集合不支持forEach()方法
//差别5---Weak Set集合不支持size属性
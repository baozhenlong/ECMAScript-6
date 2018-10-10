//---Map集合
//Map类型是一种存储着许多键值对的有序列表，其中的键名和对应的值支持所有的数据类型
//键名的等价性判断是通过调用Objec.is()方法实现的
//所以数字5与字符串"5"会被判定为2种类型，可以分别作为独立的2个键出现在程序中
//这一点与对象中不太一样，因为对象的属性名总会被强制转换成字符串类型

//向Map集合中添加新的元素，可以调用set()方法并分别传入键名和对应值作为2个参数
//从集合中获取信息，可以调用get()方法并传入键名
{
    let map = new Map();
    map.set("title", "es 6");
    map.set("year", 2018);
    console.log("[Map]---map.get = " + map.get("year")); //2018
    //如果调用get()方法时，传入的键名在Map集合中不存在，则会返回undefined
    console.log("[Map]---map.get = " + map.get("month")); //undefined

    //在对象中，无法用对象作为对象属性的键名；但是在Map集合中，却可以这样做：
    let key_1 = {},
        key_2 = {};
    map.set(key_1, 1);
    map.set(key_2, 2);
    //Map集合中的键名不会被强制转换成其他形式，所以这2个对象在集合中独立存在的
    console.log("[Map]---map.get = " + map.get(key_1)); //1
    console.log("[Map]---map.get = " + map.get(key_2)); //2
    console.log(Object.is(key_1, key_2)); //false
    console.log(Object.is({}, {})); //false

}

//1---Map集合支持的方法
//has(key)---检测指定的键名在Map集合是否已经存在
//delete(key)---从Map集合中移除指定键名及其对应的值
//clear()---移除Map集合中的所有键值对
//Map集合同样支持size属性，其代表当前集合包含的键值对数量
{
    let map = new Map();
    map.set("name", "damon");
    map.set("age", 18);
    console.log("[Map]---size = " + map.size); //2
    console.log("[Map]---has = " + map.has("name")); //true
    console.log("[Map]---get = " + map.get("name")); //damon
    map.delete("name");
    console.log("[Map]---has = " + map.has("name")); //false
    console.log("[Map]---get = " + map.get("name")); //undefined
    console.log("[Map]---size = " + map.size); //1
    map.clear();
    console.log("[Map]---size = " + map.size); //0
}

//2---Map集合的初始化方法
//可以向Map构造函数传入数组来初始化一个Map集合
//数组中每一个元素都是一个子数组，子数组中包含一个键值对的键名与值2个元素
{
    let map = new Map([
        ["name", "damon"],
        ["age", 18]
    ]);
    console.log("[Map 初始化]---has = " + map.has("name")); //true
    console.log("[Map 初始化]---get = " + map.get("name")); //damon
    console.log("[Map 初始化]---has = " + map.has("age")); //true
    console.log("[Map 初始化]---get = " + map.get("age")); //18
    console.log("[Map 初始化]---size = " + map.size); //2
    //初始化构造函数之后，键名"name"和"age"分别被添加到Map集合中
}

//3---Map集合的forEach()方法
//Map集合的forEach()方法与Set集合和数组中forEach()方法类似，回调函数都接受3个参数
//参数1---Map集合中下一次索引的位置(值)
//参数2---值对应的键名
//参数3---Map集合本身
{
    let map = new Map([
        ["name", "damon"],
        ["age", 18]
    ]);
    map.forEach((value, key, owner_map) => {
        console.log("[Map forEach]---key = " + key);
        console.log("[Map forEach]---value = " + value);
        console.log("[Map forEach]---owner_map === map = " + (owner_map === map));
    });
    //name age
    //damon 18
    //true true
}
//遍历过程中，会按照键值对插入Map集合的顺序将相应信息传入forEach()方法的回调函数
//在数组中，会按照数值型索引值的顺序依次传入回调函数
//Note：可以指定forEac()函数的第二个参数作为回调函数的this值

//4---Weak Map集合
//Weak Map是弱引用Map集合，也用于存储对象的弱引用
//Weak Map集合的键名必须是一个对象，如果使用非对象键名会报错
//集合中保存的是这些对象的弱引用，如果在弱引用之外不存在其他的强引用，引擎的垃圾回收机制会自动回收这个对象，同时也会移除Weak Map集合中的键值对
//但是只有集合的键名遵从这个规则，键名对应的值如果是一个对象，则保存的是对象的强引用，不会触发垃圾回收机制
//4.1---使用Weak Map集合
//Weak Map类型：是一种存储着许多键值对的无序列表
//列表的键名必须是非null类型的对象，键名对应的值则可以是任意类型
//不支持size属性
{
    let map = new WeakMap(),
        key = {};
    map.set(key, "key");
    let value = map.get(key);
    console.log("[Weak Map]---value = " + value); //key
    key = null;
    //此时Weak Map集合为空
}
//4.2---Weak Map集合的初始化方法
//Weak Map集合的初始化过程与Map集合类似，调用WeakMap构造函数并传入一个数组容器
//容器内包含其他数组，每一个数组由2个元素构成：[键名(传入的值必须是非null的对象),键名对应的值(可以是任意类型)]
{
    let key_1 = {},
        key_2 = {},
        map = new WeakMap([
            [key_1, "hi"],
            [key_2, 2]
        ]);
    console.log("[Weak Map]---has = " + map.has(key_1)); //true
    console.log("[Weak Map]---get = " + map.get(key_1)); //hi
    console.log("[Weak Map]---has = " + map.has(key_2)); //true
    console.log("[Weak Map]---get = " + map.get(key_2)); //2
}
//4.3---Weak Map集合支持的方法
//has()---检测给定的键在集合中是否存在
//delete()---移除指定的键值对
//Weak Map集合与Weak Set集合一样，两者都不支持键名枚举，从而也不支持clear()方法
{
    let map = new WeakMap(),
        key = {};
    map.set(key, "key");
    console.log("[Weak Map]---has = " + map.has(key)); //true
    console.log("[Weak Map]---get = " + map.get(key)); //key
    map.delete(key);
    console.log("[Weak Map]---has = " + map.has(key)); //false
    console.log("[Weak Map]---get = " + map.get(key)); //undefined
}
//4.4---私有对象数据
//尽管Weak Map集合会被大多数开发者用于存储DOM元素
//其他用途：存储对象实例的私有数据
//在es6中，对象的所有属性都是公开的
//存储只对对象开放的数据
function Person_test(name) {
    this._name = name;
}
Person_test.prototype.get_name = function () {
    return this._name;
};
//在这段代码中，约定前缀为下划线_的属性为私有属性，不允许在对象是例外改变这些属性
//在es5中，可以通过以下这种模式创建一个对象接近真正的私有数据：
let Person = (function () {
    let private_data = {},
        private_id = 0;

    function Person(name) {
        Object.defineProperty(this, "_id", {
            value: private_id++
        });
        private_data[this._id] = {
            name: name
        };
    }
    Person.prototype.get_name = function () {
        return private_data[this._id].name;
    };
    return Person;
}());
let person_1 = new Person("damon");
console.log("[私有对象数据]---person_1 name = " + person_1.get_name()); //damon
console.log("[私有对象数据]---person_1 _id = " + person_1._id); //0
let person_2 = new Person("stefan");
console.log("[私有对象数据]---person_2 name = " + person_2.get_name()); //stefan
console.log("[私有对象数据]---person_2 _id = " + person_2._id); //1
//在上面的示例中，变量Person由一个立即调用函数表达式(IIFE)生成，包含2个私有变量：private_data和private_id
//private_data对象存储的是每一个实例的私有信息，private_id则为每个实例生成一个独立ID
//当调用Person构造函数时，属性_id的值会被加1，这个属性不可枚举，不可配置，并且不可写
//然后，新的条目会被添加到private_data对象中，条目的键名是对象实例的ID；private_data对象中存储了所有实例对应的名称
//调用get_name()函数，即可通过this._id获取当前实例的ID，并以此从private_data对象中提取实例名称
//在IIFE外，无法访问private_data对象，即使可以访问this._id，数据实际上也很安全
//这种方法的最大的问题：如果不主动管理，由于无法获取对象实例何时被销毁，因此private_data中的数据就永远不会消失
//使用Weak Map集合可以解决这个问题：
let Better_Person = (function () {
    let private_data = new WeakMap();

    function Better_Person(name) {
        private_data.set(this, {
            name: name
        });
    }
    Better_Person.prototype.get_name = function () {
        return private_data.get(this).name;
    };
}());
//Better_Person构造函数选用一个Weak Map集合来存放私有数据
//由于Better_Person对象的实例可以作为集合的键使用，无须单独维护一套ID的体系来跟踪数据
//调用Better_Person构造函数时，新条目会被添加到Weak Map集合中，条目的键是this，值是对象包含的私有信息，在这个示例中，值是一个包含name属性的对象
//调用get_name()函数时会将this传入private_date.get()方法作为参数获取私有信息，亦即获取value对象并且访问name属性
//只要对象实例被销毁，相关信息也会被销毁，从而保证了信息的私有性
//4.5---Weak Map集合的使用方式及使用限制
//要在Weak Map集合与普通的Map集合之间做出选择，需要考虑的主要问题是，是否只用对象作为集合的键名；如果是，那么Weak Map集合是最好的集合
//当数据再也不可访问后，集合中存储的相关引用和数据都会被自动回收，这有效地避免了内存泄漏的问题，从而优化了内存的使用
//相对Map集合而言，Weak Map集合对用户的可见度更低，其不支持通过forEach()方法、size属性及clear()方法来管理集合中的元素
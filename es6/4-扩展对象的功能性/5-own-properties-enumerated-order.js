//---自有属性枚举顺序

//es5中未定义对象属性的枚举顺序，由JavaScript引擎厂商自行决定

//es6严格规定了对象的自有属性被枚举时的返回顺序
//这会影响到Object.getOwnPropertyNames()方法和Reflect.ownKeys返回属性的方式，Object.assign()方法处理属性的顺序也将随之改变
//自有属性枚举顺序的基本规则是：
//规则1：所有数字键按升序排序
//规则2：所有字符串键按照它们被加入对象的顺序排序
//规则3：所有symbol键按照它们被加入对象的顺序排序
let obj = {
    d: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1,
    "2": "2"
};
obj.a = 1;
console.log("[自有属性枚举顺序]---" + Object.getOwnPropertyNames(obj).join("-")); //0-1-2-d-c-b-a
//对于数值键，尽管在对象字面量中的顺序是随意的，但在枚举时会被重新组合和排序
//字符串键紧随数值键，并按照在对象中定义的顺序依次返回
console.log(obj[2]); //2
console.log(obj["2"]); //2
//对于for-in循环，由于并非所有厂商都遵循相同的实现方式，因此仍未指定一个明确的枚举顺序；
//而Object.keys()方法和JSON.stringify()方法都指明与for-in使用相同的枚举顺序，因此它们的枚举顺序目前也不明晰
//---内建迭代器

//1---集合对象迭代器
//在es6中有3种类型的集合对象：数组、Map集合、Set集合
//为了更好地访问对象中的内容，这3种对象都内建了以下3种迭代器
//1.1---entries()：返回一个迭代器，其值为多个键值对
let colors = ["red", "green", "blue"];
let tracking = new Set([12, 34, 56]);
let data = new Map();
data.set("title", "es6");
for (let entry of colors.entries()) {
    console.log("[entries()]---colors entry = ", entry);
}
// [entries()]---colors entry = [0, 'red']
// [entries()]---colors entry = [1, 'green']
// [entries()]---colors entry = [2, 'blue']
for (let entry of tracking.entries()) {
    console.log("[entries()]---tracking entry = ", entry);
}
// [entries()]---tracking entry =  [ 12, 12 ]
// [entries()]---tracking entry =  [ 34, 34 ]
// [entries()]---tracking entry =  [ 56, 56 ]
for (let entry of data.entries()) {
    console.log("[entries()]---data entry = ", entry);
}
// [entries]---data entry =  [ 'title', 'es6' ]
//1.2---values()：返回一个迭代器，其值为集合的所有值，不会包含数据在集合中的位置信息
// for (let value of colors.values()) {
//     console.log("[values()]---colors value = ", value);
// }
//存在兼容性问题，不推荐使用
for (let value of tracking.values()) {
    console.log("[values()]---tracking value = ", value);
}
// [values()]---tracking value =  12
// [values()]---tracking value =  34
// [values()]---tracking value =  56
for (let value of data.values()) {
    console.log("[values()]---data value = ", value);
}
// [values()]--- data value = es6
//1.3---keys()：返回一个迭代器，其值为集合中的所有键名
//如果是数组，则会返回数字类型的键，数组本身的其他属性不会被返回
//如果是Set集合，由于键和值是相同的，因此keys()和values()返回的也是相同的迭代器
//如果是Map集合，则keys()迭代器会返回每个独立的键
for (let key of colors.keys()) {
    console.log("[keys()]---colors key = ", key);
}
// [keys()]---colors key =  0
// [keys()]---colors key =  1
// [keys()]---colors key =  2
for (let key of tracking.keys()) {
    console.log("[keys()]---tracking key = ", key);
}
// [keys()]---tracking key =  12
// [keys()]---tracking key =  34
// [keys()]---tracking key =  56
for (let key of data.keys()) {
    console.log("[keys()]---data key = ", key);
}
// [keys()]---data key =  title
//对于数组来说：for-of循环迭代的是数字类型的索引；for-in循环迭代的是数组属性
//1.4---不同集合类型的默认迭代器
//每个集合类型都有一个默认的迭代器，在for-of循环中，如果没有显式指定则使用默认的迭代器
//数组和Set集合的默认迭代器是values()方法
for (let value of colors) {
    console.log("[array默认迭代器]---colors value = ", value);
}
// [array默认迭代器]---colors value =  red
// [array默认迭代器]---colors value =  green
// [array默认迭代器]---colors value =  blue
for (let value of tracking) {
    console.log("[set默认迭代器]---tracking value = ", value);
}
// [set默认迭代器]---tracking value =  12
// [set默认迭代器]---tracking value =  34
// [set默认迭代器]---tracking value =  56
//Map集合的默认迭代器entries()方法
for (let value of data) {
    console.log("[map默认迭代器]---data value = ", value);
}
// [map默认迭代器]---data value =  [ 'title', 'es6' ]
//value的值是一个由键值对组成的数组
//默认情况下，如果是数组和Set集合，会逐一返回集合中所有的值
//如果是Map集合，则按照Map构造函数参数的格式返回相同的数组内容
//而WeakSet集合和WeakMap集合就没有内建的迭代器，由于要管理弱引用，因而无法确切地知道集合中存在的值，也就无法迭代这些集合了
//1.5---解构与for-of循环
//如果要在for-of循环中使用解构语法，则可以利用Map集合默认构造函数的行为来简化编码过程：
for (let [key, value] of data) {
    console.log("[map解构]---key = ", key, ", value= ", value);
}
// [map解构]---key =  title , value=  es6

//2---字符串迭代器
//es5正式规定可以通过方括号访问字符串中的字符：text[0]-可以获取字符串text的第一个字符，并以此类推；由于方括号操作的是编码单元而非字符，因此无法正确访问双字节字符：
//es6的目标是全面支持Unicode，也可以通过改变字符串的默认迭代器来解决这个问题，使其操作字符而不是编码单元
//es6标准
let message = "a双b";
for (let i = 0; i < message.length; i++) {
    console.log("[字符串]---massage[i] = ", message[i]);
}
// [字符串]---massage[i] =  a
// [字符串]---massage[i] =  双
// [字符串]---massage[i] =  b
//改变字符串的默认迭代器，让for-of循环输出正确的内容
for (let msg of message) {
    console.log("[字符串]---msg = ", msg);
}
// [字符串]---msg =  a
// [字符串]---msg =  双
// [字符串]---msg =  b

//3---NodeList迭代器
//DOM标准中有一个NodeList类型
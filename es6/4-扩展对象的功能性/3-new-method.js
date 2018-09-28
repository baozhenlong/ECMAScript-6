//---新增方法

//1---Object.is()方法
//在JavaScript中比较两个值时，可以使用相等运算符（==）或全等运算符（===）；===可以避免在比较时出发强制类型转换的行为
//例外
console.log((+0 === -0)); //true
console.log((NaN === NaN)); //false
console.log(isNaN(NaN)); //true
//Object(param1, param2)---这个方法接受2个参数，如果这2个参数类型相同且具有相同的值，则返回true
console.log("[Object.is()]---" + (Object.is(+0, -0))); //false
console.log("[Object.is()]---" + (Object.is(NaN, NaN))); //true
console.log("[Object.is()]---" + (Object.is(5, "5"))); //false
console.log("[Object.is()]---" + (Object.is(5, 5))); //true
//对于Objectis()方法来说，其运行结果在大部分情况中与===运算符相同，唯一的区别在于（+0和-0）和（NaN和NaN）

//2---Object.assign()方法
//2.1---mixin
//混合（Mixin）是JavaScript中实现对象组合最流行的一种模式
//在一个Mixin方法中，一个对象接收来自另一个对象的属性和方法，许多JavaScript库中都有类似的mixin方法
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach((key) => {
        receiver[key] = supplier[key];
    });
    return receiver;
}
//mixin()函数遍历supplier的自有属性并复制到receiver中
//mixin()方法使用赋值操作符=来复制相关属性，却不能复制访问器属性到接收对象
//此处的复制行为是浅复制，当属性值为对象时，只复制对象的引用
//这样一来，receiver不通过继承就可以获得新属性
//任何使用mixin()方法的地方都可以直接使用Object.assign()方法来替换
//2.2---assign
//Object.assign(receiver, 源对象)---可以接受任意数量的源对象，并按指定的顺序将属性复制到接收对象中
//所以如果多个源对象具有同名属性，则排位靠后的源对象会覆盖排位靠前的
{
    let receiver = {};
    Object.assign(receiver, {
        num: 1,
        name: "receiver"
    }, {
        num: 2
    });
    console.log("[assign]---receiver = " + JSON.stringify(receiver)); //{"num":2,"name":"receiver"}
}
//2.3---访问器属性
//Object.assign()方法不能将提供者的访问器属性复制到接收对象中
//Object.assgin()方法执行的是赋值操作，因此提供者的访问器属性最终会转变为接收对象中的一个数据属性
{
    let receiver = {};
    let supplier = {
        get name() {
            return "receiver";
        }
    };
    Object.assign(receiver, supplier);
    console.log("[访问器属性转换为数据属性]---name = " + receiver.name); //receiver
    let descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
    console.log("[访问器属性转换为数据属性]---value = " + descriptor.value); //receiver
    console.log("[访问器属性转换为数据属性]---get = " + descriptor.get); //undefined
    //supplier有一个名为name的访问器属性
    //当调用Object.assign()方法时返回字符串"receiver"，因此receiver接收这个字符串后将其存为数据属性receiver.name
}
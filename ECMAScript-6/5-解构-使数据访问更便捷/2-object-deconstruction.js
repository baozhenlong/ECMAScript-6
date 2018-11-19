//---对象解构
//对象字面量的语法形式：在一个赋值操作符左边放置一个对象字面量
//使用对象的命名属性
let node = {
    type: "node",
    name: "对象字面量"
};
let {
    type,
    name
} = node;
//此处的语法，与对象字面量属性初始化的简写语法相同
//type和name都是局部声明的变量，用来从对象读取相应值的属性名称
//使用解构功能，必须要提供初始化程序
console.log("[例子]---type = " + type); //node
console.log("[例子]---name = " + name); //对象字面量
//在这段代码中，node.type的值被存储在名为type的变量中；node.name的值被存储在名为name的变量中

//1---解构赋值
{
    let node = {
            type: "node",
            name: "对象字面量"
        },
        type = "literal",
        name = 5;
    console.log("[解构赋值]---type = " + type); //literal
    console.log("[解构赋值]---name = " + name); //5
    //使用解构语法给多个变量赋值，从node对象读取相应的值重新为这2个变量赋值
    ({
        type,
        name
    } = node);
    //一定要用一对小括号()包裹解构赋值语句
    //JavaScript引擎将一对开放的花括号{}视为一个代码块，而语法规定，代码块语句不允许出现在赋值语句左侧
    //添加小括号()后可以将块语句转化为一个表达式，从而实现整个解构赋值的过程
    //解构赋值表达式的值与表达式右侧的值相等
    console.log("[解构赋值]---type = " + type); //node
    console.log("[解构赋值]---name = " + name); //对象字面量
    let output_info = function (value) {
        console.log("[解构赋值]---value === node = " + (value === node));
    };
    output_info({
        type,
        name
    } = node); //true;
    console.log("[解构赋值]---type = " + type); //node
    console.log("[解构赋值]---name = " + name); //对象字面量
    //调用output_info()函数时，传入了一个解构表达式
    //由于JavaScript表达式的值为右侧的值，因而此处传入的参数等同于node，且变量type和name被重新赋值，最终将node传入传入output_info()函数
    //Note：解构赋值表达式(也就是=右侧的表达式)如果为null或undefined会导致程序抛出错误；
    //也就是说，任何尝试读取null或undefined的属性的行为都会触发运行时错误
}

//2---默认值
//使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为undefined
{
    let node = {
        type: "node",
        name: "对象字面量"
    };
    let {
        type,
        name,
        value
    } = node;
    console.log("[默认值]---value = " + value); //undefined
    //当指定的属性不存在时，可以随意定义一个默认值，在属性名称后添加一个等号=和相应的默认值
    let {
        new_value = "new_value"
    } = node;
    console.log("[默认值]---new_value = " + new_value); //new_value
    //在此例中，为变量new_value设置了默认值new_value，只有当node上没有该属性或者该属性值为undefined时，该值才生效
}

//3---为非同名局部变量赋值
//上述解构赋值使用的都是与对象同名的局部变量
//与完整的对象字面量属性初始化程序的语法很像
{
    let node = {
        type: "node",
        name: "对象字面量"
    };
    let {
        type: local_type,
        name: local_name,
        value = "value",
        new_value: local_new_value = "local_new_value"
    } = node;
    console.log("[为非同名局部变量赋值]---local_type = " + local_type); //node
    console.log("[为非同名局部变量赋值]---local_name = " + local_name); //对象字面量
    console.log("[为非同名局部变量赋值]---value = " + value); //value
    console.log("[为非同名局部变量赋值]---local_new_value = " + local_new_value); //local_new_value
    //type: local_type语法的含义：读取名为type的属性，并将其值存储在变量local_type中
    //当使用其他变量名进行赋值时也可以添加默认值，只需在变量名后添加=和默认值即可
}
//上述都是解构属性为原始值的对象

//4---嵌套对象解构
{
    let node = {
        loc: {
            start: {
                line: 1,
                column: 2
            },
            end: {
                line: 1,
                column: 4
            }
        }
    };
    let {
        loc: {
            start,
            end: local_end
        }
    } = node;
    //在解构模式中使用了花括号{}，其含义为在找到node对象中loc属性后，应当深入一层继续查找start属性
    //所有冒号前的标识符都代表在对象中的检索位置，其右侧为被赋值的变量名；若右侧无变量名，则该检索位置的标识符即为变量名
    //如果冒号后是花括号，则意味着要赋予的最终值嵌套在对象内部更深的层级中
    console.log("[嵌套对象解构]---start.line = " + start.line); //1
    console.log("[嵌套对象解构]---start.column = " + start.column); //2
    //node.loc.end被存储在了新的局部变量local_end中
    console.log("[嵌套对象解构]---local_end.line = " + local_end.line); //1
    console.log("[嵌套对象解构]---local_end.column = " + local_end.column); //4
}
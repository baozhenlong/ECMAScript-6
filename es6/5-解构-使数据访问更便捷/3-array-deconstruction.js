//---数组解构
//声明数组解构的绑定时，必须提供一个初始化程序
//使用数组字面量
let colors = ["red", "green", "blue"];
let [first_color, second_color] = colors;
console.log("[数组字面量]---first_color = " + first_color); //red
console.log("[数组字面量]---second_color = " + second_color); //green
//在这段代码中，从colors数组中解构出了"red"和"green"这2个值，并分别存储在变量first_color和变量second_color中
//在数组解构语法中，通过值在数组中的位置进行选取，且可以将其存储在任意变量中，未显式声明的元素会直接被忽略，数组本身不会发生任何变化
//省略元素，逗号,是前方元素的占位符
let [, , third_color] = colors;
console.log("[数组字面量]---third_color = " + third_color); //blue

//1---解构赋值
//数组解构也可用于赋值上下文，但不需要用小括号()包裹表达式
{
    let colors = ["black", "green", "blue"],
        first_color = "red",
        second_color = "purple";
    [first_color, second_color] = colors;
    console.log("[数组字面量]---first_color = " + first_color); //black
    console.log("[数组字面量]---second_color = " + second_color); //green
}
//数组解构语法独特的用例：交换2个变量的值
//在es5中交换变量
{
    let a = 1,
        b = 2,
        tmp;
    tmp = a;
    a = b;
    b = tmp;
    console.log("[解构赋值]---值交换, a = " + a); //2
    console.log("[解构赋值]---值交换, b = " + b); //1
}
//在es6中交换变量
{
    let a = 1,
        b = 2;
    [a, b] = [b, a];
    console.log("[解构赋值]---值交换, a = " + a); //2
    console.log("[解构赋值]---值交换, b = " + b); //1
    //在这个示例中，数组解构赋值看起来像是一个镜像：
    //等号左侧：与其他数组解构实例一样，是一个解构模式
    //等号右侧：是一个为交换过程创建的临时数组字面量
    //代码执行过程中，先解构临时数组，将b和a值复制到左侧数组的前2个位置，最终结果是变量交换了它们的值
    //Note：如果右侧数组解构赋值表达式的值为null或undefined，则会导致程序抛出错误，这一特性与对象解构赋值很相似
}

//2---默认值
//也可以在数组解构赋值表达式中为数组中的任意位置添加默认值，当指定位置的属性不存在或其值为undefined时，使用默认值
{
    let colors = ["red"];
    let [first_color, second_color = "green"] = colors;
    console.log("[默认值]---first_color = " + first_color); //red
    console.log("[默认值]---second_color = " + second_color); //green
}

//3---嵌套数组解构
//在原有的数组模式中插入另一个数组模式，即可将解构过程深入到下一个层级
{
    let colors = ["red", ["green", "light_green"], "blue"];
    let [first_color, [, second_color_2]] = colors;
    console.log("[嵌套数组解构]---first_color = " + first_color); //red
    console.log("[嵌套数组解构]---second_color = " + second_color_2); //light_green
}

//3---不定元素
//在数组中，可以通过...语法将数组中的其他元素赋值给一个特定的变量
//Note：在被解构的数组中，不定元素必须为最后一个条目，在后面继续添加逗号会导致程序抛出错误语法
{
    let colors = ["red", "green", "bule"];
    let [first_color, ...rest_colors] = colors;
    console.log("[不定元素]---first_color = " + first_color); //red
    console.log("[不定元素]---rest_colors instanceof Array = " + (rest_colors instanceof Array)); //true
    console.log("[不定元素]---rest_colors.length = " + rest_colors.length); //2
    console.log("[不定元素]---rest_colors[0] = " + rest_colors[0]); //green
    console.log("[不定元素]---rest_colors[1] = " + rest_colors[1]); //bule
    //数组colors中第一个元素被赋值给了first_color，其余的元素被赋值给rest_colors数组，所以rest_colors包含2个元素："green"和"blue"
    //不定元素语法有助于从数组中提取特定元素并保证其余元素可用
}
//克隆数组
//在es5中
{
    let colors = ["red", "green", "blue"];
    let clone_colors = colors.concat();
    console.log("[克隆数组]---es5 clone_colors = " + clone_colors); //red, green, blue
    //concat()方法的设计初衷是连接2个数组，如果调用时不传递参数就会返回当前函数的副本
}
//在es6中
{
    let colors = ["red", "green", "blue"];
    let [...clone_colors] = colors;
    console.log("[克隆数组]---es6 clone_colors = " + clone_colors); //red, green, blue
}
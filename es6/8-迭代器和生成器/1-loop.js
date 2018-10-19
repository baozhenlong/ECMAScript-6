//---循环语句
//用循环语句迭代数据时，必须要初始化一个变量来记录每一次迭代在数据集合中的位置

//循环语句问题
let colors = ["red", "green", "blue"];
for (let i = 0, len = colors.length; i < len; i++) {
    console.log("[循环语句]---color = " + colors[i]);
}
//red green blue
//通过变量i来跟踪colors数组的索引
//问题：多个循环嵌套则需要追踪多个变量，代码的复杂度会大大增加
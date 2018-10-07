//---为何使用解构
//解构：是一种打破数据结构，将其拆分为更小部分的过程

//从对象和数组中获取特定数据并赋值给变量
let options = {
    repeat: true,
    save: false
};
let repeat = options.repeat,
    save = options.save;
//如果要提取更多变量，则必须依次编写类似的代码来为变量赋值
//如果其中还包含嵌套结构，只靠遍历是找不到真是信息的，必须深入挖掘整个数据结构才能找到所需数据
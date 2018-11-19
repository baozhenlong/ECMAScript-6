//---增强的Function构造函数
//Function构造函数用来动态创建新的函数，接受字符串形式的参数，分别为函数的参数及函数体
let add = new Function("first", "second", "return first + second");
console.log("[Function]---add result = " + add(1, 1)); //2
//es6增强了Function构造函数的功能，支持在创建函数时定义默认参数和不定参数
//默认参数
let add_2 = new Function("first", "second = first", "return first + second");
console.log("[Function]---add_2 result = " + add_2(1, 1)); //2
console.log("[Function]---add_2 result = " + add_2(1)); //2
//不定参数
let pick_first = new Function("...args", "return args[0]");
console.log("[Function]---pick_first result = " + pick_first(1, 2)); //1
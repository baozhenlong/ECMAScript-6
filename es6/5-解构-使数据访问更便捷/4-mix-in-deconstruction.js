//---混合解构

let node = {
    type: "node",
    name: "混合解构",
    loc: {
        start: {
            line: 1,
            column: 2
        },
        end: {
            line: 3,
            column: 4
        }
    },
    range: [0, 1]
};
let {
    loc: {
        start
    },
    range: [range_start_index]
} = node;
console.log("[混合解构]---start.line = " + start.line); //1
console.log("[混合解构]---start.column = " + start.column); //2
console.log("[混合解构]---range_start_index = " + range_start_index); //0
//这段代码分别将node.loc.start和node.range[0]提取到变量start和range_start_index中
//注意：解构模式中的loc:和range:仅代表它们在node对象中所处的位置(也就是该对象的属性)
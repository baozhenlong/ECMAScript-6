//---重复的对象字面量属性

//es5严格模式中加入了对象字面量重复属性的校验，让同时存在多个同名属性时会抛出错误

//es6移除了重复属性的检查，对于每一组重复属性，都会选取最后一个取值
let person = {
    name: "name",
    name: "damon"
};
console.log("[重复属性]---name = " + person.name); //damon
//---生成器方法

//在对象字面量中，可以通过在方法名前附加一个星号*的方式来定义生成器，在类中亦是如此，可以将任何方法定义成生成器
class My_Class {
    * create_iterator() {
        yield 1;
        yield 2;
        yield 3;
    }
}
let instance = new My_Class();
let iterator = instance.create_iterator();
//这段代码创建了一个名为My_Class的类，它有一个生成器方法create_iterator()，其返回值为一个硬编码在生成器中的迭代器
//如果用对象来表示集合，又希望通过简单的方法迭代集合中的值，那么生成器方法就派上用场了
//数组、Set集合、Map集合为开发者提供了多个生成器方法来与集合中的元素交互
//尽管生成器方法很实用，但如果类是用来表示值的集合的，那么为它定义一个默认迭代器会更有用
//通过Symbol.iterator定义生成器方法即可为类定义默认迭代器
class Collection {
    constructor() {
        this.items = [];
    }

    *[Symbol.iterator]() {
        // yield* this.items.values();
        for (let item of this.items) {
            yield item;
        }
    }
}
let collection = new Collection();
collection.items.push(1, 2, 3);
for (let item of collection) {
    console.log("item = ", item); //1,2,3
}
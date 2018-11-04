//---生成器方法

//在对象字面量中，可以通过在方法名前附加一个星号*的方式来定义生成器，在类中亦是如此，可以将任何方法定义成生成器
class My_Class {
    * create_iterator() {
        yield 1;
        yield 2;
        yield 3;
    }
}